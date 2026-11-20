import React, { useMemo, useState } from 'react';
import { ArrowRight, CheckCircle2, RotateCcw, Sparkles } from 'lucide-react';
import { ProductItem } from '../types';

interface HairFitQuizProps {
  products: ProductItem[];
  onAddToCart: (item: ProductItem) => void;
  onInspectProduct: (item: ProductItem) => void;
}

type DensityChoice = 'fine' | 'medium' | 'thick';
type SilhouetteChoice = 'twist' | 'halfup' | 'sleek';
type VibeChoice = 'cali' | 'miami' | 'nyc' | 'tokyo';

export const HairFitQuiz: React.FC<HairFitQuizProps> = ({
  products,
  onAddToCart,
  onInspectProduct,
}) => {
  const [density, setDensity] = useState<DensityChoice>('medium');
  const [silhouette, setSilhouette] = useState<SilhouetteChoice>('twist');
  const [vibe, setVibe] = useState<VibeChoice>('cali');
  const [showResults, setShowResults] = useState(false);

  const recommendations = useMemo(() => {
    const scored = products.map((item) => {
      let score = 0;
      if (item.cityId === vibe) score += 4;
      if (density === 'fine' && item.hairDensityTags.includes('Fine & Silky')) score += 4;
      if (density === 'medium' && item.hairDensityTags.includes('Medium')) score += 4;
      if (density === 'thick' && item.hairDensityTags.includes('Thick & Curly')) score += 5;

      if (silhouette === 'twist' && (item.silhouette === 'Full Claw' || item.silhouette === 'Arch Jaw')) {
        score += 3;
      }
      if (
        silhouette === 'halfup' &&
        (item.hairDensityTags.includes('Half-Up & Bangs') || item.silhouette === 'Mini Set')
      ) {
        score += 3;
      }
      if (silhouette === 'sleek' && (item.silhouette === 'Barrette & Pin' || item.silhouette === 'Arch Jaw')) {
        score += 3;
      }
      return { item, score };
    });

    return scored
      .sort((a, b) => b.score - a.score || b.item.holdScore - a.item.holdScore)
      .slice(0, 3)
      .map((s) => s.item);
  }, [products, density, silhouette, vibe]);

  const diagnosisCopy = useMemo(() => {
    if (density === 'fine') {
      return 'Velvet-matte micro-grip teeth and low-profile clasps prevent sliding on silky strands without heavy tension.';
    }
    if (density === 'thick') {
      return '11.0–11.8 cm deep-tooth arches paired with high-torque 304 double-coil springs anchor heavy volume all day.';
    }
    return 'Balanced 10.5–11.2 cm sculpted contours distribute weight evenly for crease-free French twists and half-ups.';
  }, [density]);

  return (
    <section id="fit-quiz" className="max-w-7xl mx-auto px-5 sm:px-8 py-20 hairline-t scroll-mt-24">
      <div className="surface-card rounded-3xl p-6 sm:p-10 lg:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Diagnostic Controls */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div
                className="text-xs font-mono uppercase tracking-widest inline-flex items-center gap-1.5 mb-2"
                style={{ color: 'var(--text-muted)' }}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>20-Second Studio Fit Diagnostic</span>
              </div>
              <h2 className="font-serif font-semibold tracking-tight text-[clamp(2rem,3.8vw,2.9rem)] leading-tight">
                Match your hair density &amp; city silhouette.
              </h2>
              <p className="text-sm mt-2 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                Not every clip fits every hair volume. Tell us your texture and daily look to
                calculate the ideal spring torque, tooth depth, and finish.
              </p>
            </div>

            {/* Step 1 */}
            <div className="space-y-2">
              <div className="text-xs font-mono uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                01 · Hair Density &amp; Texture
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'fine', label: 'Fine / Silky' },
                  { id: 'medium', label: 'Medium / Layered' },
                  { id: 'thick', label: 'Thick / Curly' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => {
                      setDensity(opt.id as DensityChoice);
                      setShowResults(true);
                    }}
                    className={`pill-option ${
                      density === opt.id ? 'active' : ''
                    } py-2.5 px-3 rounded-2xl text-xs font-medium text-center`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2 */}
            <div className="space-y-2">
              <div className="text-xs font-mono uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                02 · Preferred Silhouette
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'twist', label: 'Full Updo Twist' },
                  { id: 'halfup', label: 'Half-Up / Layers' },
                  { id: 'sleek', label: 'Sleek Bar / Tail' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => {
                      setSilhouette(opt.id as SilhouetteChoice);
                      setShowResults(true);
                    }}
                    className={`pill-option ${
                      silhouette === opt.id ? 'active' : ''
                    } py-2.5 px-3 rounded-2xl text-xs font-medium text-center`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3 */}
            <div className="space-y-2">
              <div className="text-xs font-mono uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                03 · City Wardrobe Mood
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'cali', label: 'Cali Pastel' },
                  { id: 'miami', label: 'Miami Tortoise' },
                  { id: 'nyc', label: 'NYC Minimalist' },
                  { id: 'tokyo', label: 'Tokyo Silk & Pearl' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => {
                      setVibe(opt.id as VibeChoice);
                      setShowResults(true);
                    }}
                    className={`pill-option ${
                      vibe === opt.id ? 'active' : ''
                    } py-2.5 px-3 rounded-2xl text-xs font-medium text-center`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => setShowResults(true)}
                className="cta-btn px-6 py-3 rounded-full text-xs font-semibold inline-flex items-center gap-2"
              >
                <span>Reveal My Studio Prescription</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              {showResults && (
                <button
                  type="button"
                  onClick={() => {
                    setDensity('medium');
                    setSilhouette('twist');
                    setVibe('cali');
                    setShowResults(false);
                  }}
                  className="pill-option px-3.5 py-2.5 rounded-full text-xs inline-flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              )}
            </div>
          </div>

          {/* Right Live Prescription Output */}
          <div className="lg:col-span-6 space-y-4">
            <div
              className="rounded-2xl p-4 hairline-border flex items-start gap-3"
              style={{ backgroundColor: 'var(--bg-pill)' }}
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div className="text-xs leading-relaxed">
                <span className="font-semibold block mb-0.5">
                  Studio Fit Note ({density.toUpperCase()} · {silhouette.toUpperCase()})
                </span>
                <span style={{ color: 'var(--text-secondary)' }}>{diagnosisCopy}</span>
              </div>
            </div>

            <div className="space-y-3">
              {recommendations.map((item, idx) => (
                <div
                  key={item.id}
                  className="rounded-2xl p-3.5 hairline-border flex items-center gap-4 hover:border-[var(--border-active)] transition"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    onClick={() => onInspectProduct(item)}
                    className="w-16 h-16 rounded-xl object-cover shrink-0 cursor-pointer"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                      #{idx + 1} Match · Hold {item.holdScore}/10
                    </div>
                    <button
                      type="button"
                      onClick={() => onInspectProduct(item)}
                      className="font-serif text-lg font-semibold truncate block text-left hover:underline cursor-pointer"
                    >
                      {item.name}
                    </button>
                    <div className="text-[11px] truncate" style={{ color: 'var(--text-muted)' }}>
                      {item.finishCategory} · {item.lengthCm} cm · {item.hairType}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => onAddToCart(item)}
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
    </section>
  );
};
