import Nav from "@/components/ui/Nav";
import Hero from "@/components/sections/Hero";
import Manifesto from "@/components/sections/Manifesto";
import Services from "@/components/sections/Services";
import Work from "@/components/sections/Work";
import Process from "@/components/sections/Process";
import Stats from "@/components/sections/Stats";
import Testimonials from "@/components/sections/Testimonials";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main id="main-content" className="overflow-x-hidden w-full max-w-full">
      <Nav />
      <Hero />
      <Manifesto />
      <section id="services">
        <Services />
      </section>
      <Work />
      <div id="team" className="scroll-mt-24" />
      <section id="process">
        <Process />
      </section>
      <Stats />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  );
}
