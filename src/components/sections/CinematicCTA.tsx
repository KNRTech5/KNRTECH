"use client";

import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useRef } from "react";

export default function CinematicCTA() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 20%"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.5, 1]);

  return (
    <section
      ref={ref}
      className="relative min-h-[130vh] flex items-center justify-center text-white overflow-hidden py-40"
    >

{/* Animated Background Blobs */}
  <div className="absolute inset-0 -z-10 overflow-hidden">

    <div className="blob blob1"></div>
    <div className="blob blob2"></div>
    <div className="blob blob3"></div>

  </div>

      {/* AI Moving Grid Flow */}
      <div className="absolute inset-0 -z-30 overflow-hidden">
        <div className="ai-grid absolute inset-0 opacity-30" />
      </div>

      {/* Cinematic Glow */}
      <motion.div
        className="absolute w-[1200px] h-[1200px] bg-primary opacity-10 blur-[300px] rounded-full -z-20"
        animate={{ scale: [1, 1.1, 1], rotate: [0, 10, 0] }}
        transition={{ duration: 30, repeat: Infinity }}
      />

      {/* Glass Container */}
      <motion.div
        style={{ scale, opacity }}
        className="relative z-10 max-w-5xl mx-auto px-16 py-32 rounded-[60px]
        bg-white/5 backdrop-blur-3xl
        border border-white/10
        shadow-[0_60px_160px_rgba(0,0,0,0.6)]
        text-center overflow-hidden"
      >
        {/* Energy Wave Under Buttons */}
        <div className="absolute bottom-0 left-0 w-full h-40 energy-wave opacity-40" />

        <motion.h2
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
          className="text-6xl md:text-8xl font-light leading-tight mb-10"
        >
          Ready To Create
          <br />
          <span className="text-primary glow-text">
            Something Legendary?
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4 }}
          viewport={{ once: true }}
          className="text-lightgray text-xl md:text-2xl mb-20 max-w-3xl mx-auto"
        >
          We craft immersive digital experiences engineered for global impact.
        </motion.p>

        <div className="flex justify-center gap-10 flex-wrap">
          <MagneticButton>Start Your Project</MagneticButton>
          <OutlineMagneticButton>Schedule a Call</OutlineMagneticButton>
          
        </div>
      </motion.div>
    </section>
  );
}

/* ============================= */
/* 💎 MAGNETIC BUTTON WITH BURST */
/* ============================= */

interface MagneticButtonProps {
  children: React.ReactNode;
}

function MagneticButton({ children }: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const smoothX = useSpring(x, { stiffness: 150, damping: 10 });
  const smoothY = useSpring(y, { stiffness: 150, damping: 10 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current!.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;

    x.set(offsetX * 0.3);
    y.set(offsetY * 0.3);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const handleClick = () => {
    const el = ref.current!;
    el.classList.add("lightning-burst");
    setTimeout(() => el.classList.remove("lightning-burst"), 400);
  };

  return (
    <motion.button
      ref={ref}
      style={{ x: smoothX, y: smoothY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      onClick={handleClick}
      whileTap={{ scale: 0.95 }}
      className="relative px-16 py-6 rounded-full
      bg-primary text-white font-semibold text-lg
      shadow-[0_0_50px_rgba(0,255,148,0.8)]
      transition duration-300 overflow-hidden"
    >
      {children}
    </motion.button>
  );
}

function OutlineMagneticButton({ children }: MagneticButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="px-16 py-6 rounded-full
      border border-primary text-white font-semibold text-lg
      hover:bg-primary/20 transition duration-300"
    >
      {children}
    </motion.button>
  );
}
