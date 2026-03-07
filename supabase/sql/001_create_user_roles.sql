-- RBAC: user roles stored in DB (recommended over auth metadata editing).
-- Run this in Supabase SQL Editor.

create table if not exists public.user_roles (
  user_id uuid primary key references auth.users (id) on delete cascade,
  role text not null default 'user' check (role in ('user', 'admin')),
  created_at timestamptz not null default now()
);

-- Optional: speed up filtering by role
create index if not exists user_roles_role_idx on public.user_roles (role);

-- RLS: allow backend to read roles (needed if using anon key; service_role bypasses RLS)
alter table public.user_roles enable row level security;

create policy "Allow read user_roles"
  on public.user_roles for select
  using (true);

create policy "Allow service to manage user_roles"
  on public.user_roles for all
  using (true)
  with check (true);
