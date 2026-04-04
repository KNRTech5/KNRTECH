"use client";

import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useRef } from "react";

export default function AdvancedContact() {
  return (
    <section className="relative min-h-screen flex items-center justify-center text-white overflow-hidden">

        {/* Animated Background Blobs */}
  <div className="absolute inset-0 -z-10 overflow-hidden">

    <div className="blob blob1"></div>
    <div className="blob blob2"></div>
    <div className="blob blob3"></div>

  </div>

      {/* WebGL Background */}
      <div className="absolute inset-0 -z-20">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={0.6} />
          <BackgroundPlane />
        </Canvas>
      </div>

      <div className="relative z-10 w-full max-w-4xl px-6">

        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-5xl md:text-6xl font-light text-center mb-16"
        >
          Let’s <span className="text-primary">Work Together</span>
        </motion.h2>

        {/* Glass Form */}
        <motion.form
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
          className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-12 shadow-[0_30px_80px_rgba(0,0,0,0.6)]"
        >

          <div className="grid md:grid-cols-2 gap-8">

            <InputField label="Full Name" type="text" />
            <InputField label="Email Address" type="email" />

          </div>

          <div className="mt-8">
            <InputField label="Project Details" type="textarea" />
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="mt-10 px-10 py-4 bg-black/60 border border-primary text-white backdrop-blur-md shadow-[0_0_20px_rgba(0,255,148,0.3)] hover:bg-primary/20 hover:shadow-[0_0_40px_rgba(0,255,148,0.7)] font-semibold rounded-full shadow-[0_0_40px_rgba(0,255,148,0.8)]"
          >
            Send Message
          </motion.button>

        </motion.form>
      </div>
    </section>
  );
}

/* ---------------- Background WebGL Plane ---------------- */

function BackgroundPlane() {
  const mesh = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    mesh.current.rotation.z = Math.sin(clock.elapsedTime * 0.2) * 0.1;
  });

  return (
    <mesh ref={mesh}>
      <planeGeometry args={[20, 20]} />
      <meshPhysicalMaterial
        color="#00FF94"
        transparent
        opacity={0.08}
        roughness={0.2}
        metalness={0.3}
      />
    </mesh>
  );
}

/* ---------------- Input Component ---------------- */

interface InputFieldProps {
  label: string;
  type: string;
}

function InputField({ label, type }: InputFieldProps) {
  return (
    <div className="relative group">
      {type === "textarea" ? (
        <textarea
          className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white outline-none focus:border-primary transition duration-300"
          rows={5}
        />
      ) : (
        <input
          type={type}
          className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white outline-none focus:border-primary transition duration-300"
        />
      )}

      <label className="absolute left-4 -top-3 text-sm bg-black px-2 text-lightgray group-focus-within:text-primary transition duration-300">
        {label}
      </label>
    </div>
  );
}
