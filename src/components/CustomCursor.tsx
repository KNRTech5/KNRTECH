"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Raw position
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth position for outer circle - optimized spring config for smoothness
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  // Outset positions for the 8x8 circle (center it)
  const outerX = useTransform(smoothX, (latest) => latest - 12);
  const outerY = useTransform(smoothY, (latest) => latest - 12);

  useEffect(() => {
    // Check if device supports hover
    const hasHover = window.matchMedia("(hover: hover)").matches;
    if (!hasHover) return;

    setIsVisible(true);

    let lastTime = 0;
    const throttleDelay = 8; // ~120fps

    const updatePosition = (e: MouseEvent) => {
      const currentTime = Date.now();
      if (currentTime - lastTime >= throttleDelay) {
        cursorX.set(e.clientX - 4);
        cursorY.set(e.clientY - 4);
        lastTime = currentTime;
      }
    };

    const updateHoverState = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if hovering over interactive elements
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest(".service-card") ||
        target.closest(".group")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", updatePosition, { passive: true });
    window.addEventListener("mouseover", updateHoverState, { passive: true });

    return () => {
      window.removeEventListener("mousemove", updatePosition);
      window.removeEventListener("mouseover", updateHoverState);
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Small fast dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-primary rounded-full pointer-events-none z-[9999] mix-blend-screen"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          scale: isHovering ? 0 : 1,
        }}
        transition={{
          type: "tween",
          ease: "backOut",
          duration: 0.1,
        }}
      />

      {/* Larger smooth trailing circle */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9998] border border-primary/50 mix-blend-screen shadow-[0_0_15px_rgba(0,255,148,0.4)]"
        style={{
          x: outerX,
          y: outerY,
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? "rgba(0,255,148,0.1)" : "rgba(0,255,148,0)",
        }}
      />
    </>
  );
}
