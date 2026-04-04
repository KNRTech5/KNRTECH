"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ContentPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [messageContent, setMessageContent] = useState({
    email: "techknr5@gmail.com",
    phone: "+91 98765 43210",
    location: "Global Remote Studio",
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          section: "contact",
          content: messageContent,
        }),
      });

      if (res.ok) {
        alert("Contact information updated successfully!");
      } else {
        alert("Failed to save changes");
      }
    } catch (error) {
      console.error("Error saving:", error);
      alert("Error saving changes");
    } finally {
      setSaving(false);
    }
  };

  if (status === "loading") {
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
          <h1 className="text-4xl font-black mb-2">Edit Content</h1>
          <p className="text-white/60">Update your website contact information</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 max-w-2xl"
        >
          <div className="space-y-8">
            {/* Email */}
            <div>
              <label className="block text-sm text-primary/70 font-semibold uppercase mb-3">
                Email Address
              </label>
              <input
                type="email"
                value={messageContent.email}
                onChange={(e) =>
                  setMessageContent({
                    ...messageContent,
                    email: e.target.value,
                  })
                }
                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-primary focus:outline-none transition"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm text-primary/70 font-semibold uppercase mb-3">
                WhatsApp / Phone
              </label>
              <input
                type="tel"
                value={messageContent.phone}
                onChange={(e) =>
                  setMessageContent({
                    ...messageContent,
                    phone: e.target.value,
                  })
                }
                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-primary focus:outline-none transition"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm text-primary/70 font-semibold uppercase mb-3">
                Location
              </label>
              <input
                type="text"
                value={messageContent.location}
                onChange={(e) =>
                  setMessageContent({
                    ...messageContent,
                    location: e.target.value,
                  })
                }
                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-primary focus:outline-none transition"
              />
            </div>

            {/* Save Button */}
            <motion.button
              onClick={handleSave}
              disabled={saving}
              whileHover={{ scale: saving ? 1 : 1.05 }}
              whileTap={{ scale: saving ? 1 : 0.95 }}
              className="w-full py-4 bg-primary text-black rounded-full font-bold shadow-[0_0_40px_rgba(0,255,148,0.6)] hover:shadow-[0_0_60px_rgba(0,255,148,0.8)] transition disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </motion.button>

            <p className="text-white/50 text-sm text-center">
              These changes will be reflected on your website immediately
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
