-- Beacon: Supabase schema setup
-- Run this file manually in the Supabase SQL editor.

-- 1. Enable the pgvector extension
create extension if not exists vector;

-- 2. Topics table
-- embedding is vector(384) because we use the all-MiniLM-L6-v2 model,
-- which outputs 384-dimensional embeddings.
create table if not exists topics (
  id text primary key,
  title text not null,
  description text not null,
  tags text[] not null default '{}',
  difficulty text not null,
  embedding vector(384)
);

-- 3. Similarity search function
-- Uses cosine distance (<=> operator) between the stored embedding and the
-- query embedding. Cosine distance ranges from 0 (identical) to 2 (opposite),
-- so similarity is derived as (1 - distance), giving 1 for identical vectors.
-- This is the simplest, most commonly documented approach for pgvector
-- similarity search on Supabase.
create or replace function match_topics (
  query_embedding vector(384),
  match_count int default 5
)
returns table (
  id text,
  title text,
  description text,
  tags text[],
  difficulty text,
  similarity float
)
language sql stable
as $$
  select
    topics.id,
    topics.title,
    topics.description,
    topics.tags,
    topics.difficulty,
    1 - (topics.embedding <=> query_embedding) as similarity
  from topics
  order by topics.embedding <=> query_embedding
  limit match_count;
$$;
