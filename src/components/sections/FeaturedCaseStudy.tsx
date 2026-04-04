"use client";

import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import CountUp from "react-countup";



/* ===================== MAIN SECTION ===================== */

export default function FeaturedCaseStudy() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 20%"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1.2, 1]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center text-white overflow-hidden"
    >

      {/* Animated Background Blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="blob blob1"></div>
        <div className="blob blob2"></div>
        <div className="blob blob3"></div>
      </div>

      {/* AI Moving Dots Background */}
      <DotsBackground />

      {/* WebGL Glass Overlay */}
      <GlassOverlay />

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-24 items-center">

        {/* Split Image Reveal */}
        <SplitImage scale={scale} />

        {/* Content */}
        <div>
          <h2 className="text-5xl font-light mb-6">
            Cinematic <span className="text-primary">Case Study</span>
          </h2>

          <p className="text-lightgray mb-12 leading-relaxed">
            A complete digital transformation engineered for performance and
            growth using immersive UI systems.
          </p>

          <div className="grid grid-cols-2 gap-10">
            <Metric value={220} suffix="%" label="Conversion Growth" />
            <Metric value={3} suffix="x" label="Faster Performance" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===================== SPLIT IMAGE ===================== */

import type { MotionValue } from "framer-motion";

interface SplitImageProps {
  scale: MotionValue<number>;
}

function SplitImage({ scale }: SplitImageProps) {
  const [revealed, setRevealed] = useState(false);

  return (
    <motion.div
      style={{ scale }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      onViewportEnter={() => setRevealed(true)}
      viewport={{ once: true }}
      className="relative w-full h-[550px] overflow-hidden rounded-3xl shadow-[0_40px_100px_rgba(0,0,0,0.6)]"
    >
      <motion.img
        src="/scraped/tech-13.jpg"
        className="absolute inset-0 w-full h-full object-cover"
        initial={{ x: "-100%" }}
        animate={ revealed ? { x: 0 } : {} }
        transition={{ duration: 1.2, ease: "easeOut" }}
      />

      <motion.img
        src="/scraped/tech-14.jpg"
        className="absolute inset-0 w-full h-full object-cover"
        initial={{ x: "100%" }}
        animate={ revealed ? { x: 0 } : {} }
        transition={{ duration: 1.2, ease: "easeOut" }}
      />
    </motion.div>
  );
}

/* ===================== METRIC WITH LIGHTNING ===================== */

interface MetricProps {
  value: number;
  suffix: string;
  label: string;
}

function Metric({ value, suffix, label }: MetricProps) {
  const [flash, setFlash] = useState(false);

  return (
    <div className="relative">
      {flash && (
        <div className="absolute inset-0 bg-primary/30 blur-xl animate-pulse rounded-xl" />
      )}

      <h3 className="text-4xl text-primary font-semibold">
        <CountUp
          end={value}
          duration={2}
          onEnd={() => {
            setFlash(true);
            setTimeout(() => setFlash(false), 300);
          }}
        />
        {suffix}
      </h3>

      <p className="text-lightgray text-sm mt-2">{label}</p>
    </div>
  );
}

/* ===================== AI MOVING DOTS ===================== */

const DotsBackground = () => {
  interface Dot {
    top: number;
    left: number;
  }

  const [dots, setDots] = useState<Dot[]>([]);

  useEffect(() => {
    const generatedDots = Array.from({ length: 20 }).map(() => ({
      top: Math.random() * 100,
      left: Math.random() * 100,
    }));
    setDots(generatedDots);
  }, []);

  return (
    <div className="absolute inset-0 -z-20 overflow-hidden">
      {dots.map((dot, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-primary rounded-full opacity-20"
          style={{
            top: `${dot.top}%`,
            left: `${dot.left}%`,
          }}
          animate={{ y: [0, 20, 0], x: [0, 10, 0] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            delay: i * 0.1,
          }}
        />
      ))}
    </div>
  );
};


/* ===================== WEBGL GLASS OVERLAY ===================== */

function GlassOverlay() {
  return (
    <div className="absolute inset-0 -z-10 opacity-40">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <GlassPlane />
      </Canvas>
    </div>
  );
}

function GlassPlane() {
  const mesh = useRef<THREE.Mesh>(null!);

  useFrame(() => {
    mesh.current.rotation.y += 0.001;
  });

  return (
    <mesh ref={mesh}>
      <planeGeometry args={[20, 20]} />
      <meshStandardMaterial
        roughness={0.2}
        metalness={0.8}
        color="#00FF94"
        transparent
        opacity={0.08}
      />
    </mesh>
  );
}
