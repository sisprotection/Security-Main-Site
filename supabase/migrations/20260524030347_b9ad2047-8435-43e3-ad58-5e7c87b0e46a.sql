-- Role enum
create type public.app_role as enum ('president', 'user');

-- user_roles table
create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role public.app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);

alter table public.user_roles enable row level security;

-- Users can read their own roles
create policy "Users can view own roles"
on public.user_roles for select
to authenticated
using (auth.uid() = user_id);

-- Security definer role check
create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.user_roles
    where user_id = _user_id and role = _role
  )
$$;

-- Auto-grant role on signup
create or replace function public.handle_new_user_role()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.email = 'blackhatterxvi@gmail.com' then
    insert into public.user_roles (user_id, role) values (new.id, 'president')
      on conflict do nothing;
  else
    insert into public.user_roles (user_id, role) values (new.id, 'user')
      on conflict do nothing;
  end if;
  return new;
end;
$$;

create trigger on_auth_user_created_assign_role
after insert on auth.users
for each row execute function public.handle_new_user_role();