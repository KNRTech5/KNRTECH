"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const projects = [
  {
    title: "Modern SaaS Platform",
    category: "Web Development",
    image: "/portfolio/portfolio-1.png",
  },
  {
    title: "AI Automation Dashboard",
    category: "AI Systems",
    image: "/portfolio/portfolio-2.png",
  },
  {
    title: "Luxury Brand Identity",
    category: "Brand Design",
    image: "/portfolio/portfolio-3.png",
  },
  {
    title: "E-Commerce Experience",
    category: "E-Commerce",
    image: "/portfolio/portfolio-4.png",
  },
  {
    title: "Mobile App UI",
    category: "App Development",
    image: "/portfolio/portfolio-6.png",
  },
  {
    title: "Performance Optimization",
    category: "Optimization",
    image: "/portfolio/portfolio-5.png",
  },
];

export default function HomePortfolioSection() {
  return (
    <section className="py-10 px-6 relative text-white">

          <div className="absolute inset-0 -z-10 overflow-hidden">

    <div className="blob blob1"></div>
    <div className="blob blob2"></div>
    <div className="blob blob3"></div>

  </div>

      <div className="max-w-7xl mx-auto">

        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <h2 className="text-5xl font-light mb-6">
            Featured <span className="text-primary">Work</span>
          </h2>
          <p className="text-lightgray max-w-2xl mx-auto">
            A glimpse of high-performance digital systems we've built.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-3 gap-16">

          {projects.map((project, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.04 }}
              className="relative group rounded-3xl overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_40px_120px_rgba(0,0,0,0.6)]"
            >

              {/* Image */}
              <div className="relative h-[450px] overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-8">
                <span className="inline-block mb-3 px-3 py-1 text-xs rounded-full bg-primary/20 text-primary">
                  {project.category}
                </span>

                <h3 className="text-xl font-semibold group-hover:text-primary transition">
                  {project.title}
                </h3>
              </div>

              {/* Hover Glow */}
              <div className="absolute inset-0 border border-primary/20 opacity-0 group-hover:opacity-100 transition duration-500 shadow-[0_0_60px_rgba(0,255,148,0.6)] rounded-3xl" />

            </motion.div>
          ))}

        </div>

        {/* View All Button */}
        <div className="text-center mt-20">
          <Link
            href="/portfolio"
            className="inline-block px-12 py-5 bg-primary text-white rounded-full font-semibold shadow-[0_0_40px_rgba(0,255,148,0.8)] hover:scale-105 transition"
          >
            View Full Portfolio →
          </Link>
        </div>

      </div>

    </section>
  );
}
