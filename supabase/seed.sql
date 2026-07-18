-- =====================================================================
-- MHA CRM — Optional Seed Data
-- Run AFTER schema.sql. Safe to skip in production.
-- Gives the admin dashboard non-empty cards for demos / QA.
-- =====================================================================

insert into public.donors (name, email, organization, donor_type, status, total_given, last_gift_at, country)
values
  ('Nordic Relief Fund',        'grants@nordicrelief.org', 'Nordic Relief Fund', 'foundation',    'major',  120000, now() - interval '40 days', 'Norway'),
  ('Amna Deng',                 'amna.deng@example.com',   null,                 'individual',    'active',   2500, now() - interval '12 days', 'South Sudan'),
  ('Gulf Humanitarian Trust',   'office@ght.example',      'Gulf Humanitarian Trust', 'institutional','active', 45000, now() - interval '70 days', 'UAE'),
  ('James Okello',              'j.okello@example.com',    null,                 'individual',    'prospect',    0, null, 'Kenya');

insert into public.donations (donor_id, amount, method, designation, received_at)
select id, 120000, 'bank', 'Protection', now() - interval '40 days' from public.donors where name = 'Nordic Relief Fund'
union all
select id, 2500,   'mobile money', 'Child Protection', now() - interval '12 days' from public.donors where name = 'Amna Deng'
union all
select id, 45000,  'bank', 'GBV / CP', now() - interval '70 days' from public.donors where name = 'Gulf Humanitarian Trust';

insert into public.partners (name, partner_type, status, contact_name, contact_email, focus_areas, mou_signed_at, country)
values
  ('UNHCR South Sudan',  'un_agency',  'mou_signed', 'Field Coordination', 'partnerships@example.org', '{Protection,HLP}',        now() - interval '6 months', 'South Sudan'),
  ('Save the Children',  'ingo',       'active',     'Programme Office',   'programmes@example.org',   '{Child Protection,Youth Engagement}', now() - interval '3 months', 'South Sudan'),
  ('Juba Community Network','local_ngo','prospect',  'Coordinator',        'info@example.org',         '{Youth Engagement}',      null, 'South Sudan');

insert into public.volunteers (name, email, phone, status, skills, availability, location, interest_area)
values
  ('Mary Achol',  'mary.achol@example.com',  '+211900000001', 'active',    '{Community mobilisation,Translation}', 'Weekdays', 'Juba',  'GBV / CP'),
  ('Peter Lado',  'peter.lado@example.com',  '+211900000002', 'screening', '{Logistics}',                          'Flexible', 'Wau',   'HLP'),
  ('Sarah Nyandeng','sarah.n@example.com',   null,            'applied',   '{Data entry,Reporting}',               'Remote',   'Remote','Protection');

-- A couple of inquiries so the table + dashboard show movement
insert into public.inquiries (name, email, phone, inquiry_type, message, status)
values
  ('Daniel Garang', 'daniel.g@example.com', '+211900000010', 'partnership', 'We would like to explore a joint protection programme in Unity State.', 'new'),
  ('Foundation Desk','desk@grantmaker.example', null,         'donation',    'Requesting your latest annual report for due diligence.',               'contacted');
