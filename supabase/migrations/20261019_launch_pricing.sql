update public.services
set price_inr = case slug
      when 'web-application-vapt' then 18000
      when 'network-vapt' then 15000
      when 'secure-configuration-review' then 10000
      when 'phishing-simulation' then 10000
      else price_inr
    end,
    price_usd = null,
    pricing_mode = case
      when slug in ('web-application-vapt', 'network-vapt', 'secure-configuration-review', 'phishing-simulation') then 'starting'
      else 'quote'
    end,
    updated_at = now()
where slug in ('web-application-vapt', 'network-vapt', 'secure-configuration-review', 'phishing-simulation');
