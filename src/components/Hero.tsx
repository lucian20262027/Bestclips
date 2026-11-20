import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Eye, Layers } from 'lucide-react';
import { CityCollection, CityId, ProductItem } from '../types';

interface HeroProps {
  collections: CityCollection[];
  onAddToCart: (item: ProductItem) => void;
  onInspectProduct: (item: ProductItem) => void;
}

export const Hero: React.FC<HeroProps> = ({
  collections,
  onAddToCart,
  onInspectProduct,
}) => {
  const [activeCity, setActiveCity] = useState<CityId>('cali');
  const [viewMode, setViewMode] = useState<'studio' | 'editorial'>('studio');

  const currentCollection =
    collections.find((c) => c.id === activeCity) || collections[0];
  const featured = currentCollection.items[0];
  const stageSrc =
    viewMode === 'studio' ? featured.image : currentCollection.editorialImage;

  return (
    <section
      id="hero"
      className="max-w-7xl mx-auto px-5 sm:px-8 pt-10 pb-20 lg:pt-16 lg:pb-24"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* Left Editorial Authority Copy */}
        <div className="lg:col-span-6 space-y-7">
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wide hairline-border"
            style={{ background: 'var(--bg-pill)', color: 'var(--text-secondary)' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>4 CITY CAPSULES · ITALIAN CELLULOSE ACETATE</span>
          </div>

          <h1 className="font-serif font-semibold tracking-[-0.02em] leading-[0.98] text-[clamp(2.9rem,6vw,4.9rem)]">
            Architectural hold,{' '}
            <span className="italic font-medium">sculpted</span> for four cities.
          </h1>

          <p
            className="text-base sm:text-lg leading-relaxed max-w-xl"
            style={{ color: 'var(--text-secondary)' }}
          >
            Carved from plant-based Italian cellulose acetate, hollow architectural alloys,
            and 22-momme mulberry silk—calibrated with 304 stainless double-coil springs for
            effortless all-day hold from fine strands to dense curls.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <a
              href="#catalog"
              className="cta-btn px-7 py-3.5 rounded-full text-sm font-semibold inline-flex items-center gap-2 shadow-sm"
            >
              <span>Shop All 4 Cities</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#fit-quiz"
              className="pill-option px-7 py-3.5 rounded-full text-sm font-medium inline-flex items-center gap-2"
            >
              <span>20s Hair Fit Finder</span>
            </a>
            <a
              href="#capsule-builder"
              className="pill-option px-5 py-3.5 rounded-full text-xs font-mono uppercase tracking-wider"
            >
              Build 3-Clip Set (-15%)
            </a>
          </div>

          {/* Benchmark Trust & Craft Metrics */}
          <div className="pt-6 grid grid-cols-3 gap-4 max-w-lg hairline-t tabular-nums">
            <div>
              <div className="font-mono font-semibold text-base sm:text-lg">50,000+</div>
              <div className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                Spring tension cycles
              </div>
            </div>
            <div>
              <div className="font-mono font-semibold text-base sm:text-lg">6 Hours</div>
              <div className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                Beechwood barrel polish
              </div>
            </div>
            <div>
              <div className="font-mono font-semibold text-base sm:text-lg">30-Day</div>
              <div className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                Zero-slip hold guarantee
              </div>
            </div>
          </div>

          <div
            className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs"
            style={{ color: 'var(--text-muted)' }}
          >
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Designed in CA &amp; NYC
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              4.9★ across 3,200+ hair profiles
            </span>
          </div>
        </div>

        {/* Right Interactive Studio vs On-Hair Hero Stage */}
        <div className="lg:col-span-6 flex flex-col items-center">
          <div className="surface-card relative w-full rounded-3xl overflow-hidden aspect-[4/4.2] max-w-[540px] shadow-2xl">
            <img
              key={stageSrc}
              src={stageSrc}
              alt={`${featured.name} — ${viewMode}`}
              className="animate-stage w-full h-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

            {/* Top Controls: Studio vs On-Hair Switcher */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
              <span className="bg-black/60 backdrop-blur-md text-white font-mono text-[11px] px-3.5 py-1.5 rounded-full border border-white/15">
                {currentCollection.code} · {currentCollection.title}
              </span>

              <div className="inline-flex p-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15">
                <button
                  type="button"
                  onClick={() => setViewMode('studio')}
                  className={`px-3 py-1 rounded-full text-[11px] font-mono transition cursor-pointer inline-flex items-center gap-1.5 ${
                    viewMode === 'studio'
                      ? 'bg-white text-stone-950 font-medium'
                      : 'text-white/75 hover:text-white'
                  }`}
                >
                  <Layers className="w-3 h-3" />
                  <span>Studio</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('editorial')}
                  className={`px-3 py-1 rounded-full text-[11px] font-mono transition cursor-pointer inline-flex items-center gap-1.5 ${
                    viewMode === 'editorial'
                      ? 'bg-white text-stone-950 font-medium'
                      : 'text-white/75 hover:text-white'
                  }`}
                >
                  <Eye className="w-3 h-3" />
                  <span>On Hair</span>
                </button>
              </div>
            </div>

            {/* Bottom Floating Overlay Info */}
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-3 text-white">
              <div className="min-w-0">
                <div className="text-[11px] font-mono uppercase tracking-widest text-white/75">
                  {featured.lengthCm} cm · Hold {featured.holdScore}/10 · {featured.hairType}
                </div>
                <div className="font-serif text-2xl sm:text-[1.75rem] font-semibold tracking-tight truncate">
                  {featured.name}
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => onInspectProduct(featured)}
                  className="bg-black/45 hover:bg-black/65 backdrop-blur-md border border-white/25 text-white text-xs font-medium px-3.5 py-2.5 rounded-full transition cursor-pointer"
                >
                  Details
                </button>
                <button
                  type="button"
                  onClick={() => onAddToCart(featured)}
                  className="bg-white text-stone-950 hover:bg-stone-100 text-xs font-semibold px-4 py-2.5 rounded-full transition tabular-nums cursor-pointer shadow-md"
                >
                  Add — ${featured.price}
                </button>
              </div>
            </div>
          </div>

          {/* Floating Segmented 4-City Pill Dock */}
          <div className="mt-4 inline-flex flex-wrap justify-center gap-1.5 p-1.5 rounded-full surface-card shadow-sm">
            {collections.map((col) => {
              const isActive = col.id === activeCity;
              return (
                <button
                  key={col.id}
                  type="button"
                  onClick={() => setActiveCity(col.id)}
                  className={`pill-option ${
                    isActive ? 'active' : ''
                  } px-4 py-2 rounded-full text-xs font-medium flex items-center gap-2`}
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full border border-black/10"
                    style={{ backgroundColor: col.moodColor }}
                  />
                  <span>{col.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
