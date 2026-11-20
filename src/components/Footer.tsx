import React from 'react';
import { BrandLogo } from './BrandLogo';
import { PolicyTab } from './PolicyFaqModal';

interface FooterProps {
  onApplyPromo: (code: string) => void;
  onOpenPolicy: (tab: PolicyTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onApplyPromo, onOpenPolicy }) => {
  return (
    <footer className="relative z-10 hairline-t py-14 px-5 sm:px-8 text-xs" style={{ color: 'var(--text-muted)' }}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 pb-10 hairline-b">
        <div className="md:col-span-5 space-y-3">
          <BrandLogo showSlogan size="md" />
          <p className="leading-relaxed max-w-sm pt-1" style={{ color: 'var(--text-secondary)' }}>
            US-headquartered hair architecture collective partnering with independent designers
            across California, Miami, New York, and Tokyo—precision crafted in China &amp; Japan.
          </p>
          <p className="font-mono text-[11px]">Concierge: hello@bestclips.app</p>
        </div>

        <div className="md:col-span-2 space-y-2">
          <div className="font-mono uppercase tracking-widest text-[10px]" style={{ color: 'var(--text-primary)' }}>
            City Capsules
          </div>
          <ul className="space-y-1.5">
            <li><a href="#showroom" className="hover:underline">01 · Spring in Cali</a></li>
            <li><a href="#showroom" className="hover:underline">02 · Hot Miami</a></li>
            <li><a href="#showroom" className="hover:underline">03 · NYC Office OOTD</a></li>
            <li><a href="#showroom" className="hover:underline">04 · Tokyo Trade</a></li>
          </ul>
        </div>

        <div className="md:col-span-2 space-y-2">
          <div className="font-mono uppercase tracking-widest text-[10px]" style={{ color: 'var(--text-primary)' }}>
            Client Care
          </div>
          <ul className="space-y-1.5">
            <li>
              <button type="button" onClick={() => onOpenPolicy('shipping')} className="hover:underline cursor-pointer">
                Shipping &amp; 30-Day Returns
              </button>
            </li>
            <li>
              <button type="button" onClick={() => onOpenPolicy('faq')} className="hover:underline cursor-pointer">
                Atelier FAQ &amp; Hair Fit
              </button>
            </li>
            <li>
              <button type="button" onClick={() => onOpenPolicy('privacy')} className="hover:underline cursor-pointer">
                Privacy Policy
              </button>
            </li>
            <li>
              <button type="button" onClick={() => onOpenPolicy('terms')} className="hover:underline cursor-pointer">
                Terms &amp; Contact
              </button>
            </li>
          </ul>
        </div>

        <div className="md:col-span-3 space-y-2.5">
          <div className="font-mono uppercase tracking-widest text-[10px]" style={{ color: 'var(--text-primary)' }}>
            Studio Privileges
          </div>
          <p>Free US Tracked Shipping at $35 · Free Sakura Mini Clip at $50 · 1-Year Spring Warranty.</p>
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
        <span>© 2026 BestClips.app · Clip Your City. Hold Your World.</span>
        <span className="font-mono">US Indie City Design · Crafted in China &amp; Japan</span>
      </div>
    </footer>
  );
};
