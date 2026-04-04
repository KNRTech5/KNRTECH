"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useState, useRef } from "react";
import WebGLEnergy from "@/components/WebGLEnergy";
import RevenueGraph from "@/components/RevenueGraph";


export default function PricingPage() {
  const [yearly, setYearly] = useState(false);
  const [currency, setCurrency] = useState("INR");
  const [selected, setSelected] = useState("Growth");
  const [traffic, setTraffic] = useState(5000);

  const currencySymbol = currency === "INR" ? "₹" : "$";
  // Use actual exchange rate (1 INR ≈ 0.012 USD) - In production, fetch from API
  const exchangeRate = 0.012;
  const multiplier = currency === "INR" ? 1 : exchangeRate;

  const recommended =
    traffic < 10000
      ? "Starter"
      : traffic < 50000
      ? "Growth"
      : "Enterprise";

  return (
    <main className="relative py-40 px-6 text-white overflow-hidden">
      {/* WebGL Background */}
      <WebGLEnergy />

      {/* HERO */}
      <section className="text-center mb-24 relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl font-light mb-8"
        >
          Premium <span className="text-primary">Pricing</span>
        </motion.h1>

        {/* Currency Switch */}
        <div className="flex justify-center gap-6 mb-8">
          {["INR", "USD"].map((cur) => (
            <button
              key={cur}
              onClick={() => setCurrency(cur)}
              className={`px-6 py-2 rounded-full border ${
                currency === cur
                  ? "bg-primary text-white"
                  : "border-white/20"
              }`}
            >
              {cur}
            </button>
          ))}
        </div>

        {/* Monthly/Yearly Toggle */}
        <div className="flex items-center justify-center gap-6 mb-8">
          <span>Monthly</span>
          <button
            onClick={() => setYearly(!yearly)}
            className="relative w-16 h-8 bg-white/10 rounded-full"
          >
            <motion.div
              animate={{ x: yearly ? 32 : 0 }}
              className="absolute top-1 left-1 w-6 h-6 bg-primary rounded-full"
            />
          </button>
          <span>Yearly (Save 20%)</span>
        </div>

        {/* AI Recommendation */}
        <div className="max-w-xl mx-auto">
          <p className="text-lightgray mb-4">
            Monthly Website Visitors:
          </p>
          <input
            type="range"
            min="1000"
            max="100000"
            value={traffic}
            onChange={(e) => setTraffic(Number(e.target.value))}
            className="w-full mb-4"
          />
          <p className="text-primary text-lg">
            Recommended Plan: {recommended}
          </p>
        </div>
      </section>

      {/* PRICING CARDS */}
      <section className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12 mb-32 relative z-10">
        {plans.map((plan) => {
          const basePrice = yearly ? plan.yearly : plan.monthly;
          const converted = Math.round(basePrice * multiplier);

          return (
            <PricingCard
              key={plan.name}
              plan={plan}
              converted={converted}
              currencySymbol={currencySymbol}
              yearly={yearly}
              selected={selected}
              setSelected={setSelected}
            />
          );
        })}
      </section>

      {/* Revenue Graph */}
      <section className="max-w-6xl mx-auto mb-32 relative z-10">
        <RevenueGraph />
      </section>

      {/* ROI Calculator */}
      <ROICalculator currencySymbol={currencySymbol} />

      {/* Comparison Table */}
      <ComparisonTable />
    </main>
  );
}

/* ================= PRICING CARD ================= */

interface PricingPlan {
  name: string;
  monthly: number;
  yearly: number;
  features: string[];
}

interface PricingCardProps {
  plan: PricingPlan;
  converted: number;
  currencySymbol: string;
  yearly: boolean;
  selected: string;
  setSelected: (plan: string) => void;
}

