"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth";

export default function LandingPage() {
  const { user } = useAuth();

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <header className="mb-16 flex items-center justify-between">
        <span className="display text-2xl">OfferBoard</span>
        <div className="flex gap-2">
          <Link href="/login" className="btn-ghost">
            Log in
          </Link>
          <Link href={user ? "/dashboard" : "/register"} className="btn-accent">
            {user ? "Open app" : "Get started"}
          </Link>
        </div>
      </header>

      <section className="grid items-center gap-10 md:grid-cols-2">
        <div>
          <p className="mb-3 text-sm uppercase tracking-[0.2em] text-[#b8f07a]">
            For B.Tech CSE placements
          </p>
          <h1 className="display text-5xl leading-[1.05] md:text-6xl">
            One board for every campus application.
          </h1>
          <p className="mt-5 max-w-md text-lg text-[#eef2f6]">
            Stop tracking Amazon, Flipkart, and internships in a messy
            spreadsheet. OfferBoard keeps stages, deadlines, CTC, and interview
            notes in one place you can demo live.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/register" className="btn-accent">
              Create free account
            </Link>
            <Link href="/login?demo=1" className="btn-ghost">
              Try the demo
            </Link>
          </div>
        </div>
        <Preview />
      </section>

      <section className="mt-20 grid gap-4 md:grid-cols-3">
        {[
          ["Kanban pipeline", "Move roles from wishlist → OA → interview → offer."],
          ["Deadline radar", "See what is due this week before you miss an OA."],
          ["Interview notes", "Store DSA topics, feedback, and follow-ups per company."],
        ].map(([title, body]) => (
          <article key={title} className="card p-5">
            <h2 className="display text-2xl">{title}</h2>
            <p className="mt-2 text-[#eef2f6]">{body}</p>
          </article>
        ))}
      </section>
      <p className="mt-16 text-sm text-[#eef2f6]">
        Built by Saurabh Kumar Gautam · B.Tech CSE
      </p>
    </main>
  );
}

function Preview() {
  const cols = ["Applied", "OA", "Interview", "Offer"];
  return (
    <div className="card p-4 shadow-[0_20px_80px_#032016]">
      <div className="mb-3 flex items-center justify-between text-sm text-[#eef2f6]">
        <span>Placement pipeline</span>
        <span className="text-[#b8f07a]">6 active</span>
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {cols.map((c, i) => (
          <div key={c} className="rounded-xl bg-[#0e1217] p-2">
            <p className="mb-2 text-xs text-[#eef2f6]">{c}</p>
            <div className="rounded-lg border border-[#3a424c] bg-[#171b21] p-2 text-sm">
              {["Amazon intern", "Atlassian OA", "MSFT round 2", "Offer: MSFT"][i]}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
