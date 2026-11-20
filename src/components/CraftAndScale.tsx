import React, { useRef, useState } from 'react';
import { MoveHorizontal, Ruler } from 'lucide-react';

const SCALE_PROFILES = [
  {
    label: '2.5 cm · Micro Mini',
    capacity: 'Bangs, face-framing layers & braids',
    examples: 'Santa Barbara & Shibuya 6-Packs',
    widthPct: 24,
  },
  {
    label: '7.5 cm · Atelier Pin',
    capacity: 'Side-swept hair & bridal chignon accents',
    examples: 'Ginza Akoya & Upper East Pearl Duo',
    widthPct: 54,
  },
  {
    label: '9.0 cm · French Barrette',
    capacity: 'Sleek low ponytails & half-up crowns',
    examples: 'Tribeca Matte Noir Bar',
    widthPct: 68,
  },
  {
    label: '10.5 cm · Everyday Cloud',
    capacity: 'Fine to medium full twists without creases',
    examples: 'Oat Milk Cloud, Daikanyama Milk-Tea',
    widthPct: 82,
  },
  {
    label: '11.2–11.8 cm · High-Torque Jumbo',
    capacity: 'Dense, waist-length & 3A–4C curly hair',
    examples: 'South Beach Tiger, Brickell 24K, SoHo Arch',
    widthPct: 100,
  },
];

