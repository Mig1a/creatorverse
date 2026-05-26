-- Run this in the Supabase SQL Editor to create and seed the creators table.

create table if not exists public.creators (
  id          bigint generated always as identity primary key,
  name        text        not null,
  url         text        not null,
  description text        not null,
  "imageURL"  text,
  created_at  timestamptz default now()
);

-- Disable RLS (as per project instructions)
alter table public.creators disable row level security;

-- Enable Realtime
alter publication supabase_realtime add table public.creators;

-- Seed: 5 starter creators
insert into public.creators (name, url, description, "imageURL") values
(
  'Marques Brownlee (MKBHD)',
  'https://www.youtube.com/@mkbhd',
  'Premium tech reviews covering the latest smartphones, laptops, and gadgets with stunning cinematography. If you want honest, in-depth tech coverage — MKBHD is the gold standard.',
  'https://yt3.googleusercontent.com/lkH37D712tiyphnu0Id0D5MwwQ7IRuwgQLVD05iMXlDWO-kDHut3uI4MKboPN_r3FqOxAlaU0Q=s160-c-k-c0x00ffffff-no-rj'
),
(
  'Fireship',
  'https://www.youtube.com/@Fireship',
  'Fast-paced, visually sharp programming tutorials and tech news in 100 seconds or less. Perfect for developers who want to stay current without the fluff.',
  'https://yt3.googleusercontent.com/ytc/AIdro_nqFhMPPpPnCwpMmoxn9XYdZBfkWB9KyBnBFEQZ=s160-c-k-c0x00ffffff-no-rj'
),
(
  'The Coding Train',
  'https://www.youtube.com/@TheCodingTrain',
  'Daniel Shiffman makes creative coding joyful with live coding sessions covering p5.js, machine learning, generative art, and programming challenges. Great for all skill levels.',
  'https://yt3.googleusercontent.com/ytc/AIdro_kxiIZLOqmkdyGR3I0hxrqC5l7WQ-gjpDLDpBDo=s160-c-k-c0x00ffffff-no-rj'
),
(
  'Kevin Powell',
  'https://www.youtube.com/@KevinPowell',
  'The king of CSS on YouTube. Kevin demystifies layout, animations, and modern CSS techniques with clarity and patience. Essential for any frontend developer.',
  'https://yt3.googleusercontent.com/ytc/AIdro_n-pUJiM1A7f-qEEjpgEPd4SDM4rBvMRFRtXXvA=s160-c-k-c0x00ffffff-no-rj'
),
(
  'Theo - t3.gg',
  'https://www.youtube.com/@t3dotgg',
  'Opinionated takes on the modern full-stack web ecosystem: TypeScript, Next.js, tRPC, and the T3 stack. Theo keeps it real and moves fast.',
  'https://yt3.googleusercontent.com/4NapxEtLcHQ5WVsNhOAP6uZBUzz8N_0x0XFYS3xBiHJp6u1sHkCKc3ufDKIPkJ0daqc1FcG=s160-c-k-c0x00ffffff-no-rj'
);
