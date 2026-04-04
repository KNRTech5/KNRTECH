"use client";

import CountUp from "react-countup";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState } from "react";

export default function WhyChoose() {
  return (
    <section className="relative py-40 text-white overflow-hidden">

        {/* Animated Background Blobs */}
  <div className="absolute inset-0 -z-10 overflow-hidden">

    <div className="blob blob1"></div>
    <div className="blob blob2"></div>
    <div className="blob blob3"></div>

  </div>

      {/* Parallax Ambient Glow */}
      <motion.div
        className="absolute w-[700px] h-[700px] bg-primary opacity-10 blur-[250px] rounded-full -z-10"
        animate={{ y: [0, 80, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">

        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-light mb-8 leading-tight">
            Why Choose <span className="text-primary">KNR Tech</span>
          </h2>

          <p className="text-lightgray text-lg leading-relaxed max-w-lg">
            We engineer immersive digital systems that combine strategy,
            innovation, and high-performance technology to deliver measurable growth.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-10">
          <Stat number={120} suffix="+" label="Projects Delivered" progress={95} />
          <Stat number={5} suffix="+" label="Years Experience" progress={85} />
          <Stat number={98} suffix="%" label="Client Satisfaction" progress={98} />
          <Stat number={24} suffix="/7" label="Support Available" progress={100} />
        </div>

      </div>
    </section>
  );
}

interface StatProps {
  number: number;
  suffix: string;
  label: string;
  progress: number;
}

function Stat({ number, suffix, label, progress }: StatProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [completed, setCompleted] = useState(false);
  const [flash, setFlash] = useState(false);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const smoothX = useSpring(rotateX, { stiffness: 160, damping: 18 });
  const smoothY = useSpring(rotateY, { stiffness: 160, damping: 18 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = cardRef.current!.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    rotateX.set(-(y - centerY) / 14);
    rotateY.set((x - centerX) / 14);

    cardRef.current!.style.setProperty("--x", `${x}px`);
    cardRef.current!.style.setProperty("--y", `${y}px`);
  };

  const reset = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  const handleComplete = () => {
    setCompleted(true);
    setFlash(true);
    setTimeout(() => setFlash(false), 500);
  };

  return (
    <motion.div
      ref={cardRef}
      style={{ rotateX: smoothX, rotateY: smoothY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      className="relative group perspective-[1200px]"
    >
      {/* Lightning Flash */}
      {flash && (
        <div className="absolute inset-0 rounded-2xl bg-primary/30 blur-2xl animate-flash pointer-events-none" />
      )}

      {/* Cursor Reactive Border Glow */}
      <div className="absolute inset-0 rounded-2xl pointer-events-none bg-[radial-gradient(circle_at_var(--x,_50%)_var(--y,_50%),rgba(0,255,148,0.25),transparent_60%)]" />

      {/* Power Surge Glow */}
      <div className={`absolute inset-0 rounded-2xl blur-xl transition duration-700 ${
        completed ? "bg-primary/25 opacity-100" : "opacity-0"
      }`} />

      <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-10 text-center shadow-[0_20px_60px_rgba(0,0,0,0.5)] transition duration-500 group-hover:scale-105">

        {/* Floating Number */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          <h3 className="text-4xl font-semibold text-primary mb-4">
            <CountUp
              end={number}
              duration={2.5}
              onEnd={handleComplete}
            />
            {suffix}
          </h3>
        </motion.div>

        <p className="text-lightgray text-sm uppercase tracking-wider mb-6">
          {label}
        </p>

        {/* Animated Progress Bar */}
        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${progress}%` }}
            transition={{ duration: 2 }}
            viewport={{ once: true }}
            className="h-full bg-primary rounded-full shadow-[0_0_20px_rgba(0,255,148,0.7)]"
          />
        </div>

      </div>
    </motion.div>
  );
}
