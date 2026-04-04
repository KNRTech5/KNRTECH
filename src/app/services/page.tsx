"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const services = [
  {
    title: "Web Development",
    desc: "High-performance, scalable web platforms engineered with modern frameworks like Next.js, React, and TypeScript for global brands.",
    image: "/scraped/tech-1.jpg",
    tags: ["Next.js", "React", "TypeScript", "Node.js"],
  },
  {
    title: "UI / UX Design",
    desc: "Conversion-focused digital experiences built with design psychology, motion design, and immersive interaction systems.",
    image: "/scraped/tech-2.jpg",
    tags: ["Figma", "Motion Design", "User Research", "Prototyping"],
  },
  {
    title: "E-Commerce Solutions",
    desc: "Scalable commerce systems designed for rapid online growth — from product to checkout and beyond.",
    image: "/scraped/tech-3.jpg",
    tags: ["Shopify", "WooCommerce", "Stripe", "Custom Build"],
  },
  {
    title: "Brand Identity",
    desc: "Premium brand systems that build trust, recognition, and long-term authority in competitive markets.",
    image: "/scraped/tech-4.jpg",
    tags: ["Logo Design", "Brand Strategy", "Style Guides", "Visual Identity"],
  },
  {
    title: "SEO Optimization",
    desc: "Data-driven strategies to increase organic visibility, domain authority, and sustainable growth.",
    image: "/scraped/tech-5.jpg",
    tags: ["Technical SEO", "Content Strategy", "Link Building", "Analytics"],
  },
  {
    title: "App Development",
    desc: "Cross-platform mobile applications built with performance, scale, and seamless user experiences.",
    image: "/scraped/tech-6.jpg",
    tags: ["React Native", "Flutter", "iOS", "Android"],
  },
  {
    title: "AI Automation",
    desc: "Intelligent automation systems to streamline business operations, reduce costs, and unlock growth.",
    image: "/scraped/tech-7.jpg",
    tags: ["OpenAI", "LangChain", "Python", "Workflow Automation"],
  },
  {
    title: "SaaS Product Development",
    desc: "Full-cycle SaaS architecture — from MVP to enterprise-scale cloud systems built for recurring revenue.",
    image: "/scraped/tech-8.jpg",
    tags: ["SaaS Architecture", "Subscriptions", "Multi-tenancy", "Cloud"],
  },
  {
    title: "Performance Optimization",
    desc: "Speed, Core Web Vitals & advanced performance engineering to maximize conversions and user retention.",
    image: "/scraped/tech-9.jpg",
    tags: ["Core Web Vitals", "Lighthouse", "CDN", "Caching"],
  },
  {
    title: "API & Backend Architecture",
    desc: "Secure, scalable, and high-performance backend infrastructure built for enterprise workloads.",
    image: "/scraped/tech-10.jpg",
    tags: ["REST APIs", "GraphQL", "PostgreSQL", "Microservices"],
  },
  {
    title: "Conversion Rate Optimization",
    desc: "Data-backed UX improvements and A/B testing frameworks that dramatically increase revenue.",
    image: "/scraped/tech-11.jpg",
    tags: ["A/B Testing", "Heatmaps", "UX Analysis", "Funnel Optimization"],
  },
  {
    title: "Marketing & Growth Systems",
    desc: "Performance marketing systems engineered for scale — paid, organic, and retention combined.",
    image: "/scraped/tech-12.jpg",
    tags: ["Growth Hacking", "Paid Ads", "Email Marketing", "Analytics"],
  },
];

