"use client";

import { motion } from "framer-motion";
import PortfolioGrid from "@/components/PortfolioGrid";
import Image from "next/image";


export default function PortfolioPage() {
  return (
    <main className="relative text-white overflow-hidden">


  {/* ================= HERO ================= */}

      <section className="relative min-h-screen flex items-center justify-center text-center px-6 overflow-hidden">

  <div className="absolute inset-0 -z-10 overflow-hidden">

    <div className="blob blob1"></div>
    <div className="blob blob2"></div>
    <div className="blob blob3"></div>

  </div>

        <Image
          src="/portfolio/portfolio-hero.png"
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
          Selected <br />
          <span className="bg-gradient-to-r from-primary via-white to-primary bg-clip-text text-transparent animate-pulse">Work</span>
        </h1>

          <p className="text-lightgray max-w-3xl text-xl">
         High-performance digital experiences engineered for global brands and modern startups.
        </p>

 {/* Hero Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.6 }}
            className="flex justify-center gap-6 mt-12"
          >
            <button
              onClick={() => {
                const gridSection = document.getElementById('portfolio-grid');
                gridSection?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-10 py-4 bg-black/60 border border-primary text-white backdrop-blur-md shadow-[0_0_20px_rgba(0,255,148,0.3)] hover:bg-primary/20 hover:shadow-[0_0_40px_rgba(0,255,148,0.7)] rounded-full font-semibold shadow-[0_0_30px_rgba(0,255,148,0.8)] hover:scale-105 transition cursor-pointer"
            >
              View Case Studies
            </button>

            <a href="/contact" className="px-10 py-4 border border-primary text-primary
             rounded-full font-semibold hover:border-primary hover:text-white hover:bg-primary/20 hover:shadow-[0_0_30px_rgba(0,255,148,0.5)] transition duration-300 cursor-pointer">
              Start a Project
            </a>
          </motion.div>

        </motion.div>

      </section>

      

      {/* ================= INTERACTIVE GRID ================= */}
      <section className="relative py-40 px-6" id="portfolio-grid">
        <PortfolioGrid />
      </section>

    </main>
  );
}


