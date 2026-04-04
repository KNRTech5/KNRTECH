"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

/* ================= PROJECT DATA ================= */

const projects = [
  {
    title: "Modern SaaS Platform",
    category: "SaaS Product Development",
    slug: "modern-saas",
    image: "/portfolio/portfolio-1.png",
  },
  {
    title: "AI Automation Dashboard",
    category: "AI Automation Systems",
    slug: "ai-dashboard",
    image: "/portfolio/portfolio-2.png",
  },
  {
    title: "Luxury Brand Website",
    category: "Web Development",
    slug: "luxury-web",
    image: "/portfolio/portfolio-3.png",
  },
  {
    title: "E-Commerce Experience",
    category: "E-Commerce Solutions",
    slug: "ecommerce-store",
    image: "/portfolio/portfolio-4.png",
  },
  {
    title: "Startup Brand Identity",
    category: "Brand Identity",
    slug: "brand-identity",
    image: "/portfolio/portfolio-5.png",
  },
  {
    title: "Mobile App UI System",
    category: "App Development",
    slug: "mobile-app",
    image: "/portfolio/portfolio-6.png",
  },
];

/* ================= COMPONENT ================= */

export default function PortfolioGrid() {
  const [filter, setFilter] = useState("All");
  const [activeProject, setActiveProject] = useState<typeof projects[0] | null>(null);

  const categories = [
    "All",
    ...new Set(projects.map((p) => p.category)),
  ];

  const filtered =
    filter === "All"
      ? projects
      : projects.filter((p) => p.category === filter);

  return (
    <>
      {/* ================= FILTER BAR ================= */}
      <div className="relative mb-20 overflow-x-auto no-scrollbar">
        <div className="flex gap-4 w-max mx-auto px-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full whitespace-nowrap text-sm transition-all duration-300 border ${
                filter === cat
                  ? "bg-black/60 border border-primary text-white backdrop-blur-md shadow-[0_0_20px_rgba(0,255,148,0.3)] hover:bg-primary/20 hover:shadow-[0_0_40px_rgba(0,255,148,0.7)] font-semibold shadow-[0_0_20px_rgba(0,255,148,0.8)] border-primary"
                  : "border-white/20 text-white/70 hover:border-primary hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ================= GRID ================= */}
      <motion.div
        layout
        className="grid md:grid-cols-3 gap-12"
      >
        <AnimatePresence>
          {filtered.map((project) => (
            <motion.div
              key={project.slug}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4 }}
              className="relative group cursor-pointer"
              onClick={() => setActiveProject(project)}
            >
              {/* CARD */}
              <div className="relative rounded-3xl overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.6)]">

                {/* IMAGE */}
                <div className="relative h-[350px] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-110"
                  />
                </div>

                {/* CONTENT */}
                <div className="p-6">
                  <span className="inline-block mb-3 px-3 py-1 text-xs rounded-full bg-primary/20 text-primary">
                    {project.category}
                  </span>

                  <h3 className="text-xl font-semibold text-white group-hover:text-primary transition">
                    {project.title}
                  </h3>
                </div>

                {/* HOVER GLOW */}
                <div className="absolute inset-0 border border-primary/20 rounded-3xl opacity-0 group-hover:opacity-100 transition duration-500 shadow-[0_0_50px_rgba(0,255,148,0.6)]" />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* ================= MODAL ================= */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            className="fixed inset-0 bg-black/90 backdrop-blur-2xl z-50 flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white/5 border border-white/10 rounded-3xl max-w-5xl w-full p-10 relative"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              {/* CLOSE */}
              <button
                onClick={() => setActiveProject(null)}
                className="absolute top-6 right-6 text-white/50 hover:text-white"
              >
                ✕
              </button>

              {/* IMAGE */}
              <div className="relative h-[400px] rounded-2xl overflow-hidden mb-8">
                <Image
                  src={activeProject.image}
                  alt={activeProject.title}
                  fill
                  className="object-cover"
                />
              </div>

              <h2 className="text-4xl text-primary mb-4">
                {activeProject.title}
              </h2>

              <p className="text-lightgray mb-8">
                Detailed case study showcasing performance metrics,
                design process, and development strategy.
              </p>

              <Link
                href={`/portfolio/${activeProject.slug}`}
                className="inline-block px-8 py-3 bg-primary text-white rounded-full shadow-[0_0_30px_rgba(0,255,148,0.8)]"
              >
                View Full Case Study →
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
