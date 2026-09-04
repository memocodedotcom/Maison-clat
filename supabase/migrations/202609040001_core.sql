-- Maison Éclat production foundation.
-- Apply to a new Supabase project, then review generated policies with the project owner.

create extension if not exists btree_gist;

create type public.app_role as enum ('owner', 'manager', 'receptionist', 'practitioner', 'marketing');
create type public.membership_status as enum ('invited', 'active', 'suspended');
create type public.appointment_status as enum ('pending', 'confirmed', 'arrived', 'in_treatment', 'completed', 'no_show', 'cancelled');
create type public.lead_stage as enum ('new', 'contacted', 'qualified', 'booked', 'confirmed', 'attended', 'sold', 'active_package', 'reactivate');
create type public.consent_kind as enum ('service', 'marketing_message', 'photo_internal', 'photo_marketing');

create table public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 120),
  timezone text not null default 'Africa/Casablanca',
  currency_code char(3) not null default 'MAD',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null check (char_length(display_name) between 2 and 120),
  phone text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.memberships (
  organization_id uuid not null references public.organizations(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.app_role not null,
  status public.membership_status not null default 'invited',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (organization_id, user_id),
  unique (user_id, organization_id)
);

create table public.locations (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  name text not null,
  address text not null,
  timezone text not null default 'Africa/Casablanca',
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (id, organization_id)
);

create table public.services (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  name text not null,
  description text,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (id, organization_id),
  unique (organization_id, name)
);

create table public.service_variants (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  service_id uuid not null,
  name text not null,
  duration_minutes integer not null check (duration_minutes between 5 and 720),
  price_minor integer not null check (price_minor >= 0),
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (id, organization_id),
  unique (service_id, name),
  foreign key (service_id, organization_id) references public.services(id, organization_id) on delete cascade
);

create table public.rooms (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  location_id uuid not null,
  name text not null,
  equipment text[] not null default '{}',
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (id, organization_id),
  unique (location_id, name),
  foreign key (location_id, organization_id) references public.locations(id, organization_id) on delete cascade
);

create table public.availability_rules (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  location_id uuid not null,
  practitioner_user_id uuid,
  weekday smallint not null check (weekday between 0 and 6),
  starts_at time not null,
  ends_at time not null,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (starts_at < ends_at),
  foreign key (location_id, organization_id) references public.locations(id, organization_id) on delete cascade,
  foreign key (practitioner_user_id, organization_id) references public.memberships(user_id, organization_id) on delete cascade
);

create table public.clients (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  first_name text not null,
  last_name text not null,
  phone_e164 text not null,
  email text,
  notes text,
  created_by uuid references auth.users(id) on delete set null default auth.uid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  archived_at timestamptz,
  unique (id, organization_id),
  unique nulls not distinct (organization_id, phone_e164, archived_at)
);

create table public.leads (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  client_id uuid,
  owner_user_id uuid,
  stage public.lead_stage not null default 'new',
  source text not null,
  interested_service_id uuid,
  potential_value_minor integer not null default 0 check (potential_value_minor >= 0),
  next_action text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (id, organization_id),
  foreign key (client_id, organization_id) references public.clients(id, organization_id) on delete set null,
  foreign key (owner_user_id, organization_id) references public.memberships(user_id, organization_id) on delete set null,
  foreign key (interested_service_id, organization_id) references public.services(id, organization_id) on delete set null
);

create table public.appointments (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  location_id uuid not null,
  client_id uuid not null,
  service_variant_id uuid not null,
  practitioner_user_id uuid,
  room_id uuid,
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  status public.appointment_status not null default 'pending',
  price_minor integer not null check (price_minor >= 0),
  notes text,
  created_by uuid references auth.users(id) on delete set null default auth.uid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  cancelled_at timestamptz,
  unique (id, organization_id),
  check (starts_at < ends_at),
  foreign key (location_id, organization_id) references public.locations(id, organization_id),
  foreign key (client_id, organization_id) references public.clients(id, organization_id),
  foreign key (service_variant_id, organization_id) references public.service_variants(id, organization_id),
  foreign key (practitioner_user_id, organization_id) references public.memberships(user_id, organization_id),
  foreign key (room_id, organization_id) references public.rooms(id, organization_id),
  exclude using gist (
    organization_id with =,
    practitioner_user_id with =,
    tstzrange(starts_at, ends_at, '[)') with &&
  ) where (practitioner_user_id is not null and status in ('pending', 'confirmed', 'arrived', 'in_treatment')),
  exclude using gist (
    organization_id with =,
    room_id with =,
    tstzrange(starts_at, ends_at, '[)') with &&
  ) where (room_id is not null and status in ('pending', 'confirmed', 'arrived', 'in_treatment'))
);

create table public.packages (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  client_id uuid not null,
  service_variant_id uuid not null,
  total_sessions integer not null check (total_sessions > 0),
  price_paid_minor integer not null check (price_paid_minor >= 0),
  purchased_at timestamptz not null default now(),
  expires_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (id, organization_id),
  foreign key (client_id, organization_id) references public.clients(id, organization_id),
  foreign key (service_variant_id, organization_id) references public.service_variants(id, organization_id)
);

create table public.package_sessions (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  package_id uuid not null,
  appointment_id uuid,
  session_number integer not null check (session_number > 0),
  consumed_at timestamptz,
  created_at timestamptz not null default now(),
  unique (package_id, session_number),
  foreign key (package_id, organization_id) references public.packages(id, organization_id) on delete cascade,
  foreign key (appointment_id, organization_id) references public.appointments(id, organization_id) on delete set null
);

create table public.consents (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  client_id uuid not null,
  kind public.consent_kind not null,
  granted boolean not null,
  captured_by uuid references auth.users(id) on delete set null default auth.uid(),
  source text not null,
  evidence_path text,
  captured_at timestamptz not null default now(),
  revoked_at timestamptz,
  foreign key (client_id, organization_id) references public.clients(id, organization_id) on delete cascade
);

create table public.audit_events (
  id bigint generated always as identity primary key,
  organization_id uuid not null references public.organizations(id) on delete cascade,
  actor_user_id uuid references auth.users(id) on delete set null,
  action text not null,
  table_name text not null,
  record_id uuid,
  occurred_at timestamptz not null default now()
);

create index memberships_user_idx on public.memberships(user_id, status);
create index clients_org_name_idx on public.clients(organization_id, last_name, first_name) where archived_at is null;
create index leads_org_stage_idx on public.leads(organization_id, stage, updated_at desc);
create index appointments_org_start_idx on public.appointments(organization_id, starts_at);
create index appointments_client_idx on public.appointments(client_id, starts_at desc);
create index audit_events_org_time_idx on public.audit_events(organization_id, occurred_at desc);

create or replace function public.is_org_member(target_organization_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.memberships
    where organization_id = target_organization_id
      and user_id = auth.uid()
      and status = 'active'
  );
$$;

create or replace function public.has_org_role(target_organization_id uuid, allowed_roles public.app_role[])
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.memberships
    where organization_id = target_organization_id
      and user_id = auth.uid()
      and status = 'active'
      and role = any(allowed_roles)
  );
