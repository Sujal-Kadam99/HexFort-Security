-- HexFort Security starter schema. Run in Supabase SQL Editor.
create extension if not exists pgcrypto;

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  category text not null default 'VAPT',
  short_description text not null default '',
  description text not null default '',
  deliverables text[] not null default '{}',
  price_inr numeric(12,2) check (price_inr is null or price_inr >= 0),
  price_usd numeric(12,2) check (price_usd is null or price_usd >= 0),
  pricing_mode text not null default 'quote' check (pricing_mode in ('fixed','quote')),
  is_published boolean not null default false,
  is_featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create table if not exists public.quote_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  service text,
  currency text not null default 'INR' check (currency in ('INR','USD')),
  message text not null,
  status text not null default 'new' check (status in ('new','in_progress','approved','quoted','closed')),
  created_at timestamptz not null default now()
);
create table if not exists public.support_tickets (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text not null,
  message text not null,
  status text not null default 'open' check (status in ('open','in_progress','resolved','closed')),
  created_at timestamptz not null default now()
);
create table if not exists public.site_settings (
  key text primary key,
  value jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);
create table if not exists public.admin_activity_logs (
  id uuid primary key default gen_random_uuid(),
  admin_user_id uuid,
  action text not null,
  entity_type text not null,
  entity_id text,
  details jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.services enable row level security;
alter table public.quote_requests enable row level security;
alter table public.support_tickets enable row level security;
alter table public.site_settings enable row level security;
alter table public.admin_activity_logs enable row level security;

-- Public visitors can read published service and pricing data only.
drop policy if exists "Public can read published services" on public.services;
create policy "Public can read published services" on public.services
for select to anon, authenticated using (is_published = true);

-- Public quote/support forms can insert only. No public reads/updates/deletes.
drop policy if exists "Public can submit quote requests" on public.quote_requests;
create policy "Public can submit quote requests" on public.quote_requests
for insert to anon, authenticated with check (
  length(trim(name)) between 1 and 100 and
  length(trim(email)) between 3 and 254 and
  length(trim(message)) between 1 and 4000 and
  currency in ('INR','USD')
);
drop policy if exists "Public can submit support tickets" on public.support_tickets;
create policy "Public can submit support tickets" on public.support_tickets
for insert to anon, authenticated with check (
  length(trim(name)) between 1 and 100 and
  length(trim(email)) between 3 and 254 and
  length(trim(subject)) between 1 and 180 and
  length(trim(message)) between 1 and 4000
);

-- Admins must be manually assigned the app_metadata role "admin".
-- Do not let users self-assign this role. Set it through trusted Supabase admin tooling.
drop policy if exists "Admins manage services" on public.services;
create policy "Admins manage services" on public.services for all to authenticated
using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists "Admins read quote requests" on public.quote_requests;
create policy "Admins read quote requests" on public.quote_requests for select to authenticated
using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');
drop policy if exists "Admins update quote requests" on public.quote_requests;
create policy "Admins update quote requests" on public.quote_requests for update to authenticated
using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists "Admins read support tickets" on public.support_tickets;
create policy "Admins read support tickets" on public.support_tickets for select to authenticated
using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');
drop policy if exists "Admins update support tickets" on public.support_tickets;
create policy "Admins update support tickets" on public.support_tickets for update to authenticated
using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists "Admins manage site settings" on public.site_settings;
create policy "Admins manage site settings" on public.site_settings for all to authenticated
using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists "Admins read activity logs" on public.admin_activity_logs;
create policy "Admins read activity logs" on public.admin_activity_logs for select to authenticated
using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

-- Seed the current presentation service catalog with quote-based pricing.
insert into public.services (slug,name,category,short_description,description,deliverables,pricing_mode,is_published,is_featured)
values
('web-application-vapt','Web Application VAPT','Core service','Manual and tool-assisted testing of agreed web applications and APIs.','OWASP WSTG-aligned assessment. Estimated delivery: 5–7 business days.',array['Full findings report','CVSS-scored technical findings','Remediation guidance and one retest within 30 days'],'quote',true,true),
('network-vapt','Network VAPT','Core service','Internal or external testing of authorized network assets.','PTES-aligned assessment. Estimated delivery: 5–7 business days.',array['Full findings report','CVSS-scored technical findings','Remediation guidance and one retest within 30 days'],'quote',true,true),
('secure-configuration-review','Secure Configuration Review','Core service','Review server, OS and database hardening against CIS Benchmarks.','Review of systems agreed during scoping. Estimated delivery: 2–3 business days.',array['Configuration findings report','Risk context','Prioritized hardening guidance'],'quote',true,true),
('phishing-simulation','Phishing Simulation','Core service','A carefully scoped campaign with awareness and reporting outcomes.','Campaign objectives, audience, safeguards and schedule agreed in advance. Estimated delivery: 1–2 weeks.',array['Campaign summary','Awareness reporting','Practical recommendations'],'quote',true,true),
('source-code-review','Source Code Review','Add-on assessment','SAST-assisted manual review of agreed source code.','Review focused on OWASP Top 10 patterns and the agreed codebase.',array['Validated code findings','Risk context','Remediation guidance'],'quote',true,false),
('cloud-security-baseline-audit','Cloud Security Baseline Audit','Add-on assessment','A narrow-scope review of selected cloud security settings.','For example, AWS S3/IAM or an Azure CIS baseline, with manual validation.',array['Baseline observations','Validated risk findings','Prioritized recommendations'],'quote',true,false),
('vendor-risk-management','Vendor Risk Management','Add-on assessment','A focused review of a vendor security posture and evidence.','SIG-lite questionnaires, vendor risk scoring and review cadence recommendations.',array['Questionnaire review','Vendor risk summary','Review cadence recommendations'],'quote',true,false)
on conflict (slug) do nothing;

-- Create your single admin in Supabase Auth, then assign app_metadata role=admin
-- through trusted Supabase admin tooling. Never add a public admin signup form.

-- Engagement consent workflow. Keep client submissions private; only admins can review them.
create table if not exists public.engagement_requests (
  id uuid primary key default gen_random_uuid(),
  client_name text not null,
  client_email text not null,
  client_phone text not null,
  client_company text not null,
  representative_name text not null,
  representative_title text not null,
  client_address text not null,
  service text not null,
  assets text not null,
  environment text not null default 'Staging',
  excluded_assets text not null,
  start_date date not null,
  end_date date not null,
  permitted_hours text not null,
  blackout_dates text,
  source_ips text,
  emergency_name text not null,
  emergency_phone text not null,
  emergency_email text not null,
  special_instructions text,
  fee_inr numeric(12,2) check (fee_inr is null or fee_inr >= 0),
  fee_usd numeric(12,2) check (fee_usd is null or fee_usd >= 0),
  signature_method text not null check (signature_method in ('online','upload')),
  typed_signature text,
  consent_accepted boolean not null default false,
  signed_pdf_path text,
  approval_status text not null default 'pending_review' check (approval_status in ('pending_review','approved','rejected','changes_requested')),
  authorization_status text not null default 'not_authorized' check (authorization_status in ('not_authorized','authorized')),
  admin_notes text,
  admin_user_id uuid,
  reviewed_at timestamptz,
  submitted_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  constraint valid_engagement_dates check (end_date >= start_date),
  constraint online_consent_must_be_accepted check (signature_method <> 'online' or (consent_accepted = true and length(trim(coalesce(typed_signature,''))) > 1))
);
alter table public.engagement_requests enable row level security;
drop policy if exists "Public can submit engagement requests" on public.engagement_requests;
create policy "Public can submit engagement requests" on public.engagement_requests
for insert to anon, authenticated with check (
  length(trim(client_name)) between 1 and 180 and
  length(trim(client_email)) between 3 and 254 and
  length(trim(client_company)) between 1 and 180 and
  length(trim(service)) between 1 and 180 and
  length(trim(assets)) between 1 and 12000 and
  length(trim(excluded_assets)) between 1 and 12000 and
  start_date is not null and end_date >= start_date and
  approval_status = 'pending_review' and authorization_status = 'not_authorized'
);
drop policy if exists "Admins review engagement requests" on public.engagement_requests;
create policy "Admins review engagement requests" on public.engagement_requests
for select to authenticated using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');
drop policy if exists "Admins update engagement requests" on public.engagement_requests;
create policy "Admins update engagement requests" on public.engagement_requests
for update to authenticated using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
with check (
  (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin' and
  (authorization_status <> 'authorized' or approval_status = 'approved')
);

-- Private storage for signed engagement PDFs. Clients may upload, but only admins may read/download.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('engagement-documents', 'engagement-documents', false, 10485760, array['application/pdf'])
on conflict (id) do nothing;
drop policy if exists "Public can upload engagement PDFs" on storage.objects;
create policy "Public can upload engagement PDFs" on storage.objects for insert to anon, authenticated
with check (bucket_id = 'engagement-documents' and lower(storage.extension(name)) = 'pdf' and octet_length(name) < 300);
drop policy if exists "Admins can read engagement PDFs" on storage.objects;
create policy "Admins can read engagement PDFs" on storage.objects for select to authenticated
using (bucket_id = 'engagement-documents' and (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');
