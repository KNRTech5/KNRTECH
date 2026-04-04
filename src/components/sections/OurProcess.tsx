"use client";

import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { useRef, useState } from "react";




const steps = [
  {
    number: "01",
    title: "Discovery",
    desc: "We deeply understand your brand, audience, and goals before building anything.",
  },
  {
    number: "02",
    title: "Strategy",
    desc: "We craft high-performance digital strategies built for growth.",
  },
  {
    number: "03",
    title: "Design",
    desc: "We design immersive experiences that convert and engage.",
  },
  {
    number: "04",
    title: "Development",
    desc: "We engineer scalable systems using modern technologies.",
  },
  {
    number: "05",
    title: "Launch",
    desc: "We deploy, optimize, and continuously refine for impact.",
  },
];

function Tube3D() {
  const meshRef = useRef<THREE.Mesh>(null!);

  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, -6, 0),
    new THREE.Vector3(1, -2, 1),
    new THREE.Vector3(-1, 2, -1),
    new THREE.Vector3(0, 6, 0),
  ]);

  const geometry = new THREE.TubeGeometry(curve, 100, 0.12, 16, false);

  useFrame(() => {
    meshRef.current.rotation.y += 0.002;
  });

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshStandardMaterial
        color="#00FF94"
        emissive="#00FF94"
        emissiveIntensity={1.5}
        metalness={0.5}
        roughness={0.2}
      />
    </mesh>
  );
}

export default function OurProcess() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 20%"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const yParallax = useTransform(scrollYProgress, [0, 1], [120, -120]);

  return (
    <section
      ref={containerRef}
      className="relative py-40 text-white overflow-hidden"
    >
      {/* AI Animated Grid */}
      <div className="absolute inset-0 ai-grid -z-30 opacity-30 pointer-events-none" />

      {/* 3D Tube Background */}
      <div className="absolute inset-0 -z-20 opacity-40 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 12], fov: 50 }}>
          <ambientLight intensity={0.6} />
          <pointLight position={[10, 10, 10]} intensity={2} />
          <Tube3D />
          <OrbitControls
            enableZoom={false}
            autoRotate
            autoRotateSpeed={0.4}
          />
        </Canvas>
      </div>

      <motion.div style={{ y: yParallax }} className="max-w-7xl mx-auto px-6">

        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-light text-center mb-28"
        >
          Our <span className="text-primary">Process</span>
        </motion.h2>

        <div className="relative">

          <div className="absolute left-1/2 top-0 w-[2px] h-full bg-white/10 -translate-x-1/2" />

          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-1/2 top-0 w-[3px] bg-primary shadow-[0_0_25px_rgba(0,255,148,0.8)] -translate-x-1/2"
          />

          <div className="space-y-32">
            {steps.map((step, index) => (
              <ProcessCard key={index} step={step} index={index} />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

interface Step {
  number: string;
  title: string;
  desc: string;
}

interface ProcessCardProps {
  step: Step;
  index: number;
}

function ProcessCard({ step, index }: ProcessCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [flash, setFlash] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "center 50%"],
  });

  const glowOpacity = useTransform(scrollYProgress, [0, 1], [0.2, 1]);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const smoothX = useSpring(rotateX, { stiffness: 200, damping: 20 });
  const smoothY = useSpring(rotateY, { stiffness: 200, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current!.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    rotateX.set(-(y - rect.height / 2) / 20);
    rotateY.set((x - rect.width / 2) / 20);
  };

  // Lightning flash on active center
  scrollYProgress.on("change", (v) => {
    if (v > 0.8) {
      setFlash(true);
      setTimeout(() => setFlash(false), 300);
    }
  });

  return (
    <motion.div
      ref={ref}
      style={{ rotateX: smoothX, rotateY: smoothY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        rotateX.set(0);
        rotateY.set(0);
      }}
      className={`relative w-full md:w-1/2 ${
        index % 2 === 0 ? "ml-auto pr-16" : "mr-auto pl-16"
      }`}
    >
      {/* Lightning Flash */}
      {flash && (
        <div className="absolute inset-0 bg-primary/30 blur-xl rounded-3xl animate-pulse" />
      )}

      {/* Active Dot */}
      <motion.div
        style={{ opacity: glowOpacity }}
        className="absolute top-12 left-1/2 -translate-x-1/2 w-6 h-6 bg-primary rounded-full shadow-[0_0_30px_rgba(0,255,148,1)] z-10"
      />

      <motion.div
        style={{ opacity: glowOpacity }}
        className="absolute inset-0 rounded-3xl blur-xl bg-primary/20"
      />

      <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 shadow-[0_30px_80px_rgba(0,0,0,0.6)] transition duration-500 hover:scale-105">

        {/* Magnetic Number */}
        <motion.div
          whileHover={{ scale: 1.3, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="text-6xl font-bold text-primary mb-6 opacity-50"
        >
          {step.number}
        </motion.div>

        <h3 className="text-2xl font-semibold mb-4 text-primary">
          {step.title}
        </h3>

        <p className="text-lightgray leading-relaxed">
          {step.desc}
        </p>
      </div>
    </motion.div>
  );
}
