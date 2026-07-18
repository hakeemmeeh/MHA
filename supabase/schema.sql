-- =====================================================================
-- MHA (Mobile Humanitarian Agency) — CRM Backend Schema
-- Supabase / PostgreSQL
-- ---------------------------------------------------------------------
-- Run order: paste the whole file into Supabase → SQL Editor → Run.
-- Idempotent: safe to re-run (uses IF NOT EXISTS / DROP-CREATE on policies).
-- =====================================================================

-- Extensions -----------------------------------------------------------
create extension if not exists "pgcrypto";   -- gen_random_uuid()

-- =====================================================================
-- ENUMS
-- =====================================================================
do $$ begin
  create type inquiry_status as enum ('new', 'contacted', 'qualified', 'closed');
exception when duplicate_object then null; end $$;

do $$ begin
  create type inquiry_kind as enum (
    'general', 'partnership', 'donation', 'volunteer', 'media', 'careers'
  );
exception when duplicate_object then null; end $$;

do $$ begin
  create type donor_type as enum ('individual', 'institutional', 'foundation', 'government');
exception when duplicate_object then null; end $$;

do $$ begin
  create type donor_status as enum ('prospect', 'active', 'lapsed', 'major');
exception when duplicate_object then null; end $$;

do $$ begin
  create type partner_type as enum ('un_agency', 'ingo', 'local_ngo', 'donor', 'government', 'private');
exception when duplicate_object then null; end $$;

do $$ begin
  create type partner_status as enum ('prospect', 'active', 'mou_signed', 'dormant');
exception when duplicate_object then null; end $$;

do $$ begin
  create type volunteer_status as enum ('applied', 'screening', 'active', 'inactive');
exception when duplicate_object then null; end $$;

-- =====================================================================
-- updated_at trigger helper
-- =====================================================================
create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

