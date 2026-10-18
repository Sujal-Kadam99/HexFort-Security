alter table public.services
  drop constraint if exists services_pricing_mode_check;

alter table public.services
  add constraint services_pricing_mode_check
  check (pricing_mode in ('fixed', 'quote', 'starting'));

update public.services
set price_inr = case slug
      when 'web-application-vapt' then 49000
      when 'network-vapt' then 29000
      when 'secure-configuration-review' then 19000
      when 'phishing-simulation' then 19000
      else price_inr
    end,
    price_usd = null,
    pricing_mode = case
      when slug in ('web-application-vapt', 'network-vapt', 'secure-configuration-review', 'phishing-simulation') then 'starting'
      else 'quote'
    end,
    description = case slug
      when 'web-application-vapt' then 'Starting scope: one small web application, up to 10 key pages and one user role. APIs, extra roles, payment/business logic, multiple environments or larger apps are scoped separately. OWASP WSTG-aligned. Estimated delivery: 5–7 business days after access and scope approval.'
      when 'network-vapt' then 'Starting scope: external testing of up to 5 public IP addresses. Internal networks, additional IPs, cloud estates and after-hours testing require separate scoping. PTES-aligned. Estimated delivery: 5–7 business days after access and scope approval.'
      when 'secure-configuration-review' then 'Starting scope: up to 2 systems using client-provided authorized configuration evidence. More systems, cloud tenants and hands-on remediation are scoped separately. Estimated delivery: 2–3 business days after evidence is received.'
      when 'phishing-simulation' then 'Starting scope: one approved campaign for up to 25 in-scope recipients. Client approval, audience safeguards and schedule are required; credential collection is excluded. Estimated delivery: 1–2 weeks after written approvals.'
      else description
    end,
    updated_at = now()
where slug in ('web-application-vapt', 'network-vapt', 'secure-configuration-review', 'phishing-simulation');
