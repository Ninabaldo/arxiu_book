# Supabase local (Docker)

Arxiu uses a **local** Supabase stack via Docker — no cloud project needed.

## Prerequisites

- Docker Desktop running
- From the repo root

## Daily commands

```bash
# Start (Postgres + API + Studio)
npx supabase start

# Keys / URLs for .env.local
npx supabase status

# Stop
npx supabase stop

# Re-apply migrations + seed after schema/seed changes
npx supabase db reset
```

## App env

Copy [`.env.local.example`](../.env.local.example) → `.env.local` and paste `API URL` + `anon key` from `supabase status`.

Default Studio: [http://127.0.0.1:54323](http://127.0.0.1:54323)

## Regenerate seed from TypeScript content

```bash
npx tsx scripts/generate-supabase-seed.mjs
npx supabase db reset
```

## Tables

- `reflections` — chapters (slug, order, status, image)
- `reflection_translations` — title/content per language (ca/es/en/fr)

RLS: anon can only **select** rows with `status = 'published'`.
