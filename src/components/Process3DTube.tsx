"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { useRef } from "react";

function Tube() {
  const meshRef = useRef<THREE.Mesh>(null!);

  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, -5, 0),
    new THREE.Vector3(1, -2, 1),
    new THREE.Vector3(-1, 2, -1),
    new THREE.Vector3(0, 5, 0),
  ]);

  const geometry = new THREE.TubeGeometry(curve, 100, 0.15, 16, false);

  useFrame((state) => {
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

export default function Process3DTube() {
  return (
    <div className="absolute inset-0 -z-10 opacity-40">
      <Canvas camera={{ position: [0, 0, 12], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={2} />
        <Tube />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
}
