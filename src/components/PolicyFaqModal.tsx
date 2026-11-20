import React from 'react';
import { Mail, ShieldCheck, Truck, X } from 'lucide-react';

export type PolicyTab = 'shipping' | 'faq' | 'privacy' | 'terms';

interface PolicyFaqModalProps {
  activeTab: PolicyTab | null;
  onSelectTab: (tab: PolicyTab) => void;
  onClose: () => void;
}

const TAB_LABELS: { id: PolicyTab; label: string }[] = [
  { id: 'shipping', label: 'Shipping & Returns' },
  { id: 'faq', label: 'Atelier FAQ' },
  { id: 'privacy', label: 'Privacy Policy' },
  { id: 'terms', label: 'Terms & Contact' },
];

export const PolicyFaqModal: React.FC<PolicyFaqModalProps> = ({
  activeTab,
  onSelectTab,
  onClose,
}) => {
  if (!activeTab) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div onClick={onClose} className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative z-10 w-full max-w-2xl max-h-[88vh] overflow-y-auto rounded-3xl hairline-border p-6 sm:p-8 shadow-2xl space-y-6"
        style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}
      >
        <div className="flex items-start justify-between gap-4 pb-4 hairline-b">
          <div>
            <div className="text-[11px] font-mono uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
              BestClips Client Care &amp; Policies
            </div>
            <h2 className="font-serif text-3xl font-semibold mt-1">
              {TAB_LABELS.find((t) => t.id === activeTab)?.label}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close policy dialog"
            className="w-9 h-9 rounded-full hairline-border flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {TAB_LABELS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => onSelectTab(tab.id)}
              className={`pill-option ${
                activeTab === tab.id ? 'active' : ''
              } px-3.5 py-1.5 rounded-full text-xs font-medium`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="text-xs sm:text-sm leading-relaxed space-y-4" style={{ color: 'var(--text-secondary)' }}>
          {activeTab === 'shipping' && (
            <>
              <div className="p-4 rounded-2xl hairline-border flex items-start gap-3" style={{ backgroundColor: 'var(--bg-pill)' }}>
                <Truck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[var(--text-primary)]">US Tracked Dispatch</strong>
                  Orders ship within 1–2 business days. Complimentary US tracked shipping on orders
                  $35+ (otherwise $4.95 flat rate). Orders $50+ include a complimentary Sakura Mini
                  Clip.
                </div>
              </div>
              <div className="p-4 rounded-2xl hairline-border flex items-start gap-3" style={{ backgroundColor: 'var(--bg-pill)' }}>
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[var(--text-primary)]">
                    30-Day Hold Guarantee &amp; 1-Year Spring Warranty
                  </strong>
                  If your clip slips, pulls, or doesn&apos;t match your hair density within 30 days
                  of delivery, email <span className="font-mono">hello@bestclips.app</span> for a
                  hassle-free size exchange or full refund. Any 304 stainless spring defect within 1
                  year is replaced free of charge.
                </div>
              </div>
            </>
          )}

          {activeTab === 'faq' && (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-[var(--text-primary)]">
                  Which clip works best for fine, slippery hair vs. thick curly hair?
                </h3>
                <p className="mt-1">
                  For fine or silky hair, choose our <strong>Velvet Matte</strong> series (Oat Milk
                  Cloud, Venice Rose, Daikanyama Milk-Tea) or Tribeca Matte Bar—the bead-blasted
                  surface creates gentle micro-friction. For thick or 3A–4C curls, choose our{' '}
                  <strong>11.0–11.8 cm High-Torque</strong> jaws (South Beach Tiger, Brickell 24K,
                  SoHo Arch).
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-[var(--text-primary)]">
                  Where are BestClips designed and manufactured?
                </h3>
                <p className="mt-1">
                  BestClips is headquartered in the United States, partnering with independent city
                  designers across California, Miami, New York, and Tokyo. Each piece is precision
                  carved and hand-finished in specialized atelier workshops in China and Japan using
                  plant-based cellulose acetate, nickel-free hollow alloys, and 22-momme mulberry
                  silk.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-[var(--text-primary)]">
                  Can I wear them in the pool or humid weather?
                </h3>
                <p className="mt-1">
                  Yes—our 304 stainless coils resist rust and humidity. For brushed alloys and
                  mulberry silk bows, wipe dry with a clean cloth after water exposure to preserve
                  luster.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="space-y-3">
              <p>
                BestClips (&ldquo;we&rdquo;, &ldquo;our&rdquo;) respects your privacy. We collect
                only the shipping, contact, and order details necessary to fulfill purchases, send
                tracking notifications, and provide warranty support.
              </p>
              <p>
                Payment credentials are processed exclusively over encrypted PCI-DSS Level 1
                gateways (Stripe / Apple Pay / Shop Pay) and are never stored on BestClips servers.
                Shopping bag preferences are stored locally in your browser.
              </p>
              <p>
                To request data export or deletion, contact{' '}
                <span className="font-mono text-[var(--text-primary)]">hello@bestclips.app</span>.
              </p>
            </div>
          )}

          {activeTab === 'terms' && (
            <div className="space-y-4">
              <p>
                All designs, studio photography, and architectural specifications on BestClips.app
                are owned by BestClips Atelier. Prices are listed in USD; promotional privileges
                (such as <strong>PRETTY15</strong> or <strong>CAPSULE15</strong> 3-clip bundle
                savings) apply one code per order.
              </p>
              <div className="p-4 rounded-2xl hairline-border flex items-start gap-3" style={{ backgroundColor: 'var(--bg-pill)' }}>
                <Mail className="w-4 h-4 shrink-0 mt-0.5 text-[var(--text-primary)]" />
                <div>
                  <strong className="block text-[var(--text-primary)]">Concierge &amp; Wholesale</strong>
                  Support: <span className="font-mono">hello@bestclips.app</span> · Mon–Fri 9:00 AM
                  – 6:00 PM PST (California &amp; New York Studio Hours).
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
