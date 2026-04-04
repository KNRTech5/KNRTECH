import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Portfolio from "@/components/sections/Portfolio";
import WhyChoose from "@/components/sections/WhyChoose";
import Testimonials from "@/components/sections/Testimonials";
import OurProcess from "@/components/sections/OurProcess";
import FeaturedCaseStudy from "@/components/sections/FeaturedCaseStudy";
import CinematicCTA from "@/components/sections/CinematicCTA";



export default function Home() {
  return (
    <main>
      <Hero />
      <WhyChoose />
      <Services />
      <Portfolio />
      <Testimonials />
      <OurProcess />
      <FeaturedCaseStudy />
      <CinematicCTA />
      
    </main>
  );
}
