import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import {
  Hero,
  Work,
  Services,
  About,
  Testimonials,
  Contact,
} from "@/components/sections";

export default function Home() {
  return (
    <>
      <Navigation />

      <main>
        <Hero />
        <Work />
        <Services />
        <About />
        <Testimonials />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
