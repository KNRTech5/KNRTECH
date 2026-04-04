"use client";

import { Canvas } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from "three";

export default function ParticleField() {
  const particles = useMemo(() => {
    const temp: number[] = [];
    for (let i = 0; i < 2000; i++) {
      temp.push(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
      );
    }
    return new Float32Array(temp);
  }, []);

  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <Points positions={particles} stride={3}>
          <PointMaterial
            transparent
            color="#00FF94"
            size={0.02}
            sizeAttenuation
            depthWrite={false}
          />
        </Points>
      </Canvas>
    </div>
  );
}
