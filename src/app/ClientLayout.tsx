"use client";

import Navbar from "@/components/layout/Navbar";
import CustomCursor from "@/components/CustomCursor";
import SplashScreen from "@/components/SplashScreen";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import Footer from "@/components/layout/Footer";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  useEffect(() => {
    if (isAdmin) {
      document.body.style.cursor = "auto";
    } else {
      document.body.style.cursor = "none";
    }
  }, [isAdmin]);

  return (
    <>
      {/* ===== Splash Screen on Initial Load ===== */}
      {!isAdmin && <SplashScreen />}

      {/* ===== UI Components ===== */}
      {!isAdmin && <CustomCursor />}
      {!isAdmin && <Navbar />}

      {/* ===== Page Content with Smooth Transitions ===== */}
      <AnimatePresence mode="wait">
        <motion.main
          key={pathname}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{
            duration: 0.4,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="relative z-10"
        >
          {children}
        </motion.main>
      </AnimatePresence>
      {!isAdmin && <Footer />}
    </>
  );
}
