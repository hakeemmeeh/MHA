"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Lock } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const from = params.get("from") || "/admin";

  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: password.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Login failed.");
        setLoading(false);
        return;
      }
      router.replace(from);
    } catch {
      setError("Something went wrong. Try again.");
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-navy-dark px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-xl">
        <div className="mb-6 flex justify-center">
          <Image
            src="/images/mha-logo.png"
            alt="MHA"
            width={535}
            height={378}
            quality={85}
            sizes="120px"
            className="h-14 w-auto"
          />
        </div>
        <h1 className="text-center font-playfair text-2xl font-bold text-navy">
          Admin Access
        </h1>
        <p className="mt-1 text-center font-inter text-sm text-text-muted">
          Enter the dashboard password to continue.
        </p>

        <div className="mt-6 space-y-4">
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSubmit();
              }}
              placeholder="Password"
              autoFocus
              className="w-full rounded-lg border border-border bg-cream/40 py-2.5 pl-9 pr-3 font-inter text-sm text-text-dark outline-none focus:border-navy focus:ring-1 focus:ring-navy"
            />
          </div>

          {error && (
            <p className="rounded-lg bg-red-50 px-3 py-2 font-inter text-sm text-red-600">
              {error}
            </p>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading || !password}
            className="w-full rounded-lg bg-navy py-2.5 font-inter text-sm font-semibold text-white transition hover:bg-navy-dark disabled:opacity-50"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-navy-dark" />}>
      <LoginForm />
    </Suspense>
  );
}
