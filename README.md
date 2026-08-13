# Hamper Heaven

LIVE: https://haven-snowy.vercel.app/

## Overview

Hamper Heaven is a gifting platform for a gift hamper brand. Customers browse and
order curated or custom gift hampers without logging in. Only the admin logs in to
manage products, view/delete orders, and read contact messages.

## Tech Stack

- **Frontend:** Next.js 16 (App Router, TypeScript, Tailwind CSS v4, Framer Motion)
- **Backend & Database:** Supabase (Postgres + Auth + Storage)
- **Deployment:** Vercel
- **Images:** Supabase Storage (WebP only, public bucket `Hamper-haven`)

The legacy React/Vite + Express + MongoDB code lives in `legacy/` and is unused.

## Features

### User Side

- Homepage with animated hero, gallery, bestsellers, and features sections
- Browse all products with search, sort, and infinite scroll
- Product detail pages with "Buy Now" order modal (name + mobile, no login)
- Special One: custom gift request form
- Contact Us form that saves messages to the admin panel
- About Us with team section and Instagram links

### Admin Side

- Admin-only login via Supabase Auth (no customer accounts)
- Admin Panel at `/admin`:
  - Add / edit / delete products (image upload, WebP/PNG ≤ 2MB)
  - View / delete all orders (product & custom)
  - View / delete contact messages

## Setup

### 1. Prerequisites

- Supabase project (create at supabase.com)
- Node.js 20+

### 2. Environment variables

Copy the values from your Supabase project (Project Settings → API) into `.env`:

```
NEXT_PUBLIC_SUPABASE_URL=https://<project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon key>
SUPABASE_SERVICE_ROLE_KEY=<service role key>   # server-side only
NEXT_PUBLIC_SUPABASE_BUCKET=Hamper-haven
```

Never commit `.env`. It is gitignored.

### 3. Database setup

Run `supabase-schema.sql` once in the Supabase Dashboard → SQL Editor. It creates
`products`, `orders`, and `contact_messages` tables with Row Level Security and
Storage policies.

### 4. Storage bucket

Bucket `Hamper-haven` (public, WebP/PNG only, 2MB file limit).

### 5. Admin user

Create your single admin account in Supabase Dashboard → Authentication → Users →
Add user.

### 6. Run locally

```bash
npm install
npm run dev
```

## Scripts

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run lint` — run ESLint
- `node --env-file=.env scripts/upload-images.mjs` — one-time script that converts
  the legacy client images to WebP and uploads them to the storage bucket

## Deployment

Import the repo into Vercel and set the four environment variables above. The
`legacy/` folder is not deployed.

---

Enjoy gifting with Hamper Heaven!