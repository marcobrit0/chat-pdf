-- Chunked text for Premium chat (citations by page range). RLS via parent document owner.

create table if not exists public.document_chunks (
  id uuid primary key default gen_random_uuid(),
  document_id uuid not null references public.documents (id) on delete cascade,
  chunk_index integer not null,
  page_start integer not null,
  page_end integer not null,
  content text not null,
  created_at timestamptz not null default now(),
  unique (document_id, chunk_index)
);

create index if not exists document_chunks_document_id_idx
  on public.document_chunks (document_id);

alter table public.document_chunks enable row level security;

-- Select/insert/update/delete only when the linked document belongs to the current user.
create policy "Users manage chunks for own documents"
  on public.document_chunks for all
  using (
    exists (
      select 1 from public.documents d
      where d.id = document_chunks.document_id
        and d.user_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.documents d
      where d.id = document_chunks.document_id
        and d.user_id = auth.uid()
    )
  );
