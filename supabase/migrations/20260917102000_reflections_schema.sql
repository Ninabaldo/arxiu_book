-- ARXIU content schema (local Supabase)
-- Public frontend must never render created_at / updated_at.

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

create table if not exists public.reflections (
  id text primary key,
  slug text not null unique,
  "order" integer not null,
  type text not null default 'reflection',
  status text not null default 'draft' check (status in ('draft', 'published')),
  image text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.reflection_translations (
  id text primary key,
  reflection_id text not null references public.reflections (id) on delete cascade,
  language text not null check (language in ('ca', 'es', 'en', 'fr')),
  title text not null default '',
  content text not null default '',
  unique (reflection_id, language)
);

create index if not exists reflections_order_idx on public.reflections ("order");
create index if not exists reflections_status_idx on public.reflections (status);
create index if not exists reflection_translations_lang_idx
  on public.reflection_translations (language);

create trigger reflections_set_updated_at
before update on public.reflections
for each row execute function public.set_updated_at();

alter table public.reflections enable row level security;
alter table public.reflection_translations enable row level security;

-- Anon / authenticated: read published reflections only
create policy "Public read published reflections"
  on public.reflections
  for select
  to anon, authenticated
  using (status = 'published');

create policy "Public read translations of published reflections"
  on public.reflection_translations
  for select
  to anon, authenticated
  using (
    exists (
      select 1
      from public.reflections r
      where r.id = reflection_id
        and r.status = 'published'
    )
  );
