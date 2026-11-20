import React, { useMemo, useState } from 'react';
import { Heart, Plus, Search, SlidersHorizontal, X } from 'lucide-react';
import { CityId, FinishCategory, HairDensityTag, ProductItem } from '../types';

interface CatalogExplorerProps {
  products: ProductItem[];
  wishlistIds: string[];
  onToggleWishlist: (id: string) => void;
  onAddToCart: (item: ProductItem) => void;
  onInspectProduct: (item: ProductItem) => void;
}

const CITY_FILTERS: { id: 'all' | CityId; label: string }[] = [
  { id: 'all', label: 'All 4 Cities' },
  { id: 'cali', label: '01 Cali' },
  { id: 'miami', label: '02 Miami' },
  { id: 'nyc', label: '03 NYC' },
  { id: 'tokyo', label: '04 Tokyo' },
];

const HAIR_FILTERS: ('All Hair' | HairDensityTag)[] = [
  'All Hair',
  'Fine & Silky',
  'Medium',
  'Thick & Curly',
  'Half-Up & Bangs',
];

const FINISH_FILTERS: ('All Finishes' | FinishCategory)[] = [
  'All Finishes',
  'Mirror Gloss',
  'Velvet Matte',
  'Brushed Metal',
  'Silk & Pearl',
];

