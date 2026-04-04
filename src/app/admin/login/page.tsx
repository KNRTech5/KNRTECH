"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        callbackUrl: "/admin/dashboard",
        redirect: true,
      });

      if (result?.error) {
        setError(result.error);
        setLoading(false);
        return;
      }
    } catch (err) {
      setError("Login failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#06140f] via-[#04110c] to-[#020805] flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-[800px] h-[800px] bg-primary opacity-10 blur-[300px] rounded-full -top-40 -left-40" />
        <div className="absolute w-[600px] h-[600px] bg-primary opacity-5 blur-[250px] rounded-full -bottom-40 -right-40" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        {/* Logo/Title */}
        <div className="text-center mb-12">
          <Link href="/" className="inline-block mb-8">
            <motion.h1
              className="text-4xl font-black text-white mb-2"
              whileHover={{ scale: 1.05 }}
            >
              Admin Panel
            </motion.h1>
          </Link>
          <p className="text-primary text-sm">KNR Tech Management System</p>
        </div>

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-[0_40px_120px_rgba(0,0,0,0.6)]"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/20 border border-red-500/50 rounded-xl p-4 text-red-400 text-sm"
              >
                {error}
              </motion.div>
            )}

            {/* Email Field */}
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-white/40 focus:border-primary focus:outline-none transition"
              />
              <label className="text-xs text-primary/70 font-semibold uppercase mt-2 block">
                Email
              </label>
            </div>

            {/* Password Field */}
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-white/40 focus:border-primary focus:outline-none transition"
              />
              <label className="text-xs text-primary/70 font-semibold uppercase mt-2 block">
                Password
              </label>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              className="w-full py-4 bg-primary text-black rounded-full font-bold text-lg shadow-[0_0_40px_rgba(0,255,148,0.6)] hover:shadow-[0_0_60px_rgba(0,255,148,0.8)] transition disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Access Admin Panel"}
            </motion.button>

            {/* Info Text */}
            <p className="text-center text-white/50 text-sm">
              First login? Use your email and a strong password to create your admin account.
            </p>
          </form>
        </motion.div>

        {/* Back to Home */}
        <div className="text-center mt-8">
          <Link
            href="/"
            className="text-primary/60 hover:text-primary text-sm transition"
          >
            ← Back to Website
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
