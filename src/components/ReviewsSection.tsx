import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { HAIR_REVIEWS } from '../data/reviews';
import { HairDensityTag } from '../types';

const REVIEW_FILTERS: ('All Profiles' | HairDensityTag)[] = [
  'All Profiles',
  'Fine & Silky',
  'Medium',
  'Thick & Curly',
  'Half-Up & Bangs',
];

export const ReviewsSection: React.FC = () => {
  const [activeTag, setActiveTag] = useState<'All Profiles' | HairDensityTag>('All Profiles');

  const visibleReviews =
    activeTag === 'All Profiles'
      ? HAIR_REVIEWS
      : HAIR_REVIEWS.filter((r) => r.densityTag === activeTag);

  return (
    <section id="reviews" className="max-w-7xl mx-auto px-5 sm:px-8 py-20 hairline-t">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <div
            className="text-xs font-mono uppercase tracking-widest mb-2"
            style={{ color: 'var(--text-muted)' }}
          >
            Verified Community · 4.9 / 5.0 Average
          </div>
          <h2 className="font-serif font-semibold tracking-tight text-[clamp(2rem,3.8vw,3rem)]">
            Tested across real hair textures.
          </h2>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {REVIEW_FILTERS.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setActiveTag(tag)}
              className={`pill-option ${
                activeTag === tag ? 'active' : ''
              } px-3.5 py-1.5 rounded-full text-xs font-medium`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleReviews.map((rev) => (
          <article key={rev.id} className="surface-card rounded-3xl p-6 flex flex-col justify-between gap-5">
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-0.5 text-amber-500">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                  ))}
                </div>
                <span
                  className="text-[10px] font-mono px-2.5 py-0.5 rounded-full hairline-border"
                  style={{ backgroundColor: 'var(--bg-pill)', color: 'var(--text-secondary)' }}
                >
                  {rev.densityTag}
                </span>
              </div>

              <h3 className="font-serif text-xl font-semibold leading-snug">{rev.title}</h3>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                “{rev.quote}”
              </p>
            </div>

            <div className="pt-4 hairline-t text-[11px] flex items-center justify-between gap-2">
              <div>
                <div className="font-semibold">{rev.author}</div>
                <div style={{ color: 'var(--text-muted)' }}>{rev.hairProfile}</div>
              </div>
              <div className="text-right font-mono" style={{ color: 'var(--text-muted)' }}>
                <div>{rev.productName}</div>
                <div>{rev.cityTitle}</div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
