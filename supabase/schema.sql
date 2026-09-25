-- Website Demo V1 Supabase setup
-- Run this once in Supabase SQL Editor, then create the private user in Authentication > Users.

create extension if not exists "pgcrypto";

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  business_name text not null,
  category text not null,
  country text not null,
  city text not null,
  phone text not null,
  email text,
  address text,
  map_url text,
  description text,
  services text,
  differentiators text,
  opening_hours text,
  style text,
  facebook_url text,
  instagram_url text,
  tiktok_url text,
  other_social_url text,
  asset_links text,
  notes text,
  status text not null default 'NEW' check (status in ('NEW', 'CONTACTED', 'PAYMENT_PENDING', 'PAID', 'BUILDING', 'PREVIEW', 'REVISION', 'COMPLETED', 'CANCELLED')),
  created_at timestamptz not null default now()
);

create table if not exists public.admin_users (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now()
);

alter table public.orders enable row level security;
alter table public.admin_users enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admin_users
    where lower(email) = lower(auth.jwt() ->> 'email')
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;

drop policy if exists "anyone can submit an order" on public.orders;
create policy "anyone can submit an order"
on public.orders for insert
to anon, authenticated
with check (true);

drop policy if exists "admins can read orders" on public.orders;
create policy "admins can read orders"
on public.orders for select
to authenticated
using (public.is_admin());

drop policy if exists "admins can read allowlist" on public.admin_users;
create policy "admins can read allowlist"
on public.admin_users for select
to authenticated
using (public.is_admin());

-- Add the owner email manually after creating the matching Auth user:
-- insert into public.admin_users (email) values ('owner@example.com');
