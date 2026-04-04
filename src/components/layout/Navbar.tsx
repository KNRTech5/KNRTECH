"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import Image from "next/image";
import KNRLogo from "./KNRLogo";
import { useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [flash, setFlash] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const smoothX = useSpring(rotateX, { stiffness: 140, damping: 18 });
  const smoothY = useSpring(rotateY, { stiffness: 140, damping: 18 });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const x = (window.innerWidth / 2 - e.clientX) / 100;
      const y = (window.innerHeight / 2 - e.clientY) / 100;
      rotateX.set(y);
      rotateY.set(-x);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [rotateX, rotateY]);

  useEffect(() => {
    setFlash(true);
    const timeout = setTimeout(() => setFlash(false), 300);
    return () => clearTimeout(timeout);
  }, [pathname]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const getBackground = () => {
    if (pathname.includes("services")) return "bg-primary/10";
    if (pathname.includes("portfolio")) return "bg-blue-500/10";
    if (pathname.includes("pricing")) return "bg-purple-500/10";
    if (pathname.includes("about")) return "bg-yellow-500/10";
    return "bg-white/5";
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Pricing", href: "/pricing" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <div className="fixed top-2 left-0 right-0 z-50 flex justify-center px-4">

        {/* Flash overlay on route change */}
        <AnimatePresence>
          {flash && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.15 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-primary pointer-events-none z-[999]"
            />
          )}
        </AnimatePresence>

        <motion.nav
          style={{ rotateX: smoothX, rotateY: smoothY }}
          animate={{
            borderRadius: scrolled ? "28px" : "18px",
            scale: scrolled ? 0.96 : 1,
          }}
          transition={{ duration: 0.4 }}
          className={`relative h-20 px-6 w-full max-w-6xl flex items-center justify-between
          backdrop-blur-xl border transition-all duration-500
          ${getBackground()}
          ${
            scrolled
              ? "bg-black/85 border-primary/40"
              : "border-white/10"
          }
          shadow-[0_20px_60px_rgba(0,0,0,0.6)]`}
        >
          {/* Logo */}
          <Link href="/" className="relative z-10 flex items-center flex-shrink-0">
            <KNRLogo />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 text-sm uppercase tracking-wider relative z-10">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <MagneticLink
                  key={link.name}
                  href={link.href}
                  active={isActive}
                >
                  {link.name}
                </MagneticLink>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex gap-4 items-center">
            {session && (
              <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.96 }}>
                <Link
                  href="/admin/dashboard"
                  className="px-5 py-2 text-sm bg-primary/10 border border-primary/50 text-primary backdrop-blur-md shadow-[0_0_15px_rgba(0,255,148,0.2)] hover:bg-primary/20 transition rounded-full font-bold uppercase tracking-widest"
                >
                  Admin Panel
                </Link>
              </motion.div>
            )}

            <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.96 }}>
              <Link
                href="/contact"
                className="px-5 py-2 text-sm bg-black/60 border border-primary text-white backdrop-blur-md shadow-[0_0_20px_rgba(0,255,148,0.3)] hover:bg-primary/20 hover:shadow-[0_0_40px_rgba(0,255,148,0.7)] font-semibold rounded-full shadow-[0_0_20px_rgba(0,255,148,0.6)] transition duration-300"
              >
                Get Quote
              </Link>
            </motion.div>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden relative z-10 w-10 h-10 flex flex-col justify-center items-center gap-1.5 rounded-lg hover:bg-white/5 transition"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              className="block w-6 h-0.5 bg-white rounded-full"
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              className="block w-6 h-0.5 bg-white rounded-full"
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              className="block w-6 h-0.5 bg-white rounded-full"
            />
          </button>

        </motion.nav>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-24 left-4 right-4 z-40 md:hidden"
          >
            <div className="bg-black/90 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 shadow-[0_30px_80px_rgba(0,0,0,0.8)] overflow-hidden">
              {/* Green glow inside mobile menu */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-60" />

              <div className="flex flex-col gap-2">
                {navLinks.map((link, index) => {
                  const isActive = pathname === link.href;
                  return (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.06 }}
                    >
                      <Link
                        href={link.href}
                        className={`flex items-center justify-between px-5 py-4 rounded-2xl transition-all duration-300 ${
                          isActive
                            ? "bg-primary/15 text-primary border border-primary/30"
                            : "text-white/70 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        <span className="text-sm uppercase tracking-widest">{link.name}</span>
                        {isActive && <span className="text-primary text-xs">●</span>}
                      </Link>
                    </motion.div>
                  );
                })}

                <div className="mt-4 pt-4 border-t border-white/10 flex flex-col gap-3">
                  {session && (
                    <Link
                      href="/admin/dashboard"
                      className="block text-center px-5 py-4 bg-primary/10 border border-primary/40 text-primary backdrop-blur-md rounded-2xl font-bold uppercase tracking-widest transition"
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <Link
                    href="/contact"
                    className="block text-center px-5 py-4 bg-black/60 border border-primary text-white backdrop-blur-md shadow-[0_0_20px_rgba(0,255,148,0.3)] hover:bg-primary/20 hover:shadow-[0_0_40px_rgba(0,255,148,0.7)] font-semibold rounded-2xl shadow-[0_0_30px_rgba(0,255,148,0.6)] hover:scale-[1.02] transition"
                  >
                    Get a Free Quote →
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ================= MAGNETIC LINK ================= */

function MagneticLink({
  children,
  href,
  active,
}: {
  children: React.ReactNode;
  href: string;
  active: boolean;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 350, damping: 20 });
  const springY = useSpring(y, { stiffness: 350, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const moveX = (e.clientX - rect.left - rect.width / 2) / 4;
    const moveY = (e.clientY - rect.top - rect.height / 2) / 4;
    x.set(moveX);
    y.set(moveY);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      className="relative cursor-pointer"
    >
      <Link
        href={href}
        className={`transition-colors duration-300 ${
          active
            ? "text-primary"
            : "text-white/70 hover:text-white"
        }`}
      >
        {children}
      </Link>

      {active && (
        <>
          <motion.div
            layoutId="nav-underline"
            className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-primary rounded-full shadow-[0_0_10px_rgba(0,255,148,0.8)]"
          />
          <motion.div
            layoutId="nav-glow"
            className="absolute inset-0 -z-10 bg-primary/10 blur-md rounded-lg"
          />
        </>
      )}
    </motion.div>
  );
}