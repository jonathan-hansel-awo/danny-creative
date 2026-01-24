import { Hero } from "@/components/sections/Hero";
import { Work } from "@/components/sections/Work";

export default function Home() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <Hero />

      {/* Work Section */}
      <Work />

      {/* Placeholder sections for remaining content */}
      <section className="min-h-screen flex items-center justify-center px-6 bg-[var(--color-cream)]">
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

      <section className="min-h-screen flex items-center justify-center px-6 bg-[var(--color-cream)]">
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

      <section className="min-h-screen flex items-center justify-center px-6 bg-[var(--color-cream)]">
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
