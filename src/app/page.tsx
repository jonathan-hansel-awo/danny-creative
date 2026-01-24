export default function Home() {
  return (
    <div className="relative">
      {/* Hero */}
      <section className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-4xl text-center">
          <p
            className="text-sm font-medium tracking-[0.2em] uppercase mb-6 text-[var(--color-spark)]"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Creative Branding Agency
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl leading-[0.95] mb-8 text-[var(--color-ink)]">
            We make brands
            <br />
            <span className="text-[var(--color-spark)]">people remember.</span>
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-12 text-[var(--color-ink-light)] leading-relaxed">
            Strategy, identity, and digital experiences for businesses that
            refuse to blend in.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              className="px-8 py-4 rounded-full bg-[var(--color-ink)] text-[var(--color-cream)] font-medium transition-all duration-500 hover:bg-[var(--color-spark)] hover:-translate-y-0.5"
              style={{ fontFamily: "Inter, sans-serif" }}
              data-spark-hover
            >
              See Our Work
            </button>
            <button
              className="px-8 py-4 rounded-full border-2 border-[var(--color-ink)] text-[var(--color-ink)] font-medium transition-all duration-500 hover:border-[var(--color-spark)] hover:text-[var(--color-spark)]"
              style={{ fontFamily: "Inter, sans-serif" }}
              data-spark-hover
            >
              Let&apos;s Talk
            </button>
          </div>
        </div>
      </section>

      {/* Test sections for scroll */}
      <section className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-4xl text-center">
          <p
            className="text-sm tracking-[0.2em] uppercase mb-6 text-[var(--color-spark)]"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Selected Work
          </p>
          <h2 className="text-4xl md:text-6xl text-[var(--color-ink)]">
            Brands we&apos;ve brought to life.
          </h2>
        </div>
      </section>

      <section className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-4xl text-center">
          <p
            className="text-sm tracking-[0.2em] uppercase mb-6 text-[var(--color-spark)]"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            What We Do
          </p>
          <h2 className="text-4xl md:text-6xl text-[var(--color-ink)]">
            Everything your brand needs to shine.
          </h2>
        </div>
      </section>

      <section className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-4xl text-center">
          <h2 className="text-4xl md:text-6xl text-[var(--color-ink)] italic">
            &quot;We believe the best brands don&apos;t just look good—they make people
            feel something.&quot;
          </h2>
        </div>
      </section>

      <section className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-4xl text-center">
          <h2 className="text-4xl md:text-6xl text-[var(--color-ink)] mb-8">
            Ready to create?
          </h2>
          <button
            className="px-12 py-5 rounded-full bg-[var(--color-spark)] text-white text-lg font-medium transition-all duration-500 hover:scale-105"
            style={{ fontFamily: "Inter, sans-serif" }}
            data-spark-hover
          >
            Start a Conversation
          </button>
        </div>
      </section>
    </div>
  );
}
