-- ARXIU content schema (Supabase)
-- Public frontend must never render created_at / updated_at.

create table if not exists reflections (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  "order" integer not null,
  type text not null default 'reflection',
  status text not null default 'draft' check (status in ('draft', 'published')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists reflection_translations (
  id uuid primary key default gen_random_uuid(),
  reflection_id uuid not null references reflections(id) on delete cascade,
  language text not null check (language in ('ca', 'es', 'en', 'fr')),
  title text not null default '',
  content text not null default '',
  unique (reflection_id, language)
);

create index if not exists reflections_order_idx on reflections ("order");
create index if not exists reflections_status_idx on reflections (status);
create index if not exists reflection_translations_lang_idx
  on reflection_translations (language);

-- Optional: only published reflections readable by anon
-- alter table reflections enable row level security;
-- alter table reflection_translations enable row level security;
