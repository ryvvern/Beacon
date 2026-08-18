# Beacon

A study recommender that suggests which DSA / system-design topic to review next. Built with Next.js, Supabase (Postgres + pgvector), a local embedding model (transformers.js), and Claude for the personalized explanation.

## Environment variables

Copy `.env.example` to `.env.local` and fill in real values:

```bash
cp .env.example .env.local
```

| Variable | Description |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL (Project Settings → API). |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key. Server-side only — never exposed to the browser. Keep this secret. |
| `ANTHROPIC_API_KEY` | Anthropic API key used to generate the personalized explanation. |

## Running locally

Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Setting up the database

Before the app can return recommendations, run `supabase/schema.sql` once in your Supabase project's SQL editor to enable pgvector, create the `topics` table, and create the `match_topics` function. See the comments in that file for details.

## Running the ingestion script

The topic dataset ([data/topics.ts](data/topics.ts)) needs to be embedded and loaded into Supabase before search will work. This is a one-time (but safely re-runnable) step:

```bash
npm run ingest
```

This embeds each topic locally with transformers.js and upserts it into the `topics` table, keyed on `id` — re-running it is safe and just updates existing rows.

## Other useful scripts

```bash
npm run test:embed     # verify local embedding generation works
npm run test:search    # verify vector search returns sensible results
npm run test:generate  # verify Claude explanation generation works
npm run build           # production build
```

## Learn More

This project uses [Next.js](https://nextjs.org), [Supabase](https://supabase.com), and the [Anthropic API](https://docs.anthropic.com).
