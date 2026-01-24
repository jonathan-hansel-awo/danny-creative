import { Hero } from "@/components/sections/Hero";

export default function Home() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <Hero />

      {/* Placeholder sections for scroll testing */}
      <section className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-4xl text-center">
          <p
            className="text-sm tracking-[0.2em] uppercase mb-6"
            style={{
              color: "var(--color-spark)",
              fontFamily: "Inter, sans-serif",
            }}
          >
            Selected Work
          </p>
          <h2
            className="text-4xl md:text-6xl"
            style={{ color: "var(--color-ink)" }}
          >
            Brands we&apos;ve brought to life.
          </h2>
        </div>
      </section>

      <section className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-4xl text-center">
          <p
            className="text-sm tracking-[0.2em] uppercase mb-6"
            style={{
              color: "var(--color-spark)",
              fontFamily: "Inter, sans-serif",
            }}
          >
            What We Do
          </p>
          <h2
            className="text-4xl md:text-6xl"
            style={{ color: "var(--color-ink)" }}
          >
            Everything your brand needs to shine.
          </h2>
        </div>
      </section>

      <section className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-4xl text-center">
          <h2
            className="text-4xl md:text-6xl italic"
            style={{ color: "var(--color-ink)" }}
          >
            &quot;We believe the best brands don&apos;t just look good—they make people
            feel something.&quot;
          </h2>
        </div>
      </section>

      <section className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-4xl text-center">
          <h2
            className="text-4xl md:text-6xl mb-8"
            style={{ color: "var(--color-ink)" }}
          >
            Ready to create?
          </h2>
          <button
            className="px-12 py-5 rounded-full text-lg font-medium transition-all duration-700 hover:scale-105"
            style={{
              backgroundColor: "var(--color-spark)",
              color: "white",
              fontFamily: "Inter, sans-serif",
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
