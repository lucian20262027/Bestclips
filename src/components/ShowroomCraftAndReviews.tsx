import React, { useRef, useState } from 'react';
import { MoveHorizontal, PackageCheck, Ruler, ShieldCheck, Star } from 'lucide-react';
import { HAIR_REVIEWS } from '../data/reviews';
import { HairDensityTag } from '../types';

const SCALE_PROFILES = [
  { label: '2.5 cm · Micro Mini', fit: 'Bangs & Braids', widthPct: 24 },
  { label: '7.5 cm · Atelier Pin', fit: 'Half-Up & Bridal', widthPct: 52 },
  { label: '9.0 cm · French Barrette', fit: 'Sleek Low Tail', widthPct: 68 },
  { label: '10.5 cm · Cloud Matte', fit: 'Fine to Medium', widthPct: 84 },
  { label: '11.2–11.8 cm · Jumbo Arch', fit: 'Thick & Curly', widthPct: 100 },
];

const REVIEW_FILTERS: ('All' | HairDensityTag)[] = [
  'All',
  'Fine & Silky',
  'Medium',
  'Thick & Curly',
];

export const ShowroomCraftAndReviews: React.FC = () => {
  const [comparePct, setComparePct] = useState(50);
  const [reviewTag, setReviewTag] = useState<'All' | HairDensityTag>('All');
  const containerRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  const updateFromClientX = (clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setComparePct(Math.max(5, Math.min(95, next)));
  };

  const visibleReviews = (
    reviewTag === 'All'
      ? HAIR_REVIEWS
      : HAIR_REVIEWS.filter((r) => r.densityTag === reviewTag)
  ).slice(0, 3);

  return (
    <div id="craft-reviews" className="max-w-7xl mx-auto px-5 sm:px-8 py-16 space-y-20 hairline-t scroll-mt-24">
      {/* Compact 3-Column Showroom Craft & Unboxing Trio */}
      <div>
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)' }}>
              Material Engineering &amp; Unboxing
            </div>
            <h2 className="font-serif font-semibold tracking-tight text-[clamp(2rem,3.8vw,3rem)]">
              Built like eyewear. Presented like fine jewelry.
            </h2>
          </div>
          <p className="text-xs sm:text-sm max-w-md" style={{ color: 'var(--text-secondary)' }}>
            Every order ships in an archival rigid drawer box with a linen travel pouch—ready for
            gifting or daily carry.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Card 1: Drag Finish Compare */}
          <div className="lg:col-span-5 surface-card rounded-3xl p-4 flex flex-col justify-between gap-4">
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
              className="no-select relative rounded-2xl overflow-hidden aspect-[4/3] w-full cursor-ew-resize"
            >
              <img
                src="/assets/studio/cali-2.jpg"
                alt="Velvet Matte Finish"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <span className="absolute top-3 right-3 bg-black/70 text-white font-mono text-[10px] px-2.5 py-1 rounded-full">
                Velvet Matte
              </span>
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: `inset(0 ${100 - comparePct}% 0 0)` }}
              >
                <img
                  src="/assets/studio/macro-gloss.jpg"
                  alt="Mirror Gloss Acetate"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 bg-white/90 text-stone-950 font-mono text-[10px] font-medium px-2.5 py-1 rounded-full">
                  Mirror Gloss
                </span>
              </div>
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-white pointer-events-none"
                style={{ left: `${comparePct}%` }}
              >
                <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/85 text-white border border-white/30 flex items-center justify-center">
                  <MoveHorizontal className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            <div className="px-2 pb-1 flex items-center justify-between gap-3">
              <div>
                <h3 className="font-serif text-xl font-semibold">Gloss vs. Cloud-Matte Grip</h3>
                <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>
                  Drag to compare 6-hour tumbled gloss vs. fine-hair matte friction.
                </p>
              </div>
              <div className="flex gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() => setComparePct(88)}
                  className="pill-option px-2.5 py-1 rounded-full text-[10px] font-mono"
                >
                  Gloss
                </button>
                <button
                  type="button"
                  onClick={() => setComparePct(12)}
                  className="pill-option px-2.5 py-1 rounded-full text-[10px] font-mono"
                >
                  Matte
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: 1:1 Size Ruler & 304 Coil */}
          <div className="lg:col-span-3 surface-card rounded-3xl p-5 flex flex-col justify-between gap-5">
            <div>
              <div className="text-[11px] font-mono uppercase tracking-wider inline-flex items-center gap-1.5 mb-2" style={{ color: 'var(--text-muted)' }}>
                <Ruler className="w-3.5 h-3.5" /> 1:1 Scale &amp; Mechanics
              </div>
              <h3 className="font-serif text-xl font-semibold">Zero-Guesswork Sizing</h3>
              <div className="mt-4 space-y-3">
                {SCALE_PROFILES.map((s) => (
                  <div key={s.label} className="space-y-1">
                    <div className="flex justify-between text-[11px]">
                      <span className="font-mono font-medium">{s.label}</span>
                      <span style={{ color: 'var(--text-muted)' }}>{s.fit}</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full overflow-hidden bg-black/8 dark:bg-white/10">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${s.widthPct}%`, backgroundColor: 'var(--accent-cta)' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden relative h-28 hairline-border">
              <img
                src="/assets/studio/macro-spring.jpg"
                alt="304 Double Coil Spring"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent flex items-end p-3 text-white">
                <div className="text-[11px] font-mono">304 Double-Coil · 50,000+ Cycles</div>
              </div>
            </div>
          </div>

          {/* Card 3: Showroom Unboxing Experience */}
          <div className="lg:col-span-4 surface-card rounded-3xl p-4 flex flex-col justify-between gap-4">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
              <img
                src="/assets/studio/showroom-packaging.jpg"
                alt="BestClips Luxury Unboxing Drawer Box & Travel Pouch"
                className="w-full h-full object-cover"
              />
              <span className="absolute top-3 left-3 bg-black/65 backdrop-blur-md text-white font-mono text-[10px] px-2.5 py-1 rounded-full inline-flex items-center gap-1">
                <PackageCheck className="w-3 h-3 text-emerald-300" /> Gift-Ready Packaging
              </span>
            </div>

            <div className="px-2 pb-1 space-y-1.5">
              <h3 className="font-serif text-xl font-semibold">Archival Box &amp; Linen Travel Pouch</h3>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                Every claw ships nestled inside a reusable cotton-linen pouch and warm-stone drawer
                box—plus our 30-Day Hold Guarantee.
              </p>
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-700 dark:text-emerald-400 pt-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>1-Year Spring Tension Warranty Included</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sleek 3-Card Verified Hair Reviews */}
      <div className="pt-12 hairline-t">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest mb-1.5" style={{ color: 'var(--text-muted)' }}>
              Verified Hair Profiles · 4.9 / 5.0
            </div>
            <h2 className="font-serif font-semibold tracking-tight text-[clamp(1.9rem,3.5vw,2.7rem)]">
              Tested in real hair, all day.
            </h2>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {REVIEW_FILTERS.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setReviewTag(tag)}
                className={`pill-option ${
                  reviewTag === tag ? 'active' : ''
                } px-3.5 py-1.5 rounded-full text-xs font-medium`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {visibleReviews.map((rev) => (
            <article key={rev.id} className="surface-card rounded-3xl p-6 flex flex-col justify-between gap-4">
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <span
                    className="text-[10px] font-mono px-2.5 py-0.5 rounded-full hairline-border"
                    style={{ backgroundColor: 'var(--bg-pill)', color: 'var(--text-secondary)' }}
                  >
                    {rev.densityTag}
                  </span>
                </div>
                <h3 className="font-serif text-xl font-semibold leading-snug">{rev.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  “{rev.quote}”
                </p>
              </div>

              <div className="pt-3 hairline-t text-[11px] flex items-center justify-between gap-2">
                <div>
                  <div className="font-semibold">{rev.author}</div>
                  <div style={{ color: 'var(--text-muted)' }}>{rev.hairProfile}</div>
                </div>
                <div className="text-right font-mono" style={{ color: 'var(--text-muted)' }}>
                  {rev.productName}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};
