-- Harden paid document storage, rate limits, and security-definer functions.

-- Paid document rows are read/deleted by owners, but writes must flow through server-side routes.
drop policy if exists "Users CRUD own documents" on public.documents;

create policy "Users read own documents"
  on public.documents for select
  using ((select auth.uid()) = user_id);

create policy "Users delete own documents"
  on public.documents for delete
  using ((select auth.uid()) = user_id);

-- Chunks are read by owners through their parent document. Writes happen via the service role.
drop policy if exists "Users manage chunks for own documents" on public.document_chunks;

create policy "Users read chunks for own documents"
  on public.document_chunks for select
  using (
    exists (
      select 1 from public.documents d
      where d.id = document_chunks.document_id
        and d.user_id = (select auth.uid())
    )
  );

-- Client-side usage-event inserts are not currently needed; keep writes server-owned.
drop policy if exists "Users insert own usage events" on public.usage_events;

-- Shared daily counters for premium and payment-abuse limits. No anon/auth policies by design.
create table if not exists public.usage_counters_daily (
  id uuid primary key default gen_random_uuid(),
  day date not null,
  scope text not null,
  identifier text not null,
  usage_count integer not null default 0,
  updated_at timestamptz not null default now(),
  unique (day, scope, identifier)
);

alter table public.usage_counters_daily enable row level security;

-- Atomic anonymous summary limiter backed by the existing anonymous_usage_daily table.
create or replace function public.consume_anonymous_summary_slot(
  p_day date,
  p_fingerprint_hash text,
  p_limit integer
)
returns table(ok boolean, count integer)
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_count integer;
begin
  if p_limit < 1 or p_fingerprint_hash is null or length(p_fingerprint_hash) = 0 then
    return query select false, 0;
    return;
  end if;

  insert into public.anonymous_usage_daily (day, fingerprint_hash, summary_count, updated_at)
  values (p_day, p_fingerprint_hash, 1, now())
  on conflict (day, fingerprint_hash) do update
    set summary_count = public.anonymous_usage_daily.summary_count + 1,
        updated_at = now()
    where public.anonymous_usage_daily.summary_count < p_limit
  returning summary_count into v_count;

  if v_count is null then
    select summary_count
      into v_count
      from public.anonymous_usage_daily
      where day = p_day and fingerprint_hash = p_fingerprint_hash;

    return query select false, coalesce(v_count, p_limit);
    return;
  end if;

  return query select true, v_count;
end;
$$;

-- Generic atomic daily limiter for premium AI, PDF upload, and checkout scopes.
create or replace function public.consume_usage_slot(
  p_day date,
  p_scope text,
  p_identifier text,
  p_limit integer
)
returns table(ok boolean, count integer)
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_count integer;
begin
  if p_limit < 1 or p_scope is null or p_identifier is null or length(p_scope) = 0 or length(p_identifier) = 0 then
    return query select false, 0;
    return;
  end if;

  insert into public.usage_counters_daily (day, scope, identifier, usage_count, updated_at)
  values (p_day, p_scope, p_identifier, 1, now())
  on conflict (day, scope, identifier) do update
    set usage_count = public.usage_counters_daily.usage_count + 1,
        updated_at = now()
    where public.usage_counters_daily.usage_count < p_limit
  returning usage_count into v_count;

  if v_count is null then
    select usage_count
      into v_count
      from public.usage_counters_daily
      where day = p_day and scope = p_scope and identifier = p_identifier;

    return query select false, coalesce(v_count, p_limit);
    return;
  end if;

  return query select true, v_count;
end;
$$;

-- Atomic grouped limiter for checks that must not partially consume user/IP quotas.
create or replace function public.consume_usage_slots(
  p_day date,
  p_scope text,
  p_identifiers text[],
  p_limit integer
)
returns table(ok boolean, count integer)
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_identifier text;
  v_count integer;
  v_max_count integer := 0;
begin
  if p_limit < 1 or p_scope is null or p_identifiers is null or length(p_scope) = 0 or cardinality(p_identifiers) = 0 then
    return query select false, 0;
    return;
  end if;

  foreach v_identifier in array p_identifiers
  loop
    if v_identifier is null or length(v_identifier) = 0 then
      return query select false, 0;
      return;
    end if;

    insert into public.usage_counters_daily (day, scope, identifier, usage_count, updated_at)
    values (p_day, p_scope, v_identifier, 0, now())
    on conflict (day, scope, identifier) do nothing;
  end loop;

  for v_count in
    select usage_count
      from public.usage_counters_daily
      where day = p_day and scope = p_scope and identifier = any(p_identifiers)
      for update
  loop
    v_max_count := greatest(v_max_count, v_count);
    if v_count >= p_limit then
      return query select false, v_count;
      return;
    end if;
  end loop;

  update public.usage_counters_daily
    set usage_count = usage_count + 1,
        updated_at = now()
    where day = p_day and scope = p_scope and identifier = any(p_identifiers);

  select max(usage_count)
    into v_count
    from public.usage_counters_daily
    where day = p_day and scope = p_scope and identifier = any(p_identifiers);

  return query select true, greatest(coalesce(v_count, 0), v_max_count + 1);
end;
$$;

revoke all on function public.consume_anonymous_summary_slot(date, text, integer) from public, anon, authenticated;
grant execute on function public.consume_anonymous_summary_slot(date, text, integer) to service_role;

revoke all on function public.consume_usage_slot(date, text, text, integer) from public, anon, authenticated;
grant execute on function public.consume_usage_slot(date, text, text, integer) to service_role;

revoke all on function public.consume_usage_slots(date, text, text[], integer) from public, anon, authenticated;
grant execute on function public.consume_usage_slots(date, text, text[], integer) to service_role;

-- Harden signup trigger against exposed-schema execution and search_path hijacking.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email)
  on conflict (id) do update set email = excluded.email, updated_at = now();
  return new;
end;
$$;

revoke all on function public.handle_new_user() from public, anon, authenticated;
