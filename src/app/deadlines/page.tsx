"use client";

import { AppShell } from "@/components/AppShell";
import { useAuth } from "@/lib/auth";

export default function DeadlinesPage() {
  const { applications } = useAuth();
  const dated = applications
    .filter((a) => a.deadline)
    .sort((a, b) => (a.deadline! > b.deadline! ? 1 : -1));

  return (
    <AppShell>
      <h1 className="display text-4xl">Deadlines</h1>
      <p className="text-[#eef2f6]">OA dates, form closures, and offer decision windows.</p>
      <ul className="mt-6 grid gap-2">
        {dated.length === 0 && (
          <li className="card p-4 text-[#eef2f6]">Add a deadline on any company to see it here.</li>
        )}
        {dated.map((a) => {
          const soon =
            new Date(a.deadline!).getTime() - Date.now() < 3 * 86400000 &&
            new Date(a.deadline!).getTime() >= Date.now();
          return (
            <li key={a.id} className="card flex flex-wrap items-center justify-between gap-2 p-4">
              <div>
                <p className="font-medium">
                  {a.company} · {a.role}
                </p>
                <p className="text-sm text-[#eef2f6]">{a.notes || "No notes"}</p>
              </div>
              <span className={`font-semibold ${soon ? "text-[#ffe9a8]" : "text-[#f4f6f8]"}`}>
                {a.deadline}
              </span>
            </li>
          );
        })}
      </ul>
    </AppShell>
  );
}
