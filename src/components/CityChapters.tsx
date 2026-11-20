import React, { useState } from 'react';
import { Eye, Heart, Info, Plus, Sparkles } from 'lucide-react';
import { CityCollection, CityId, ProductItem } from '../types';

interface CityChaptersProps {
  collections: CityCollection[];
  wishlistIds: string[];
  onToggleWishlist: (id: string) => void;
  onAddToCart: (item: ProductItem) => void;
  onInspectProduct: (item: ProductItem) => void;
}

const ANGLE_OPTIONS = [
  { key: 'studio', label: '01 · Studio' },
  { key: 'editorial', label: '02 · On Hair' },
  { key: 'spring', label: '03 · 304 Coil' },
  { key: 'gloss', label: '04 · Polish' },
] as const;

type AngleKey = (typeof ANGLE_OPTIONS)[number]['key'];

export const CityChapters: React.FC<CityChaptersProps> = ({
  collections,
  wishlistIds,
  onToggleWishlist,
  onAddToCart,
  onInspectProduct,
}) => {
  const [selectedIdx, setSelectedIdx] = useState<Record<CityId, number>>({
    cali: 0,
    miami: 0,
    nyc: 0,
    tokyo: 0,
  });
  const [angleByCity, setAngleByCity] = useState<Record<CityId, AngleKey>>({
    cali: 'studio',
    miami: 'studio',
    nyc: 'studio',
    tokyo: 'studio',
  });

  const getStageImage = (col: CityCollection, item: ProductItem, angle: AngleKey) => {
    if (angle === 'editorial') return col.editorialImage;
    if (angle === 'spring') return '/assets/studio/macro-spring.jpg';
    if (angle === 'gloss') return '/assets/studio/macro-gloss.jpg';
    return item.image;
  };

  return (
    <div className="space-y-24 py-10">
      {/* City Passport Sticky Quick-Jump Bar */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="surface-card rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div
              className="text-[11px] font-mono uppercase tracking-widest"
              style={{ color: 'var(--text-muted)' }}
            >
              Four-City Architectural Edit
            </div>
            <p className="text-sm font-medium mt-0.5">
              Each city capsule is tension-calibrated for local climate, hair volume, and wardrobe silhouettes.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {collections.map((col) => (
              <a
                key={col.id}
                href={`#${col.anchor}`}
                className="pill-option px-3.5 py-2 rounded-full text-xs font-mono inline-flex items-center gap-2"
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: col.moodColor }}
                />
                <span>
                  {col.code} {col.title}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* The 4 City Studio Stages */}
      {collections.map((col, idx) => {
        const currentIdx = selectedIdx[col.id] ?? 0;
        const activeItem = col.items[currentIdx] || col.items[0];
        const activeAngle = angleByCity[col.id] ?? 'studio';
        const isReversed = idx % 2 === 1;
        const stageSrc = getStageImage(col, activeItem, activeAngle);
        const isWishlisted = wishlistIds.includes(activeItem.id);

        return (
          <section
            key={col.id}
            id={col.anchor}
            className="max-w-7xl mx-auto px-5 sm:px-8 scroll-mt-32"
          >
            {/* Editorial City Dossier Header */}
            <div className="hairline-t pt-12 pb-8 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <div className="flex flex-wrap items-center gap-3 text-xs font-mono uppercase tracking-widest">
                  <span
                    className="px-2.5 py-1 rounded-full hairline-border"
                    style={{ backgroundColor: 'var(--bg-pill)' }}
                  >
                    Capsule {col.code}
                  </span>
                  <span style={{ color: 'var(--text-muted)' }}>{col.coordinates}</span>
                  <span className="hidden sm:inline" style={{ color: 'var(--text-muted)' }}>
                    ·
                  </span>
                  <span style={{ color: 'var(--text-secondary)' }}>{col.climateNote}</span>
                </div>

                <h2 className="font-serif font-semibold tracking-tight text-[clamp(2.2rem,4vw,3.3rem)] leading-none pt-1">
                  {col.title}
                </h2>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {col.stylingEthos}
                </p>
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                <button
                  type="button"
                  onClick={() =>
                    setAngleByCity((prev) => ({
                      ...prev,
                      [col.id]: prev[col.id] === 'editorial' ? 'studio' : 'editorial',
                    }))
                  }
                  className="pill-option px-4 py-2 rounded-full text-xs font-medium inline-flex items-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>
                    {activeAngle === 'editorial' ? 'Back to Studio Object' : 'Preview On Hair'}
                  </span>
                </button>
              </div>
            </div>

            {/* Interactive Configurator Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              {/* Visual Stage */}
              <div className={`lg:col-span-6 ${isReversed ? 'lg:order-2' : ''}`}>
                <div className="surface-card relative rounded-3xl overflow-hidden aspect-square p-2.5 sm:p-3 shadow-xl">
                  <div className="relative w-full h-full rounded-2xl overflow-hidden">
                    <img
                      key={`${activeItem.id}-${activeAngle}`}
                      src={stageSrc}
                      alt={activeItem.name}
                      className="animate-stage w-full h-full object-cover"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                    {/* Top Badges */}
                    <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2">
                      <span className="bg-black/60 backdrop-blur-md text-white font-mono text-[11px] px-3 py-1 rounded-full border border-white/15">
                        {activeItem.silhouette} · {activeItem.lengthCm} cm
                      </span>

                      <button
                        type="button"
                        onClick={() => onToggleWishlist(activeItem.id)}
                        aria-label="Save piece"
                        className="w-9 h-9 rounded-full bg-black/55 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:scale-105 transition cursor-pointer"
                      >
                        <Heart
                          className={`w-4 h-4 ${
                            isWishlisted ? 'fill-rose-400 text-rose-400' : 'text-white'
                          }`}
                        />
                      </button>
                    </div>

                    {/* Bottom Angle Switcher Pills */}
                    <div className="absolute bottom-3.5 left-3.5 right-3.5 flex flex-wrap items-center justify-between gap-2">
                      <span className="text-[11px] font-mono text-white/90">
                        {activeAngle === 'editorial'
                          ? col.editorialCaption
                          : activeAngle === 'spring'
                          ? '304 Stainless Double-Coil Tension'
                          : activeAngle === 'gloss'
                          ? '6-Hour Beechwood Barrel Polish'
                          : `${activeItem.shade} · Travertine Stage`}
                      </span>

                      <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md p-1 rounded-full border border-white/15">
                        {ANGLE_OPTIONS.map((opt) => (
                          <button
                            key={opt.key}
                            type="button"
                            onClick={() =>
                              setAngleByCity((prev) => ({ ...prev, [col.id]: opt.key }))
                            }
                            className={`px-2.5 py-1 rounded-full text-[10px] font-mono transition cursor-pointer ${
                              activeAngle === opt.key
                                ? 'bg-white text-stone-950 font-medium'
                                : 'text-white/70 hover:text-white'
                            }`}
                          >
                            {opt.label.split(' · ')[0]}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Interactive Specification & Selector Dashboard */}
              <div className={`lg:col-span-6 ${isReversed ? 'lg:order-1' : ''} space-y-6`}>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    {activeItem.badge && (
                      <span
                        className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full hairline-border inline-flex items-center gap-1"
                        style={{ backgroundColor: 'var(--bg-pill)' }}
                      >
                        <Sparkles className="w-2.5 h-2.5" />
                        {activeItem.badge}
                      </span>
                    )}
                    <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
                      ★ {activeItem.rating.toFixed(1)} ({activeItem.reviewCount} reviews)
                    </span>
                  </div>

                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-serif text-3xl sm:text-4xl font-semibold tracking-tight leading-tight">
                      {activeItem.name}
                    </h3>
                    <div className="text-2xl font-mono font-semibold shrink-0 tabular-nums">
                      ${activeItem.price.toFixed(2)}
                    </div>
                  </div>

                  <p className="text-sm mt-2.5 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {activeItem.desc}
                  </p>
                </div>

                {/* 5-Piece Visual Studio Thumbnail Strip */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium" style={{ color: 'var(--text-secondary)' }}>
                      Select Edition ({col.items.length} Pieces)
                    </span>
                    <span className="font-mono text-[11px]" style={{ color: 'var(--text-muted)' }}>
                      {activeItem.shade}
                    </span>
                  </div>

                  <div className="grid grid-cols-5 gap-2.5">
                    {col.items.map((item, i) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          setSelectedIdx((prev) => ({ ...prev, [col.id]: i }));
                          setAngleByCity((prev) => ({ ...prev, [col.id]: 'studio' }));
                        }}
                        className={`thumb-card ${
                          i === currentIdx ? 'active' : ''
                        } rounded-2xl overflow-hidden aspect-square relative bg-stone-200`}
                        title={item.name}
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                        <span
                          className="absolute bottom-1.5 right-1.5 w-2.5 h-2.5 rounded-full border border-white/90 shadow-xs"
                          style={{ backgroundColor: item.swatch }}
                        />
                      </button>
                    ))}
                  </div>

                  {/* Quick Name Pill Strip */}
                  <div className="flex flex-wrap gap-1.5 pt-0.5">
                    {col.items.map((item, i) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          setSelectedIdx((prev) => ({ ...prev, [col.id]: i }));
                          setAngleByCity((prev) => ({ ...prev, [col.id]: 'studio' }));
                        }}
                        className={`pill-option ${
                          i === currentIdx ? 'active' : ''
                        } px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5`}
                      >
                        <span
                          className="w-2 h-2 rounded-full shrink-0"
                          style={{ backgroundColor: item.swatch }}
                        />
                        <span>
                          {item.name.replace(/ Claw| Set| Jaw| Bow| Bar| Pack| Duo| Arch/g, '')}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Spec Hairlines + Live Tension Hold Gauge */}
                <div className="text-xs">
                  <div className="py-2.5 hairline-t flex justify-between items-center gap-4">
                    <span style={{ color: 'var(--text-muted)' }}>Material &amp; Finish</span>
                    <span className="font-medium text-right">
                      {activeItem.material} · {activeItem.finishCategory}
                    </span>
                  </div>
                  <div className="py-2.5 hairline-t flex justify-between items-center gap-4">
                    <span style={{ color: 'var(--text-muted)' }}>Scale &amp; Weight</span>
                    <span className="font-mono text-right">
                      {activeItem.lengthCm} cm · {activeItem.weightGrams} g · {activeItem.hairType}
                    </span>
                  </div>
                  <div className="py-2.5 hairline-t hairline-b flex justify-between items-center gap-4">
                    <span style={{ color: 'var(--text-muted)' }}>Spring Hold Index</span>
                    <div className="flex items-center gap-2.5">
                      <div className="w-24 h-1.5 rounded-full overflow-hidden bg-black/10 dark:bg-white/10">
                        <div
                          className="h-full rounded-full transition-all duration-300"
                          style={{
                            width: `${activeItem.holdScore * 10}%`,
                            backgroundColor: 'var(--accent-cta)',
                          }}
                        />
                      </div>
                      <span className="font-mono font-semibold tabular-nums">
                        {activeItem.holdScore}/10
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions: Add to Bag + Inspect Full PDP */}
                <div className="flex flex-col sm:flex-row gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => onAddToCart(activeItem)}
                    className="cta-btn flex-1 py-4 px-6 rounded-full text-sm font-semibold tabular-nums inline-flex items-center justify-center gap-2 shadow-sm"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add to Bag — ${activeItem.price.toFixed(2)}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onInspectProduct(activeItem)}
                    className="pill-option py-4 px-5 rounded-full text-xs font-medium inline-flex items-center justify-center gap-1.5"
                  >
                    <Info className="w-4 h-4" />
                    <span>Specs &amp; Styling</span>
                  </button>
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
};
