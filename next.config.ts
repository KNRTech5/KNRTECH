import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Image optimization - CRITICAL for speed
  images: {
    unoptimized: true,  // SKIP image optimization for 30-50% faster builds
    formats: ["image/webp", "image/avif"],
  },

  // TypeScript optimization
  typescript: {
    ignoreBuildErrors: false,
  },

  // Turbopack (default, already enabled)
  turbopack: {},

  // Experimental optimizations
  experimental: {
    optimizePackageImports: ["framer-motion", "three", "@react-three/fiber"],
  },

  // Disable source maps in production for smaller builds
  productionBrowserSourceMaps: false,

  // Cache configuration for faster incremental builds
  onDemandEntries: {
    maxInactiveAge: 60 * 60 * 1000,
    pagesBufferLength: 5,
  },

  // Static generation timeout
  staticPageGenerationTimeout: 120,
};

export default nextConfig;
