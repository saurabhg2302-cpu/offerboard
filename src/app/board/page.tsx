"use client";

import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { useAuth } from "@/lib/auth";
import { STAGES, type Stage } from "@/lib/types";

export default function BoardPage() {
  const { applications, setStage } = useAuth();
  const [dragId, setDragId] = useState<string | null>(null);

  return (
    <AppShell>
      <h1 className="display text-4xl">Application board</h1>
      <p className="mt-1 text-[#eef2f6]">Drag a card into another column to update its stage.</p>
      <div className="mt-6 grid gap-3 overflow-x-auto pb-4 md:grid-cols-3 xl:grid-cols-6">
        {STAGES.map((col) => {
          const cards = applications.filter((a) => a.stage === col.id);
          return (
            <section
              key={col.id}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => {
                if (dragId) setStage(dragId, col.id as Stage);
                setDragId(null);
              }}
              className="card min-h-64 p-3"
            >
              <header className="mb-3 flex items-center justify-between text-sm font-medium text-[#f4f6f8]">
                <span>{col.label}</span>
                <span className="rounded-full bg-[#10151b] px-2 py-0.5 text-[#dbe3ea]">
                  {cards.length}
                </span>
              </header>
              <div className="grid gap-2">
                {cards.map((a) => (
                  <article
                    key={a.id}
                    draggable
                    onDragStart={() => setDragId(a.id)}
                    className="grab-card rounded-xl border border-[#3a424c] bg-[#0e1217] p-3"
                  >
                    <p className="font-medium">{a.company}</p>
                    <p className="text-sm text-[#dbe3ea]">{a.role}</p>
                    {a.ctc && <p className="mt-1 text-xs text-[#b8f07a]">{a.ctc}</p>}
                  </article>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </AppShell>
  );
}
