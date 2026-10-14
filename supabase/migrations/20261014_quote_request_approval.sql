alter table public.quote_requests
  drop constraint if exists quote_requests_status_check;

alter table public.quote_requests
  add constraint quote_requests_status_check
  check (status in ('new', 'in_progress', 'approved', 'quoted', 'closed'));
