import React from 'react';

interface BrandLogoProps {
  showSlogan?: boolean;
  size?: 'sm' | 'md';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  showSlogan = true,
  size = 'sm',
}) => {
  const iconBox = size === 'md' ? 'w-11 h-11 rounded-2xl' : 'w-10 h-10 rounded-xl';
  const wordSize = size === 'md' ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl';

  return (
    <div className="inline-flex items-center gap-3 group">
      {/* Warm Rose-Quartz to Lilac "C" Comb & Chignon Emblem */}
      <div
        className={`${iconBox} flex items-center justify-center shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-105 overflow-hidden`}
      >
        <img
          src="/favicon.svg"
          alt="BestClips C-Comb Crest"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Wordmark + Catchy Slogan */}
      <div className="flex flex-col leading-none">
        <div className="flex items-center gap-2">
          <span className={`font-serif ${wordSize} font-semibold tracking-tight`}>
            BestClips
          </span>
          {showSlogan && (
            <span
              className="hidden xl:inline-block pl-2.5 ml-0.5 text-[11px] font-medium tracking-wide border-l"
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