$$;

create or replace function public.is_assigned_client(target_organization_id uuid, target_client_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.appointments
    where organization_id = target_organization_id
      and client_id = target_client_id
      and practitioner_user_id = auth.uid()
  );
$$;

create or replace function public.shares_active_organization(target_user_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.memberships mine
    join public.memberships theirs on theirs.organization_id = mine.organization_id
    where mine.user_id = auth.uid()
      and mine.status = 'active'
      and theirs.user_id = target_user_id
      and theirs.status = 'active'
  );
$$;

revoke all on function public.is_org_member(uuid) from public;
revoke all on function public.has_org_role(uuid, public.app_role[]) from public;
revoke all on function public.is_assigned_client(uuid, uuid) from public;
revoke all on function public.shares_active_organization(uuid) from public;
grant execute on function public.is_org_member(uuid) to authenticated;
grant execute on function public.has_org_role(uuid, public.app_role[]) to authenticated;
grant execute on function public.is_assigned_client(uuid, uuid) to authenticated;
grant execute on function public.shares_active_organization(uuid) to authenticated;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function public.record_audit_event()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  row_data jsonb;
begin
  row_data := case when tg_op = 'DELETE' then to_jsonb(old) else to_jsonb(new) end;
  insert into public.audit_events (organization_id, actor_user_id, action, table_name, record_id)
  values ((row_data ->> 'organization_id')::uuid, auth.uid(), lower(tg_op), tg_table_name, (row_data ->> 'id')::uuid);
  return case when tg_op = 'DELETE' then old else new end;
