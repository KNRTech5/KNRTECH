"use client";

import { motion } from "framer-motion";

export default function KNRLogo() {
  return (
    <motion.div
      className="flex items-center gap-3 cursor-pointer"
      whileHover={{ scale: 1.08 }}
      transition={{ duration: 0.3 }}
    >
      {/* Premium Icon Mark */}
      <div className="relative w-14 h-14 flex items-center justify-center flex-shrink-0">

        {/* Animated Background Glow */}
        <motion.div
          className="absolute -inset-1.5 bg-gradient-to-r from-primary via-cyan-400 to-primary opacity-25 blur-xl rounded-lg"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.35, 0.2]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Outer Rotating Ring - Fast */}
        <motion.div
          className="absolute inset-0 rounded-lg"
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute inset-0 border-2 border-transparent border-t-primary border-r-cyan-400 rounded-lg shadow-[0_0_20px_rgba(0,255,148,0.5)]" />
        </motion.div>

        {/* Middle Rotating Ring - Opposite */}
        <motion.div
          className="absolute inset-1.5 rounded-lg"
          animate={{ rotate: -360 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute inset-0 border-1.5 border-transparent border-t-cyan-400/60 border-b-primary/40 rounded-lg" />
        </motion.div>

        {/* Inner Static Ring */}
        <div className="absolute inset-3 rounded-lg border-1.5 border-primary/80 shadow-[0_0_15px_rgba(0,255,148,0.6)]" />

        {/* Center K Letter */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.svg
            width="100%"
            height="100%"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-primary"
            animate={{
              scale: [1, 1.05, 1],
              filter: [
                "drop-shadow(0 0 8px rgba(0,255,148,0.6))",
                "drop-shadow(0 0 16px rgba(0,255,148,1))",
                "drop-shadow(0 0 8px rgba(0,255,148,0.6))"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <line x1="6" y1="3" x2="6" y2="21" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            <line x1="18" y1="3" x2="6" y2="12" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="6" y1="12" x2="18" y2="21" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
          </motion.svg>
        </div>

        {/* Corner Accent Dots */}
        <motion.div
          className="absolute top-1 left-1/2 w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_8px_rgba(0,255,148,0.8)]"
          animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1 right-1 w-1 h-1 bg-cyan-400 rounded-full shadow-[0_0_6px_rgba(34,211,238,0.8)]"
          animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        />
      </div>

      {/* Full Name Text Branding */}
      <motion.div
        className="flex flex-col leading-tight relative z-10"
        whileHover={{ x: 4 }}
        transition={{ type: "spring", stiffness: 300 }}
      >

        {/* Main Brand Name - KNR Tech */}
        <div className="flex items-baseline gap-1.5">
          {/* KNR - Bold White */}
          <span className="text-4xl font-black tracking-tighter text-white uppercase drop-shadow-[0_0_8px_rgba(0,255,148,0.2)]">
            NR
          </span>

          {/* Tech - Gradient Glow */}
          <motion.span
            className="text-2xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-400 to-primary capitalize"
            animate={{
              textShadow: [
                "0 0 8px rgba(0,255,148,0.4), 0 0 12px rgba(34,211,238,0.2)",
                "0 0 16px rgba(0,255,148,0.8), 0 0 20px rgba(34,211,238,0.5)",
                "0 0 8px rgba(0,255,148,0.4), 0 0 12px rgba(34,211,238,0.2)"
              ]
            }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            Tech
          </motion.span>
        </div>

      </motion.div>

      {/* Decorative Vertical Line - Right Side */}
      <motion.div
        className="h-10 w-0.5 bg-gradient-to-b from-transparent via-primary to-transparent opacity-40 ml-1"
        animate={{
          opacity: [0.2, 0.5, 0.2]
        }}
        transition={{ duration: 2.5, repeat: Infinity }}
      />
    </motion.div>
  );
}
