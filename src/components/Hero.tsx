import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Eye, Layers, Sparkles } from 'lucide-react';
import { CityCollection, CityId, ProductItem } from '../types';

interface HeroProps {
  collections: CityCollection[];
  onAddToCart: (item: ProductItem) => void;
  onInspectProduct: (item: ProductItem) => void;
  onOpenQuiz: () => void;
  onSelectCityTab: (cityId: CityId) => void;
}

export const Hero: React.FC<HeroProps> = ({
  collections,
  onAddToCart,
  onInspectProduct,
  onOpenQuiz,
  onSelectCityTab,
}) => {
  const [activeStage, setActiveStage] = useState<'overview' | CityId>('overview');
  const [viewMode, setViewMode] = useState<'studio' | 'editorial'>('studio');

  const selectedCollection =
    activeStage === 'overview'
      ? collections[0]
      : collections.find((c) => c.id === activeStage) || collections[0];
  const featured = selectedCollection.items[0];

  const stageSrc =
    activeStage === 'overview'
      ? viewMode === 'studio'
        ? '/assets/studio/hero-showroom.jpg'
        : '/assets/studio/editorial-nyc.jpg'
      : viewMode === 'studio'
      ? featured.image
      : selectedCollection.editorialImage;

  return (
    <section
      id="hero"
      className="max-w-7xl mx-auto px-5 sm:px-8 pt-10 pb-16 lg:pt-14 lg:pb-20"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* Left Calm Editorial Authority */}
        <div className="lg:col-span-6 space-y-6">
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-mono tracking-wider hairline-border"
            style={{ backgroundColor: 'var(--bg-pill)', color: 'var(--text-secondary)' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>US HQ · INDEPENDENT CITY DESIGNERS · CRAFTED IN CN &amp; JP</span>
          </div>

          <h1 className="font-serif font-semibold tracking-[-0.02em] leading-[0.97] text-[clamp(2.85rem,5.8vw,4.75rem)]">
            Clip your city.{' '}
            <span className="italic font-medium">Hold</span> your world.
          </h1>

          <p
            className="text-base leading-relaxed max-w-lg"
            style={{ color: 'var(--text-secondary)' }}
          >
            Directed in the United States with independent designers across California, Miami,
            New York, and Tokyo—and precision-crafted in China and Japan from plant cellulose
            acetate, hollow alloys, and 22-momme mulberry silk.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <a
              href="#showroom"
              className="cta-btn px-7 py-3.5 rounded-full text-sm font-semibold inline-flex items-center gap-2 shadow-sm"
            >
              <span>Shop City Capsules</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              type="button"
              onClick={onOpenQuiz}
              className="pill-option px-6 py-3.5 rounded-full text-sm font-medium inline-flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>15s Hair Fit Quiz</span>
            </button>
          </div>

          {/* Minimalist Trust Strip */}
          <div className="pt-5 grid grid-cols-3 gap-4 max-w-md hairline-t tabular-nums">
            <div>
              <div className="font-mono font-semibold text-base">50,000+</div>
              <div className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                304 coil cycles
              </div>
            </div>
            <div>
              <div className="font-mono font-semibold text-base">6 Hours</div>
              <div className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                Wood-barrel polish
              </div>
            </div>
            <div>
              <div className="font-mono font-semibold text-base">30-Day</div>
              <div className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                Hold guarantee
              </div>
            </div>
          </div>

          <div
            className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs"
            style={{ color: 'var(--text-muted)' }}
          >
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              4.9★ across 3,200+ hair profiles
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Designed in CA &amp; NYC
            </span>
          </div>
        </div>

        {/* Right Flagship Showroom Stage */}
        <div className="lg:col-span-6 flex flex-col items-center">
          <div className="surface-card relative w-full rounded-3xl overflow-hidden aspect-[4/4] max-w-[540px] shadow-2xl">
            <img
              key={stageSrc}
              src={stageSrc}
              alt={activeStage === 'overview' ? 'BestClips Four-City Showroom Collection' : featured.name}
              className="animate-stage w-full h-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

            {/* Top Switcher: Studio Object vs On-Hair */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
              <span className="bg-black/60 backdrop-blur-md text-white font-mono text-[11px] px-3.5 py-1.5 rounded-full border border-white/15">
                {activeStage === 'overview'
                  ? 'Atelier Archive · 4 Cities'
                  : `${selectedCollection.code} · ${selectedCollection.title}`}
              </span>

              <div className="inline-flex p-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15">
                <button
                  type="button"
                  onClick={() => setViewMode('studio')}
                  className={`px-3 py-1 rounded-full text-[11px] font-mono transition cursor-pointer inline-flex items-center gap-1 ${
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
                  className={`px-3 py-1 rounded-full text-[11px] font-mono transition cursor-pointer inline-flex items-center gap-1 ${
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

            {/* Bottom Floating Action */}
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-3 text-white">
              <div className="min-w-0">
                <div className="text-[11px] font-mono uppercase tracking-widest text-white/75">
                  {activeStage === 'overview'
                    ? '20 Studio Pieces · Save 15% on Any 3'
                    : `${featured.lengthCm} cm · Hold ${featured.holdScore}/10`}
                </div>
                <div className="font-serif text-2xl sm:text-[1.75rem] font-semibold tracking-tight truncate">
                  {activeStage === 'overview' ? 'Four-City Flagship Edit' : featured.name}
                </div>
              </div>

              {activeStage === 'overview' ? (
                <a
                  href="#capsule-builder"
                  className="bg-white text-stone-950 hover:bg-stone-100 text-xs font-semibold px-4 py-2.5 rounded-full transition shrink-0 shadow-md"
                >
                  Build 3-Clip Set
                </a>
              ) : (
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
              )}
            </div>
          </div>

          {/* Clean City Stage Switcher */}
          <div className="mt-4 inline-flex flex-wrap justify-center gap-1.5 p-1.5 rounded-full surface-card shadow-sm">
            <button
              type="button"
              onClick={() => setActiveStage('overview')}
              className={`pill-option ${
                activeStage === 'overview' ? 'active' : ''
              } px-3.5 py-1.5 rounded-full text-xs font-medium`}
            >
              Showroom
            </button>
            {collections.map((col) => (
              <button
                key={col.id}
                type="button"
                onClick={() => {
                  setActiveStage(col.id);
                  onSelectCityTab(col.id);
                }}
                className={`pill-option ${
                  activeStage === col.id ? 'active' : ''
                } px-3.5 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5`}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: col.moodColor }}
                />
                <span>{col.title.replace(' Office OOTD', '')}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
