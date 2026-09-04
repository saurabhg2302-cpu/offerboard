"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/lib/auth";

const LINKS = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/board", label: "Board" },
  { href: "/companies", label: "Companies" },
  { href: "/deadlines", label: "Deadlines" },
  { href: "/notes", label: "Notes" },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const { ready, user, logout } = useAuth();
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    if (ready && !user) router.replace("/login");
  }, [ready, user, router]);

  if (!ready || !user) {
    return (
      <div className="grid min-h-screen place-items-center text-[#eef2f6]">
        Loading OfferBoard…
      </div>
    );
  }

  return (
    <div className="mx-auto min-h-screen max-w-6xl px-4 py-5">
      <header className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <Link href="/dashboard" className="display text-2xl tracking-tight">
          OfferBoard
        </Link>
        <nav className="flex flex-wrap gap-1 rounded-full border border-[#3a424c] bg-[#171b21] p-1">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`rounded-full px-3 py-1.5 text-sm ${
                path.replace(/\/$/, "") === l.href ? "nav-active" : "nav-idle"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3 text-sm text-[#e8eef2]">
          <span>
            {user.name} · {user.branch}
          </span>
          <button
            onClick={() => {
              logout();
              router.push("/");
            }}
            className="rounded-full border border-[#3a424c] px-3 py-1 text-[#f4f6f8]"
          >
            Log out
          </button>
        </div>
      </header>
      {children}
    </div>
  );
}
