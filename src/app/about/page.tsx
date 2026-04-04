"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

/* ================= TEAM DATA ================= */

const team = [
  { name: "Kratika Solanki", role: "Founder & Creative Director", initials: "KS", image: "/team/team-1.jpeg" },
  { name: "Nikhil Soni", role: "Lead Developer", initials: "NS", image: "/team/team-2.webp" },
  { name: "Ridhima Mishra", role: "UI/UX Designer", initials: "RM", image: "/team/team-3.jpeg" },
  { name: "Rishika mishra", role: "Frontend Engineer", initials: "RM", image: "/team/team-4.jpeg" },
  { name: "Ronak Shukwal", role: "Marketing Strategist", initials: "RS", image: "/team/team-5.jpeg" },
];

export default function AboutPage() {
  return (
    <main className="relative text-white overflow-hidden">

      {/* ================= HERO ================= */}

      <section className="relative min-h-screen flex items-center justify-center text-center px-6">

        <div className="absolute inset-0 -z-10 overflow-hidden">

          <div className="blob blob1"></div>
          <div className="blob blob2"></div>
          <div className="blob blob3"></div>

        </div>

        <Image
          src="/about/about-hero.png"
          alt="Agency"
          fill
          className="object-cover opacity-100"
        />

        <div className="absolute inset-0 bg-black/70" />

        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 max-w-4xl"
        >
          <h1 className="text-6xl md:text-8xl font-light mb-8">
            Crafting <br />
            <span className="bg-gradient-to-r from-primary via-white to-primary bg-clip-text text-transparent animate-pulse"> Digital Excellence</span>
          </h1>

          <p className="text-xl text-lightgray">
            We build scalable, high-performance digital systems
            for ambitious global brands.
          </p>
        </motion.div>

      </section>

      {/* ================= VISION ================= */}
      <SectionBlock
        title="Our Vision"
        text="To become a globally recognized digital powerhouse known for innovation, performance, and scalable engineering."
        image="/about/vision.png"
        reverse={true}
      />

      {/* ================= MISSION ================= */}
      <SectionBlock
        title="Our Mission"
        text="To engineer high-performance digital systems that empower ambitious brands to scale globally."
        image="/about/mission.png"
        reverse={false}
      />



      {/* ================= JOURNEY ================= */}
      <SectionBlock
        title="Our Journey"
        text="From a creative initiative to a performance-driven engineering studio, our journey has been defined by innovation and growth."
        image="/about/journey.png"
        reverse={false}
      />

      {/* ================= CORE VALUES ================= */}

      <section className="py-40 px-6 text-center">
        <h2 className="text-5xl font-light mb-20">
          Our Core <span className="text-primary">Values</span>
        </h2>

        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-16">

          {[
            { title: "Performance First", img: "/about/values1.png" },
            { title: "Strategic Thinking", img: "/scraped/tech-16.jpg" },
            { title: "Scalable Engineering", img: "/scraped/tech-17.jpg" },
          ].map((value, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="relative h-[350px] rounded-3xl overflow-hidden shadow-[0_40px_120px_rgba(0,0,0,0.6)] group"
            >
              <Image
                src={value.img}
                alt={value.title}
                fill
                className="object-cover opacity-100 group-hover:scale-110 transition duration-700"
              />

              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <h3 className="text-2xl text-primary">
                  {value.title}
                </h3>
              </div>

              <div className="absolute inset-0 border border-primary/20 opacity-0 group-hover:opacity-100 transition duration-500 shadow-[0_0_50px_rgba(0,255,148,0.6)] rounded-3xl" />
            </motion.div>
          ))}

        </div>
      </section>

      {/* ================= TEAM ================= */}

      <section className="py-40 px-6 text-center">

        <h2 className="text-5xl font-light mb-20">
          Meet Our <span className="bg-[length:200%_auto] animate-gradientMove text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-primary">Team</span>
        </h2>

        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-16">

          {team.map((member, index) => (
            <TeamCard key={index} member={member} index={index} />
          ))}

        </div>

      </section>

      {/* ================= CTA ================= */}

      <section className="py-40 text-center px-6">
        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-5xl font-light mb-10"
        >
          Let’s Build The <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-green-100 to-primary bg-[length:200%_auto] animate-gradientMove">Future</span> Together
        </motion.h2>

        <motion.a
          href="/contact"
          whileHover={{ scale: 1.05 }}
          className="inline-block px-12 py-5 bg-primary text-white rounded-full font-semibold shadow-[0_0_40px_rgba(0,255,148,0.8)]"
        >
          Start Your Project →
        </motion.a>
      </section>

    </main>
  );
}

