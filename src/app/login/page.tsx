"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import { useAuth } from "@/lib/auth";

function LoginInner() {
  const { login, loginDemo, user } = useAuth();
  const router = useRouter();
  const params = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const demoStarted = useRef(false);

  useEffect(() => {
    if (user) router.replace("/dashboard");
  }, [user, router]);

  useEffect(() => {
    if (params.get("demo") !== "1" || demoStarted.current) return;
    demoStarted.current = true;
    setBusy(true);
    loginDemo().finally(() => {
      setBusy(false);
      router.push("/dashboard");
    });
  }, [params, loginDemo, router]);

  return (
    <main className="mx-auto grid min-h-screen max-w-md place-content-center px-4">
      <Link href="/" className="display mb-6 text-center text-3xl">
        OfferBoard
      </Link>
      <form
        className="card grid gap-3 p-6"
        onSubmit={async (e) => {
          e.preventDefault();
          setBusy(true);
          const err = await login(email, password);
          setBusy(false);
          if (err) setError(err);
          else router.push("/dashboard");
        }}
      >
        <h1 className="display text-3xl">Log in</h1>
        <input
          className="field"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="field"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="text-sm text-[#ff8b82]">{error}</p>}
        <button className="btn-accent" disabled={busy}>
          {busy ? "Please wait…" : "Continue"}
        </button>
        <button
          type="button"
          className="btn-ghost"
          disabled={busy}
          onClick={async () => {
            setBusy(true);
            await loginDemo();
            router.push("/dashboard");
          }}
        >
          Open demo account
        </button>
        <p className="text-center text-sm text-[#eef2f6]">
          New here?{" "}
          <Link href="/register" className="text-[#b8f07a]">
            Create an account
          </Link>
        </p>
      </form>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="grid min-h-screen place-items-center text-[#eef2f6]">
          Loading…
        </div>
      }
    >
      <LoginInner />
    </Suspense>
  );
}
