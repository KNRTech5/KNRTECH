"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import dynamic from "next/dynamic";

// Lazy load 3D component
const HeroCrystal = dynamic(() => import("@/components/HeroCrystal"), {
  ssr: false,
});

export default function Hero() {
  const glowRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  // Parallax effect
  const yImage = useTransform(scrollY, [0, 500], [0, 80]);

  // Typing effect
  const words = ["digital", "modern", "powerful", "scalable"];
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const currentWord = words[index % words.length];
    let i = 0;

    const typing = setInterval(() => {
      setText(currentWord.slice(0, i));
      i++;
      if (i > currentWord.length) {
        clearInterval(typing);
        setTimeout(() => setIndex((prev) => prev + 1), 1500);
      }
    }, 100);

    return () => clearInterval(typing);
  }, [index]);

  // Mouse glow
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!glowRef.current) return;
      glowRef.current.style.left = `${e.clientX - 200}px`;
      glowRef.current.style.top = `${e.clientY - 200}px`;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center mt-">





  {/* Animated Background Blobs */}
  <div className="absolute inset-0 -z-10 overflow-hidden">

    <div className="blob blob1"></div>
    <div className="blob blob2"></div>
    <div className="blob blob3"></div>

  </div>


      {/* Mouse Glow */}
      <div
        ref={glowRef}
        className="pointer-events-none fixed w-[400px] h-[400px] bg-primary opacity-10 blur-[150px] rounded-full transition-all duration-300"
      />

      {/* Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="space-y-6"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light leading-tight tracking-tight">
            crafting{" "}
            <span className="bg-gradient-to-r from-primary to-green-400 bg-clip-text text-transparent font-semibold">
              {text}
            </span>
            <br />
            experiences that drive{" "}
            <span className="text-primary font-medium">
              brand success
            </span>
          </h1>

          <p className="text-lightgray max-w-lg text-lg">
            KNR Tech builds high-performance websites and digital
            experiences that help brands grow globally.
          </p>

          <div className="flex justify-center gap-6 mt-10">

  {/* Let's Connect → Contact */}
  <Link
    href="/contact"
    className="px-8 py-4 border border-primary text-primary rounded-full hover:bg-primary hover:white-black transition duration-300"
  >
    Let’s Connect
  </Link>

  {/* View Work → Portfolio */}
  <Link
    href="/portfolio"
    className="px-8 py-4 bg-primary text-white rounded-full font-semibold shadow-[0_0_30px_rgba(0,255,148,0.8)] hover:scale-105 transition duration-300"
  >
    View Work
  </Link>

</div>
        </motion.div>

        {/* RIGHT 3D CRYSTAL */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative flex justify-center items-center"
        >
          <HeroCrystal />
        </motion.div>
      </div>
    </section>
  );
}

