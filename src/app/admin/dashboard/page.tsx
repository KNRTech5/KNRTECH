"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState({
    totalMessages: 0,
    newMessages: 0,
    repliedMessages: 0,
    archivedMessages: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/messages/stats");
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      } finally {
        setLoading(false);
      }
    };

    if (session) {
      fetchStats();
    }
  }, [session]);

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#06140f] via-[#04110c] to-[#020805] flex items-center justify-center">
        <div className="text-primary text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#06140f] via-[#04110c] to-[#020805] text-white">
      {/* Navbar */}
      <nav className="bg-white/5 backdrop-blur-xl border-b border-white/10 py-6">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <Link href="/">
            <motion.h1
              className="text-3xl font-black text-white cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              Admin Panel
            </motion.h1>
          </Link>
          <div className="flex items-center gap-4">
            <span className="hidden md:block text-sm text-primary/70">
              {session?.user?.email}
            </span>
            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-5 py-2 bg-primary/20 border border-primary text-primary rounded-full text-sm font-semibold hover:bg-primary/30 transition shadow-[0_0_15px_rgba(0,255,148,0.2)]"
              >
                View Website
              </motion.button>
            </Link>
            <motion.button
              onClick={() => signOut({ callbackUrl: "/admin/login" })}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-2 bg-red-500/20 border border-red-500 text-red-400 rounded-full text-sm font-semibold hover:bg-red-500/30 transition"
            >
              Logout
            </motion.button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-5xl font-black mb-2">Welcome Back! 👋</h1>
          <p className="text-white/60">
            Manage your website content and customer messages all in one place
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {[
            { label: "Total Messages", value: stats.totalMessages, color: "primary" },
            { label: "New Messages", value: stats.newMessages, color: "blue" },
            { label: "Replied", value: stats.repliedMessages, color: "green" },
            { label: "Archived", value: stats.archivedMessages, color: "gray" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
            >
              <p className="text-white/60 text-sm mb-2">{stat.label}</p>
              <p className="text-4xl font-black text-primary">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8"
        >
          <h2 className="text-2xl font-black mb-6">Quick Actions</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "View Messages",
                subtitle: "Check all contact form submissions",
                href: "/admin/messages",
                icon: "📧",
              },
              {
                title: "Edit Content",
                subtitle: "Update website sections",
                href: "/admin/content",
                icon: "✏️",
              },
              {
                title: "Manage Portfolio",
                subtitle: "Add or edit case studies",
                href: "/admin/case-studies",
                icon: "🎨",
              },
            ].map((action, i) => (
              <Link key={i} href={action.href}>
                <motion.div
                  whileHover={{ scale: 1.05, borderColor: "rgba(0,255,148,1)" }}
                  className="bg-white/5 border border-white/10 rounded-2xl p-6 cursor-pointer transition"
                >
                  <div className="text-4xl mb-3">{action.icon}</div>
                  <h3 className="text-xl font-bold mb-1">{action.title}</h3>
                  <p className="text-white/60 text-sm">{action.subtitle}</p>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