export default function ServicesPage() {
  return (
    <main className="relative text-white overflow-hidden">

      {/* ================= HERO ================= */}
      <section className="relative min-h-screen flex items-center justify-center text-center px-6 overflow-hidden">

        <Image
          src="/services/services-hero.png"
          alt="Sevenpixels Services"
          fill
          className="object-cover"
          priority
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-[#06140f]" />

        {/* Neon glow overlays */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute w-[800px] h-[800px] bg-primary opacity-10 blur-[300px] rounded-full top-[-300px] left-[-300px]" />
          <div className="absolute w-[600px] h-[600px] bg-primary opacity-8 blur-[200px] rounded-full bottom-[-200px] right-[-200px]" />
        </div>

        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 max-w-4xl"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-block px-4 py-2 text-sm border border-primary/30 text-primary rounded-full mb-8 bg-primary/5 backdrop-blur-sm"
          >
            ✦ Premium Digital Services
          </motion.span>

          <h1 className="text-6xl md:text-8xl font-light mb-8">
            What We
            <br />
            <span className="bg-gradient-to-r from-primary via-green-300 to-primary bg-clip-text text-transparent">
              Build For You
            </span>
          </h1>

          <p className="text-lightgray max-w-2xl mx-auto text-xl leading-relaxed">
            We engineer scalable, high-performance digital systems built for global growth and lasting impact.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex gap-4 justify-center mt-10"
          >
            <Link
              href="/contact"
              className="px-8 py-4 bg-black/60 border border-primary text-white backdrop-blur-md shadow-[0_0_20px_rgba(0,255,148,0.3)] hover:bg-primary/20 hover:shadow-[0_0_40px_rgba(0,255,148,0.7)] font-semibold rounded-full shadow-[0_0_40px_rgba(0,255,148,0.8)] hover:scale-105 transition duration-300"
            >
              Start Your Project
            </Link>
            <Link
              href="/portfolio"
              className="px-8 py-4 border border-white/30 text-white rounded-full hover:border-primary hover:text-primary transition duration-300"
            >
              See Our Work
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ===== SERVICES BLOCKS ===== */}
      <div className="relative">
        {/* Background for services section */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#06140f] via-[#04110c] to-[#020805] -z-10" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:40px_40px] -z-10" />

        {services.map((service, index) => (
          <ServiceBlock
            key={index}
            service={service}
            reverse={index % 2 !== 0}
            index={index}
          />
        ))}
      </div>

      {/* ===== CTA SECTION ===== */}
      <section className="relative py-40 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#020805] to-[#06140f] -z-10" />
        <div className="absolute w-[600px] h-[600px] bg-primary opacity-10 blur-[200px] rounded-full -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto px-6"
        >
          <h2 className="text-4xl md:text-6xl font-light mb-8">
            Ready to Build Something <span className="text-primary">Legendary?</span>
          </h2>
          <p className="text-lightgray text-xl mb-12">
            Let&apos;s engineer your next digital breakthrough together.
          </p>
          <Link
            href="/contact"
            className="inline-block px-12 py-5 bg-black/60 border border-primary text-white backdrop-blur-md shadow-[0_0_20px_rgba(0,255,148,0.3)] hover:bg-primary/20 hover:shadow-[0_0_40px_rgba(0,255,148,0.7)] font-semibold rounded-full shadow-[0_0_50px_rgba(0,255,148,0.8)] hover:scale-105 transition duration-300 text-lg"
          >
            Get Free Consultation →
          </Link>
        </motion.div>
      </section>

    </main>
  );
}

/* ================= SERVICE BLOCK ================= */

function ServiceBlock({ service, reverse, index }: { service: typeof services[0], reverse: boolean, index: number }) {
  return (
    <section className="py-20 px-6 relative overflow-hidden">
      {/* Subtle separator glow */}
      {index > 0 && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      )}

      <div
        className={`max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center ${
          reverse ? "md:[&>*:first-child]:order-2" : ""
        }`}
      >

        {/* IMAGE SIDE */}
        <motion.div
          initial={{ opacity: 0, x: reverse ? 80 : -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="relative h-[480px] rounded-3xl overflow-hidden shadow-[0_40px_120px_rgba(0,0,0,0.7)] group"
        >
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-cover transition duration-700 group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

          {/* Hover neon border glow */}
          <div className="absolute inset-0 border border-primary/0 group-hover:border-primary/40 transition duration-500 shadow-[0_0_0px_rgba(0,255,148,0)] group-hover:shadow-[0_0_60px_rgba(0,255,148,0.4)] rounded-3xl" />

          {/* Service number watermark */}
          <div className="absolute bottom-6 right-6 text-7xl font-bold text-white/5 select-none">
            {String(index + 1).padStart(2, "0")}
          </div>
        </motion.div>

        {/* CONTENT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: reverse ? -80 : 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          {/* Service number */}
          <span className="text-primary/40 text-sm font-mono tracking-[0.3em] uppercase">
            Service {String(index + 1).padStart(2, "0")}
          </span>

          <h2 className="text-4xl md:text-5xl font-light leading-tight">
            <span className="text-primary">{service.title}</span>
          </h2>

          <p className="text-lightgray text-lg leading-relaxed">
            {service.desc}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-3">
            {service.tags.map((tag, i) => (
              <span
                key={i}
                className="px-4 py-1.5 text-sm border border-primary/20 text-primary/80 rounded-full bg-primary/5 hover:bg-primary/10 transition"
              >
                {tag}
              </span>
            ))}
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3 bg-black/60 border border-primary text-white backdrop-blur-md shadow-[0_0_20px_rgba(0,255,148,0.3)] hover:bg-primary/20 hover:shadow-[0_0_40px_rgba(0,255,148,0.7)] rounded-full font-semibold shadow-[0_0_30px_rgba(0,255,148,0.6)] hover:scale-105 hover:shadow-[0_0_50px_rgba(0,255,148,0.9)] transition duration-300"
          >
            Get Started →
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
