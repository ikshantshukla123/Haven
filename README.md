# Hamper Heaven
LIVE:(https://haven-snowy.vercel.app/)
## Overview

Hamper Heaven is a modern full-stack gifting platform. Users can browse and order curated or custom gift hampers without login. Only the admin can log in to manage products and view/delete orders.

## Tech Stack

- **Frontend:** React 18 (Vite), Tailwind CSS, Framer Motion, React Router DOM, Axios
- **Backend:** Node.js, Express, MongoDB (Mongoose), Cloudinary (for images)

## Features

### User Side

- Beautiful homepage with animated photo gallery (glassmorphism, framer-motion)
- Browse all products, view details, and order online (no login required)
- Special One: Custom gift request form (admin receives in panel)
- About Us: Team section with Instagram links
- Responsive, modern UI with smooth scroll and animated navbar

### Admin Side

- Login as admin only (no user registration/login for customers)
- Admin Panel: Add, edit, delete products (with image upload)
- View all orders (product & custom), delete completed orders
- Direct link to Admin Panel in navbar when logged in

## Color & UI

- Light pink backgrounds, glassmorphism cards, modern Tailwind design
- Pink and dark pink accents, blue hover/active for navbar
- Floating portfolio button on About Us page

## API & Integration

- REST API (Express)
- Product CRUD, order creation, order deletion (admin only)
- Image upload to Cloudinary

## How to Use

### For Users

1. Browse products and place orders directly (no login needed)
2. Use "Special One" for custom gift requests

### For Admin

1. Login at `/admin` (credentials set in DB)
2. Manage products and orders from the Admin Panel
3. Delete completed orders as needed

## Deployment

- **Frontend:** Deploy `/client` folder to Vercel (Vite + Tailwind supported out of the box)
- **Backend:** Deploy `/server` folder to Railway (Node.js/Express)
- **MongoDB:** Use MongoDB Atlas or Railway's managed MongoDB

## Setup & Build

1. Clone the repo and install dependencies in both `/client` and `/server`
2. Configure environment variables for backend (MongoDB URI, JWT, Cloudinary)
3. Run backend: `npm run dev` in `/server`
4. Run frontend: `npm run dev` in `/client`

## Notes

- Tailwind CSS and framer-motion are required for full UI/UX
- Make sure to rename any `.js` files containing JSX to `.jsx` for Vite
- For production, ensure all environment variables are set on Vercel/Railway

---

Enjoy gifting with Hamper Heaven!
