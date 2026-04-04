"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function SuccessPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <main className="relative min-h-screen flex items-center justify-center text-white overflow-hidden px-6">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#06140f] via-[#04110c] to-[#020805]" />

      {/* Glow effect */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute w-[600px] h-[600px] bg-primary opacity-10 blur-[200px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      </div>

      {/* Grid */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-2xl relative z-10"
      >
        {/* Success icon */}
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-24 h-24 mx-auto mb-8 flex items-center justify-center"
        >
          <div className="relative w-20 h-20 bg-primary/20 border-2 border-primary rounded-full flex items-center justify-center">
            <motion.div
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-4xl text-primary"
            >
              ✓
            </motion.div>
          </div>
        </motion.div>

        <h1 className="text-5xl md:text-6xl font-light mb-6">
          Payment <span className="text-primary">Successful!</span>
        </h1>

        <p className="text-xl text-lightgray mb-8 leading-relaxed">
          Thank you for your purchase. We're thrilled to have you on board! Your payment has been processed securely and you'll receive a confirmation email shortly.
        </p>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-12 text-left">
          <h3 className="text-lg font-semibold text-primary mb-4">What's next?</h3>
          <ul className="space-y-3 text-lightgray">
            <li className="flex items-start gap-3">
              <span className="text-primary mt-1">✓</span>
              <span>Check your email for order confirmation and details</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary mt-1">✓</span>
              <span>Our team will contact you within 24 hours to get started</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary mt-1">✓</span>
              <span>Access your dashboard to track project progress</span>
            </li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="px-8 py-4 bg-primary text-white rounded-full font-semibold hover:shadow-[0_0_40px_rgba(0,255,148,0.8)] transition hover:scale-105"
          >
            Back to Home
          </Link>
          <Link
            href="/contact"
            className="px-8 py-4 border border-primary text-primary rounded-full font-semibold hover:bg-primary/20 transition hover:scale-105"
          >
            Contact Support
          </Link>
        </div>

        <p className="text-lightgray text-sm mt-12">
          Order #: {isClient ? new Date().getTime().toString().slice(-8) : ""}
        </p>
      </motion.div>
    </main>
  );
}
