# 🌌 Creatorverse

A React + Supabase app to discover and manage your favourite content creators.  
Built for **WEB103** — supports full **CRUD** (Create, Read, Update, Delete).

---

## Tech Stack

| Layer    | Tech                                |
|----------|-------------------------------------|
| Frontend | React 19 + Vite                     |
| Routing  | React Router v7                     |
| Database | Supabase (PostgreSQL)               |
| HTTP     | Supabase JS client (built-in fetch) |
| Styling  | Custom CSS dark theme               |

---

## Setup

### 1 — Install dependencies
```bash
cd creatorverse
npm install
```

### 2 — Create Supabase project
1. Go to [supabase.com](https://supabase.com) and create a free project named **creatorverse**.
2. In the Supabase dashboard, open **SQL Editor** and run the contents of [`supabase_seed.sql`](./supabase_seed.sql).  
   This creates the `creators` table, disables RLS, enables Realtime, and seeds 5 starter creators.

### 3 — Add environment variables
Edit `.env.local` and fill in your keys:

```
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGci...
```

Find both values at **Supabase → Settings → API**.

### 4 — Run the dev server
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

---

## Pages & Routes

| Route            | Component       | Description                     |
|------------------|-----------------|---------------------------------|
| `/`              | ShowCreators    | Grid of all creators            |
| `/creator/:id`   | ViewCreator     | Detail view for one creator     |
| `/edit/:id`      | EditCreator     | Edit form + delete button       |
| `/add`           | AddCreator      | Form to add a new creator       |

## Project Structure

```
src/
├── client.js            # Supabase client
├── App.jsx              # Routes + navbar shell
├── App.css              # All styles
├── index.css            # Design tokens + reset
├── components/
│   └── Card.jsx         # Creator card component
└── pages/
    ├── ShowCreators.jsx  # Home page
    ├── ViewCreator.jsx   # Detail page
    ├── EditCreator.jsx   # Edit + delete page
    └── AddCreator.jsx    # Add page
```

---

## Features

- ✅ View all creators in a responsive card grid
- ✅ Click a card to view the full detail page
- ✅ Each creator has its own unique URL (`/creator/:id`)
- ✅ Add a new creator with name, URL, description, and optional image
- ✅ Edit any field of an existing creator
- ✅ Delete a creator (with confirmation prompt)
- ✅ Image preview while filling out the form
- ✅ Graceful fallback for broken/missing images
- ✅ Loading and error states throughout
- ✅ Fully async/await with Supabase JS client
