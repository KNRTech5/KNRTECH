"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";

interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  company: string;
  message: string;
  status: "new" | "replied" | "archived";
  isRead: boolean;
  createdAt: string;
}

export default function MessagesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(
    null
  );

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch("/api/messages");
        if (res.ok) {
          const data = await res.json();
          setMessages(data);
        }
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      } finally {
        setLoading(false);
      }
    };

    if (session) {
      fetchMessages();
    }
  }, [session]);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this message?")) {
      try {
        const res = await fetch(`/api/messages?id=${id}`, {
          method: "DELETE",
        });
        if (res.ok) {
          setMessages(messages.filter((m) => m._id !== id));
          setSelectedMessage(null);
        }
      } catch (error) {
        console.error("Failed to delete message:", error);
      }
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#06140f] via-[#04110c] to-[#020805] flex items-center justify-center">
        <div className="text-primary">Loading messages...</div>
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
          <h1 className="text-4xl font-black mb-2">Contact Messages 📧</h1>
          <p className="text-white/60">
            Total: {messages.length} messages
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Messages List */}
          <div className="md:col-span-1 space-y-4 max-h-[600px] overflow-y-auto">
            {messages.map((msg, i) => (
              <motion.div
                key={msg._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setSelectedMessage(msg)}
                className={`p-4 rounded-xl border cursor-pointer transition ${
                  selectedMessage?._id === msg._id
                    ? "bg-primary/20 border-primary"
                    : "bg-white/5 border-white/10 hover:border-primary/50"
                }`}
              >
                <p className="font-semibold text-sm">{msg.name}</p>
                <p className="text-white/60 text-xs mt-1">{msg.email}</p>
                <p className="text-white/50 text-xs mt-2 line-clamp-2">
                  {msg.message}
                </p>
                <div className="flex gap-2 mt-3">
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      msg.status === "new"
                        ? "bg-blue-500/30 text-blue-400"
                        : msg.status === "replied"
                        ? "bg-green-500/30 text-green-400"
                        : "bg-gray-500/30 text-gray-400"
                    }`}
                  >
                    {msg.status}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Message Details */}
          <div className="md:col-span-2">
            {selectedMessage ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8"
              >
                <div className="space-y-6">
                  <div>
                    <p className="text-white/60 text-sm mb-1">Name</p>
                    <p className="text-2xl font-bold">{selectedMessage.name}</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-white/60 text-sm mb-1">Email</p>
                      <p className="text-white">{selectedMessage.email}</p>
                    </div>
                    <div>
                      <p className="text-white/60 text-sm mb-1">Company</p>
                      <p className="text-white">
                        {selectedMessage.company || "N/A"}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-white/60 text-sm mb-1">Date</p>
                    <p className="text-white">
                      {new Date(selectedMessage.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <div>
                    <p className="text-white/60 text-sm mb-3">Message</p>
                    <div className="bg-white/5 border border-white/10 rounded-xl p-6 min-h-40">
                      <p className="text-white text-lg leading-relaxed">
                        {selectedMessage.message}
                      </p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() =>
                        handleDelete(selectedMessage._id)
                      }
                      className="px-6 py-3 bg-red-500/20 border border-red-500 text-red-400 rounded-full font-bold hover:bg-red-500/30 transition"
                    >
                      Delete
                    </motion.button>
                    <motion.a
                      href={`mailto:${selectedMessage.email}`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-3 bg-primary text-black rounded-full font-bold text-center hover:shadow-[0_0_40px_rgba(0,255,148,0.6)] transition"
                    >
                      Reply
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-12 flex items-center justify-center min-h-96">
                <p className="text-white/60">Select a message to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
