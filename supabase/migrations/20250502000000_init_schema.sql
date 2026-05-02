-- ChatPDF Brasil — core tables, RLS, subscription sync from Stripe.
-- Run via Supabase CLI or dashboard SQL editor.

-- Profiles mirror auth users for display and joins.
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text,
  full_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Users read own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Subscription state synced from Stripe webhooks (never trust client).
create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  stripe_customer_id text unique,
  stripe_subscription_id text unique,
  status text not null default 'inactive',
  price_id text,
  current_period_end timestamptz,
  cancel_at_period_end boolean default false,
  updated_at timestamptz not null default now(),
  unique (user_id)
);

create index if not exists subscriptions_user_id_idx on public.subscriptions (user_id);

alter table public.subscriptions enable row level security;

create policy "Users read own subscription"
  on public.subscriptions for select
  using (auth.uid() = user_id);

-- Documents for Premium persistence (V1+); anonymous uploads must not write here.
create table if not exists public.documents (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  title text,
  storage_path text,
  page_count integer,
  created_at timestamptz not null default now()
);

create index if not exists documents_user_id_idx on public.documents (user_id);

alter table public.documents enable row level security;

create policy "Users CRUD own documents"
  on public.documents for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Usage events for analytics and optional billing caps (authenticated users).
create table if not exists public.usage_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete set null,
  event_type text not null,
  metadata jsonb not null default '{}',
  created_at timestamptz not null default now()
);

create index if not exists usage_events_user_id_idx on public.usage_events (user_id);

alter table public.usage_events enable row level security;

create policy "Users read own usage events"
  on public.usage_events for select
  using (auth.uid() = user_id);

create policy "Users insert own usage events"
  on public.usage_events for insert
  with check (auth.uid() = user_id);

-- Anonymous rate limiting — written only via service role from API routes (no anon policies).
create table if not exists public.anonymous_usage_daily (
  id uuid primary key default gen_random_uuid(),
  day date not null,
  fingerprint_hash text not null,
  summary_count integer not null default 0,
  updated_at timestamptz not null default now(),
  unique (day, fingerprint_hash)
);

alter table public.anonymous_usage_daily enable row level security;

-- No policies for anon/authenticated users — only service role bypasses RLS.

-- Auto-create profile on signup.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email)
  on conflict (id) do update set email = excluded.email, updated_at = now();
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
