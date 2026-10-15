-- Reuse the already configured quote webhook URL, headers, and timeout for every public request form.
do $$
declare
  args bytea;
  parts text[] := '{}';
  start_at integer := 0;
  i integer;
  target_table text;
  target_trigger text;
  relation regclass;
begin
  select tgargs into args
  from pg_trigger
  where tgname = 'notify_quote'
    and tgrelid = 'public.quote_requests'::regclass
    and not tgisinternal
  limit 1;

  if args is null then
    raise exception 'Create the quote_requests database webhook before applying this migration';
  end if;

  for i in 0..octet_length(args)-1 loop
    if get_byte(args, i) = 0 then
      parts := array_append(parts, convert_from(substring(args from start_at+1 for i-start_at), 'UTF8'));
      start_at := i+1;
    end if;
  end loop;

  if cardinality(parts) <> 5 then
    raise exception 'Unexpected quote webhook configuration';
  end if;

  for target_table, target_trigger in
    select * from (values ('support_tickets', 'notify_support'), ('engagement_requests', 'notify_engagement')) as targets(table_name, trigger_name)
  loop
    relation := to_regclass(format('public.%I', target_table));
    if relation is not null and not exists (
      select 1 from pg_trigger where tgname = target_trigger and tgrelid = relation and not tgisinternal
    ) then
      execute format(
        'create trigger %I after insert on %s for each row execute function supabase_functions.http_request(%L,%L,%L,%L,%L)',
        target_trigger, relation, parts[1], parts[2], parts[3], parts[4], parts[5]
      );
    end if;
  end loop;
end $$;
