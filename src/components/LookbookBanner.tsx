import React, { useState } from 'react';
import { CityCollection, ProductItem } from '../types';

interface LookbookBannerProps {
  collections: CityCollection[];
  onInspectProduct: (item: ProductItem) => void;
  onAddToCart: (item: ProductItem) => void;
}

export const LookbookBanner: React.FC<LookbookBannerProps> = ({
  collections,
  onInspectProduct,
  onAddToCart,
}) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const current = collections[activeIdx] || collections[0];
  const heroPiece = current.items[0];

  return (
    <section id="showcase" className="max-w-7xl mx-auto px-5 sm:px-8 py-20 hairline-t">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <div
            className="text-xs font-mono uppercase tracking-widest mb-2"
            style={{ color: 'var(--text-muted)' }}
          >
            Editorial Lookbook · On-Hair Campaign
          </div>
          <h2 className="font-serif font-semibold tracking-tight text-[clamp(2rem,4vw,3.1rem)]">
            Four cities. Styled on real hair.
          </h2>
        </div>
        <p className="text-sm max-w-md" style={{ color: 'var(--text-secondary)' }}>
          See how each silhouette sits in motion—from Malibu golden-hour French twists to SoHo
          tailored low updos.
        </p>
      </div>

      <div className="surface-card rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 shadow-xl">
        <div className="lg:col-span-7 relative aspect-[4/4.2] lg:aspect-auto lg:min-h-[520px] overflow-hidden bg-stone-200">
          <img
            key={current.editorialImage}
            src={current.editorialImage}
            alt={current.editorialCaption}
            className="animate-stage w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <div className="text-[11px] font-mono uppercase tracking-widest text-white/80">
              {current.code} · {current.title} · {current.coordinates}
            </div>
            <p className="font-serif text-2xl sm:text-3xl font-semibold mt-1">
              {current.editorialCaption}
            </p>
          </div>
        </div>

        <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between gap-8">
          <div className="space-y-6">
            <div className="flex flex-wrap gap-1.5">
              {collections.map((col, idx) => (
                <button
                  key={col.id}
                  type="button"
                  onClick={() => setActiveIdx(idx)}
                  className={`pill-option ${
                    idx === activeIdx ? 'active' : ''
                  } px-3.5 py-1.5 rounded-full text-xs font-mono`}
                >
                  {col.code} · {col.title.split(' ')[0]}
                </button>
              ))}
            </div>

            <div className="space-y-3">
              <div className="text-xs font-mono uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                Featured Look Piece
              </div>
              <div className="flex items-center gap-4">
                <img
                  src={heroPiece.image}
                  alt={heroPiece.name}
                  className="w-20 h-20 rounded-2xl object-cover hairline-border"
                />
                <div>
                  <h3 className="font-serif text-2xl font-semibold">{heroPiece.name}</h3>
                  <div className="text-xs font-mono mt-0.5" style={{ color: 'var(--text-muted)' }}>
                    {heroPiece.shade} · {heroPiece.lengthCm} cm
                  </div>
                </div>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {current.stylingEthos}
              </p>
              <div
                className="rounded-2xl p-4 hairline-border text-xs leading-relaxed"
                style={{ backgroundColor: 'var(--bg-pill)' }}
              >
                <span className="font-mono uppercase text-[10px] block mb-1" style={{ color: 'var(--text-muted)' }}>
                  Atelier Styling Tip
                </span>
                {heroPiece.stylingTip}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => onAddToCart(heroPiece)}
              className="cta-btn flex-1 py-3.5 px-6 rounded-full text-xs font-semibold tabular-nums"
            >
              Add Featured Piece — ${heroPiece.price.toFixed(2)}
            </button>
            <button
              type="button"
              onClick={() => onInspectProduct(heroPiece)}
              className="pill-option py-3.5 px-5 rounded-full text-xs font-medium"
            >
              Inspect Specs
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