export const CatalogExplorer: React.FC<CatalogExplorerProps> = ({
  products,
  wishlistIds,
  onToggleWishlist,
  onAddToCart,
  onInspectProduct,
}) => {
  const [cityFilter, setCityFilter] = useState<'all' | CityId>('all');
  const [hairFilter, setHairFilter] = useState<'All Hair' | HairDensityTag>('All Hair');
  const [finishFilter, setFinishFilter] = useState<'All Finishes' | FinishCategory>('All Finishes');
  const [onlySaved, setOnlySaved] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'hold-desc'>('featured');

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const list = products.filter((item) => {
      if (cityFilter !== 'all' && item.cityId !== cityFilter) return false;
      if (hairFilter !== 'All Hair' && !item.hairDensityTags.includes(hairFilter)) return false;
      if (finishFilter !== 'All Finishes' && item.finishCategory !== finishFilter) return false;
      if (onlySaved && !wishlistIds.includes(item.id)) return false;
      if (q) {
        const hay = `${item.name} ${item.shade} ${item.material} ${item.hairType} ${item.cityId}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });

    if (sortBy === 'price-asc') {
      return [...list].sort((a, b) => a.price - b.price);
    }
    if (sortBy === 'hold-desc') {
      return [...list].sort((a, b) => b.holdScore - a.holdScore || b.lengthCm - a.lengthCm);
    }
    return list;
  }, [products, cityFilter, hairFilter, finishFilter, onlySaved, wishlistIds, searchQuery, sortBy]);

  const clearAll = () => {
    setCityFilter('all');
    setHairFilter('All Hair');
    setFinishFilter('All Finishes');
    setOnlySaved(false);
    setSearchQuery('');
    setSortBy('featured');
  };

  return (
    <section id="catalog" className="max-w-7xl mx-auto px-5 sm:px-8 py-20 hairline-t scroll-mt-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <div
            className="text-xs font-mono uppercase tracking-widest mb-2"
            style={{ color: 'var(--text-muted)' }}
          >
            Complete Atelier Index · 20 Studio Pieces
          </div>
          <h2 className="font-serif font-semibold tracking-tight text-[clamp(2rem,4vw,3.1rem)]">
            Shop by Hair Density, Finish &amp; City.
          </h2>
        </div>

        {/* Search & Sort Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="relative">
            <Search
              className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2"
              style={{ color: 'var(--text-muted)' }}
            />
            <input
              id="catalog-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tortoise, silk, pearl..."
              className="pl-9 pr-8 py-2 rounded-full text-xs hairline-border bg-transparent focus:outline-none focus:border-[var(--border-active)] w-56"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 opacity-60 hover:opacity-100 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            aria-label="Sort products"
            className="px-3.5 py-2 rounded-full text-xs font-mono hairline-border bg-transparent cursor-pointer focus:outline-none"
          >
            <option value="featured">Sort: Curated</option>
            <option value="hold-desc">Sort: Strongest Hold</option>
            <option value="price-asc">Sort: Price Low–High</option>
          </select>
        </div>
      </div>

      {/* Multi-Axis Filter Ribbon */}
      <div className="surface-card rounded-2xl p-4 mb-10 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-1.5">
            <span
              className="text-[11px] font-mono uppercase tracking-wider mr-1 inline-flex items-center gap-1"
              style={{ color: 'var(--text-muted)' }}
            >
              <SlidersHorizontal className="w-3 h-3" /> City:
            </span>
            {CITY_FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setCityFilter(f.id)}
                className={`pill-option ${
                  cityFilter === f.id ? 'active' : ''
                } px-3 py-1 rounded-full text-xs font-medium`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setOnlySaved((v) => !v)}
            className={`pill-option ${
              onlySaved ? 'active' : ''
            } px-3.5 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1.5`}
          >
            <Heart className={`w-3 h-3 ${onlySaved ? 'fill-rose-500 text-rose-500' : ''}`} />
            <span>Saved ({wishlistIds.length})</span>
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 hairline-t">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-mono uppercase" style={{ color: 'var(--text-muted)' }}>
              Hair Fit:
            </span>
            {HAIR_FILTERS.map((hf) => (
              <button
                key={hf}
                type="button"
                onClick={() => setHairFilter(hf)}
                className={`pill-option ${
                  hairFilter === hf ? 'active' : ''
                } px-2.5 py-1 rounded-full text-[11px] font-medium`}
              >
                {hf}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-mono uppercase" style={{ color: 'var(--text-muted)' }}>
              Finish:
            </span>
            {FINISH_FILTERS.map((ff) => (
              <button
                key={ff}
                type="button"
                onClick={() => setFinishFilter(ff)}
                className={`pill-option ${
                  finishFilter === ff ? 'active' : ''
                } px-2.5 py-1 rounded-full text-[11px] font-medium`}
              >
                {ff}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="surface-card rounded-3xl p-12 text-center space-y-3">
          <p className="font-serif text-2xl">No studio pieces match those filters.</p>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            Try resetting your hair-type or finish selection to view all 20 pieces.
          </p>
          <button
            type="button"
            onClick={clearAll}
            className="cta-btn px-5 py-2.5 rounded-full text-xs font-semibold"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((item) => {
            const isSaved = wishlistIds.includes(item.id);
            return (
              <article
                key={item.id}
                className="surface-card rounded-3xl overflow-hidden flex flex-col justify-between group transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div>
                  {/* Hover-Swap Media: Studio <-> Editorial On-Hair */}
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
                      alt={`${item.name} styled on hair`}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100 scale-105 group-hover:scale-100"
                    />

                    {/* Top Pill & Save */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      <span className="bg-black/60 backdrop-blur-md text-white font-mono text-[10px] px-2.5 py-1 rounded-full">
                        {item.cityId.toUpperCase()} · {item.lengthCm}cm
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleWishlist(item.id);
                        }}
                        aria-label="Toggle wishlist"
                        className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-md text-white flex items-center justify-center hover:scale-105 transition cursor-pointer"
                      >
                        <Heart
                          className={`w-3.5 h-3.5 ${isSaved ? 'fill-rose-400 text-rose-400' : ''}`}
                        />
                      </button>
                    </div>

                    {/* Hover Label */}
                    <span className="absolute bottom-3 left-3 bg-white/90 text-stone-950 font-mono text-[10px] px-2.5 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition">
                      On-Hair Preview · Click for Specs
                    </span>
                  </div>

                  {/* Card Body */}
                  <div className="p-4 space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 text-[11px] font-mono" style={{ color: 'var(--text-muted)' }}>
                        <span
                          className="w-2.5 h-2.5 rounded-full border border-black/15"
                          style={{ backgroundColor: item.swatch }}
                        />
                        <span className="truncate max-w-[130px]">{item.finishCategory}</span>
                      </div>
                      <span className="text-[11px] font-mono tabular-nums" style={{ color: 'var(--text-muted)' }}>
                        Hold {item.holdScore}/10
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => onInspectProduct(item)}
                      className="text-left font-serif text-xl font-semibold leading-snug hover:underline cursor-pointer block w-full"
                    >
                      {item.name}
                    </button>

                    <p className="text-xs truncate" style={{ color: 'var(--text-secondary)' }}>
                      {item.shade} · {item.hairType}
                    </p>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="px-4 pb-4 pt-2 flex items-center justify-between gap-2">
                  <span className="font-mono font-semibold text-sm tabular-nums">
                    ${item.price.toFixed(2)}
                  </span>
                  <button
                    type="button"
                    onClick={() => onAddToCart(item)}
                    className="cta-btn px-4 py-2 rounded-full text-xs font-semibold inline-flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
};
