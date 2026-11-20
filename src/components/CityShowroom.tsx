import React, { useMemo, useState } from 'react';
import { Heart, Plus, Sparkles } from 'lucide-react';
import { CityCollection, CityId, HairDensityTag, ProductItem } from '../types';

interface CityShowroomProps {
  collections: CityCollection[];
  activeTab: 'all' | CityId;
  onTabChange: (tab: 'all' | CityId) => void;
  wishlistIds: string[];
  onToggleWishlist: (id: string) => void;
  onAddToCart: (item: ProductItem) => void;
  onInspectProduct: (item: ProductItem) => void;
}

const HAIR_CHIPS: ('All Hair' | HairDensityTag)[] = [
  'All Hair',
  'Fine & Silky',
  'Medium',
  'Thick & Curly',
  'Half-Up & Bangs',
];

export const CityShowroom: React.FC<CityShowroomProps> = ({
  collections,
  activeTab,
  onTabChange,
  wishlistIds,
  onToggleWishlist,
  onAddToCart,
  onInspectProduct,
}) => {
  const [hairFilter, setHairFilter] = useState<'All Hair' | HairDensityTag>('All Hair');

  const activeCollection =
    activeTab === 'all' ? null : collections.find((c) => c.id === activeTab) || collections[0];

  const displayedProducts = useMemo(() => {
    const base = activeCollection
      ? activeCollection.items
      : collections.flatMap((c) => c.items);

    if (hairFilter === 'All Hair') return base;
    return base.filter((p) => p.hairDensityTags.includes(hairFilter));
  }, [activeCollection, collections, hairFilter]);

  return (
    <section id="showroom" className="max-w-7xl mx-auto px-5 sm:px-8 py-16 hairline-t scroll-mt-24">
      {/* Header + City Tabs */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
        <div>
          <div
            className="text-xs font-mono uppercase tracking-widest mb-2"
            style={{ color: 'var(--text-muted)' }}
          >
            Curated Showroom · Four City Editions
          </div>
          <h2 className="font-serif font-semibold tracking-tight text-[clamp(2.1rem,4vw,3.2rem)] leading-none">
            Shop by City &amp; Hair Hold.
          </h2>
        </div>

        {/* Clean City Selector Tabs */}
        <div className="flex flex-wrap gap-1.5">
          {collections.map((col) => (
            <button
              key={col.id}
              type="button"
              onClick={() => onTabChange(col.id)}
              className={`pill-option ${
                activeTab === col.id ? 'active' : ''
              } px-4 py-2 rounded-full text-xs font-medium inline-flex items-center gap-2`}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: col.moodColor }}
              />
              <span>
                {col.code} · {col.title}
              </span>
            </button>
          ))}
          <button
            type="button"
            onClick={() => onTabChange('all')}
            className={`pill-option ${
              activeTab === 'all' ? 'active' : ''
            } px-4 py-2 rounded-full text-xs font-mono`}
          >
            All 20
          </button>
        </div>
      </div>

      {/* Compact Hair-Type Filter Strip */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-6 mb-8 hairline-b">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-mono uppercase mr-1" style={{ color: 'var(--text-muted)' }}>
            Filter by Hair:
          </span>
          {HAIR_CHIPS.map((chip) => (
            <button
              key={chip}
              type="button"
              onClick={() => setHairFilter(chip)}
              className={`pill-option ${
                hairFilter === chip ? 'active' : ''
              } px-3 py-1 rounded-full text-xs`}
            >
              {chip}
            </button>
          ))}
        </div>
        <span className="text-xs font-mono tabular-nums" style={{ color: 'var(--text-muted)' }}>
          Showing {displayedProducts.length} studio piece{displayedProducts.length === 1 ? '' : 's'}
        </span>
      </div>

      {/* Editorial City Feature Card (when a specific City tab is selected) */}
      {activeCollection && (
        <div className="surface-card rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 mb-10 shadow-md">
          <div className="lg:col-span-4 relative aspect-[4/3] lg:aspect-auto lg:min-h-[260px] overflow-hidden bg-stone-200">
            <img
              key={activeCollection.editorialImage}
              src={activeCollection.editorialImage}
              alt={activeCollection.editorialCaption}
              className="animate-stage w-full h-full object-cover"
            />
            <span className="absolute bottom-3 left-3 bg-black/65 backdrop-blur-md text-white font-mono text-[10px] px-3 py-1 rounded-full">
              {activeCollection.coordinates}
            </span>
          </div>

          <div className="lg:col-span-8 p-6 sm:p-8 flex flex-col justify-between gap-5">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono uppercase tracking-wider">
                <span className="px-2.5 py-0.5 rounded-full hairline-border" style={{ backgroundColor: 'var(--bg-pill)' }}>
                  Capsule {activeCollection.code}
                </span>
                <span style={{ color: 'var(--text-muted)' }}>{activeCollection.climateNote}</span>
              </div>
              <h3 className="font-serif text-3xl font-semibold">{activeCollection.title}</h3>
              <p className="text-sm leading-relaxed max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
                {activeCollection.stylingEthos}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 hairline-t">
              <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
                Lookbook Hero:{' '}
                <strong style={{ color: 'var(--text-primary)' }}>
                  {activeCollection.items[0].name}
                </strong>{' '}
                · {activeCollection.items[0].lengthCm} cm
              </div>
              <button
                type="button"
                onClick={() => onAddToCart(activeCollection.items[0])}
                className="cta-btn px-5 py-2.5 rounded-full text-xs font-semibold tabular-nums"
              >
                Add Flagship Piece — ${activeCollection.items[0].price}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Clean Studio Grid (5 columns on single city, 4 columns on All 20) */}
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 ${
          activeCollection ? 'lg:grid-cols-5' : 'lg:grid-cols-4'
        } gap-5`}
      >
        {displayedProducts.map((item) => {
          const isSaved = wishlistIds.includes(item.id);
          return (
            <article
              key={item.id}
              className="surface-card rounded-3xl overflow-hidden flex flex-col justify-between group transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div>
                <div
                  onClick={() => onInspectProduct(item)}
                  className="relative aspect-square overflow-hidden cursor-pointer bg-stone-200"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
                  />
                  <img
                    src={item.editorialImage}
                    alt={`${item.name} on hair`}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />

                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    {item.badge ? (
                      <span className="bg-black/65 backdrop-blur-md text-white font-mono text-[10px] px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
                        <Sparkles className="w-2.5 h-2.5 text-amber-300" />
                        {item.badge}
                      </span>
                    ) : (
                      <span className="bg-black/55 backdrop-blur-md text-white font-mono text-[10px] px-2.5 py-0.5 rounded-full">
                        {item.lengthCm} cm
                      </span>
                    )}

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleWishlist(item.id);
                      }}
                      aria-label="Save to wishlist"
                      className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-md text-white flex items-center justify-center hover:scale-105 transition cursor-pointer"
                    >
                      <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-rose-400 text-rose-400' : ''}`} />
                    </button>
                  </div>
                </div>

                <div className="p-4 space-y-1.5">
                  <div className="flex items-center justify-between text-[10px] font-mono" style={{ color: 'var(--text-muted)' }}>
                    <span className="inline-flex items-center gap-1.5 truncate">
                      <span
                        className="w-2.5 h-2.5 rounded-full border border-black/15 shrink-0"
                        style={{ backgroundColor: item.swatch }}
                      />
                      <span className="truncate">{item.finishCategory}</span>
                    </span>
                    <span className="shrink-0">Hold {item.holdScore}/10</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => onInspectProduct(item)}
                    className="font-serif text-lg font-semibold leading-snug text-left hover:underline cursor-pointer block w-full truncate"
                  >
                    {item.name}
                  </button>

                  <p className="text-[11px] truncate" style={{ color: 'var(--text-secondary)' }}>
                    {item.hairType}
                  </p>
                </div>
              </div>

              <div className="px-4 pb-4 pt-1 flex items-center justify-between gap-2">
                <span className="font-mono font-semibold text-sm tabular-nums">
                  ${item.price.toFixed(2)}
                </span>
                <button
                  type="button"
                  onClick={() => onAddToCart(item)}
                  className="cta-btn px-3.5 py-2 rounded-full text-xs font-semibold inline-flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};
