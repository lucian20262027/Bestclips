import React, { useMemo, useState } from 'react';
import { CheckCircle2, RotateCcw, Sparkles, X } from 'lucide-react';
import { ProductItem } from '../types';

interface HairFitModalProps {
  isOpen: boolean;
  products: ProductItem[];
  onClose: () => void;
  onAddToCart: (item: ProductItem) => void;
  onInspectProduct: (item: ProductItem) => void;
}

type DensityChoice = 'fine' | 'medium' | 'thick';
type SilhouetteChoice = 'twist' | 'halfup' | 'sleek';
type VibeChoice = 'cali' | 'miami' | 'nyc' | 'tokyo';

export const HairFitModal: React.FC<HairFitModalProps> = ({
  isOpen,
  products,
  onClose,
  onAddToCart,
  onInspectProduct,
}) => {
  const [density, setDensity] = useState<DensityChoice>('medium');
  const [silhouette, setSilhouette] = useState<SilhouetteChoice>('twist');
  const [vibe, setVibe] = useState<VibeChoice>('cali');

  const recommendations = useMemo(() => {
    return products
      .map((item) => {
        let score = 0;
        if (item.cityId === vibe) score += 4;
        if (density === 'fine' && item.hairDensityTags.includes('Fine & Silky')) score += 4;
        if (density === 'medium' && item.hairDensityTags.includes('Medium')) score += 4;
        if (density === 'thick' && item.hairDensityTags.includes('Thick & Curly')) score += 5;
        if (silhouette === 'twist' && (item.silhouette === 'Full Claw' || item.silhouette === 'Arch Jaw')) score += 3;
        if (silhouette === 'halfup' && (item.hairDensityTags.includes('Half-Up & Bangs') || item.silhouette === 'Mini Set')) score += 3;
        if (silhouette === 'sleek' && (item.silhouette === 'Barrette & Pin' || item.silhouette === 'Arch Jaw')) score += 3;
        return { item, score };
      })
      .sort((a, b) => b.score - a.score || b.item.holdScore - a.item.holdScore)
      .slice(0, 3)
      .map((s) => s.item);
  }, [products, density, silhouette, vibe]);

  if (!isOpen) return null;

  const diagnosis =
    density === 'fine'
      ? 'Velvet-matte micro-grip teeth and low-profile steel clasps prevent sliding on silky hair.'
      : density === 'thick'
      ? '11.0–11.8 cm deep-tooth arches with high-torque 304 double-coil springs lock heavy curls all day.'
      : 'Balanced 10.5–11.2 cm sculpted contours distribute weight evenly without tension headaches.';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div onClick={onClose} className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl hairline-border p-6 sm:p-8 shadow-2xl"
        style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}
      >
        <div className="flex items-start justify-between gap-4 pb-5 hairline-b">
          <div>
            <div className="text-[11px] font-mono uppercase tracking-widest inline-flex items-center gap-1.5" style={{ color: 'var(--text-muted)' }}>
              <Sparkles className="w-3.5 h-3.5" /> 15-Second Studio Fit Diagnostic
            </div>
            <h2 className="font-serif text-3xl font-semibold mt-1">
              Find Your Exact Spring Torque &amp; Silhouette.
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close quiz"
            className="w-9 h-9 rounded-full hairline-border flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
          <div className="lg:col-span-6 space-y-5">
            <div className="space-y-2">
              <div className="text-xs font-mono uppercase" style={{ color: 'var(--text-muted)' }}>
                01 · Hair Density
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'fine', label: 'Fine / Silky' },
                  { id: 'medium', label: 'Medium' },
                  { id: 'thick', label: 'Thick / Curly' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setDensity(opt.id as DensityChoice)}
                    className={`pill-option ${density === opt.id ? 'active' : ''} py-2.5 px-3 rounded-2xl text-xs font-medium`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-mono uppercase" style={{ color: 'var(--text-muted)' }}>
                02 · Preferred Style
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'twist', label: 'Full Twist' },
                  { id: 'halfup', label: 'Half-Up' },
                  { id: 'sleek', label: 'Sleek Bar' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setSilhouette(opt.id as SilhouetteChoice)}
                    className={`pill-option ${silhouette === opt.id ? 'active' : ''} py-2.5 px-3 rounded-2xl text-xs font-medium`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-mono uppercase" style={{ color: 'var(--text-muted)' }}>
                03 · City Mood
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'cali', label: 'Cali' },
                  { id: 'miami', label: 'Miami' },
                  { id: 'nyc', label: 'NYC' },
                  { id: 'tokyo', label: 'Tokyo' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setVibe(opt.id as VibeChoice)}
                    className={`pill-option ${vibe === opt.id ? 'active' : ''} py-2.5 px-3 rounded-2xl text-xs font-medium`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-2xl p-4 hairline-border flex items-start gap-2.5 text-xs" style={{ backgroundColor: 'var(--bg-pill)' }}>
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span style={{ color: 'var(--text-secondary)' }}>{diagnosis}</span>
            </div>

            <button
              type="button"
              onClick={() => {
                setDensity('medium');
                setSilhouette('twist');
                setVibe('cali');
              }}
              className="pill-option px-3.5 py-2 rounded-full text-xs inline-flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" /> Reset Choices
            </button>
          </div>

          <div className="lg:col-span-6 space-y-3">
            <div className="text-xs font-mono uppercase" style={{ color: 'var(--text-muted)' }}>
              Your Top 3 Matched Pieces
            </div>
            {recommendations.map((item, i) => (
              <div
                key={item.id}
                className="rounded-2xl p-3 hairline-border flex items-center gap-3.5"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  onClick={() => {
                    onClose();
                    onInspectProduct(item);
                  }}
                  className="w-16 h-16 rounded-xl object-cover cursor-pointer shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400">
                    #{i + 1} Match · Hold {item.holdScore}/10
                  </div>
                  <div className="font-serif text-lg font-semibold truncate">{item.name}</div>
                  <div className="text-[11px] truncate" style={{ color: 'var(--text-muted)' }}>
                    {item.lengthCm} cm · {item.finishCategory}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    onAddToCart(item);
                    onClose();
                  }}
                  className="cta-btn px-4 py-2 rounded-full text-xs font-semibold shrink-0 tabular-nums"
                >
                  Add ${item.price}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
