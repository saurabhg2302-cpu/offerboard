"use client";

import { AppShell } from "@/components/AppShell";
import { useAuth } from "@/lib/auth";

export default function NotesPage() {
  const { applications, upsertApp } = useAuth();

  return (
    <AppShell>
      <h1 className="display text-4xl">Interview notes</h1>
      <p className="text-[#eef2f6]">Prep topics and feedback, stored per company on this device.</p>
      <div className="mt-6 grid gap-3">
        {applications.map((a) => (
          <article key={a.id} className="card p-4">
            <div className="mb-2 flex justify-between gap-3">
              <h2 className="font-medium">
                {a.company} · {a.role}
              </h2>
              <span className="text-sm text-[#eef2f6]">{a.stage}</span>
            </div>
            <textarea
              className="field min-h-28"
              value={a.notes}
              placeholder="DSA topics, interviewer names, what to revise..."
              onChange={(e) => upsertApp({ ...a, notes: e.target.value })}
            />
          </article>
        ))}
        {applications.length === 0 && (
          <p className="text-[#eef2f6]">Add companies first, then keep notes beside each role.</p>
        )}
      </div>
    </AppShell>
  );
}