end;
$$;

create trigger organizations_updated_at before update on public.organizations for each row execute function public.set_updated_at();
create trigger profiles_updated_at before update on public.profiles for each row execute function public.set_updated_at();
create trigger memberships_updated_at before update on public.memberships for each row execute function public.set_updated_at();
create trigger locations_updated_at before update on public.locations for each row execute function public.set_updated_at();
create trigger services_updated_at before update on public.services for each row execute function public.set_updated_at();
create trigger service_variants_updated_at before update on public.service_variants for each row execute function public.set_updated_at();
create trigger rooms_updated_at before update on public.rooms for each row execute function public.set_updated_at();
create trigger availability_rules_updated_at before update on public.availability_rules for each row execute function public.set_updated_at();
create trigger clients_updated_at before update on public.clients for each row execute function public.set_updated_at();
create trigger leads_updated_at before update on public.leads for each row execute function public.set_updated_at();
create trigger appointments_updated_at before update on public.appointments for each row execute function public.set_updated_at();
create trigger packages_updated_at before update on public.packages for each row execute function public.set_updated_at();

create trigger clients_audit after insert or update or delete on public.clients for each row execute function public.record_audit_event();
create trigger leads_audit after insert or update or delete on public.leads for each row execute function public.record_audit_event();
create trigger appointments_audit after insert or update or delete on public.appointments for each row execute function public.record_audit_event();
create trigger packages_audit after insert or update or delete on public.packages for each row execute function public.record_audit_event();
create trigger consents_audit after insert or update or delete on public.consents for each row execute function public.record_audit_event();

alter table public.organizations enable row level security;
alter table public.profiles enable row level security;
alter table public.memberships enable row level security;
alter table public.locations enable row level security;
alter table public.services enable row level security;
alter table public.service_variants enable row level security;
alter table public.rooms enable row level security;
alter table public.availability_rules enable row level security;
alter table public.clients enable row level security;
alter table public.leads enable row level security;
alter table public.appointments enable row level security;
alter table public.packages enable row level security;
alter table public.package_sessions enable row level security;
alter table public.consents enable row level security;
alter table public.audit_events enable row level security;

create policy organizations_read on public.organizations for select to authenticated using (public.is_org_member(id));
create policy organizations_manage on public.organizations for update to authenticated using (public.has_org_role(id, array['owner']::public.app_role[])) with check (public.has_org_role(id, array['owner']::public.app_role[]));
create policy profiles_organization_read on public.profiles for select to authenticated using (user_id = auth.uid() or public.shares_active_organization(user_id));
create policy profiles_self_update on public.profiles for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy memberships_read on public.memberships for select to authenticated using (public.is_org_member(organization_id));
create policy memberships_owner_manage on public.memberships for all to authenticated using (public.has_org_role(organization_id, array['owner']::public.app_role[])) with check (public.has_org_role(organization_id, array['owner']::public.app_role[]));
create policy memberships_manager_manage on public.memberships for all to authenticated using (public.has_org_role(organization_id, array['manager']::public.app_role[]) and role <> 'owner') with check (public.has_org_role(organization_id, array['manager']::public.app_role[]) and role <> 'owner');

create policy locations_read on public.locations for select to authenticated using (public.is_org_member(organization_id));
create policy locations_manage on public.locations for all to authenticated using (public.has_org_role(organization_id, array['owner', 'manager']::public.app_role[])) with check (public.has_org_role(organization_id, array['owner', 'manager']::public.app_role[]));
create policy services_read on public.services for select to authenticated using (public.is_org_member(organization_id));
create policy services_manage on public.services for all to authenticated using (public.has_org_role(organization_id, array['owner', 'manager']::public.app_role[])) with check (public.has_org_role(organization_id, array['owner', 'manager']::public.app_role[]));
create policy service_variants_read on public.service_variants for select to authenticated using (public.is_org_member(organization_id));
create policy service_variants_manage on public.service_variants for all to authenticated using (public.has_org_role(organization_id, array['owner', 'manager']::public.app_role[])) with check (public.has_org_role(organization_id, array['owner', 'manager']::public.app_role[]));
create policy rooms_read on public.rooms for select to authenticated using (public.is_org_member(organization_id));
create policy rooms_manage on public.rooms for all to authenticated using (public.has_org_role(organization_id, array['owner', 'manager']::public.app_role[])) with check (public.has_org_role(organization_id, array['owner', 'manager']::public.app_role[]));
create policy availability_read on public.availability_rules for select to authenticated using (public.is_org_member(organization_id));
create policy availability_manage on public.availability_rules for all to authenticated using (public.has_org_role(organization_id, array['owner', 'manager']::public.app_role[])) with check (public.has_org_role(organization_id, array['owner', 'manager']::public.app_role[]));

