-- =====================================================================
-- MHA Website — CMS Content Schema (Supabase)
-- Run AFTER schema.sql. Adds content publishing: stories, news,
-- blog posts, and media videos. Plus a Storage bucket for images.
-- ---------------------------------------------------------------------
-- Idempotent. Paste into Supabase → SQL Editor → Run.
-- =====================================================================

-- =====================================================================
-- ENUMS
-- =====================================================================
do $$ begin
  create type content_status as enum ('draft', 'published');
exception when duplicate_object then null; end $$;

do $$ begin
  create type news_category as enum ('field', 'partnership', 'programme', 'announcement');
exception when duplicate_object then null; end $$;

do $$ begin
  create type blog_category as enum ('field-reflection', 'programme', 'partnership', 'editorial');
exception when duplicate_object then null; end $$;

-- =====================================================================
-- TABLE: stories  (maps to FieldStory type)
-- =====================================================================
create table if not exists public.stories (
  id            uuid primary key default gen_random_uuid(),
  slug          text unique not null,
  title         text not null,
  excerpt       text not null,
  outcome       text,
  location      text not null,
  image         text not null,                 -- public URL or /images path
  thematic_slug text not null,                  -- matches thematicAreas slug
  body          text[] not null default '{}',  -- paragraphs
  status        content_status not null default 'published',
  sort_date     timestamptz not null default now(),
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);
create index if not exists stories_status_idx   on public.stories (status);
create index if not exists stories_thematic_idx  on public.stories (thematic_slug);
create index if not exists stories_sort_idx       on public.stories (sort_date desc);

drop trigger if exists stories_set_updated_at on public.stories;
create trigger stories_set_updated_at before update on public.stories
  for each row execute function set_updated_at();

-- =====================================================================
-- TABLE: news  (maps to NewsItem type)
-- =====================================================================
create table if not exists public.news (
  id          uuid primary key default gen_random_uuid(),
  slug        text unique not null,
  title       text not null,
  date        text not null,                    -- display date string
  category    news_category not null default 'announcement',
  excerpt     text not null,
  body        text[] not null default '{}',
  image       text,
  story_slug  text,                              -- optional link to a story
  status      content_status not null default 'published',
  sort_date   timestamptz not null default now(),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
create index if not exists news_status_idx on public.news (status);
create index if not exists news_sort_idx     on public.news (sort_date desc);

drop trigger if exists news_set_updated_at on public.news;
create trigger news_set_updated_at before update on public.news
  for each row execute function set_updated_at();

-- =====================================================================
-- TABLE: blog_posts  (maps to BlogPost type)
-- =====================================================================
create table if not exists public.blog_posts (
  id            uuid primary key default gen_random_uuid(),
  slug          text unique not null,
  title         text not null,
  excerpt       text not null,
  published_at  text not null,                  -- display date string
  category      blog_category not null default 'editorial',
  image         text not null,
  body          text[] not null default '{}',
  author        text,
  story_slug    text,
  gallery       jsonb,                           -- [{src, caption, alt}]
  status        content_status not null default 'published',
  sort_date     timestamptz not null default now(),
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);
create index if not exists blog_status_idx on public.blog_posts (status);
create index if not exists blog_sort_idx     on public.blog_posts (sort_date desc);

drop trigger if exists blog_set_updated_at on public.blog_posts;
create trigger blog_set_updated_at before update on public.blog_posts
  for each row execute function set_updated_at();

-- =====================================================================
-- TABLE: videos  (maps to MediaVideo type)
-- =====================================================================
create table if not exists public.videos (
  id             uuid primary key default gen_random_uuid(),
  slug           text unique not null,
  title          text not null,
  description    text not null,
  youtube_id     text,                           -- YouTube/Vimeo id; null = "coming soon"
  poster_image   text not null,
  duration_label text,
  location       text,
  featured       boolean not null default false,
  status         content_status not null default 'published',
  sort_date      timestamptz not null default now(),
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);
create index if not exists videos_status_idx   on public.videos (status);
create index if not exists videos_featured_idx  on public.videos (featured);
create index if not exists videos_sort_idx       on public.videos (sort_date desc);

drop trigger if exists videos_set_updated_at on public.videos;
create trigger videos_set_updated_at before update on public.videos
  for each row execute function set_updated_at();

-- =====================================================================
-- ROW LEVEL SECURITY
-- ---------------------------------------------------------------------
-- Public content is READABLE by the anon key (the site fetches it
-- client/server side), but only WRITABLE by the service role.
-- We expose only PUBLISHED rows to anon; drafts stay private.
-- =====================================================================
alter table public.stories     enable row level security;
alter table public.news        enable row level security;
alter table public.blog_posts  enable row level security;
alter table public.videos      enable row level security;

drop policy if exists "anon reads published stories" on public.stories;
create policy "anon reads published stories" on public.stories
  for select to anon using (status = 'published');

drop policy if exists "anon reads published news" on public.news;
create policy "anon reads published news" on public.news
  for select to anon using (status = 'published');

drop policy if exists "anon reads published blog" on public.blog_posts;
create policy "anon reads published blog" on public.blog_posts
  for select to anon using (status = 'published');

drop policy if exists "anon reads published videos" on public.videos;
create policy "anon reads published videos" on public.videos
  for select to anon using (status = 'published');

-- (Service role bypasses RLS, so admin reads/writes — including drafts — work.)

-- =====================================================================
-- STORAGE: media bucket for uploaded images
-- ---------------------------------------------------------------------
-- Creates a PUBLIC bucket named "media". Public read so <img> works;
-- uploads happen server-side via the service role in /api/media.
-- =====================================================================
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

drop policy if exists "public read media" on storage.objects;
create policy "public read media" on storage.objects
  for select to anon, authenticated using (bucket_id = 'media');

-- =====================================================================
-- END CMS SCHEMA
-- =====================================================================
