import React, { useState } from 'react';
import { Check, Layers, Plus, Sparkles, X } from 'lucide-react';
import { CityCollection, CityId, ProductItem } from '../types';

interface CapsuleBuilderProps {
  collections: CityCollection[];
  onAddBundle: (items: ProductItem[]) => void;
}

export const CapsuleBuilder: React.FC<CapsuleBuilderProps> = ({
  collections,
  onAddBundle,
}) => {
  const [activeCity, setActiveCity] = useState<CityId>('cali');
  const [slots, setSlots] = useState<ProductItem[]>([
    collections[0].items[0],
    collections[1].items[3],
  ]);

  const activeCollection =
    collections.find((c) => c.id === activeCity) || collections[0];

  const handleToggleSlot = (item: ProductItem) => {
    setSlots((prev) => {
      if (prev.length >= 3) {
        return [prev[1], prev[2], item];
      }
      return [...prev, item];
    });
  };

  const removeSlot = (index: number) => {
    setSlots((prev) => prev.filter((_, i) => i !== index));
  };

  const applyPreset = (presetCity: CityId) => {
    const col = collections.find((c) => c.id === presetCity);
    if (!col) return;
    setActiveCity(presetCity);
    setSlots(col.items.slice(0, 3));
  };

  const rawTotal = slots.reduce((sum, s) => sum + s.price, 0);
  const isComplete = slots.length === 3;
  const discountedTotal = isComplete ? rawTotal * 0.85 : rawTotal;
  const savings = isComplete ? rawTotal - discountedTotal : 0;

  return (
    <section
      id="capsule-builder"
      className="max-w-7xl mx-auto px-5 sm:px-8 py-20 hairline-t scroll-mt-24"
    >
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
        <div className="space-y-2 max-w-2xl">
          <div
            className="text-xs font-mono uppercase tracking-widest inline-flex items-center gap-1.5"
            style={{ color: 'var(--text-muted)' }}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Curate Your 3-Piece Edit · Automatic 15% Capsule Privilege</span>
          </div>
          <h2 className="font-serif font-semibold tracking-tight text-[clamp(2rem,4vw,3.2rem)]">
            Build Your City Capsule Tray.
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Mix and match any 3 pieces across California, Miami, NYC, and Tokyo. Complete 3 slots to
            unlock <strong>15% off</strong>, Free US Tracked Shipping, and a complimentary Sakura
            Mini Clip if your tray reaches $50.
          </p>
        </div>

        {/* One-Click City Trio Presets */}
        <div className="flex flex-wrap gap-1.5">
          {collections.map((col) => (
            <button
              key={col.id}
              type="button"
              onClick={() => applyPreset(col.id)}
              className="pill-option px-3.5 py-2 rounded-full text-xs font-mono"
            >
              Auto-Fill {col.title} Trio
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Picker Grid */}
        <div className="lg:col-span-7 surface-card rounded-3xl p-5 sm:p-6 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-1.5">
              {collections.map((col) => (
                <button
                  key={col.id}
                  type="button"
                  onClick={() => setActiveCity(col.id)}
                  className={`pill-option ${
                    activeCity === col.id ? 'active' : ''
                  } px-3.5 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5`}
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: col.moodColor }}
                  />
                  <span>{col.title}</span>
                </button>
              ))}
            </div>
            <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
              Tap to add to tray
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
            {activeCollection.items.map((item) => {
              const countInTray = slots.filter((s) => s.id === item.id).length;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleToggleSlot(item)}
                  className="text-left rounded-2xl overflow-hidden hairline-border bg-transparent hover:border-[var(--border-active)] transition group cursor-pointer flex flex-col"
                >
                  <div className="relative aspect-square overflow-hidden bg-stone-200">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    {countInTray > 0 && (
                      <span className="absolute top-2 right-2 bg-emerald-700 text-white text-[10px] font-mono px-2 py-0.5 rounded-full inline-flex items-center gap-1 shadow-sm">
                        <Check className="w-2.5 h-2.5" />
                        {countInTray}x
                      </span>
                    )}
                    <span className="absolute bottom-2 right-2 w-7 h-7 rounded-full bg-black/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                      <Plus className="w-3.5 h-3.5" />
                    </span>
                  </div>
                  <div className="p-3 space-y-0.5">
                    <div className="text-xs font-semibold truncate">{item.name}</div>
                    <div className="flex items-center justify-between text-[11px] font-mono" style={{ color: 'var(--text-muted)' }}>
                      <span>{item.lengthCm} cm</span>
                      <span>${item.price}</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Live 3-Slot Travertine Tray Summary */}
        <div className="lg:col-span-5 surface-card rounded-3xl p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
                Your Capsule Tray
              </div>
              <h3 className="font-serif text-2xl font-semibold mt-0.5">
                {slots.length} of 3 Pieces Selected
              </h3>
            </div>
            {isComplete ? (
              <span className="px-3 py-1 rounded-full text-[11px] font-mono bg-emerald-600/15 text-emerald-700 dark:text-emerald-300 font-medium inline-flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> 15% Unlocked
              </span>
            ) : (
              <span className="px-3 py-1 rounded-full text-[11px] font-mono hairline-border" style={{ color: 'var(--text-muted)' }}>
                Pick {3 - slots.length} more
              </span>
            )}
          </div>

          {/* 3 Visual Slots */}
          <div className="space-y-3">
            {[0, 1, 2].map((slotIdx) => {
              const item = slots[slotIdx];
              if (!item) {
                return (
                  <div
                    key={slotIdx}
                    className="h-20 rounded-2xl border border-dashed flex items-center justify-center text-xs font-mono"
                    style={{ borderColor: 'var(--border-hairline)', color: 'var(--text-muted)' }}
                  >
                    Slot 0{slotIdx + 1} · Select any piece on the left
                  </div>
                );
              }
              return (
                <div
                  key={`${item.id}-${slotIdx}`}
                  className="p-2.5 rounded-2xl hairline-border flex items-center gap-3.5"
                  style={{ backgroundColor: 'var(--bg-pill)' }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 rounded-xl object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold truncate">{item.name}</div>
                    <div className="text-[11px] font-mono mt-0.5" style={{ color: 'var(--text-muted)' }}>
                      {item.cityId.toUpperCase()} · {item.shade}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs font-mono font-semibold tabular-nums">
                      ${item.price}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeSlot(slotIdx)}
                      aria-label="Remove from capsule"
                      className="w-7 h-7 rounded-full hairline-border flex items-center justify-center hover:opacity-75 cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pricing Breakdown */}
          <div className="pt-4 hairline-t space-y-2 text-xs tabular-nums">
            <div className="flex justify-between" style={{ color: 'var(--text-secondary)' }}>
              <span>Individual Value</span>
              <span className="font-mono">${rawTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-emerald-700 dark:text-emerald-400 font-medium">
              <span>Capsule Privilege (15% Off)</span>
              <span className="font-mono">-${savings.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-base font-bold pt-2 hairline-t">
              <span>Capsule Total</span>
              <span className="font-mono">${discountedTotal.toFixed(2)}</span>
            </div>
          </div>

          <button
            type="button"
            disabled={!isComplete}
            onClick={() => isComplete && onAddBundle(slots)}
            className={`w-full py-4 px-6 rounded-full text-sm font-semibold transition ${
              isComplete
                ? 'cta-btn shadow-md'
                : 'opacity-45 cursor-not-allowed hairline-border'
            }`}
          >
            {isComplete
              ? `Add 3-Piece Capsule — $${discountedTotal.toFixed(2)}`
              : `Select ${3 - slots.length} More Piece${3 - slots.length > 1 ? 's' : ''} to Save 15%`}
          </button>
        </div>
      </div>
    </section>
  );
};
