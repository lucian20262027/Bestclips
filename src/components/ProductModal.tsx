import React, { useState } from 'react';
import { Check, ChevronDown, Heart, Link2, Plus, ShieldCheck, Sparkles, X } from 'lucide-react';
import { ProductItem } from '../types';

interface ProductModalProps {
  product: ProductItem | null;
  allProducts: ProductItem[];
  isWishlisted: boolean;
  onToggleWishlist: (id: string) => void;
  onClose: () => void;
  onAddToCart: (item: ProductItem) => void;
  onSelectProduct: (item: ProductItem) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  allProducts,
  isWishlisted,
  onToggleWishlist,
  onClose,
  onAddToCart,
  onSelectProduct,
}) => {
  const [galleryTab, setGalleryTab] = useState<'studio' | 'editorial' | 'spring'>('studio');
  const [openAccordion, setOpenAccordion] = useState<'material' | 'care' | null>('material');
  const [copiedLink, setCopiedLink] = useState(false);

  if (!product) return null;

  const handleCopyShareLink = () => {
    const shareUrl = `${window.location.origin}/?clip=${encodeURIComponent(product.id)}`;
    navigator.clipboard?.writeText(shareUrl).catch(() => {});
    setCopiedLink(true);
    window.setTimeout(() => setCopiedLink(false), 2000);
  };

  const activeImg =
    galleryTab === 'editorial'
      ? product.editorialImage
      : galleryTab === 'spring'
      ? '/assets/studio/macro-spring.jpg'
      : product.image;

  const pairings = product.pairWithIds
    .map((id) => allProducts.find((p) => p.id === id))
    .filter((p): p is ProductItem => Boolean(p));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />
      <div
        className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl hairline-border shadow-2xl grid grid-cols-1 md:grid-cols-12"
        style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close product modal"
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full hairline-border bg-[var(--bg-primary)]/90 flex items-center justify-center hover:opacity-80 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Left Visual Gallery */}
        <div className="md:col-span-6 p-4 sm:p-6 flex flex-col gap-3">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-stone-200">
            <img
              key={activeImg}
              src={activeImg}
              alt={product.name}
              className="animate-stage w-full h-full object-cover"
            />
            <span className="absolute top-3 left-3 bg-black/65 backdrop-blur-md text-white font-mono text-[10px] px-3 py-1 rounded-full">
              {product.lengthCm} cm · {product.weightGrams} g
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {[
              { key: 'studio', label: 'Studio', src: product.image },
              { key: 'editorial', label: 'On Hair', src: product.editorialImage },
              { key: 'spring', label: '304 Coil', src: '/assets/studio/macro-spring.jpg' },
            ].map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setGalleryTab(tab.key as typeof galleryTab)}
                className={`rounded-xl overflow-hidden hairline-border relative aspect-[4/3] cursor-pointer ${
                  galleryTab === tab.key ? 'ring-2 ring-[var(--border-active)]' : 'opacity-70'
                }`}
              >
                <img src={tab.src} alt={tab.label} className="w-full h-full object-cover" />
                <span className="absolute bottom-1 left-1 bg-black/70 text-white text-[10px] font-mono px-2 py-0.5 rounded-full">
                  {tab.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Right PDP Details */}
        <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-2 text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
              <span>{product.cityId.toUpperCase()} CAPSULE · ★ {product.rating.toFixed(1)} ({product.reviewCount})</span>
              <button
                type="button"
                onClick={handleCopyShareLink}
                className="pill-option px-2.5 py-1 rounded-full text-[10px] inline-flex items-center gap-1 mr-8"
              >
                {copiedLink ? <Check className="w-3 h-3 text-emerald-600" /> : <Link2 className="w-3 h-3" />}
                <span>{copiedLink ? 'Link Copied' : 'Share Link'}</span>
              </button>
            </div>

            <div className="flex items-baseline justify-between gap-3">
              <h2 className="font-serif text-3xl font-semibold leading-tight">{product.name}</h2>
              <span className="font-mono text-2xl font-bold tabular-nums">
                ${product.price.toFixed(2)}
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span
                className="w-3 h-3 rounded-full border border-black/15"
                style={{ backgroundColor: product.swatch }}
              />
              <span className="font-medium">{product.shade}</span>
              <span style={{ color: 'var(--text-muted)' }}>· {product.hairType}</span>
            </div>

            <p className="text-xs sm:text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {product.desc}
            </p>

            {/* Hold Strength Meter */}
            <div className="p-3.5 rounded-2xl hairline-border space-y-1.5" style={{ backgroundColor: 'var(--bg-pill)' }}>
              <div className="flex justify-between text-xs font-mono">
                <span>Spring Tension Hold</span>
                <span className="font-semibold">{product.holdScore}/10</span>
              </div>
              <div className="h-1.5 w-full rounded-full overflow-hidden bg-black/10 dark:bg-white/10">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${product.holdScore * 10}%`, backgroundColor: 'var(--accent-cta)' }}
                />
              </div>
              <div className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
                Styling tip: {product.stylingTip}
              </div>
            </div>

            {/* Accordions: Material Provenance & Care */}
            <div className="text-xs divide-y divide-[var(--border-hairline)] hairline-t hairline-b">
              <div>
                <button
                  type="button"
                  onClick={() =>
                    setOpenAccordion(openAccordion === 'material' ? null : 'material')
                  }
                  className="w-full py-3 flex items-center justify-between font-medium cursor-pointer"
                >
                  <span>Material Provenance &amp; Hardware</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      openAccordion === 'material' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openAccordion === 'material' && (
                  <p className="pb-3 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    <strong>{product.material}</strong> ({product.dimensions}). {product.craftNote}
                  </p>
                )}
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => setOpenAccordion(openAccordion === 'care' ? null : 'care')}
                  className="w-full py-3 flex items-center justify-between font-medium cursor-pointer"
                >
                  <span>Care Guide &amp; 30-Day Hold Guarantee</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      openAccordion === 'care' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openAccordion === 'care' && (
                  <p className="pb-3 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    Wipe with a soft dry microfiber cloth; keep dry after poolside wear. Covered by
                    our 30-Day Zero-Slip Hold Guarantee and 1-Year 304 Spring Warranty.
                  </p>
                )}
              </div>
            </div>

            {/* Complete the Look Cross-Sell */}
            {pairings.length > 0 && (
              <div className="space-y-2 pt-1">
                <div className="text-[11px] font-mono uppercase tracking-wider flex items-center gap-1" style={{ color: 'var(--text-muted)' }}>
                  <Sparkles className="w-3 h-3" /> Complete the Look
                </div>
                <div className="grid grid-cols-2 gap-2.5">
                  {pairings.map((pair) => (
                    <div
                      key={pair.id}
                      className="p-2 rounded-2xl hairline-border flex items-center gap-2.5"
                    >
                      <img
                        src={pair.image}
                        alt={pair.name}
                        onClick={() => {
                          setGalleryTab('studio');
                          onSelectProduct(pair);
                        }}
                        className="w-11 h-11 rounded-xl object-cover cursor-pointer shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <button
                          type="button"
                          onClick={() => {
                            setGalleryTab('studio');
                            onSelectProduct(pair);
                          }}
                          className="text-[11px] font-semibold truncate block text-left hover:underline cursor-pointer w-full"
                        >
                          {pair.name}
                        </button>
                        <div className="text-[10px] font-mono" style={{ color: 'var(--text-muted)' }}>
                          ${pair.price}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => onAddToCart(pair)}
                        aria-label={`Add ${pair.name}`}
                        className="w-7 h-7 rounded-full cta-btn flex items-center justify-center shrink-0"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-2.5">
            <div className="flex gap-2.5">
              <button
                type="button"
                onClick={() => {
                  onAddToCart(product);
                  onClose();
                }}
                className="cta-btn flex-1 py-4 px-6 rounded-full text-sm font-semibold tabular-nums"
              >
                Add to Bag — ${product.price.toFixed(2)}
              </button>
              <button
                type="button"
                onClick={() => onToggleWishlist(product.id)}
                aria-label="Wishlist"
                className="w-12 h-12 rounded-full hairline-border flex items-center justify-center cursor-pointer"
              >
                <Heart
                  className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`}
                />
              </button>
            </div>
            <div className="flex items-center justify-center gap-1.5 text-[11px]" style={{ color: 'var(--text-muted)' }}>
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Free US shipping at $35 · Free Sakura Mini Clip at $50</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
