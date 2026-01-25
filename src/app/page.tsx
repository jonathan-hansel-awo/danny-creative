import { Hero } from '@/components/sections/Hero';
import { Work } from '@/components/sections/Work';
import { WorkProgress } from '@/components/work/WorkProgress';
import { Services } from '@/components/sections/Services';
import { About } from '@/components/sections/About';
import { Testimonials } from '@/components/sections/Testimonials';

export default function Home() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <Hero />

      {/* Work Section */}
      <Work />

      {/* Work Progress Indicator */}
      <WorkProgress />

      {/* Services Section */}
      <Services />

      {/* About Section */}
      <About />

      {/* Testimonials Section */}
      <Testimonials />

      {/* Contact Section - Placeholder */}
      <section
        className="min-h-screen flex items-center justify-center px-6"
        style={{ backgroundColor: 'var(--color-cream)' }}
      >
        <div className="max-w-4xl text-center">
          <p
            className="text-sm font-medium tracking-[0.2em] uppercase mb-6"
            style={{ color: '#D4940F' }}
          >
            Let&apos;s Connect
          </p>
          <h2
            className="text-4xl md:text-6xl mb-6"
            style={{
              color: '#0F0F0F',
              fontFamily: 'Tenor Sans, Georgia, serif',
            }}
          >
            Ready to create something amazing?
          </h2>
          <p
            className="text-lg md:text-xl mb-12 max-w-2xl mx-auto"
            style={{ color: '#4A4A4A' }}
          >
            Let&apos;s talk about your brand.
          </p>
          <button
            className="px-12 py-5 rounded-full text-lg font-medium transition-all duration-700 hover:scale-105 hover:shadow-xl"
            style={{
              backgroundColor: '#D4940F',
              color: 'white',
              fontFamily: 'Inter, sans-serif',
            }}
            data-spark-hover
          >
            Start a Conversation
          </button>
        </div>
      </section>
    </div>
  );
}
