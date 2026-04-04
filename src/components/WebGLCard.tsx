"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function Cube() {
  const mesh = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    mesh.current.rotation.x += 0.005;
    mesh.current.rotation.y += 0.005;
  });

  return (
    <mesh ref={mesh}>
      <boxGeometry args={[2, 2, 2]} />
      <MeshDistortMaterial
        color="#00FF94"
        distort={0.4}
        speed={2}
        roughness={0}
        transparent
        opacity={0.2}
      />
    </mesh>
  );
}

export default function WebGLStatCube() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[2, 2, 2]} />
        <Cube />
      </Canvas>
    </div>
  );
}
