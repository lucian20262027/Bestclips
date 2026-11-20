import React from 'react';
import { Heart, Moon, Search, ShoppingBag, Sparkles, Sun } from 'lucide-react';

interface HeaderProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onJumpCatalog: () => void;
  onApplyPromo: (code: string) => void;
  liveSkuCount: number | null;
}

export const Header: React.FC<HeaderProps> = ({
  theme,
  onToggleTheme,
  cartCount,
  wishlistCount,
  onOpenCart,
  onJumpCatalog,
  onApplyPromo,
  liveSkuCount,
}) => {
  return (
    <header className="sticky top-0 z-40">
      {/* Editorial Announcement Ticker */}
      <div
        className="w-full py-2 px-4 text-[11px] font-mono tracking-wide flex flex-wrap items-center justify-center gap-x-4 gap-y-1 hairline-b"
        style={{
          backgroundColor: theme === 'dark' ? '#141918' : '#1b2420',
          color: '#f4f1ea',
        }}
      >
        <span className="inline-flex items-center gap-1.5">
          <Sparkles className="w-3 h-3 text-amber-300" />
          <span>FREE US TRACKED SHIPPING $35+</span>
        </span>
        <span className="opacity-40 hidden sm:inline">·</span>
        <span className="hidden sm:inline">FREE SAKURA MINI CLIP GIFT AT $50</span>
        <span className="opacity-40 hidden md:inline">·</span>
        <button
          type="button"
          onClick={() => onApplyPromo('PRETTY15')}
          className="underline underline-offset-4 hover:text-amber-200 transition cursor-pointer"
        >
          VIP CODE: PRETTY15 (15% OFF)
        </button>
      </div>

      {/* Main Glass Navigation */}
      <div className="hairline-b bg-[var(--bg-primary)]/85 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between gap-4">
          <a href="#hero" className="flex items-center gap-2.5 group shrink-0">
            <span
              className="w-2.5 h-2.5 rounded-full transition-transform group-hover:scale-125"
              style={{ backgroundColor: 'var(--accent-cta)' }}
            />
            <span className="font-serif text-2xl font-semibold tracking-tight">BestClips</span>
            <span
              className="hidden sm:inline-block text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full hairline-border"
              style={{ color: 'var(--text-muted)' }}
            >
              Atelier
            </span>
          </a>

          <nav
            className="hidden lg:flex items-center gap-7 text-xs font-medium tracking-wide"
            style={{ color: 'var(--text-secondary)' }}
          >
            <a href="#city-cali" className="hover:text-[var(--text-primary)] transition">
              01 · Cali
            </a>
            <a href="#city-miami" className="hover:text-[var(--text-primary)] transition">
              02 · Miami
            </a>
            <a href="#city-nyc" className="hover:text-[var(--text-primary)] transition">
              03 · NYC
            </a>
            <a href="#city-tokyo" className="hover:text-[var(--text-primary)] transition">
              04 · Tokyo
            </a>
            <a href="#catalog" className="hover:text-[var(--text-primary)] transition">
              Shop All 20
            </a>
            <a href="#capsule-builder" className="hover:text-[var(--text-primary)] transition">
              3-Clip Set (-15%)
            </a>
            <a href="#fit-quiz" className="hover:text-[var(--text-primary)] transition">
              Hair Fit Quiz
            </a>
            <a href="#scale-craft" className="hover:text-[var(--text-primary)] transition">
              Scale &amp; Craft
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <div
              className="hidden xl:flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono hairline-border"
              style={{ color: 'var(--text-muted)' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>{liveSkuCount ? `${liveSkuCount} Cloud SKUs` : 'Studio Edition'}</span>
            </div>

            <button
              type="button"
              onClick={onJumpCatalog}
              aria-label="Search & Filter Catalog"
              title="Filter by Hair Type or City"
              className="w-9 h-9 rounded-full hairline-border flex items-center justify-center hover:border-[var(--border-active)] transition cursor-pointer"
            >
              <Search className="w-4 h-4" />
            </button>

            <a
              href="#catalog"
              aria-label="Saved pieces"
              title="Saved Wishlist"
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
              title="Switch Alabaster / Obsidian Mode"
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
