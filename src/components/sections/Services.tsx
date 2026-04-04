"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const services = [
  {
    title: "Web Development",
    desc: "High-performance websites built with cutting-edge technologies.",
    image: "/scraped/tech-1.jpg",
    icon: "🌐",
  },
  {
    title: "UI/UX Design",
    desc: "Clean, modern and conversion-focused design systems.",
    image: "/scraped/tech-2.jpg",
    icon: "🎨",
  },
  {
    title: "E-Commerce Solutions",
    desc: "Scalable online stores engineered for rapid growth.",
    image: "/scraped/tech-3.jpg",
    icon: "🛒",
  },
  {
    title: "Brand Identity",
    desc: "Premium brand systems that build trust and recognition.",
    image: "/scraped/tech-4.jpg",
    icon: "✦",
  },
  {
    title: "SEO Optimization",
    desc: "Data-driven strategies to increase visibility and organic growth.",
    image: "/scraped/tech-5.jpg",
    icon: "📈",
  },
  {
    title: "App Development",
    desc: "Cross-platform mobile applications with performance and scale.",
    image: "/scraped/tech-6.jpg",
    icon: "📱",
  },
  {
    title: "AI Automation",
    desc: "Intelligent automation systems to streamline business operations.",
    image: "/scraped/tech-7.jpg",
    icon: "🤖",
  },
  {
    title: "SaaS Development",
    desc: "Full-cycle SaaS architecture and scalable cloud systems.",
    image: "/scraped/tech-8.jpg",
    icon: "☁️",
  },
  {
    title: "Performance Optimization",
    desc: "Speed, Core Web Vitals & advanced performance engineering.",
    image: "/scraped/tech-9.jpg",
    icon: "⚡",
  },
  {
    title: "API & Backend",
    desc: "Secure, scalable and high-performance backend infrastructure.",
    image: "/scraped/tech-10.jpg",
    icon: "🔧",
  },
  {
    title: "CRO",
    desc: "Data-backed UX improvements that increase revenue.",
    image: "/scraped/tech-11.jpg",
    icon: "🎯",
  },
  {
    title: "Marketing & Growth",
    desc: "Performance marketing systems engineered for scale.",
    image: "/scraped/tech-12.jpg",
    icon: "🚀",
  },
];

export default function Services() {
  return (
    <section className="relative py-32 overflow-hidden">

      <div className="relative max-w-7xl mx-auto px-6 text-center">

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="mb-6"
        >
          <span className="inline-block px-4 py-2 text-sm border border-primary/30 text-primary rounded-full mb-6 bg-primary/5">
            ✦ What We Offer
          </span>
          <h2 className="text-4xl md:text-6xl font-light">
            Our <span className="text-primary">Services</span>
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-lightgray max-w-2xl mx-auto mb-20 text-lg"
        >
          We craft powerful digital solutions that elevate brands globally.
        </motion.p>

        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <Link
            href="/services"
            className="inline-block px-10 py-4 border border-primary text-primary rounded-full hover:border-primary hover:text-white hover:bg-primary/20 hover:shadow-[0_0_30px_rgba(0,255,148,0.5)] transition duration-300 font-semibold"
          >
            Explore All Services →
          </Link>
        </motion.div>

      </div>
    </section>
  );
}

function ServiceCard({ service, index }: { service: typeof services[0], index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const smoothX = useSpring(rotateX, { stiffness: 120, damping: 15 });
  const smoothY = useSpring(rotateY, { stiffness: 120, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = cardRef.current!.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    rotateX.set(-(y - centerY) / 18);
    rotateY.set((x - centerX) / 18);

    cardRef.current!.style.setProperty("--x", `${x}px`);
    cardRef.current!.style.setProperty("--y", `${y}px`);
  };

  const resetRotation = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      viewport={{ once: true }}
      style={{
        rotateX: smoothX,
        rotateY: smoothY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetRotation}
      className="service-card relative rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.4)] overflow-hidden group cursor-pointer"
    >
      {/* Service Image */}
      <div className="relative h-44 overflow-hidden">
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover transition duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        {/* Icon overlay */}
        <div className="absolute top-4 left-4 w-10 h-10 bg-black/40 backdrop-blur-md rounded-xl flex items-center justify-center text-lg border border-white/10">
          {service.icon}
        </div>
      </div>

      {/* Mouse Spotlight */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_var(--x,_50%)_var(--y,_50%),rgba(0,255,148,0.12),transparent_60%)]" />

      {/* Neon Glow on hover */}
      <div className="absolute inset-0 rounded-2xl border border-primary/0 group-hover:border-primary/30 transition duration-500 shadow-[0_0_0px_rgba(0,255,148,0)] group-hover:shadow-[0_0_30px_rgba(0,255,148,0.2)] pointer-events-none" />

      <div className="p-6">
        <h3 className="text-base font-semibold mb-2 text-primary group-hover:text-white transition duration-300">
          {service.title}
        </h3>

        <p className="text-lightgray text-sm leading-relaxed">
          {service.desc}
        </p>
      </div>
    </motion.div>
  );
}
