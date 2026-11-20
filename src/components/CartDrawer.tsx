import React, { useState } from 'react';
import { ArrowLeft, Check, Gift, Minus, Plus, ShieldCheck, X } from 'lucide-react';
import { CartItem, ProductItem, PromoCode } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  cart: CartItem[];
  appliedPromo: PromoCode | null;
  upsellProducts: ProductItem[];
  onClose: () => void;
  onUpdateQty: (id: string, delta: number) => void;
  onAddProduct: (item: ProductItem) => void;
  onApplyPromoCode: (raw: string) => { ok: boolean; msg: string };
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  cart,
  appliedPromo,
  upsellProducts,
  onClose,
  onUpdateQty,
  onAddProduct,
  onApplyPromoCode,
  onClearCart,
}) => {
  const [step, setStep] = useState<'cart' | 'checkout' | 'confirmation'>('cart');
  const [promoInput, setPromoInput] = useState('');
  const [promoFeedback, setPromoFeedback] = useState<{ ok: boolean; msg: string } | null>(null);
  const [receipt, setReceipt] = useState<{
    id: string;
    name: string;
    email: string;
    address: string;
    total: number;
  } | null>(null);

  if (!isOpen) return null;

  const totalItems = cart.reduce((s, i) => s + i.quantity, 0);
  const subtotal = cart.reduce((s, i) => s + i.product.price * i.quantity, 0);
  const effectivePromo =
    appliedPromo ||
    (totalItems >= 3
      ? { code: 'CAPSULE15', pct: 0.15, desc: '15% Off 3+ Piece Edit' }
      : null);
  const discountAmount = effectivePromo ? subtotal * effectivePromo.pct : 0;
  const discountedSubtotal = Math.max(0, subtotal - discountAmount);
  const shippingCost = discountedSubtotal >= 35 || discountedSubtotal === 0 ? 0 : 4.95;
  const finalTotal = discountedSubtotal + shippingCost;
  const unlockedFreeGift = subtotal >= 50;

  const handlePromoSubmit = () => {
    if (!promoInput.trim()) return;
    const res = onApplyPromoCode(promoInput);
    setPromoFeedback(res);
  };

  const handleCheckoutSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = String(formData.get('name') || 'Guest');
    const email = String(formData.get('email') || '');
    const address = `${formData.get('address')}, ${formData.get('city')}`;
    setReceipt({
      id: `#BC-${Math.floor(100000 + Math.random() * 900000)}`,
      name,
      email,
      address,
      total: finalTotal,
    });
    onClearCart();
    setStep('confirmation');
  };

  const cartIds = new Set(cart.map((c) => c.product.id));
  const suggestions = upsellProducts.filter((p) => !cartIds.has(p.id)).slice(0, 2);

  return (
    <div className="fixed inset-0 z-50">
      <div
        onClick={() => {
          setStep('cart');
          onClose();
        }}
        className="fixed inset-0 bg-black/55 backdrop-blur-sm"
      />
      <aside
        className="fixed inset-y-0 right-0 max-w-md w-full hairline-border flex flex-col justify-between z-10 shadow-2xl"
        style={{ backgroundColor: 'var(--bg-elevated)', color: 'var(--text-primary)' }}
      >
        {/* Header */}
        <div className="px-6 py-4 hairline-b flex items-center justify-between">
          <div className="flex items-center gap-2">
            {step === 'checkout' && (
              <button
                type="button"
                onClick={() => setStep('cart')}
                className="p-1.5 rounded-full hairline-border hover:opacity-75 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            <h2 className="font-serif text-xl font-semibold">
              {step === 'cart' ? `Bag (${totalItems})` : step === 'checkout' ? 'Studio Checkout' : 'Confirmed'}
            </h2>
          </div>
          <button
            type="button"
            onClick={() => {
              setStep('cart');
              onClose();
            }}
            aria-label="Close bag"
            className="p-1.5 rounded-full hairline-border hover:opacity-75 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Dual Milestone Bar */}
        <div className="px-6 py-3 hairline-b" style={{ backgroundColor: 'var(--bg-pill)' }}>
          <p className="text-xs mb-1.5" style={{ color: 'var(--text-secondary)' }}>
            {subtotal >= 50
              ? '✓ Free US Shipping + Free Sakura Mini Clip unlocked'
              : subtotal >= 35
              ? `✓ Free Shipping unlocked · Add $${(50 - subtotal).toFixed(2)} for Free Mini Clip`
              : subtotal > 0
              ? `Add $${(35 - subtotal).toFixed(2)} for Free US Shipping ($50 for Free Gift)`
              : 'Free US shipping at $35 · Free Sakura Mini Clip at $50'}
          </p>
          <div className="w-full h-1.5 rounded-full overflow-hidden bg-black/10 dark:bg-white/10">
            <div
              className="h-full transition-all duration-500 rounded-full"
              style={{
                width: `${Math.min(100, Math.round((subtotal / 50) * 100))}%`,
                backgroundColor: 'var(--accent-cta)',
              }}
            />
          </div>
        </div>

        {/* Step 1: Bag */}
        {step === 'cart' && (
          <div className="flex-1 flex flex-col justify-between overflow-hidden">
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-3">
                  <p className="font-serif text-2xl">Your studio bag is empty.</p>
                  <p className="text-xs max-w-xs" style={{ color: 'var(--text-muted)' }}>
                    Add any 3 pieces across our 4 city capsules to automatically unlock 15% off.
                  </p>
                </div>
              ) : (
                <>
                  {cart.map(({ product, quantity }) => (
                    <div key={product.id} className="flex items-center gap-3.5 py-3 hairline-b">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 rounded-2xl object-cover shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-semibold truncate">{product.name}</h4>
                        <p className="text-[11px] mt-0.5 truncate" style={{ color: 'var(--text-muted)' }}>
                          {product.shade} · ${product.price.toFixed(2)}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            type="button"
                            onClick={() => onUpdateQty(product.id, -1)}
                            className="w-6 h-6 rounded-full hairline-border flex items-center justify-center cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-mono w-4 text-center">{quantity}</span>
                          <button
                            type="button"
                            onClick={() => onUpdateQty(product.id, 1)}
                            className="w-6 h-6 rounded-full hairline-border flex items-center justify-center cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      <div className="text-xs font-mono font-semibold tabular-nums">
                        ${(product.price * quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}

                  {unlockedFreeGift && (
                    <div
                      className="flex items-center gap-3 p-3 rounded-2xl hairline-border"
                      style={{ backgroundColor: 'var(--bg-pill)' }}
                    >
                      <img
                        src="/assets/studio/tokyo-3.jpg"
                        alt="Complimentary Sakura Mini Clip"
                        className="w-12 h-12 rounded-xl object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-[10px] font-mono uppercase text-emerald-700 dark:text-emerald-400 inline-flex items-center gap-1">
                          <Gift className="w-3 h-3" /> Complimentary ($50+)
                        </div>
                        <div className="text-xs font-semibold truncate">Sakura Mini Clip</div>
                      </div>
                      <span className="text-xs font-mono text-emerald-700 dark:text-emerald-400 font-semibold">
                        FREE
                      </span>
                    </div>
                  )}
                </>
              )}

              {/* Quick Cross-Sell Strip */}
              {suggestions.length > 0 && (
                <div className="pt-3 space-y-2">
                  <div className="text-[10px] font-mono uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                    Pair With Your Edit
                  </div>
                  <div className="space-y-2">
                    {suggestions.map((item) => (
                      <div
                        key={item.id}
                        className="p-2.5 rounded-2xl hairline-border flex items-center gap-3"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-11 h-11 rounded-xl object-cover shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-semibold truncate">{item.name}</div>
                          <div className="text-[10px] font-mono" style={{ color: 'var(--text-muted)' }}>
                            {item.lengthCm} cm · ${item.price}
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => onAddProduct(item)}
                          className="pill-option px-3 py-1.5 rounded-full text-[11px] font-semibold"
                        >
                          + Add
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="hairline-t px-6 py-5 space-y-3" style={{ backgroundColor: 'var(--bg-primary)' }}>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  placeholder="Promo code (PRETTY15)"
                  className="flex-1 bg-transparent hairline-border rounded-full px-4 py-2 text-xs uppercase font-mono focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handlePromoSubmit}
                  className="pill-option text-xs font-medium px-4 py-2 rounded-full"
                >
                  Apply
                </button>
              </div>
              {promoFeedback && (
                <div
                  className={`text-[11px] ${
                    promoFeedback.ok ? 'text-emerald-600 font-medium' : 'text-rose-500'
                  }`}
                >
                  {promoFeedback.msg}
                </div>
              )}

              <div className="space-y-1.5 text-xs pt-2 hairline-t tabular-nums">
                <div className="flex justify-between" style={{ color: 'var(--text-secondary)' }}>
                  <span>Subtotal</span>
                  <span className="font-mono">${subtotal.toFixed(2)}</span>
                </div>
                {effectivePromo && subtotal > 0 && (
                  <div className="flex justify-between text-emerald-700 dark:text-emerald-400 font-medium">
                    <span>Privilege ({effectivePromo.code})</span>
                    <span className="font-mono">-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between" style={{ color: 'var(--text-secondary)' }}>
                  <span>US Tracked Shipping</span>
                  <span className="font-mono">
                    {subtotal === 0 ? '$0.00' : shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold pt-1">
                  <span>Total</span>
                  <span className="font-mono">${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                type="button"
                disabled={cart.length === 0}
                onClick={() => setStep('checkout')}
                className={`w-full py-3.5 px-4 rounded-full text-sm font-semibold ${
                  cart.length > 0 ? 'cta-btn' : 'opacity-45 cursor-not-allowed hairline-border'
                }`}
              >
                Continue to Checkout
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Checkout */}
        {step === 'checkout' && (
          <form onSubmit={handleCheckoutSubmit} className="flex-1 flex flex-col justify-between overflow-y-auto">
            <div className="px-6 py-5 space-y-4">
              <div
                className="rounded-2xl p-4 hairline-border flex justify-between items-center text-sm"
                style={{ backgroundColor: 'var(--bg-pill)' }}
              >
                <span>
                  Order Total (<span className="font-mono">{totalItems + (unlockedFreeGift ? 1 : 0)}</span> items)
                </span>
                <span className="text-lg font-mono font-bold tabular-nums">${finalTotal.toFixed(2)}</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="py-2.5 rounded-xl bg-black text-white text-center text-xs font-semibold">
                   Pay Express Ready
                </div>
                <div className="py-2.5 rounded-xl bg-indigo-600 text-white text-center text-xs font-semibold">
                  Shop Pay · 4x Interest-Free
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                  Full Name *
                </label>
                <input
                  name="name"
                  type="text"
                  required
                  placeholder="Chloe Miller"
                  className="w-full bg-transparent hairline-border rounded-xl px-3.5 py-2.5 text-sm focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                  Email for Dispatch Tracking *
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="chloe@example.com"
                  className="w-full bg-transparent hairline-border rounded-xl px-3.5 py-2.5 text-sm focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                  Shipping Address *
                </label>
                <input
                  name="address"
                  type="text"
                  required
                  placeholder="450 Sutter St, Apt 302"
                  className="w-full bg-transparent hairline-border rounded-xl px-3.5 py-2.5 text-sm focus:outline-none mb-2"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    name="city"
                    type="text"
                    required
                    placeholder="San Francisco, CA"
                    className="w-full bg-transparent hairline-border rounded-xl px-3.5 py-2.5 text-sm focus:outline-none"
                  />
                  <input
                    name="zip"
                    type="text"
                    required
                    placeholder="94108"
                    className="w-full bg-transparent hairline-border rounded-xl px-3.5 py-2.5 text-sm focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="hairline-t px-6 py-5 space-y-2.5" style={{ backgroundColor: 'var(--bg-primary)' }}>
              <div className="flex items-center justify-center gap-1.5 text-[11px]" style={{ color: 'var(--text-muted)' }}>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>30-Day Hold Guarantee · Easy Returns</span>
              </div>
              <button type="submit" className="cta-btn w-full py-3.5 px-4 rounded-full text-sm font-semibold">
                Place Studio Order
              </button>
            </div>
          </form>
        )}

        {/* Step 3: Confirmation */}
        {step === 'confirmation' && receipt && (
          <div className="flex-1 flex flex-col justify-between px-6 py-8 text-center overflow-y-auto">
            <div className="my-auto space-y-4">
              <div className="w-12 h-12 rounded-full hairline-border flex items-center justify-center mx-auto text-emerald-600">
                <Check className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs font-mono uppercase tracking-widest text-emerald-600">
                  Order Confirmed
                </div>
                <h3 className="font-serif text-3xl font-semibold mt-1">
                  Thank you, {receipt.name}
                </h3>
                <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
                  Order <span className="font-mono">{receipt.id}</span> is queued for studio dispatch.
                </p>
              </div>
              <div
                className="rounded-2xl p-4 hairline-border text-left text-xs space-y-2 mt-4"
                style={{ backgroundColor: 'var(--bg-pill)' }}
              >
                <div className="flex justify-between">
                  <span style={{ color: 'var(--text-muted)' }}>Tracking Email</span>
                  <span className="font-medium">{receipt.email}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: 'var(--text-muted)' }}>Destination</span>
                  <span className="font-medium text-right max-w-[200px]">{receipt.address}</span>
                </div>
                <div className="flex justify-between pt-2 hairline-t text-sm font-bold">
                  <span>Total Paid</span>
                  <span className="font-mono">${receipt.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setStep('cart');
                onClose();
              }}
              className="cta-btn w-full py-3.5 px-4 rounded-full text-sm font-semibold mt-6"
            >
              Continue Exploring
            </button>
          </div>
        )}
      </aside>
    </div>
  );
};