-- =====================================================================
-- TABLE: inquiries  (contact form — matches existing API route)
-- =====================================================================
create table if not exists public.inquiries (
  id            uuid primary key default gen_random_uuid(),
  name          text        not null,
  email         text        not null,
  phone         text,
  inquiry_type  text        not null default 'general',
  message       text        not null,
  status        inquiry_status not null default 'new',
  notes         text,                          -- internal follow-up notes
  assigned_to   text,                          -- team member handling it
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index if not exists inquiries_status_idx     on public.inquiries (status);
create index if not exists inquiries_created_at_idx  on public.inquiries (created_at desc);
create index if not exists inquiries_type_idx        on public.inquiries (inquiry_type);

drop trigger if exists inquiries_set_updated_at on public.inquiries;
create trigger inquiries_set_updated_at
  before update on public.inquiries
  for each row execute function set_updated_at();

-- =====================================================================
-- TABLE: donors
-- =====================================================================
create table if not exists public.donors (
  id             uuid primary key default gen_random_uuid(),
  name           text        not null,
  email          text,
  phone          text,
  organization   text,
  donor_type     donor_type  not null default 'individual',
  status         donor_status not null default 'prospect',
  total_given    numeric(14,2) not null default 0,    -- lifetime, in USD
  currency       text        not null default 'USD',
  last_gift_at   timestamptz,
  country        text,
  notes          text,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

create index if not exists donors_status_idx   on public.donors (status);
create index if not exists donors_type_idx      on public.donors (donor_type);
create index if not exists donors_created_idx   on public.donors (created_at desc);

drop trigger if exists donors_set_updated_at on public.donors;
create trigger donors_set_updated_at
  before update on public.donors
  for each row execute function set_updated_at();

-- =====================================================================
-- TABLE: donations  (individual gifts, linked to a donor)
-- =====================================================================
create table if not exists public.donations (
  id           uuid primary key default gen_random_uuid(),
  donor_id     uuid references public.donors (id) on delete set null,
  amount       numeric(14,2) not null,
  currency     text        not null default 'USD',
  method       text,                              -- bank, mobile money, cash, in-kind
  designation  text,                              -- programme/thematic area
  received_at  timestamptz not null default now(),
  reference    text,
  created_at   timestamptz not null default now()
);

create index if not exists donations_donor_idx     on public.donations (donor_id);
create index if not exists donations_received_idx   on public.donations (received_at desc);

-- =====================================================================
-- TABLE: partners
-- =====================================================================
create table if not exists public.partners (
  id             uuid primary key default gen_random_uuid(),
  name           text          not null,
  partner_type   partner_type  not null default 'local_ngo',
  status         partner_status not null default 'prospect',
  contact_name   text,
  contact_email  text,
  contact_phone  text,
  focus_areas    text[],                          -- e.g. {'Protection','GBV'}
  mou_signed_at  timestamptz,
  country        text,
  notes          text,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

create index if not exists partners_status_idx  on public.partners (status);
create index if not exists partners_type_idx     on public.partners (partner_type);
create index if not exists partners_created_idx  on public.partners (created_at desc);

drop trigger if exists partners_set_updated_at on public.partners;
create trigger partners_set_updated_at
  before update on public.partners
  for each row execute function set_updated_at();

-- =====================================================================
-- TABLE: volunteers
-- =====================================================================
create table if not exists public.volunteers (
  id             uuid primary key default gen_random_uuid(),
  name           text        not null,
  email          text        not null,
  phone          text,
  status         volunteer_status not null default 'applied',
  skills         text[],
  availability   text,                            -- e.g. "weekends", "remote"
  location       text,
  interest_area  text,                            -- thematic area of interest
  notes          text,
  applied_at     timestamptz not null default now(),
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

create index if not exists volunteers_status_idx   on public.volunteers (status);
create index if not exists volunteers_created_idx   on public.volunteers (created_at desc);

drop trigger if exists volunteers_set_updated_at on public.volunteers;
create trigger volunteers_set_updated_at
  before update on public.volunteers
  for each row execute function set_updated_at();

-- =====================================================================
-- ROW LEVEL SECURITY
-- ---------------------------------------------------------------------
-- Model: the public site uses the SERVICE ROLE key (server-side only,
-- in API routes / server components) which BYPASSES RLS. The anon key
-- is never used to read CRM data. So we enable RLS and add NO public
-- policies — this locks the tables to service-role access only and
-- prevents accidental exposure if the anon key ever queries them.
-- =====================================================================
alter table public.inquiries  enable row level security;
alter table public.donors      enable row level security;
alter table public.donations   enable row level security;
alter table public.partners    enable row level security;
alter table public.volunteers  enable row level security;

-- Explicitly deny anon/authenticated (no policies = deny by default under RLS).
-- The contact form inserts via the service role in /api/contact, so no
-- public insert policy is required. If you later want the public anon key
-- to insert inquiries directly from the browser, uncomment below:
--
-- drop policy if exists "anon can insert inquiries" on public.inquiries;
-- create policy "anon can insert inquiries"
--   on public.inquiries for insert to anon
--   with check (true);

-- =====================================================================
-- DASHBOARD STATS VIEW (single round-trip for the overview cards)
-- =====================================================================
create or replace view public.dashboard_stats as
select
  (select count(*) from public.inquiries  where status = 'new')        as new_inquiries,
  (select count(*) from public.inquiries)                              as total_inquiries,
  (select count(*) from public.donors)                                 as total_donors,
  (select count(*) from public.donors      where status = 'active'
                                              or status = 'major')      as active_donors,
  (select count(*) from public.partners    where status = 'active'
                                              or status = 'mou_signed') as active_partners,
  (select count(*) from public.volunteers)                             as total_volunteers,
  (select count(*) from public.volunteers  where status = 'active')    as active_volunteers,
  (select coalesce(sum(amount),0) from public.donations)               as total_raised;

-- =====================================================================
-- END SCHEMA
-- =====================================================================
