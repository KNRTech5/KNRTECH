"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import KNRLogo from "./KNRLogo";

export default function Footer() {
  return (
    <footer className="relative mt-40 text-white overflow-hidden">

      {/* Top Glow Line */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-primary shadow-[0_0_25px_rgba(0,255,148,0.8)]" />

      {/* Background Blur Glow */}
      <div className="absolute w-[800px] h-[800px] bg-primary opacity-10 blur-[250px] rounded-full -z-10 top-[-400px] left-[-200px]" />

      <div className="relative bg-white/5 backdrop-blur-2xl border-t border-white/10">

        <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-4 gap-16">

          {/* ================= BRAND ================= */}
          <div>
            <KNRLogo />
            <p className="text-lightgray leading-relaxed mt-6">
              Premium digital engineering studio building scalable
              high-performance systems for global brands.
            </p>
          </div>

          {/* ================= QUICK LINKS ================= */}
          <div>
            <h4 className="text-lg text-primary mb-6">Quick Links</h4>
            <ul className="space-y-4 text-lightgray">
              {[
                { name: "Home", href: "/" },
                { name: "Services", href: "/services" },
                { name: "Portfolio", href: "/portfolio" },
                { name: "About", href: "/about" },
                { name: "Contact", href: "/contact" },
              ].map((link, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 6 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <Link href={link.href} className="hover:text-primary transition">
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* ================= SERVICES ================= */}
          <div>
            <h4 className="text-lg text-primary mb-6">Services</h4>
            <ul className="space-y-4 text-lightgray">
              {[
                "Web Development",
                "UI / UX Design",
                "E-Commerce Solutions",
                "SEO Optimization",
                "AI Automation",
              ].map((service, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 6 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="hover:text-primary transition"
                >
                  {service}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* ================= CONTACT ================= */}
          <div>
            <h4 className="text-lg text-primary mb-6">Contact</h4>

            <div className="space-y-4 text-lightgray">
              <p>📍 India</p>
              <p>📧 techknr5@gmail.com</p>
              <p>📞 +91 98765 43210</p>
            </div>

            {/* Social Icons */}
            <div className="flex gap-4 mt-8">
              {["Instagram", "LinkedIn", "Twitter"].map((social, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.1 }}
                  className="w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center cursor-pointer hover:border-primary hover:text-white hover:bg-primary/20 hover:shadow-[0_0_30px_rgba(0,255,148,0.5)] transition"
                >
                  {social[0]}
                </motion.div>
              ))}
            </div>
          </div>

        </div>

        {/* ================= BOTTOM ================= */}
        <div className="border-t border-white/10 py-6 text-center text-lightgray text-sm">
          © {new Date().getFullYear()} Sevenpixles. All rights reserved.
        </div>

      </div>
    </footer>
  );
}