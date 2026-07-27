"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Lock, ArrowRight, AlertTriangle, Shield } from "lucide-react";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      const isAdmin = (session?.user as any)?.isAdmin;
      router.push(isAdmin ? "/admin" : "/");
    }
  }, [status, session, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        redirect: false,
        username,
        password,
      });

      if (result?.error) {
        setError("Invalid username or password.");
      } else {
        router.push("/");
        router.refresh();
      }
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #08141F 0%, #0E2436 50%, #132634 100%)" }}>
      {/* ECG background line */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 animate-ecg opacity-10" />
      </div>

      {/* Glow effects */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-ems-teal/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-ems-red/5 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-ems-red to-rose-600 flex items-center justify-center shadow-lg shadow-ems-red/20 mb-4"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="SAMS Logo" className="w-14 h-14 object-contain" />
          </motion.div>
          <h1 className="text-2xl font-bold text-white tracking-tight">SAMS Portal</h1>
          <p className="text-sm text-gray-400 mt-1">San Andreas Medical Services</p>
          <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Public portal — no login required for standard access
          </div>
        </div>

        {/* Login Card */}
        <div className="glass-card rounded-2xl p-8">
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold text-white">Admin Sign-In</h2>
            <p className="text-sm text-gray-400 mt-1">
              Department administrators only. The portal is publicly accessible to all personnel.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs text-gray-400 mb-1.5 block">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-navy border border-navy-border/50 text-white text-sm outline-none focus:ring-2 focus:ring-ems-red/30 placeholder:text-gray-500"
                placeholder="Enter username"
                required
                autoFocus
              />
            </div>

            <div>
              <label className="text-xs text-gray-400 mb-1.5 block">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-navy border border-navy-border/50 text-white text-sm outline-none focus:ring-2 focus:ring-ems-red/30 placeholder:text-gray-500"
                placeholder="Enter password"
                required
              />
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400"
              >
                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                {error}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={loading || !username.trim() || !password.trim()}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-ems-red hover:bg-ems-red-dark text-white font-medium text-sm transition-all duration-200 hover:shadow-lg hover:shadow-ems-red/25 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  Sign In
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Info */}
          <div className="mt-6 p-4 rounded-xl bg-navy/50 border border-navy-border/50">
            <div className="flex items-start gap-3">
              <Shield className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
              <div className="text-xs text-gray-400 leading-relaxed">
                <p className="font-medium text-gray-300 mb-1">Who Can Sign In?</p>
                <p>Only authorized department administrators may sign in. Regular portal access does not require authentication — navigate freely using the sidebar.</p>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <a href="/" className="text-xs text-gray-500 hover:text-ems-teal transition-colors">
              ← Back to Portal Home
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
