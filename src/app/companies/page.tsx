"use client";

import { useMemo, useState } from "react";
import { ApplicationForm } from "@/components/ApplicationForm";
import { AppShell } from "@/components/AppShell";
import { useAuth } from "@/lib/auth";
import { STAGES, type Application, type DriveType } from "@/lib/types";

export default function CompaniesPage() {
  const { applications, upsertApp, deleteApp } = useAuth();
  const [q, setQ] = useState("");
  const [type, setType] = useState<DriveType | "all">("all");
  const [editing, setEditing] = useState<Application | null | undefined>(undefined);

  const rows = useMemo(() => {
    return applications.filter((a) => {
      const matchQ = `${a.company} ${a.role} ${a.location}`
        .toLowerCase()
        .includes(q.toLowerCase());
      const matchT = type === "all" || a.type === type;
      return matchQ && matchT;
    });
  }, [applications, q, type]);

  return (
    <AppShell>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="display text-4xl">Companies</h1>
          <p className="text-[#eef2f6]">Search, filter, and keep every drive in one list.</p>
        </div>
        <button className="btn-accent" onClick={() => setEditing(null)}>
          Add company
        </button>
      </div>

      {editing !== undefined && (
        <div className="mt-4">
          <ApplicationForm
            initial={editing ?? undefined}
            onSave={(app) => {
              upsertApp(app);
              setEditing(undefined);
            }}
            onCancel={() => setEditing(undefined)}
          />
        </div>
      )}

      <div className="mt-5 flex flex-wrap gap-2">
        <input
          className="field max-w-xs"
          placeholder="Search company or role"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <select
          className="field max-w-48"
          value={type}
          onChange={(e) => setType(e.target.value as DriveType | "all")}
        >
          <option value="all">All types</option>
          <option value="on-campus">On-campus</option>
          <option value="off-campus">Off-campus</option>
          <option value="internship">Internship</option>
        </select>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="text-[#e8eef2]">
            <tr>
              {["Company", "Role", "Type", "Stage", "CTC", "Deadline", ""].map((h) => (
                <th key={h} className="border-b border-[#3a424c] py-2 font-medium">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((a) => (
              <tr key={a.id} className="border-b border-[#3a424c]/70">
                <td className="py-3 font-medium">{a.company}</td>
                <td>{a.role}</td>
                <td className="capitalize">{a.type.replace("-", " ")}</td>
                <td>{STAGES.find((s) => s.id === a.stage)?.label}</td>
                <td>{a.ctc || "—"}</td>
                <td>{a.deadline || "—"}</td>
                <td className="space-x-2 text-right">
                  <button className="font-semibold text-[#c8f59a]" onClick={() => setEditing(a)}>
                    Edit
                  </button>
                  <button
                    className="font-semibold text-[#ffb4ae]"
                    onClick={() => {
                      if (confirm(`Delete ${a.company}?`)) deleteApp(a.id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length === 0 && (
          <p className="mt-6 text-[#eef2f6]">No companies yet. Add one or open the demo account.</p>
        )}
      </div>
    </AppShell>
  );
}
