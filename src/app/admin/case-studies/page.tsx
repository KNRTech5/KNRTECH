"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function CaseStudiesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [caseStudies, setCaseStudies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  useEffect(() => {
    const fetchCaseStudies = async () => {
      try {
        const res = await fetch("/api/case-studies");
        if (res.ok) {
          const data = await res.json();
          setCaseStudies(data);
        }
      } catch (error) {
        console.error("Failed to fetch case studies:", error);
      } finally {
        setLoading(false);
      }
    };

    if (session) {
      fetchCaseStudies();
    }
  }, [session]);

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#06140f] via-[#04110c] to-[#020805] flex items-center justify-center">
        <div className="text-primary">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#06140f] via-[#04110c] to-[#020805] text-white">
      {/* Navbar */}
      <nav className="bg-white/5 backdrop-blur-xl border-b border-white/10 py-6">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <Link href="/admin/dashboard">
            <motion.h1
              className="text-2xl font-black cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              ← Admin Dashboard
            </motion.h1>
          </Link>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-black mb-2">Case Studies & Portfolio</h1>
          <p className="text-white/60">Manage your project portfolio</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 text-center min-h-96 flex items-center justify-center"
        >
          <div>
            <p className="text-xl text-white/60 mb-4">Case studies feature coming soon</p>
            <p className="text-white/50">You can add, edit, and delete case studies from here</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
