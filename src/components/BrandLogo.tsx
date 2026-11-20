import React from 'react';

interface BrandLogoProps {
  showSlogan?: boolean;
  size?: 'sm' | 'md';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  showSlogan = true,
  size = 'sm',
}) => {
  const iconBox = size === 'md' ? 'w-10 h-10 rounded-xl' : 'w-9 h-9 rounded-xl';
  const wordSize = size === 'md' ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl';

  return (
    <div className="inline-flex items-center gap-3 group">
      {/* Bespoke Architectural Claw Crest Emblem */}
      <div
        className={`${iconBox} flex items-center justify-center shrink-0 shadow-xs transition-transform duration-300 group-hover:scale-105`}
        style={{ backgroundColor: '#1b2420' }}
      >
        <svg
          viewBox="0 0 64 64"
          fill="none"
          className="w-6 h-6"
          aria-hidden="true"
        >
          <path
            d="M14 40C14 27 22 18 32 18C42 18 50 27 50 40"
            stroke="#F4E7D1"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d="M25 18.5C26 13.5 28.5 11 32 11C35.5 11 38 13.5 39 18.5"
            stroke="#D4AF37"
            strokeWidth="2.8"
            strokeLinecap="round"
          />
          <circle cx="32" cy="21" r="2.8" fill="#D4AF37" />
          <path
            d="M17.5 40V47M24.5 38.5V48M32 37.5V48.5M39.5 38.5V48M46.5 40V47"
            stroke="#F4E7D1"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M14 39.5H50"
            stroke="#F4E7D1"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeOpacity="0.65"
          />
        </svg>
      </div>

      {/* Wordmark + Catchy Slogan */}
      <div className="flex flex-col leading-none">
        <div className="flex items-center gap-2">
          <span className={`font-serif ${wordSize} font-semibold tracking-tight`}>
            BestClips
          </span>
          {showSlogan && (
            <span
              className="hidden xl:inline-block pl-2 ml-0.5 text-[11px] font-medium tracking-wide border-l"
              style={{
                borderColor: 'var(--border-hairline)',
                color: 'var(--text-secondary)',
              }}
            >
              Clip Your City. Hold Your World.
            </span>
          )}
        </div>
        {showSlogan && (
          <span
            className="text-[10px] font-mono tracking-wider uppercase mt-0.5"
            style={{ color: 'var(--text-muted)' }}
          >
            <span className="xl:hidden">Clip Your City · </span>US Indie Design · Made in CN &amp; JP
          </span>
        )}
      </div>
    </div>
  );
};
