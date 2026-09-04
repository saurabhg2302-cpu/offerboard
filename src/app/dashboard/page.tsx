"use client";

import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { useAuth } from "@/lib/auth";
import { STAGES } from "@/lib/types";

export default function DashboardPage() {
  const { user, applications } = useAuth();
  const offers = applications.filter((a) => a.stage === "offer").length;
  const interviews = applications.filter((a) => a.stage === "interview").length;
  const upcoming = applications.filter((a) => {
    if (!a.deadline) return false;
    const d = new Date(a.deadline).getTime();
    const now = Date.now();
    return d >= now && d - now < 8 * 86400000;
  });

  const max = Math.max(...STAGES.map((s) => applications.filter((a) => a.stage === s.id).length), 1);

  return (
    <AppShell>
      <p className="text-[#eef2f6]">Welcome back, {user?.name.split(" ")[0]}.</p>
      <h1 className="display mt-1 text-4xl">Placement overview</h1>

      <div className="mt-6 grid gap-3 sm:grid-cols-4">
        {[
          ["Applications", applications.length],
          ["Interviews", interviews],
          ["Offers", offers],
          ["Due in 7 days", upcoming.length],
        ].map(([label, n]) => (
          <article key={label} className="card p-4">
            <p className="text-sm font-semibold tracking-wide text-[#f4f6f8]">{label}</p>
            <p className="display mt-1 text-4xl">{n}</p>
          </article>
        ))}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <article className="card p-5">
          <h2 className="display text-2xl">Pipeline</h2>
          <ul className="mt-4 grid gap-3">
            {STAGES.map((s) => {
              const n = applications.filter((a) => a.stage === s.id).length;
              return (
                <li key={s.id}>
                  <div className="mb-1.5 flex justify-between text-base font-medium text-[#f4f6f8]">
                    <span className="text-[#f4f6f8]">{s.label}</span>
                    <span className="text-[#dbe3ea]">{n}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-[#2a313a]">
                    <div
                      className="h-full rounded-full bg-[#7bc35a]"
                      style={{ width: `${(n / max) * 100}%` }}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </article>
        <article className="card p-5">
          <div className="flex items-center justify-between">
            <h2 className="display text-2xl">This week</h2>
            <Link href="/deadlines" className="text-sm font-medium text-[#c8f59a] underline decoration-[#c8f59a]/50 underline-offset-4">
              All deadlines
            </Link>
          </div>
          <ul className="mt-4 grid gap-2">
            {upcoming.length === 0 && (
              <li className="text-[#eef2f6]">No deadlines in the next 7 days.</li>
            )}
            {upcoming.map((a) => (
              <li key={a.id} className="flex justify-between gap-3 rounded-xl bg-[#10151b] px-3 py-2">
                <span className="text-[#f4f6f8]">
                  {a.company} · {a.role}
                </span>
                <span className="shrink-0 font-semibold text-[#ffe9a8]">{a.deadline}</span>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </AppShell>
  );
}