function PricingCard({
  plan,
  converted,
  currencySymbol,
  yearly,
  selected,
  setSelected,
}: PricingCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const smoothX = useSpring(rotateX, { stiffness: 150, damping: 15 });
  const smoothY = useSpring(rotateY, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    rotateX.set(-(y - rect.height / 2) / 20);
    rotateY.set((x - rect.width / 2) / 20);
  };

  const handleCheckout = async () => {
    try {
      const res = await fetch("/api/create-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ price: converted }),
      });

      if (!res.ok) {
        throw new Error("Failed to create checkout session");
      }

      const data = await res.json();
      if (!data.url) {
        throw new Error("No checkout URL returned");
      }

      window.location.href = data.url;
    } catch (error) {
      console.error("Checkout error:", error);
      alert(
        error instanceof Error ? error.message : "Failed to start checkout"
      );
    }
  };

  return (
    <motion.div
      ref={ref}
      style={{ rotateX: smoothX, rotateY: smoothY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        rotateX.set(0);
        rotateY.set(0);
      }}
      onClick={() => setSelected(plan.name)}
      className={`relative p-12 rounded-3xl backdrop-blur-xl border cursor-pointer transition ${
        selected === plan.name
          ? "border-primary shadow-[0_0_40px_rgba(0,255,148,0.8)]"
          : "border-white/10"
      } bg-white/5`}
    >
      <h3 className="text-3xl text-primary mb-6">
        {plan.name}
      </h3>

      <div className="text-5xl mb-8">
        {currencySymbol}
        {converted}
        <span className="text-lightgray text-lg ml-2">
          / {yearly ? "year" : "month"}
        </span>
      </div>

      <ul className="space-y-4 mb-10">
        {plan.features.map((feature: string, index: number) => (
          <li key={index} className="flex items-center gap-3">
            <span className="w-2 h-2 bg-primary rounded-full" />
            {feature}
          </li>
        ))}
      </ul>

      <button
        onClick={(e) => {
          e.stopPropagation();
          handleCheckout();
        }}
        className="block text-center px-8 py-4 bg-primary text-white rounded-full hover:shadow-[0_0_30px_rgba(0,255,148,0.6)] transition"
      >
        Get Started →
      </button>
    </motion.div>
  );
}

/* ================= ROI ================= */

interface ROICalculatorProps {
  currencySymbol: string;
}

function ROICalculator({ currencySymbol }: ROICalculatorProps) {
  const [revenue, setRevenue] = useState(100000);
  const estimated = revenue * 1.3;

  return (
    <section className="max-w-5xl mx-auto mb-40 text-center relative z-10">
      <h2 className="text-4xl text-primary mb-8">ROI Calculator</h2>

      <input
        type="range"
        min="50000"
        max="1000000"
        value={revenue}
        onChange={(e) => setRevenue(Number(e.target.value))}
        className="w-full mb-8"
      />

      <p className="text-lightgray text-lg mb-4">
        Current Revenue: {currencySymbol}
        {revenue.toLocaleString()}
      </p>

      <p className="text-3xl text-primary">
        Potential Revenue: {currencySymbol}
        {Math.round(estimated).toLocaleString()}
      </p>
    </section>
  );
}

/* ================= COMPARISON ================= */

function ComparisonTable() {
  return (
    <section className="max-w-7xl mx-auto text-center relative z-10">
      <h2 className="text-4xl text-primary mb-12">
        Compare Plans
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full border border-white/10">
          <thead>
            <tr className="bg-white/5">
              <th className="p-4">Features</th>
              <th className="p-4">Starter</th>
              <th className="p-4">Growth</th>
              <th className="p-4">Enterprise</th>
            </tr>
          </thead>
          <tbody>
            {comparisonData.map((row, index) => (
              <tr key={index} className="border-t border-white/10">
                <td className="p-4 text-lightgray">{row.feature}</td>
                <td className="p-4">{row.starter}</td>
                <td className="p-4">{row.growth}</td>
                <td className="p-4">{row.enterprise}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

/* ================= DATA ================= */

const plans = [
  {
    name: "Starter",
    monthly: 99,
    yearly: 799,
    features: ["Basic Website", "SEO Setup", "1 Month Support"],
  },
  {
    name: "Growth",
    monthly: 249,
    yearly: 1999,
    features: ["Multi Page Site", "Advanced SEO", "3 Months Support"],
  },
  {
    name: "Enterprise",
    monthly: 599,
    yearly: 4999,
    features: ["Web App", "AI Integration", "6 Months Support"],
  },
];

const comparisonData = [
  { feature: "Responsive Design", starter: "✔", growth: "✔", enterprise: "✔" },
  { feature: "SEO Optimization", starter: "Basic", growth: "Advanced", enterprise: "Advanced" },
  { feature: "AI Integration", starter: "✖", growth: "✖", enterprise: "✔" },
];