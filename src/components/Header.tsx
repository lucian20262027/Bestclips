import React from 'react';
import { Heart, Moon, ShoppingBag, Sparkles, Sun } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface HeaderProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenQuiz: () => void;
  onApplyPromo: (code: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  theme,
  onToggleTheme,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenQuiz,
  onApplyPromo,
}) => {
  return (
    <header className="sticky top-0 z-40">
      {/* Minimalist Showroom Announcement Bar */}
      <div
        className="w-full py-2 px-4 text-[11px] font-mono tracking-wide flex flex-wrap items-center justify-center gap-x-4 gap-y-1 hairline-b"
        style={{
          backgroundColor: theme === 'dark' ? '#141918' : '#1b2420',
          color: '#f4f1ea',
        }}
      >
        <span className="inline-flex items-center gap-1.5">
          <Sparkles className="w-3 h-3 text-amber-300" />
          <span>US INDIE CITY DESIGNERS · CRAFTED IN CHINA &amp; JAPAN</span>
        </span>
        <span className="opacity-40 hidden sm:inline">·</span>
        <span className="hidden sm:inline">FREE US SHIPPING $35+ · FREE GIFT AT $50</span>
        <span className="opacity-40 hidden md:inline">·</span>
        <button
          type="button"
          onClick={() => onApplyPromo('PRETTY15')}
          className="underline underline-offset-4 hover:text-amber-200 transition cursor-pointer"
        >
          VIP 15% CODE: PRETTY15
        </button>
      </div>

      {/* Single-Row Clean Flagship Navigation */}
      <div className="hairline-b bg-[var(--bg-primary)]/85 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-[68px] flex items-center justify-between gap-4">
          <a href="#hero" className="shrink-0">
            <BrandLogo showSlogan size="sm" />
          </a>

          <nav
            className="hidden lg:flex items-center gap-7 text-xs font-medium tracking-wide"
            style={{ color: 'var(--text-secondary)' }}
          >
            <a href="#showroom" className="hover:text-[var(--text-primary)] transition">
              City Capsules
            </a>
            <a href="#capsule-builder" className="hover:text-[var(--text-primary)] transition">
              3-Clip Set (-15%)
            </a>
            <button
              type="button"
              onClick={onOpenQuiz}
              className="hover:text-[var(--text-primary)] transition cursor-pointer"
            >
              15s Hair Fit Quiz
            </button>
            <a href="#craft-reviews" className="hover:text-[var(--text-primary)] transition">
              Craft &amp; Reviews
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="#showroom"
              aria-label="Saved wishlist"
              className="relative w-9 h-9 rounded-full hairline-border hidden sm:flex items-center justify-center hover:border-[var(--border-active)] transition"
            >
              <Heart className="w-4 h-4" />
              {wishlistCount > 0 && (
                <span
                  className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[10px] font-mono font-semibold flex items-center justify-center text-white"
                  style={{ backgroundColor: 'var(--accent-gold)' }}
                >
                  {wishlistCount}
                </span>
              )}
            </a>

            <button
              type="button"
              onClick={onToggleTheme}
              aria-label="Toggle studio theme"
              className="w-9 h-9 rounded-full hairline-border flex items-center justify-center hover:border-[var(--border-active)] transition cursor-pointer"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              type="button"
              onClick={onOpenCart}
              aria-label="Open shopping bag"
              className="relative h-9 px-3.5 rounded-full hairline-border flex items-center gap-2 hover:border-[var(--border-active)] transition cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="text-xs font-mono font-medium tabular-nums">{cartCount}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
