"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/lib/auth";

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    college: "",
    branch: "B.Tech CSE",
  });

  return (
    <main className="mx-auto grid min-h-screen max-w-md place-content-center px-4 py-8">
      <Link href="/" className="display mb-6 text-center text-3xl">
        OfferBoard
      </Link>
      <form
        className="card grid gap-3 p-6"
        onSubmit={async (e) => {
          e.preventDefault();
          setBusy(true);
          const err = await register(form);
          setBusy(false);
          if (err) setError(err);
          else router.push("/dashboard");
        }}
      >
        <h1 className="display text-3xl">Create account</h1>
        {(
          [
            ["name", "Full name"],
            ["email", "Email"],
            ["password", "Password"],
            ["college", "College"],
            ["branch", "Branch"],
          ] as const
        ).map(([key, placeholder]) => (
          <input
            key={key}
            className="field"
            type={key === "password" ? "password" : key === "email" ? "email" : "text"}
            placeholder={placeholder}
            value={form[key]}
            onChange={(e) => setForm({ ...form, [key]: e.target.value })}
            required
            minLength={key === "password" ? 4 : undefined}
          />
        ))}
        {error && <p className="text-sm text-[#ff8b82]">{error}</p>}
        <button className="btn-accent" disabled={busy}>
          {busy ? "Creating…" : "Start tracking"}
        </button>
        <p className="text-center text-sm text-[#eef2f6]">
          Already have an account?{" "}
          <Link href="/login" className="text-[#b8f07a]">
            Log in
          </Link>
        </p>
      </form>
    </main>
  );
}
