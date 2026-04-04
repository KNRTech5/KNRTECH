"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import { OrbitControls, Float } from "@react-three/drei";
import * as THREE from "three";

function createGlobeTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 2048;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.Texture();

  // Ocean blue background
  ctx.fillStyle = "#001a4d";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Add continents (simplified)
  ctx.fillStyle = "#00ff94";

  // North America
  ctx.beginPath();
  ctx.ellipse(200, 300, 120, 150, 0.3, 0, Math.PI * 2);
  ctx.fill();

  // South America
  ctx.beginPath();
  ctx.ellipse(300, 500, 80, 120, 0.5, 0, Math.PI * 2);
  ctx.fill();

  // Europe
  ctx.beginPath();
  ctx.ellipse(900, 250, 100, 80, 0, 0, Math.PI * 2);
  ctx.fill();

  // Africa
  ctx.beginPath();
  ctx.ellipse(1000, 450, 110, 150, 0, 0, Math.PI * 2);
  ctx.fill();

  // Asia
  ctx.beginPath();
  ctx.ellipse(1400, 350, 180, 140, 0.2, 0, Math.PI * 2);
  ctx.fill();

  // Australia
  ctx.beginPath();
  ctx.ellipse(1600, 600, 70, 80, 0, 0, Math.PI * 2);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

function GlobeGeometry() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const globeTexture = useMemo(() => createGlobeTexture(), []);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.0003;
    }
  });

  return (
    <mesh ref={meshRef} scale={2.5}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshPhysicalMaterial
        map={globeTexture}
        emissive="#00FF94"
        emissiveIntensity={0.5}
        metalness={0.3}
        roughness={0.4}
        transparent
        opacity={0.95}
      />
    </mesh>
  );
}

function GlobeGlow() {
  const glowRef = useRef<THREE.Mesh>(null!);

  useFrame(() => {
    if (glowRef.current) {
      glowRef.current.rotation.y += 0.0003;
    }
  });

  return (
    <mesh ref={glowRef} scale={2.5}>
      <sphereGeometry args={[1.05, 32, 32]} />
      <meshBasicMaterial
        color="#00FF94"
        transparent
        opacity={0.1}
        wireframe={false}
      />
    </mesh>
  );
}

function AtmosphereGlow() {
  const atmosphereRef = useRef<THREE.Mesh>(null!);

  useFrame(() => {
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y += 0.0003;
    }
  });

  return (
    <mesh ref={atmosphereRef} scale={2.65}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshBasicMaterial
        color="#00FF94"
        transparent
        opacity={0.05}
      />
    </mesh>
  );
}

function RotationRings() {
  return (
    <>
      {/* Equator ring */}
      <group>
        <mesh scale={2.5} rotation={[0, 0, 0]}>
          <torusGeometry args={[1, 0.01, 8, 100]} />
          <meshBasicMaterial color="#00FF94" transparent opacity={0.4} />
        </mesh>

        {/* Tilted orbital ring */}
        <mesh scale={2.5} rotation={[0.4, 0, 0]}>
          <torusGeometry args={[1.15, 0.008, 8, 100]} />
          <meshBasicMaterial color="#00FF94" transparent opacity={0.3} />
        </mesh>

        {/* Another tilted ring */}
        <mesh scale={2.5} rotation={[0, 0.3, 0.3]}>
          <torusGeometry args={[1.2, 0.008, 8, 100]} />
          <meshBasicMaterial color="#00AA66" transparent opacity={0.25} />
        </mesh>
      </group>
    </>
  );
}

function EnvironmentLights() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[8, 8, 8]} intensity={2} color="#00FF94" />
      <pointLight position={[-8, -8, 8]} intensity={1.5} color="#00AA66" />
      <pointLight position={[0, 8, -10]} intensity={1.2} color="#00FF94" />
      <directionalLight position={[5, 0, 10]} intensity={0.8} color="#ffffff" />
    </>
  );
}

export default function HeroCrystal() {
  return (
    <div className="relative w-full h-[400px] md:h-[500px]">
      <Canvas camera={{ position: [0, 0, 6.5], fov: 45 }} dpr={[1, 2]}>
        <EnvironmentLights />
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
          <GlobeGeometry />
          <GlobeGlow />
          <AtmosphereGlow />
          <RotationRings />
        </Float>
        <OrbitControls
          autoRotate
          autoRotateSpeed={1.5}
          enableZoom={false}
          enablePan={false}
        />
      </Canvas>

      {/* Enhanced Glow Effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,148,0.25),transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,170,102,0.1),transparent_70%)]" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-16 left-8 w-8 h-8 border border-primary/30 rounded-full" />
      <div className="absolute bottom-20 right-12 w-4 h-4 border border-primary/20 rounded-full" />
      <div className="absolute top-1/3 right-20 w-2 h-2 bg-primary/40 rounded-full" />
    </div>
  );
}
