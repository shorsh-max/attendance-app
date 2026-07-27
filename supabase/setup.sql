-- Run this in Supabase SQL editor to create the attendance table

create extension if not exists pgcrypto;

create table if not exists attendance (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  email text,
  check_in timestamptz,
  check_out timestamptz,
  created_at timestamptz default timezone('utc', now())
);

create index if not exists attendance_user_id_idx on attendance(user_id);
