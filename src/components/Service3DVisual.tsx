"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Float, Points, PointMaterial } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

/* ================= Cursor Reactive Camera ================= */

function CameraRig() {
  const { camera, mouse } = useThree();

  useFrame(() => {
    camera.position.x = THREE.MathUtils.lerp(
      camera.position.x,
      mouse.x * 2,
      0.05
    );
    camera.position.y = THREE.MathUtils.lerp(
      camera.position.y,
      mouse.y * 1.5,
      0.05
    );
    camera.lookAt(0, 0, 0);
  });

  return null;
}

/* ================= Glass Material Object ================= */

function GlassObject({ type }: { type: string }) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame(() => {
    meshRef.current.rotation.y += 0.005;
  });

  let geometry;

  switch (type) {
    case "web":
      geometry = <boxGeometry args={[2, 2, 2]} />;
      break;
    case "design":
      geometry = <icosahedronGeometry args={[1.8, 1]} />;
      break;
    case "ecommerce":
      geometry = <torusKnotGeometry args={[1.4, 0.4, 100, 16]} />;
      break;
    case "branding":
      geometry = <sphereGeometry args={[1.6, 64, 64]} />;
      break;
    case "seo":
      geometry = <coneGeometry args={[1.6, 2.5, 32]} />;
      break;
    case "app":
      geometry = <octahedronGeometry args={[1.8]} />;
      break;
    default:
      geometry = <boxGeometry args={[2, 2, 2]} />;
  }

  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
      <mesh ref={meshRef}>
        {geometry}
        <meshPhysicalMaterial
          transmission={1}
          thickness={1}
          roughness={0.1}
          metalness={0.2}
          clearcoat={1}
          clearcoatRoughness={0}
          color="#00FF94"
          emissive="#00FF94"
          emissiveIntensity={0.5}
        />
      </mesh>
    </Float>
  );
}

/* ================= Particle Field ================= */

function ParticleField() {
  const particles = useMemo(() => {
    const positions = new Float32Array(1500 * 3);
    for (let i = 0; i < 1500; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return positions;
  }, []);

  return (
    <Points positions={particles}>
      <PointMaterial
        transparent
        color="#00FF94"
        size={0.05}
        sizeAttenuation
        depthWrite={false}
      />
    </Points>
  );
}

/* ================= MAIN EXPORT ================= */

export default function Service3DVisual({ type }: { type: string }) {
  return (
    <div className="w-full h-[450px] rounded-3xl overflow-hidden">
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={2} />
        <CameraRig />
        <ParticleField />
        <GlassObject type={type} />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
}