export const CraftAndScale: React.FC = () => {
  const [comparePct, setComparePct] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  const updateFromClientX = (clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setComparePct(Math.max(4, Math.min(96, next)));
  };

  return (
    <div id="scale-craft" className="space-y-24 py-12 scroll-mt-24">
      {/* 1. Surface Finish Split Comparison Slider */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 pt-12 hairline-t">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <div
              ref={containerRef}
              onPointerDown={(e) => {
                draggingRef.current = true;
                e.currentTarget.setPointerCapture(e.pointerId);
                updateFromClientX(e.clientX);
              }}
              onPointerMove={(e) => {
                if (draggingRef.current) updateFromClientX(e.clientX);
              }}
              onPointerUp={() => {
                draggingRef.current = false;
              }}
              onPointerCancel={() => {
                draggingRef.current = false;
              }}
              className="no-select surface-card relative rounded-3xl overflow-hidden aspect-square max-h-[520px] w-full cursor-ew-resize shadow-xl"
            >
              <img
                src="/assets/studio/cali-2.jpg"
                alt="Velvet Matte Finish"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <span className="absolute top-4 right-4 bg-black/70 backdrop-blur-md text-white font-mono text-[11px] px-3 py-1 rounded-full border border-white/15">
                Velvet Matte · Fine Hair Micro-Grip
              </span>

              <div
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: `inset(0 ${100 - comparePct}% 0 0)` }}
              >
                <img
                  src="/assets/studio/macro-gloss.jpg"
                  alt="Mirror Gloss Italian Acetate"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-stone-950 font-mono text-[11px] font-medium px-3 py-1 rounded-full">
                  Mirror Gloss · Italian Acetate
                </span>
              </div>

              <div
                className="absolute top-0 bottom-0 w-0.5 bg-white pointer-events-none shadow-md"
                style={{ left: `${comparePct}%` }}
              >
                <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/85 backdrop-blur-md text-white border border-white/30 flex items-center justify-center shadow-lg">
                  <MoveHorizontal className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="text-xs font-mono uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
              Surface Engineering
            </div>
            <h2 className="font-serif font-semibold tracking-tight leading-tight text-[clamp(2rem,3.6vw,2.9rem)]">
              Liquid mirror gloss or cloud-matte micro-grip.
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Drag across our travertine studio frames. Choose hand-buffed{' '}
              <strong>Mirror Gloss Italian Acetate</strong> for deep translucent luminosity, or{' '}
              <strong>Velvet Matte</strong> for gentle bead-blasted grip on silky hair.
            </p>

            <div className="inline-flex p-1 rounded-full surface-card gap-1">
              {[
                { label: 'Mirror Gloss', pct: 90 },
                { label: '50 / 50 Split', pct: 50 },
                { label: 'Velvet Matte', pct: 10 },
              ].map((btn) => (
                <button
                  key={btn.label}
                  type="button"
                  onClick={() => setComparePct(btn.pct)}
                  className={`pill-option ${
                    Math.abs(comparePct - btn.pct) < 12 ? 'active' : ''
                  } px-4 py-2 rounded-full text-xs font-medium`}
                >
                  {btn.label}
                </button>
              ))}
            </div>

            <div className="pt-6 hairline-t grid grid-cols-2 gap-6 tabular-nums">
              <div>
                <div className="font-mono text-3xl font-bold tracking-tight">6 hrs</div>
                <div className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                  Beechwood barrel edge tumbling
                </div>
              </div>
              <div>
                <div className="font-mono text-3xl font-bold tracking-tight">9.5 g</div>
                <div className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                  Featherlight zero-pull balance
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Proportional Scale & Hair Capacity Guide (Undo Hairware Benchmark UX) */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 pt-12 hairline-t">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div
              className="text-xs font-mono uppercase tracking-widest inline-flex items-center gap-1.5 mb-2"
              style={{ color: 'var(--text-muted)' }}
            >
              <Ruler className="w-3.5 h-3.5" />
              <span>Zero-Guesswork Sizing Architecture</span>
            </div>
            <h2 className="font-serif font-semibold tracking-tight text-[clamp(2rem,3.8vw,3rem)]">
              Proportional 1:1 Scale &amp; Capacity Guide.
            </h2>
          </div>
          <p className="text-sm max-w-md" style={{ color: 'var(--text-secondary)' }}>
            Inspired by couture hairware sizing—compare exact jaw span and hair volume capacity
            before you choose.
          </p>
        </div>

        <div className="surface-card rounded-3xl p-6 sm:p-8 space-y-5">
          {SCALE_PROFILES.map((row) => (
            <div
              key={row.label}
              className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6 items-center pb-5 last:pb-0 hairline-b last:border-b-0"
            >
              <div className="md:col-span-3 font-mono text-xs font-semibold">{row.label}</div>
              <div className="md:col-span-4">
                <div className="h-2.5 w-full rounded-full overflow-hidden bg-black/8 dark:bg-white/10">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${row.widthPct}%`,
                      backgroundColor: 'var(--accent-cta)',
                    }}
                  />
                </div>
              </div>
              <div className="md:col-span-5 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                <span className="font-medium">{row.capacity}</span>
                <span className="font-mono text-[11px]" style={{ color: 'var(--text-muted)' }}>
                  {row.examples}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Asymmetric 3-Card Bento Craftsmanship Specs */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 pt-12 hairline-t">
        <div className="mb-10">
          <div className="text-xs font-mono uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)' }}>
            Architecture &amp; Provenance
          </div>
          <h2 className="font-serif font-semibold tracking-tight text-[clamp(2rem,4vw,3rem)]">
            Engineered to outlast fast plastic.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <article className="md:col-span-6 surface-card relative rounded-3xl overflow-hidden min-h-[430px] flex flex-col justify-end group shadow-md">
            <img
              src="/assets/studio/macro-spring.jpg"
              alt="Double Coil Tension Spring Macro"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-700"
            />
            <div className="relative z-10 bg-gradient-to-t from-black/88 via-black/45 to-transparent p-8 text-white">
              <div className="font-mono text-[11px] uppercase tracking-widest opacity-80">
                01 · Core Mechanics
              </div>
              <h3 className="font-serif text-2xl font-semibold mt-1">
                Calibrated 304 Double-Coil Spring
              </h3>
              <p className="text-xs text-white/85 mt-2 leading-relaxed max-w-md">
                High-torque stainless coils tested across 50,000+ open-close cycles—locking thick,
                long, or curly hair in a French twist without snapping or loosening.
              </p>
            </div>
          </article>

          <div className="md:col-span-6 flex flex-col gap-6">
            <article className="surface-card relative rounded-3xl overflow-hidden min-h-[250px] flex flex-col justify-end group shadow-md">
              <img
                src="/assets/studio/miami-4.jpg"
                alt="Plant Cellulose Acetate with 24K Gold"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-700"
              />
              <div className="relative z-10 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-7 text-white">
                <div className="font-mono text-[11px] uppercase tracking-widest opacity-80">
                  02 · Botanical Shell
                </div>
                <h3 className="font-serif text-2xl font-semibold mt-1">
                  Italian Plant Cellulose Acetate
                </h3>
                <p className="text-xs text-white/85 mt-1.5 leading-relaxed">
                  Carved from renewable wood-pulp &amp; cotton resin sheets—flexible, warm to the
                  touch, and shatter-resistant vs brittle injection-molded acrylic.
                </p>
              </div>
            </article>

            <article className="surface-card rounded-3xl p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 flex-1">
              <div>
                <div className="font-mono text-3xl font-bold tracking-tight tabular-nums">
                  50,000+ Cycles
                </div>
                <div className="text-xs mt-1.5" style={{ color: 'var(--text-secondary)' }}>
                  Rounded snag-free inner teeth · 30-Day Hold Guarantee · 1-Year Spring Warranty
                </div>
              </div>
              <span
                className="self-start sm:self-center font-mono text-xs px-4 py-2 rounded-full hairline-border shrink-0"
                style={{ backgroundColor: 'var(--bg-pill)' }}
              >
                CA &amp; NYC Design
              </span>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
};