{/* ================= REUSABLE SECTION BLOCK ================= */ }

interface SectionBlockProps {
  title: string;
  text: string;
  image: string;
  reverse?: boolean;
}

function SectionBlock({ title, text, image, reverse = false }: SectionBlockProps) {
  return (
    <section className="py-40 px-6">
      <div
        className={`max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center ${reverse ? "md:[&>*:first-child]:order-2" : ""
          }`}
      >

        <motion.div
          initial={{ opacity: 0, x: reverse ? 80 : -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-light mb-8">
            <span className="text-primary">{title}</span>
          </h2>

          <p className="text-lightgray text-lg leading-relaxed">
            {text}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="relative h-[500px] rounded-3xl overflow-hidden shadow-[0_40px_120px_rgba(0,0,0,0.6)]"
        >
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
          />
        </motion.div>

      </div>
    </section>
  );
}

/* ================= TEAM CARD WITH 3D HOVER ================= */

interface TeamMember {
  name: string;
  role: string;
  initials: string;
  image?: string;
}

interface TeamCardProps {
  member: TeamMember;
  index: number;
}

function TeamCard({ member, index }: TeamCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const smoothX = useSpring(rotateX, { stiffness: 100, damping: 20 });
  const smoothY = useSpring(rotateY, { stiffness: 100, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Create spotlight variables
    cardRef.current.style.setProperty("--x", `${x}px`);
    cardRef.current.style.setProperty("--y", `${y}px`);

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    rotateX.set(-(y - centerY) / 20);
    rotateY.set((x - centerX) / 20);
  };

  const clearRotation = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      viewport={{ once: true }}
      style={{
        rotateX: smoothX,
        rotateY: smoothY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={clearRotation}
      className="relative rounded-3xl overflow-hidden bg-white/5 backdrop-blur-3xl border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.6)] group cursor-pointer"
    >
      {/* Dynamic Avatar Container */}
      <div
        className="relative h-[380px] bg-gradient-to-b from-[#020805] via-[#04110c] to-[#020805] flex items-center justify-center overflow-hidden"
        style={{ transform: "translateZ(30px)" }}
      >
        {/* Animated Cyber Grid Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,148,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,148,0.04)_1px,transparent_1px)] bg-[size:25px_25px] opacity-10 group-hover:opacity-40 transition-opacity duration-700" />

        {/* Profile Image or Initials Logo */}
        {member.image ? (
          <Image
            src={member.image}
            alt={member.name}
            fill
            className="object-cover opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
          />
        ) : (
          <h3 className="text-9xl font-light tracking-tighter mix-blend-screen transition-all duration-700 group-hover:scale-110 text-primary/10 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-[length:200%_auto] group-hover:animate-gradientMove group-hover:bg-gradient-to-br group-hover:from-white group-hover:via-primary group-hover:to-green-900 group-hover:drop-shadow-[0_0_30px_rgba(0,255,148,0.5)]">
            {member.initials}
          </h3>
        )}

        {/* Spotlight Follows Mouse Pointer */}
        <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition duration-700 bg-[radial-gradient(circle_at_var(--x,_50%)_var(--y,_50%),rgba(0,255,148,0.2),transparent_70%)]" />

        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent pointer-events-none" />
      </div>

      {/* Floating Meta Details */}
      <div
        className="p-8 relative bg-black/50 backdrop-blur-md"
        style={{ transform: "translateZ(50px)" }}
      >
        <h3 className="text-3xl font-semibold text-white/50 group-hover:text-white transition-colors duration-500 mb-2">
          {member.name}
        </h3>
        <p className="text-primary/60 text-sm tracking-widest uppercase font-mono group-hover:text-primary transition-colors duration-500">
          {member.role}
        </p>
      </div>

      {/* Pulsating Neon Border on Hover */}
      <div
        className="absolute inset-0 rounded-3xl border border-primary/0 group-hover:border-primary/50 transition duration-500 shadow-[0_0_0px_rgba(0,255,148,0)] group-hover:shadow-[0_0_80px_rgba(0,255,148,0.35)] pointer-events-none"
        style={{ transform: "translateZ(0px)" }}
      />
    </motion.div>
  );
}
