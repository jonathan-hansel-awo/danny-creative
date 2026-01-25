import { Hero } from '@/components/sections/Hero';
import { Work } from '@/components/sections/Work';
import { WorkProgress } from '@/components/work/WorkProgress';

export default function Home() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <Hero />

      {/* Work Section */}
      <Work />

      {/* Work Progress Indicator */}
      <WorkProgress />

      {/* Placeholder for next sections */}
      <section
        className="min-h-screen flex items-center justify-center px-6"
        style={{ backgroundColor: 'var(--color-cream-dark)' }}
      >
        <div className="max-w-4xl text-center">
          <p
            className="text-sm font-medium tracking-[0.2em] uppercase mb-6"
            style={{ color: '#D4940F' }}
          >
            What We Do
          </p>
          <h2
            className="text-4xl md:text-6xl"
            style={{
              color: '#0F0F0F',
              fontFamily: 'Tenor Sans, Georgia, serif',
            }}
          >
            Everything your brand needs to shine.
          </h2>
        </div>
      </section>

      <section
        className="min-h-screen flex items-center justify-center px-6"
        style={{ backgroundColor: 'var(--color-cream)' }}
      >
        <div className="max-w-4xl text-center">
          <h2
            className="text-4xl md:text-5xl italic"
            style={{
              color: '#0F0F0F',
              fontFamily: 'Tenor Sans, Georgia, serif',
            }}
          >
            &quot;We believe the best brands don&apos;t just look good—they make people feel something.&quot;
          </h2>
        </div>
      </section>

      <section
        className="min-h-screen flex items-center justify-center px-6"
        style={{ backgroundColor: 'var(--color-cream-dark)' }}
      >
        <div className="max-w-4xl text-center">
          <h2
            className="text-4xl md:text-6xl mb-8"
            style={{
              color: '#0F0F0F',
              fontFamily: 'Tenor Sans, Georgia, serif',
            }}
          >
            Ready to create?
          </h2>
          <button
            className="px-12 py-5 rounded-full text-lg font-medium transition-all duration-700 hover:scale-105"
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
