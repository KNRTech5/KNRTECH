"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import { motion } from "framer-motion";
import { useState } from "react";

const testimonials = [
  {
    name: "Amit Sharma",
    role: "Founder",
    company: "TechNova",
    country: "India",
    project: "Corporate Website",
    rating: "5.0",
    website: "www.technova.com",
    text: "KNR Tech transformed our online presence completely.",
  },
  {
    name: "Sarah Williams",
    role: "CEO",
    company: "BrightCart",
    country: "USA",
    project: "E-Commerce Platform",
    rating: "5.0",
    website: "www.brightcart.com",
    text: "Exceptional quality and seamless communication.",
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="relative py-40 text-white overflow-hidden">

{/* Animated Background Blobs */}
  <div className="absolute inset-0 -z-10 overflow-hidden">

    <div className="blob blob1"></div>
    <div className="blob blob2"></div>
    <div className="blob blob3"></div>

  </div>


      <div className="max-w-6xl mx-auto px-6">

        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-6xl font-light mb-20 text-center"
        >
          Client <span className="text-primary">Experiences</span>
        </motion.h2>

        {/* Testimonial Slider */}
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          autoplay={{ delay: 2000 }}
          loop
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        >
          {testimonials.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-14 text-center shadow-[0_30px_80px_rgba(0,0,0,0.6)]">
                <p className="text-lg text-lightgray leading-relaxed mb-8">
                  “{item.text}”
                </p>

                <h3 className="text-xl font-semibold text-primary">
                  {item.name}
                </h3>

                <p className="text-sm text-lightgray mt-1">
                  {item.role}, {item.company}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Client Detail Block */}
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-16 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-12 shadow-[0_30px_80px_rgba(0,0,0,0.6)]"
        >
          <div className="grid md:grid-cols-3 gap-10 text-center md:text-left">

            <div>
              <h4 className="text-primary font-semibold mb-2">Company</h4>
              <p className="text-lightgray">
                {testimonials[activeIndex].company}
              </p>
            </div>

            <div>
              <h4 className="text-primary font-semibold mb-2">Country</h4>
              <p className="text-lightgray">
                {testimonials[activeIndex].country}
              </p>
            </div>

            <div>
              <h4 className="text-primary font-semibold mb-2">Project Type</h4>
              <p className="text-lightgray">
                {testimonials[activeIndex].project}
              </p>
            </div>

            <div>
              <h4 className="text-primary font-semibold mb-2">Rating</h4>
              <p className="text-lightgray">
                ⭐ {testimonials[activeIndex].rating}
              </p>
            </div>

            <div>
              <h4 className="text-primary font-semibold mb-2">Website</h4>
              <p className="text-lightgray">
                {testimonials[activeIndex].website}
              </p>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
