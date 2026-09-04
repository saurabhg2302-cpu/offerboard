"use client";

import { useId, useRef, useState } from "react";
import { uid } from "@/lib/crypto";
import type { Application, DriveType, Stage } from "@/lib/types";
import { STAGES } from "@/lib/types";

const empty: Omit<Application, "id" | "createdAt"> = {
  company: "",
  role: "",
  type: "on-campus",
  location: "",
  ctc: "",
  stage: "wishlist",
  deadline: "",
  appliedAt: "",
  notes: "",
  jobUrl: "",
};

export function ApplicationForm({
  initial,
  onSave,
  onCancel,
}: {
  initial?: Application;
  onSave: (app: Application) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState({ ...empty, ...initial });

  function set<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  return (
    <form
      className="card grid gap-3 p-4"
      onSubmit={(e) => {
        e.preventDefault();
        if (!form.company.trim() || !form.role.trim()) return;
        onSave({
          ...form,
          id: initial?.id ?? uid(),
          createdAt: initial?.createdAt ?? new Date().toISOString(),
          deadline: form.deadline || undefined,
          appliedAt: form.appliedAt || undefined,
          jobUrl: form.jobUrl || undefined,
        });
      }}
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Company">
          <input
            required
            value={form.company}
            onChange={(e) => set("company", e.target.value)}
            className="field"
            placeholder="Amazon"
          />
        </Field>
        <Field label="Role">
          <input
            required
            value={form.role}
            onChange={(e) => set("role", e.target.value)}
            className="field"
            placeholder="SDE Intern"
          />
        </Field>
        <Field label="Type">
          <select
            value={form.type}
            onChange={(e) => set("type", e.target.value as DriveType)}
            className="field"
          >
            <option value="on-campus">On-campus</option>
            <option value="off-campus">Off-campus</option>
            <option value="internship">Internship</option>
          </select>
        </Field>
        <Field label="Stage">
          <select
            value={form.stage}
            onChange={(e) => set("stage", e.target.value as Stage)}
            className="field"
          >
            {STAGES.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Location">
          <input
            value={form.location}
            onChange={(e) => set("location", e.target.value)}
            className="field"
            placeholder="Bengaluru"
          />
        </Field>
        <Field label="CTC / stipend">
          <input
            value={form.ctc}
            onChange={(e) => set("ctc", e.target.value)}
            className="field"
            placeholder="12 LPA"
          />
        </Field>
        <DateField
          label="Deadline"
          value={form.deadline ?? ""}
          onChange={(value) => set("deadline", value)}
        />
        <DateField
          label="Applied on"
          value={form.appliedAt ?? ""}
          onChange={(value) => set("appliedAt", value)}
        />
      </div>
      <Field label="Job URL">
        <input
          value={form.jobUrl ?? ""}
          onChange={(e) => set("jobUrl", e.target.value)}
          className="field"
          placeholder="https://"
        />
      </Field>
      <Field label="Notes">
        <textarea
          value={form.notes}
          onChange={(e) => set("notes", e.target.value)}
          className="field min-h-24"
          placeholder="OA topics, interviewers, follow-ups..."
        />
      </Field>
      <div className="flex justify-end gap-2">
        <button type="button" onClick={onCancel} className="btn-ghost">
          Cancel
        </button>
        <button type="submit" className="btn-accent">
          Save application
        </button>
      </div>
    </form>
  );
}

function DateField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const id = useId();
  const ref = useRef<HTMLInputElement>(null);

  return (
    <div className="grid gap-1 text-sm text-[#eef2f6]">
      <label htmlFor={id}>{label}</label>
      <div className="date-row">
        <input
          id={id}
          ref={ref}
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="field date-field"
        />
        <button
          type="button"
          className="btn-ghost date-pick"
          onClick={() => {
            const el = ref.current;
            if (!el) return;
            if (typeof el.showPicker === "function") el.showPicker();
            else el.focus();
          }}
        >
          Pick
        </button>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="grid gap-1 text-sm text-[#eef2f6]">
      {label}
      {children}
    </label>
  );
}
