-- Align public and admin service listings with the Maharashtra Cyber Cell presentation.
-- Old records remain in the database but are unpublished so existing quote history is preserved.
update public.services
set is_published = false, is_featured = false, updated_at = now()
where slug in ('red-teaming', 'blue-teaming');

insert into public.services
  (slug, name, category, short_description, description, deliverables, pricing_mode, is_published, is_featured)
values
  ('web-application-vapt','Web Application VAPT','Core service','Manual and tool-assisted testing of agreed web applications and APIs.','OWASP WSTG-aligned assessment. Estimated delivery: 5–7 business days.',array['Full findings report','CVSS-scored technical findings','Remediation guidance and one retest within 30 days'],'quote',true,true),
  ('network-vapt','Network VAPT','Core service','Internal or external testing of authorized network assets.','PTES-aligned assessment. Estimated delivery: 5–7 business days.',array['Full findings report','CVSS-scored technical findings','Remediation guidance and one retest within 30 days'],'quote',true,true),
  ('secure-configuration-review','Secure Configuration Review','Core service','Review server, OS and database hardening against CIS Benchmarks.','Review of systems agreed during scoping. Estimated delivery: 2–3 business days.',array['Configuration findings report','Risk context','Prioritized hardening guidance'],'quote',true,true),
  ('phishing-simulation','Phishing Simulation','Core service','A carefully scoped campaign with awareness and reporting outcomes.','Campaign objectives, audience, safeguards and schedule agreed in advance. Estimated delivery: 1–2 weeks.',array['Campaign summary','Awareness reporting','Practical recommendations'],'quote',true,true),
  ('source-code-review','Source Code Review','Add-on assessment','SAST-assisted manual review of agreed source code.','Review focused on OWASP Top 10 patterns and the agreed codebase.',array['Validated code findings','Risk context','Remediation guidance'],'quote',true,false),
  ('cloud-security-baseline-audit','Cloud Security Baseline Audit','Add-on assessment','A narrow-scope review of selected cloud security settings.','For example, AWS S3/IAM or an Azure CIS baseline, with manual validation.',array['Baseline observations','Validated risk findings','Prioritized recommendations'],'quote',true,false),
  ('vendor-risk-management','Vendor Risk Management','Add-on assessment','A focused review of a vendor security posture and evidence.','SIG-lite questionnaires, vendor risk scoring and review cadence recommendations.',array['Questionnaire review','Vendor risk summary','Review cadence recommendations'],'quote',true,false)
on conflict (slug) do update set
  name = excluded.name,
  category = excluded.category,
  short_description = excluded.short_description,
  description = excluded.description,
  deliverables = excluded.deliverables,
  pricing_mode = 'quote',
  is_published = true,
  is_featured = excluded.is_featured,
  updated_at = now();
