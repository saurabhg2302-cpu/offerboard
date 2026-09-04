# OfferBoard

Built by **Saurabh Kumar Gautam** (B.Tech CSE, 3rd year).

Live campus placement tracker for B.Tech CSE students. One board for on-campus, off-campus, and internship applications — from wishlist to offer.

## Live demo

**https://offerboard-saurabh.vercel.app**

Click **Try the demo**. No signup needed. Use that URL on your resume.

## Problem

Students track 20–50 companies in Excel or WhatsApp. Deadlines get missed, interview notes scatter, and there is no pipeline view of “where each application stands.”

## What it does

- Register / log in (demo account included)
- Dashboard: application count, interviews, offers, deadlines in 7 days, pipeline bars
- Kanban board: drag cards across Wishlist → Applied → OA → Interview → Offer → Rejected
- Company table: search, filter by drive type, add / edit / delete
- Deadline list and per-company interview notes

## Tech stack

| Layer | Choice | Why |
| --- | --- | --- |
| UI | Next.js App Router + TypeScript | File-based routes, typed models, easy Vercel/Netlify deploy |
| Styling | Tailwind CSS | Fast, consistent UI without a component library |
| State | React Context (`AuthProvider`) | Shared session + applications without Redux for this app size |
| Persistence | `localStorage` behind `storage.ts` | Zero-cost hosting; repository file can later swap to an API |
| Auth (demo) | SHA-256 via Web Crypto | Shows hashing vs plaintext; production would use Argon2/bcrypt on a server |

## Project structure

```
src/app/           pages (landing, login, dashboard, board, companies, deadlines, notes)
src/components/    AppShell (nav + auth gate), ApplicationForm
src/lib/types.ts   Stage, Application, User
src/lib/storage.ts localStorage repository
src/lib/auth.tsx   Context: login, CRUD, stage updates
src/lib/seed.ts    Demo companies for recruiter walkthrough
src/lib/crypto.ts  Hash + UUID helpers
```

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000

## Resume bullets (copy)

- Built **OfferBoard**, a Next.js + TypeScript placement tracker with auth, kanban pipeline, search/filters, deadline radar, and interview notes.
- Designed a storage repository so UI never talks to `localStorage` directly; the same CRUD API can later sit on REST + Postgres.
- Shipped a public demo with seeded data so recruiters can walk the product without creating an account.

## Interview prep

Read [INTERVIEW.md](./INTERVIEW.md) before any HR / technical round. Practice the 2-minute demo script there.

## License

Personal academic project. Use and modify for your own resume.
