"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { ScreenSpace } from "@react-three/drei";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
  });
  const [error, setError] = useState("");

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Validation
      if (!formData.name.trim() || !formData.email.trim() || !message.trim()) {
        setError("Please fill in all fields");
        setLoading(false);
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setError("Please enter a valid email");
        setLoading(false);
        return;
      }

      // Send to API
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          message: message,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setLoading(false);
      setSubmitted(true);
      setFormData({ name: "", email: "", company: "" });
      setMessage("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setLoading(false);
    }
  };

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const glowX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const glowY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  return (
    <div
      className="relative text-white overflow-visible"
      onMouseMove={(e) => {
        mouseX.set(e.clientX - window.innerWidth / 2);
        mouseY.set(e.clientY - window.innerHeight / 2);
      }}
    >

       {/* ================= HERO ================= */}
      
            <section className="relative min-h-screen flex items-center justify-center text-center px-6">
      
        <div className="absolute inset-0 -z-10 overflow-hidden">
      
          <div className="blob blob1"></div>
          <div className="blob blob2"></div>
          <div className="blob blob3"></div>
      
        </div>
      
              <Image
                src="/contact/contact-hero.png"
                alt="Agency"
                fill
                className="object-cover opacity-100"
              />
      
              <div className="absolute inset-0 bg-black/70" />
      
              <motion.div
                initial={{ opacity: 0, y: 80 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="relative z-10 max-w-4xl"
              >
                <h1 className="text-6xl md:text-8xl font-light mb-8">
                Let’s Build<br />
                <span className="bg-gradient-to-r from-primary via-white to-primary bg-clip-text text-transparent animate-pulse">.....Digital Excellence...</span>
              </h1>
      
                <p className="text-lightgray max-w-3xl text-xl">
               Start your transformation today.
              </p>
              </motion.div>
      
            </section>


      {/* ================= BACKGROUND ================= */}

      <div className="fixed inset-0 -z-50 bg-gradient-to-b from-[#06140f] via-[#04110c] to-[#020805]" />

      {/* Moving Glow */}
      <motion.div
        style={{ x: glowX, y: glowY }}
        className="fixed w-[600px] h-[600px] bg-primary opacity-10 blur-[200px] rounded-full -z-40"
      />

      {/* AI Grid */}
      <motion.div
        className="fixed inset-0 -z-30 pointer-events-none"
        animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,255,148,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,148,0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* ================= FORM ================= */}

      <section className="px-6 pb-20 pt-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-24">

          {/* LEFT FORM */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-12 shadow-[0_40px_120px_rgba(0,0,0,0.6)]"
          >
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-8">
                {error && (
                  <div className="bg-red-500/20 border border-red-500 rounded-xl p-4 text-red-400">
                    {error}
                  </div>
                )}

                <FloatingInput
                  label="Full Name"
                  value={formData.name}
                  onChange={(value) => handleInputChange("name", value)}
                  required
                />
                <FloatingInput
                  label="Email Address"
                  type="email"
                  value={formData.email}
                  onChange={(value) => handleInputChange("email", value)}
                  required
                />
                <FloatingInput
                  label="Company Name"
                  value={formData.company}
                  onChange={(value) => handleInputChange("company", value)}
                />

                {/* MESSAGE WITH COUNTER */}
                <div className="relative">
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    maxLength={300}
                    placeholder="Tell us about your project..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-5 h-40 resize-none focus:border-primary outline-none transition"
                    required
                  />
                  <span className="absolute bottom-3 right-4 text-xs text-lightgray">
                    {message.length}/300
                  </span>
                </div>

                {/* SUBMIT BUTTON */}
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: loading ? 1 : 1.05 }}
                  whileTap={{ scale: loading ? 1 : 0.95 }}
                  className="w-full py-5 bg-primary text-white rounded-full font-semibold shadow-[0_0_40px_rgba(0,255,148,0.8)] relative overflow-hidden disabled:opacity-50"
                >
                  {loading ? "Sending..." : "Send Message"}
                </motion.button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-20"
              >
                <h3 className="text-4xl text-primary mb-6">
                  Message Sent ⚡
                </h3>
                <p className="text-lightgray">
                  We’ll contact you shortly.
                </p>
              </motion.div>
            )}
          </motion.div>

          {/* RIGHT INFO */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="space-y-8"
          >
            <InfoCard title="Email" value="techknr5@gmail.com" />
            <InfoCard title="WhatsApp" value="+91 00000 00000" />
            <InfoCard title="Location" value="Global Remote Studio" />
          </motion.div>

        </div>
      </section>
    </div>
  );
}

/* ================= FLOATING INPUT ================= */

interface FloatingInputProps {
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

function FloatingInput({
  label,
  type = "text",
  value,
  onChange,
  required = false,
}: FloatingInputProps) {
  const [focus, setFocus] = useState(false);

  return (
    <div className="relative group">
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocus(true)}
        onBlur={(e) => setFocus(e.target.value !== "")}
        required={required}
        className="w-full bg-white/5 border border-white/10 rounded-xl p-5 pt-7 focus:border-primary outline-none transition"
      />
      <label
        className={`absolute left-5 transition-all duration-300 ${
          focus ? "top-2 text-xs text-primary" : "top-5 text-lightgray"
        }`}
      >
        {label}
      </label>

      {/* Magnetic Glow Line */}
      <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-primary group-focus-within:w-full transition-all duration-500" />
    </div>
  );
}

/* ================= INFO CARD ================= */

interface InfoCardProps {
  title: string;
  value: string;
}

function InfoCard({ title, value }: InfoCardProps) {
  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-primary transition hover:shadow-[0_0_40px_rgba(0,255,148,0.6)]">
      <p className="text-lightgray text-sm mb-2">{title}</p>
      <p className="text-xl text-primary">{value}</p>
    </div>
  );
}
