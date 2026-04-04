"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000); // Show for 4 seconds

    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    initial: { opacity: 1 },
    exit: { opacity: 0, transition: { duration: 0.8 } },
  };

  const logoVariants = {
    initial: { scale: 0.5, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.8 as const },
    },
    exit: { scale: 1.2, opacity: 0, transition: { duration: 0.6 } },
  };

  const textVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay: 0.4 },
    },
    exit: { opacity: 0, y: -20, transition: { duration: 0.4 } },
  };

  const lineVariants = {
    initial: { scaleX: 0 },
    animate: {
      scaleX: 1,
      transition: { duration: 0.8, delay: 0.8 },
    },
    exit: { scaleX: 0, transition: { duration: 0.4 } },
  };

  const glowVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: [0.4, 0.8, 0.4],
      transition: { duration: 2.5, delay: 0.5, repeat: Infinity },
    },
  };

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          variants={containerVariants}
          initial="initial"
          exit="exit"
          className="fixed inset-0 z-[10000] bg-gradient-to-b from-[#06140f] via-[#04110c] to-[#020805] flex items-center justify-center overflow-hidden"
        >
          {/* Background Blobs */}
          <motion.div
            className="absolute w-[800px] h-[800px] bg-primary opacity-10 blur-[300px] rounded-full -z-10 top-[-400px] left-[-400px]"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.1, 0.15, 0.1],
            }}
            transition={{ duration: 4 }}
          />

          <div className="relative flex flex-col items-center justify-center gap-8">
            {/* Animated Logo Container */}
            <motion.div
              variants={logoVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="relative"
            >
              {/* Glowing Aura */}
              <motion.div
                variants={glowVariants}
                initial="initial"
                animate="animate"
                className="absolute -inset-8 bg-gradient-to-r from-primary via-cyan-400 to-primary opacity-30 blur-3xl rounded-full"
              />

              {/* Main Logo Shape */}
              <div className="relative w-32 h-32 flex items-center justify-center">
                {/* Rotating Outer Ring */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity }}
                >
                  <div className="absolute inset-0 border-3 border-transparent border-t-primary border-r-cyan-400 rounded-full shadow-[0_0_30px_rgba(0,255,148,0.8)]" />
                </motion.div>

                {/* Counter-Rotating Inner Ring */}
                <motion.div
                  className="absolute inset-3 rounded-full"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 10, repeat: Infinity }}
                >
                  <div className="absolute inset-0 border-2 border-cyan-400/50 rounded-full" />
                </motion.div>

                {/* Center Text - NR */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span className="text-5xl font-black text-primary drop-shadow-[0_0_20px_rgba(0,255,148,0.8)]">
                    KNR
                  </span>
                </motion.div>
              </div>
            </motion.div>

            {/* Brand Name */}
            <motion.div
              variants={textVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="text-center"
            >
              <div className="flex items-center gap-2 justify-center mb-2">
                <span className="text-4xl font-black tracking-tighter text-white">
                  KNR
                </span>
                <motion.span
                  className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400"
                  animate={{
                    textShadow: [
                      "0 0 15px rgba(0,255,148,0.4), 0 0 25px rgba(34,211,238,0.2)",
                      "0 0 25px rgba(0,255,148,0.8), 0 0 40px rgba(34,211,238,0.5)",
                      "0 0 15px rgba(0,255,148,0.4), 0 0 25px rgba(34,211,238,0.2)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Tech
                </motion.span>
              </div>

              <motion.p
                className="text-lg text-primary/80 font-semibold tracking-widest mt-2"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                DIGITAL STUDIO
              </motion.p>
            </motion.div>

            {/* Animated Line */}
            <motion.div
              variants={lineVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="origin-left"
            >
              <div className="h-1 w-32 bg-gradient-to-r from-primary to-transparent rounded-full shadow-[0_0_20px_rgba(0,255,148,0.8)]" />
            </motion.div>

            {/* Loading Text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              exit={{ opacity: 0 }}
              className="mt-8"
            >
              <div className="flex items-center gap-3">
                <div className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 bg-primary rounded-full"
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                    />
                  ))}
                </div>
                <span className="text-sm text-primary/70 font-semibold uppercase tracking-wider">
                  Loading
                </span>
              </div>
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              exit={{ opacity: 0 }}
              className="text-center text-primary/60 text-sm mt-8 max-w-xs"
            >
              Premium Digital Engineering Studio
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
