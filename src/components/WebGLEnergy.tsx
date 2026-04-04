"use client";

import { Canvas } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere } from "@react-three/drei";

export default function WebGLEnergy() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas>
        <ambientLight intensity={1} />
        <Sphere args={[2, 100, 200]} scale={3}>
          <MeshDistortMaterial
            color="#00ff94"
            distort={0.4}
            speed={2}
          />
        </Sphere>
      </Canvas>
    </div>
  );
}