create policy clients_read on public.clients for select to authenticated using (public.has_org_role(organization_id, array['owner', 'manager', 'receptionist']::public.app_role[]) or (public.has_org_role(organization_id, array['practitioner']::public.app_role[]) and public.is_assigned_client(organization_id, id)));
create policy clients_write on public.clients for all to authenticated using (public.has_org_role(organization_id, array['owner', 'manager', 'receptionist']::public.app_role[])) with check (public.has_org_role(organization_id, array['owner', 'manager', 'receptionist']::public.app_role[]));
create policy leads_read on public.leads for select to authenticated using (public.has_org_role(organization_id, array['owner', 'manager', 'receptionist']::public.app_role[]));
create policy leads_write on public.leads for all to authenticated using (public.has_org_role(organization_id, array['owner', 'manager', 'receptionist']::public.app_role[])) with check (public.has_org_role(organization_id, array['owner', 'manager', 'receptionist']::public.app_role[]));
create policy appointments_read on public.appointments for select to authenticated using (public.has_org_role(organization_id, array['owner', 'manager', 'receptionist']::public.app_role[]) or practitioner_user_id = auth.uid());
create policy appointments_write on public.appointments for all to authenticated using (public.has_org_role(organization_id, array['owner', 'manager', 'receptionist']::public.app_role[])) with check (public.has_org_role(organization_id, array['owner', 'manager', 'receptionist']::public.app_role[]));
create policy packages_read on public.packages for select to authenticated using (public.has_org_role(organization_id, array['owner', 'manager', 'receptionist']::public.app_role[]) or (public.has_org_role(organization_id, array['practitioner']::public.app_role[]) and public.is_assigned_client(organization_id, client_id)));
create policy packages_write on public.packages for all to authenticated using (public.has_org_role(organization_id, array['owner', 'manager', 'receptionist']::public.app_role[])) with check (public.has_org_role(organization_id, array['owner', 'manager', 'receptionist']::public.app_role[]));
create policy package_sessions_read on public.package_sessions for select to authenticated using (public.has_org_role(organization_id, array['owner', 'manager', 'receptionist']::public.app_role[]));
create policy package_sessions_write on public.package_sessions for all to authenticated using (public.has_org_role(organization_id, array['owner', 'manager', 'receptionist']::public.app_role[])) with check (public.has_org_role(organization_id, array['owner', 'manager', 'receptionist']::public.app_role[]));
create policy consents_read on public.consents for select to authenticated using (public.has_org_role(organization_id, array['owner', 'manager', 'receptionist']::public.app_role[]) or (public.has_org_role(organization_id, array['practitioner']::public.app_role[]) and public.is_assigned_client(organization_id, client_id)) or (public.has_org_role(organization_id, array['marketing']::public.app_role[]) and kind in ('marketing_message', 'photo_marketing')));
create policy consents_write on public.consents for all to authenticated using (public.has_org_role(organization_id, array['owner', 'manager', 'receptionist', 'practitioner']::public.app_role[])) with check (public.has_org_role(organization_id, array['owner', 'manager', 'receptionist', 'practitioner']::public.app_role[]));
create policy audit_events_read on public.audit_events for select to authenticated using (public.has_org_role(organization_id, array['owner', 'manager']::public.app_role[]));

comment on table public.audit_events is 'Append-only audit metadata. Detailed sensitive row snapshots are intentionally not copied here.';
comment on column public.service_variants.price_minor is 'Price stored in the smallest currency unit; for MAD this is centimes.';
