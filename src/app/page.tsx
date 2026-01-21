import React from "react";

export default function DesignSystemPage() {
  return (
    <main className="min-h-screen bg-cream">
      {/* Header */}
      <header className="section-padding bg-cream-dark">
        <div className="container-lg">
          <p className="eyebrow mb-4">Design System v3.0</p>
          <h1 className="display-xl mb-6">
            Danny Creative
            <span className="text-spark">.</span>
          </h1>
          <p className="body-lg max-w-[600px]">
            A warm, light aesthetic with &lquote;The Spark&rquot; as the signature amber
            accent element. This page demonstrates all design tokens.
          </p>
        </div>
      </header>

      {/* Color Palette */}
      <section className="section-padding">
        <div className="container-lg">
          <p className="eyebrow mb-4">Colors</p>
          <h2 className="display-lg mb-12">Color Palette</h2>

          {/* Background Colors */}
          <h3 className="display-md mb-8">Backgrounds</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <ColorSwatch
              name="Cream"
              token="--color-cream"
              hex="#FAF7F2"
              className="bg-cream border border-ink/10"
            />
            <ColorSwatch
              name="Cream Dark"
              token="--color-cream-dark"
              hex="#F0EBE3"
              className="bg-cream-dark"
            />
            <ColorSwatch
              name="Warm White"
              token="--color-warm-white"
              hex="#FFFEFB"
              className="bg-warm-white border border-ink/10"
            />
          </div>

          {/* Text Colors */}
          <h3 className="display-md mb-8">Text Colors</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <ColorSwatch
              name="Ink"
              token="--color-ink"
              hex="#1A1A1A"
              className="bg-ink"
              textLight
            />
            <ColorSwatch
              name="Ink Light"
              token="--color-ink-light"
              hex="#4A4A4A"
              className="bg-ink-light"
              textLight
            />
            <ColorSwatch
              name="Ink Muted"
              token="--color-ink-muted"
              hex="#8A8A8A"
              className="bg-ink-muted"
              textLight
            />
          </div>

          {/* Accent Colors */}
          <h3 className="display-md mb-8">The Spark & Accents</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            <ColorSwatch
              name="Spark"
              token="--color-spark"
              hex="#E8A54B"
              className="bg-spark"
            />
            <ColorSwatch
              name="Spark Light"
              token="--color-spark-light"
              hex="#F5D49B"
              className="bg-spark-light"
            />
            <ColorSwatch
              name="Spark Dark"
              token="--color-spark-dark"
              hex="#D4922F"
              className="bg-spark-dark"
            />
            <ColorSwatch
              name="Coral"
              token="--color-coral"
              hex="#E87461"
              className="bg-coral"
            />
            <ColorSwatch
              name="Sage"
              token="--color-sage"
              hex="#A8B5A0"
              className="bg-sage"
            />
          </div>
        </div>
      </section>

      {/* Typography */}
      <section className="section-padding bg-cream-dark">
        <div className="container-lg">
          <p className="eyebrow mb-4">Typography</p>
          <h2 className="display-lg mb-12">Type Scale</h2>

          <div className="space-y-12">
            <TypeSample
              name="Display XL"
              size="clamp(2.5rem, 8vw, 5rem)"
              sample="We make brands"
              className="display-xl"
            />
            <TypeSample
              name="Display LG"
              size="clamp(2rem, 6vw, 3.5rem)"
              sample="Brands we've brought to life"
              className="display-lg"
            />
            <TypeSample
              name="Display MD"
              size="clamp(1.75rem, 4vw, 2.5rem)"
              sample="Everything your brand needs"
              className="display-md"
            />
            <TypeSample
              name="Heading"
              size="clamp(1.5rem, 3vw, 1.75rem)"
              sample="Brand Strategy"
              className="text-[length:var(--text-heading)] leading-[var(--leading-heading)] text-ink"
            />
            <TypeSample
              name="Body LG"
              size="clamp(1.125rem, 2vw, 1.25rem)"
              sample="Strategy, identity, and digital experiences for businesses that refuse to blend in."
              className="body-lg"
            />
            <TypeSample
              name="Body"
              size="1.0625rem"
              sample="We believe the best brands don't just look good — they make people feel something. Danny Creative is a branding agency for businesses that want to stand out."
              className="text-[length:var(--text-body)] leading-[var(--leading-body)] text-ink-light"
            />
            <TypeSample
              name="Body SM"
              size="0.9375rem"
              sample="Professional, creative, and genuinely invested in our success."
              className="body-sm"
            />
            <TypeSample
              name="Caption / Eyebrow"
              size="0.8125rem"
              sample="SELECTED WORK"
              className="eyebrow"
            />
          </div>
        </div>
      </section>

      {/* Buttons */}
      <section className="section-padding">
        <div className="container-lg">
          <p className="eyebrow mb-4">Components</p>
          <h2 className="display-lg mb-12">Buttons</h2>

          <div className="flex flex-wrap gap-6 items-center mb-12">
            <button className="btn btn-primary">Primary Button</button>
            <button className="btn btn-secondary">Secondary Button</button>
            <button className="btn btn-primary btn-lg">Large Primary</button>
            <button className="btn btn-primary" disabled>
              Disabled
            </button>
          </div>

          <h3 className="display-md mb-8">Links</h3>
          <div className="flex flex-wrap gap-8 items-center">
            <a href="#" className="nav-link">
              Navigation Link
            </a>
            <a href="#" className="link-underline text-ink">
              Text Link with Underline
            </a>
            <a
              href="#"
              className="text-spark hover:text-spark-dark transition-colors"
            >
              Spark Colored Link →
            </a>
          </div>
        </div>
      </section>

      {/* Cards */}
      <section className="section-padding bg-cream-dark">
        <div className="container-lg">
          <p className="eyebrow mb-4">Components</p>
          <h2 className="display-lg mb-12">Cards</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Project Card */}
            <div className="card overflow-hidden cursor-pointer group">
              <div className="aspect-video bg-ink/5 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-spark/20 to-coral/20 group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-[length:var(--text-heading)] text-ink">
                    Project Name
                  </h4>
                  <span className="caption">2024</span>
                </div>
                <p className="body-sm text-ink-muted">Brand Identity</p>
              </div>
            </div>

            {/* Service Card */}
            <div className="card p-8 cursor-pointer">
              <div className="w-12 h-12 rounded-lg bg-spark/10 flex items-center justify-center mb-6">
                <svg
                  className="w-6 h-6 text-spark"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h4 className="text-[length:var(--text-heading)] text-ink mb-3">
                Brand Strategy
              </h4>
              <p className="body-sm text-ink-muted">
                We uncover what makes your brand unique and build a roadmap for
                growth.
              </p>
            </div>

            {/* Testimonial Card */}
            <div className="card p-8 relative">
              <div className="text-spark/20 text-8xl font-serif absolute top-4 left-6">
                &ldquo;
              </div>
              <blockquote className="relative z-10 pt-8">
                <p className="text-ink italic text-lg mb-6">
                  Danny Creative transformed how we think about our brand.
                </p>
                <footer className="caption">
                  — Sarah Chen, Founder of Bloom Hotels
                </footer>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Shadows & Effects */}
      <section className="section-padding">
        <div className="container-lg">
          <p className="eyebrow mb-4">Effects</p>
          <h2 className="display-lg mb-12">Shadows & Glows</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
            <ShadowSample name="Shadow SM" className="shadow-sm" />
            <ShadowSample name="Shadow MD" className="shadow-md" />
            <ShadowSample name="Shadow LG" className="shadow-lg" />
            <ShadowSample name="Shadow XL" className="shadow-xl" />
          </div>

          <h3 className="display-md mb-8">The Spark Glow</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-warm-white rounded-lg p-8 flex items-center justify-center">
              <div
                className="w-16 h-16 rounded-full bg-spark animate-spark-breathe"
                style={{ boxShadow: "var(--shadow-spark-sm)" }}
              />
            </div>
            <div className="bg-warm-white rounded-lg p-8 flex items-center justify-center">
              <div
                className="w-16 h-16 rounded-full bg-spark animate-spark-breathe"
                style={{ boxShadow: "var(--shadow-spark)" }}
              />
            </div>
            <div className="bg-warm-white rounded-lg p-8 flex items-center justify-center">
              <div
                className="w-16 h-16 rounded-full bg-spark animate-spark-breathe"
                style={{ boxShadow: "var(--shadow-spark-lg)" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Animations */}
      <section className="section-padding bg-cream-dark">
        <div className="container-lg">
          <p className="eyebrow mb-4">Motion</p>
          <h2 className="display-lg mb-12">Animations</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimationSample
              name="Fade Up"
              className="animate-fade-up"
              style={{
                animationIterationCount: "infinite",
                animationDuration: "2s",
              }}
            />
            <AnimationSample
              name="Scale In"
              className="animate-scale-in"
              style={{
                animationIterationCount: "infinite",
                animationDuration: "2s",
              }}
            />
            <AnimationSample
              name="Scroll Bounce"
              className="animate-scroll-bounce"
            />
          </div>
        </div>
      </section>

      {/* Mobile Spark Effects */}
      <section className="section-padding">
        <div className="container-lg">
          <p className="eyebrow mb-4">Mobile Experience</p>
          <h2 className="display-lg mb-6">Touch Interactions</h2>
          <p className="body-lg max-w-[600px] mb-12">
            On mobile devices, The Spark transforms into touch-based effects.
            Tap anywhere on the page to see the ripple, or tap interactive
            elements to see the glow effect.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Tap Ripple Demo */}
            <div className="bg-cream-dark rounded-xl p-8">
              <h3 className="text-[length:var(--text-heading)] text-ink mb-4">
                Tap Ripple
              </h3>
              <p className="body-sm text-ink-muted mb-6">
                Tap anywhere on empty space to create an expanding amber ripple.
                This provides satisfying feedback for every touch.
              </p>
              <div className="bg-cream rounded-lg h-32 flex items-center justify-center text-ink-muted">
                <span className="caption">Tap here on mobile</span>
              </div>
            </div>

            {/* Element Glow Demo */}
            <div className="bg-cream-dark rounded-xl p-8">
              <h3 className="text-[length:var(--text-heading)] text-ink mb-4">
                Element Glow
              </h3>
              <p className="body-sm text-ink-muted mb-6">
                Interactive elements pulse with spark energy when tapped,
                reinforcing the brand&apos;s creative energy.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="btn btn-primary">Tap Me</button>
                <button className="btn btn-secondary">Or Me</button>
              </div>
            </div>
          </div>

          {/* Interactive Demo Grid */}
          <div className="bg-warm-white rounded-xl p-8">
            <h3 className="display-md mb-6 text-center">Try These Elements</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button className="btn btn-primary w-full">Button</button>
              <a href="#" className="btn btn-secondary w-full text-center">
                Link
              </a>
              <div className="card p-4 text-center cursor-pointer">
                <span className="text-ink font-medium">Card</span>
              </div>
              <div
                className="bg-cream-dark rounded-lg p-4 text-center cursor-pointer"
                data-spark-glow
              >
                <span className="text-ink-muted text-sm">Custom Glow</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ambient Orbs */}
      <section className="section-padding bg-cream-dark">
        <div className="container-lg">
          <p className="eyebrow mb-4">Atmosphere</p>
          <h2 className="display-lg mb-6">Ambient Background Orbs</h2>
          <p className="body-lg max-w-[600px] mb-12">
            Large, soft gradient orbs float slowly across the background,
            creating depth and atmosphere without demanding attention. Look
            behind this content to see them in action.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Orb Specifications */}
            <div className="bg-warm-white rounded-xl p-8">
              <h3 className="text-[length:var(--text-heading)] text-ink mb-6">
                Desktop Configuration
              </h3>
              <div className="space-y-4">
                {[
                  {
                    id: 1,
                    size: "500px",
                    color: "Spark Light",
                    opacity: "20%",
                  },
                  { id: 2, size: "400px", color: "Cream Dark", opacity: "25%" },
                  { id: 3, size: "600px", color: "Spark", opacity: "12%" },
                  { id: 4, size: "350px", color: "Coral", opacity: "10%" },
                  {
                    id: 5,
                    size: "450px",
                    color: "Spark Light",
                    opacity: "18%",
                  },
                ].map((orb) => (
                  <div
                    key={orb.id}
                    className="flex items-center justify-between py-2 border-b border-ink/5 last:border-0"
                  >
                    <span className="caption text-ink-muted">Orb {orb.id}</span>
                    <span className="body-sm text-ink">{orb.size}</span>
                    <span className="body-sm text-ink">{orb.color}</span>
                    <span className="caption text-ink-muted">
                      {orb.opacity}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Configuration */}
            <div className="bg-warm-white rounded-xl p-8">
              <h3 className="text-[length:var(--text-heading)] text-ink mb-6">
                Mobile Configuration
              </h3>
              <p className="body-sm text-ink-muted mb-6">
                On mobile, we reduce to 3 orbs with lower opacity for better
                performance and subtlety.
              </p>
              <div className="space-y-4">
                {[
                  {
                    id: 1,
                    size: "300px",
                    color: "Spark Light",
                    opacity: "15%",
                  },
                  { id: 2, size: "350px", color: "Spark", opacity: "10%" },
                  { id: 3, size: "250px", color: "Coral", opacity: "8%" },
                ].map((orb) => (
                  <div
                    key={orb.id}
                    className="flex items-center justify-between py-2 border-b border-ink/5 last:border-0"
                  >
                    <span className="caption text-ink-muted">Orb {orb.id}</span>
                    <span className="body-sm text-ink">{orb.size}</span>
                    <span className="body-sm text-ink">{orb.color}</span>
                    <span className="caption text-ink-muted">
                      {orb.opacity}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Animation Info */}
          <div className="bg-warm-white rounded-xl p-8">
            <h3 className="text-[length:var(--text-heading)] text-ink mb-6">
              Animation Behavior
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h4 className="font-medium text-ink mb-2">Drift</h4>
                <p className="body-sm text-ink-muted">
                  Each orb follows a unique drift pattern (35-55s cycle), moving
                  in gentle curves across the viewport.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-ink mb-2">Breathe</h4>
                <p className="body-sm text-ink-muted">
                  Subtle scale animation (10-14s cycle) creates a living,
                  breathing quality.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-ink mb-2">Reduced Motion</h4>
                <p className="body-sm text-ink-muted">
                  When users prefer reduced motion, orbs render as static
                  gradients without animation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Spacing */}
      <section className="section-padding">
        <div className="container-lg">
          <p className="eyebrow mb-4">Layout</p>
          <h2 className="display-lg mb-12">Spacing Scale</h2>

          <div className="space-y-4">
            {[
              { name: "space-4", value: "16px", width: "w-4" },
              { name: "space-8", value: "32px", width: "w-8" },
              { name: "space-12", value: "48px", width: "w-12" },
              { name: "space-16", value: "64px", width: "w-16" },
              { name: "space-20", value: "80px", width: "w-20" },
              { name: "space-24", value: "96px", width: "w-24" },
              { name: "space-32", value: "128px", width: "w-32" },
            ].map((space) => (
              <div key={space.name} className="flex items-center gap-4">
                <div className="w-24 text-right">
                  <span className="caption">{space.name}</span>
                </div>
                <div
                  className={`h-8 bg-spark rounded ${space.width}`}
                  style={{ minWidth: space.value }}
                />
                <span className="body-sm text-ink-muted">{space.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Spark Demo */}
      <section className="section-padding">
        <div className="container-lg">
          <p className="eyebrow mb-4">Signature Element</p>
          <h2 className="display-lg mb-6">The Spark</h2>
          <p className="body-lg max-w-[600px] mb-12">
            Move your cursor around this section to see The Spark in action. It
            responds to different elements with unique behaviors.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Default State */}
            <div className="bg-cream-dark rounded-lg p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-cream flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-spark shadow-spark-sm animate-spark-breathe" />
              </div>
              <h4 className="text-ink mb-2">Default</h4>
              <p className="caption">12px, normal glow</p>
            </div>

            {/* Hover State */}
            <div
              className="bg-cream-dark rounded-lg p-8 text-center cursor-pointer card"
              data-spark="hover"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-cream flex items-center justify-center">
                <div className="w-5 h-5 rounded-full bg-spark shadow-spark animate-spark-breathe" />
              </div>
              <h4 className="text-ink mb-2">Hover</h4>
              <p className="caption">20px, bright glow</p>
            </div>

            {/* Button State */}
            <div className="bg-cream-dark rounded-lg p-8 text-center">
              <button className="btn btn-primary mb-4">Hover Me</button>
              <h4 className="text-ink mb-2">Button</h4>
              <p className="caption">24px, brightest glow</p>
            </div>

            {/* Text State */}
            <div className="bg-cream-dark rounded-lg p-8" data-spark="text">
              <p className="text-ink mb-4">
                When hovering over text blocks, The Spark becomes smaller and
                more subtle to not distract from reading.
              </p>
              <h4 className="text-ink mb-2 text-center">Text</h4>
              <p className="caption text-center">10px, dimmed glow</p>
            </div>
          </div>

          {/* Interactive Demo Area */}
          <div className="mt-16 p-12 bg-warm-white rounded-xl">
            <h3 className="display-md mb-8 text-center">
              Interactive Playground
            </h3>
            <div className="flex flex-wrap gap-6 justify-center items-center">
              <button className="btn btn-primary">Primary Button</button>
              <button className="btn btn-secondary">Secondary Button</button>
              <a href="#" className="nav-link">
                Navigation Link
              </a>
              <a href="#" className="link-underline text-ink">
                Text Link
              </a>
              <div className="card p-6 cursor-pointer">
                <p className="text-ink font-medium">Hover Card</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-ink">
        <div className="container-lg text-center">
          <p className="text-cream/60 body-sm">
            Danny Creative Design System v3.0 — Built for the light.
          </p>
        </div>
      </footer>
    </main>
  );
}

// Component: Color Swatch
function ColorSwatch({
  name,
  token,
  hex,
  className,
  textLight = false,
}: {
  name: string;
  token: string;
  hex: string;
  className: string;
  textLight?: boolean;
}) {
  return (
    <div className={`rounded-lg overflow-hidden ${className}`}>
      <div className="h-24" />
      <div className={`p-4 ${textLight ? "text-cream" : "text-ink"}`}>
        <p className="font-medium">{name}</p>
        <p
          className={`text-sm ${textLight ? "text-cream/70" : "text-ink-muted"}`}
        >
          {hex}
        </p>
        <p
          className={`text-xs font-mono ${textLight ? "text-cream/50" : "text-ink-muted/70"}`}
        >
          {token}
        </p>
      </div>
    </div>
  );
}

// Component: Type Sample
function TypeSample({
  name,
  size,
  sample,
  className,
}: {
  name: string;
  size: string;
  sample: string;
  className: string;
}) {
  return (
    <div className="border-b border-ink/10 pb-8">
      <div className="flex items-baseline gap-4 mb-4">
        <span className="caption text-ink-muted w-32">{name}</span>
        <span className="caption text-ink-muted/60 font-mono">{size}</span>
      </div>
      <p className={className}>{sample}</p>
    </div>
  );
}

// Component: Shadow Sample
function ShadowSample({
  name,
  className,
}: {
  name: string;
  className: string;
}) {
  return (
    <div className="text-center">
      <div className={`bg-warm-white rounded-lg h-24 mb-4 ${className}`} />
      <span className="caption">{name}</span>
    </div>
  );
}

// Component: Animation Sample
function AnimationSample({
  name,
  className,
  style,
}: {
  name: string;
  className: string;
  style?: React.CSSProperties;
}) {
  return (
    <div className="text-center">
      <div className="bg-warm-white rounded-lg h-32 flex items-center justify-center mb-4">
        <div
          className={`w-12 h-12 bg-spark rounded-lg ${className}`}
          style={style}
        />
      </div>
      <span className="caption">{name}</span>
    </div>
  );
}
