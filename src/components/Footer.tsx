import React from 'react';

interface FooterProps {
  onApplyPromo: (code: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onApplyPromo }) => {
  return (
    <footer className="relative z-10 hairline-t py-14 px-5 sm:px-8 text-xs" style={{ color: 'var(--text-muted)' }}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 pb-10 hairline-b">
        <div className="md:col-span-5 space-y-3">
          <div className="font-serif text-2xl font-semibold" style={{ color: 'var(--text-primary)' }}>
            BestClips Atelier
          </div>
          <p className="leading-relaxed max-w-sm" style={{ color: 'var(--text-secondary)' }}>
            Engineered hair architecture designed in California &amp; New York, crafted with
            plant-based cellulose acetate, hollow architectural alloys, and 22-momme mulberry silk.
          </p>
        </div>

        <div className="md:col-span-3 space-y-2">
          <div className="font-mono uppercase tracking-widest text-[10px]" style={{ color: 'var(--text-primary)' }}>
            City Capsules
          </div>
          <ul className="space-y-1.5">
            <li><a href="#city-cali" className="hover:underline">01 · Spring in Cali</a></li>
            <li><a href="#city-miami" className="hover:underline">02 · Hot Miami</a></li>
            <li><a href="#city-nyc" className="hover:underline">03 · NYC Office OOTD</a></li>
            <li><a href="#city-tokyo" className="hover:underline">04 · Tokyo Trade</a></li>
          </ul>
        </div>

        <div className="md:col-span-4 space-y-2.5">
          <div className="font-mono uppercase tracking-widest text-[10px]" style={{ color: 'var(--text-primary)' }}>
            Studio Privileges
          </div>
          <p>Free US Tracked Shipping at $35 · Free Sakura Mini Clip at $50 · 30-Day Hold Guarantee.</p>
          <button
            type="button"
            onClick={() => onApplyPromo('PRETTY15')}
            className="pill-option px-4 py-2 rounded-full text-xs font-mono"
          >
            Unlock VIP 15% Code (PRETTY15)
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span>© 2026 BestClips.app · Sculpted for effortless hold.</span>
        <span className="font-mono">Designed in CA &amp; NYC · Craftsmanship in CN &amp; JP</span>
      </div>
    </footer>
  );
};
