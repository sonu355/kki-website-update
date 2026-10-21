"use client";
import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Lock, User, ArrowRight, AlertCircle } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!data.success) {
        setError(data.message || "Invalid username or password.");
        setLoading(false);
        return;
      }
      const next = searchParams.get("next") || "/admin";
      router.push(next);
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen navy-surface steel-texture flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl shadow-black/30 p-8">
        <div className="flex flex-col items-center mb-7">
          <Image src="/logo.PNG" alt="Kitchen King Industries" width={64} height={64}
            className="h-16 w-16 object-contain bg-white rounded-lg ring-1 ring-[var(--gold-500)]/40 mb-3 p-0.5" />
          <h1 className="font-display font-bold text-lg text-[var(--ink)]">Admin Login</h1>
          <p className="text-xs text-[var(--steel-500)] mt-1">Kitchen King Industries</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[var(--steel-500)] uppercase tracking-wide mb-1.5">Username</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--steel-300)]" />
              <input required autoFocus value={username} onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-[var(--steel-200)] bg-[var(--steel-100)] text-sm text-[var(--ink)] focus:outline-none focus:border-[#c8912f]/60"
                placeholder="admin" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-[var(--steel-500)] uppercase tracking-wide mb-1.5">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--steel-300)]" />
              <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-[var(--steel-200)] bg-[var(--steel-100)] text-sm text-[var(--ink)] focus:outline-none focus:border-[#c8912f]/60"
                placeholder="••••••••" />
            </div>
          </div>

          {error && (
            <p className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              <AlertCircle size={15} className="flex-shrink-0" /> {error}
            </p>
          )}

          <button type="submit" disabled={loading}
            className="w-full gold-gradient text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 disabled:opacity-60 mt-2">
            {loading ? "Signing In..." : "Sign In"} <ArrowRight size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
