import { useEffect, useMemo, useState } from 'react';
import {
  ALL_PRODUCTS,
  CITY_COLLECTIONS,
  PROMO_CODES,
  SANITY_CONFIG,
} from './data/catalog';
import { CartItem, CityCollection, CityId, ProductItem, PromoCode } from './types';
import { trackEvent } from './utils/analytics';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CityShowroom } from './components/CityShowroom';
import { CapsuleBuilder } from './components/CapsuleBuilder';
import { ShowroomCraftAndReviews } from './components/ShowroomCraftAndReviews';
import { HairFitModal } from './components/HairFitModal';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { PolicyFaqModal, PolicyTab } from './components/PolicyFaqModal';
import { Footer } from './components/Footer';

export function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const saved = localStorage.getItem('bestclips_theme');
      if (saved === 'light' || saved === 'dark') return saved;
    } catch {
      // ignore
    }
    return 'light';
  });

  const [collections, setCollections] = useState<CityCollection[]>(CITY_COLLECTIONS);
  const [activeCityTab, setActiveCityTab] = useState<'all' | CityId>('cali');
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [activePolicyTab, setActivePolicyTab] = useState<PolicyTab | null>(null);

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const raw = localStorage.getItem('bestclips_cart_v2');
      if (raw) return JSON.parse(raw);
    } catch {
      // ignore
    }
    return [];
  });

  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem('bestclips_wishlist');
      if (raw) return JSON.parse(raw);
    } catch {
      // ignore
    }
    return [];
  });

  const [appliedPromo, setAppliedPromo] = useState<PromoCode | null>(() => {
    try {
      const code = localStorage.getItem('bestclips_promo');
      if (code && PROMO_CODES[code]) return PROMO_CODES[code];
    } catch {
      // ignore
    }
    return null;
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [inspectingProduct, setInspectingProduct] = useState<ProductItem | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    window.setTimeout(() => {
      setToastMsg((prev) => (prev === msg ? null : prev));
    }, 2800);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('bestclips_theme', theme);
    } catch {
      // ignore
    }
  }, [theme]);

  useEffect(() => {
    try {
      localStorage.setItem('bestclips_cart_v2', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('bestclips_wishlist', JSON.stringify(wishlistIds));
    } catch {
      // ignore
    }
  }, [wishlistIds]);

  useEffect(() => {
    try {
      if (appliedPromo) localStorage.setItem('bestclips_promo', appliedPromo.code);
      else localStorage.removeItem('bestclips_promo');
    } catch {
      // ignore
    }
  }, [appliedPromo]);

  // Deep-linking for paid ad campaigns (?clip=miami-4, ?city=nyc, ?quiz=1, ?policy=shipping, ?checkout=success)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const clipId = params.get('clip');
    const cityParam = params.get('city');
    const quizParam = params.get('quiz');
    const policyParam = params.get('policy') as PolicyTab | null;
    const checkoutParam = params.get('checkout');

    if (cityParam === 'all' || cityParam === 'cali' || cityParam === 'miami' || cityParam === 'nyc' || cityParam === 'tokyo') {
      setActiveCityTab(cityParam);
    }
    if (clipId) {
      const target = ALL_PRODUCTS.find((p) => p.id === clipId);
      if (target) {
        setActiveCityTab(target.cityId);
        setInspectingProduct(target);
        trackEvent('view_item', {
          item_id: target.id,
          item_name: target.name,
          value: target.price,
        });
      }
    }
    if (quizParam === '1') setIsQuizOpen(true);
    if (policyParam && ['shipping', 'faq', 'privacy', 'terms'].includes(policyParam)) {
      setActivePolicyTab(policyParam);
    }
    if (checkoutParam === 'success') {
      setCart([]);
      showToast('Payment confirmed — thank you for your BestClips order!');
      window.history.replaceState({}, '', window.location.pathname);
    } else if (checkoutParam === 'cancelled') {
      setIsCartOpen(true);
      showToast('Checkout paused — your bag is saved');
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []);

  // Preserve Sanity.io headless CMS live sync capability
  useEffect(() => {
    let active = true;
    const query = encodeURIComponent(
      `*[_type == "clipProduct"] | order(_createdAt desc) {
        _id, name, series, price, shade, swatch, material, dimensions, hairType, desc,
        "imageUrl": image.asset->url
      }`
    );
    const url = `https://${SANITY_CONFIG.projectId}.api.sanity.io/v${SANITY_CONFIG.apiVersion}/data/query/${SANITY_CONFIG.dataset}?query=${query}`;

    fetch(url)
      .then((r) => r.json())
      .then((data) => {
        if (!active) return;
        const studioItems = data?.result || [];
        if (studioItems.length > 0) {
          const grouped: Record<CityId, ProductItem[]> = {
            cali: [],
            miami: [],
            nyc: [],
            tokyo: [],
          };
          studioItems.forEach((doc: Record<string, unknown>) => {
            const series = String(doc.series || 'cali') as CityId;
            const target: CityId = grouped[series] ? series : 'cali';
            const fallbackCol = CITY_COLLECTIONS.find((c) => c.id === target)!;
            const baseFallback = fallbackCol.items[0];
            grouped[target].push({
              ...baseFallback,
              id: String(doc._id || baseFallback.id),
              cityId: target,
              name: String(doc.name || baseFallback.name),
              shade: String(doc.shade || baseFallback.shade),
              swatch: String(doc.swatch || baseFallback.swatch),
              price: Number(doc.price) || baseFallback.price,
              material: String(doc.material || baseFallback.material),
              dimensions: String(doc.dimensions || baseFallback.dimensions),
              hairType: String(doc.hairType || baseFallback.hairType),
              desc: String(doc.desc || baseFallback.desc),
              image: doc.imageUrl
                ? `${String(doc.imageUrl)}?w=1000&auto=format`
                : baseFallback.image,
            });
          });

          setCollections(
            CITY_COLLECTIONS.map((col) => {
              const live = grouped[col.id];
              const merged =
                live.length >= 5
                  ? live
                  : [...live, ...col.items.slice(0, 5 - live.length)];
              return { ...col, items: merged };
            })
          );
        }
      })
      .catch(() => {
        // Fallback smoothly to curated showroom catalog
      });

    return () => {
      active = false;
    };
  }, []);

  const allProducts = useMemo(
    () => collections.flatMap((c) => c.items),
    [collections]
  );

  const totalCartCount = useMemo(
    () => cart.reduce((s, item) => s + item.quantity, 0),
    [cart]
  );

  const handleInspectProduct = (product: ProductItem) => {
    setInspectingProduct(product);
    trackEvent('view_item', {
      item_id: product.id,
      item_name: product.name,
      value: product.price,
    });
    const url = new URL(window.location.href);
    url.searchParams.set('clip', product.id);
    window.history.replaceState({}, '', url.toString());
  };

  const handleCloseProduct = () => {
    setInspectingProduct(null);
    const url = new URL(window.location.href);
    if (url.searchParams.has('clip')) {
      url.searchParams.delete('clip');
      window.history.replaceState({}, '', url.toString());
    }
  };

  const handleAddToCart = (product: ProductItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    trackEvent('add_to_cart', {
      item_id: product.id,
      item_name: product.name,
      value: product.price,
    });
    setIsCartOpen(true);
    showToast(`${product.name} added to bag`);
  };

  const handleAddBundle = (items: ProductItem[]) => {
    setCart((prev) => {
      const next = [...prev];
      items.forEach((item) => {
        const idx = next.findIndex((c) => c.product.id === item.id);
        if (idx >= 0) {
          next[idx] = { ...next[idx], quantity: next[idx].quantity + 1 };
        } else {
          next.push({ product: item, quantity: 1 });
        }
      });
      return next;
    });
    const bundleVal = items.reduce((s, i) => s + i.price, 0) * 0.85;
    trackEvent('add_to_cart', {
      item_id: items.map((i) => i.id).join(','),
      item_name: '3-Piece City Capsule',
      value: bundleVal,
    });
    setAppliedPromo(PROMO_CODES.CAPSULE15);
    setIsCartOpen(true);
    showToast('3-Piece City Capsule added · 15% Off unlocked');
  };

  const handleUpdateQty = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.product.id === id
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleToggleWishlist = (id: string) => {
    setWishlistIds((prev) => {
      const exists = prev.includes(id);
      showToast(exists ? 'Removed from saved pieces' : 'Saved to your wishlist');
      return exists ? prev.filter((x) => x !== id) : [...prev, id];
    });
  };

  const handleApplyPromoCode = (raw: string) => {
    const code = raw.trim().toUpperCase();
    if (PROMO_CODES[code]) {
      setAppliedPromo(PROMO_CODES[code]);
      trackEvent('apply_promo', { promo_code: code });
      showToast(`${code} applied`);
      return { ok: true, msg: `✓ ${code} applied (${PROMO_CODES[code].desc})` };
    }
    return { ok: false, msg: 'Try PRETTY15 or WELCOME10' };
  };

  const handleQuickPromo = (code: string) => {
    handleApplyPromoCode(code);
    setIsCartOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between relative">
      <div className="topo-bg" aria-hidden="true" />

      <Header
        theme={theme}
        onToggleTheme={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
        cartCount={totalCartCount}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onApplyPromo={handleQuickPromo}
      />

      <main className="relative z-10">
        <Hero
          collections={collections}
          onAddToCart={handleAddToCart}
          onInspectProduct={handleInspectProduct}
          onOpenQuiz={() => setIsQuizOpen(true)}
          onSelectCityTab={(cityId) => setActiveCityTab(cityId)}
        />

        <CityShowroom
          collections={collections}
          activeTab={activeCityTab}
          onTabChange={setActiveCityTab}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
          onAddToCart={handleAddToCart}
          onInspectProduct={handleInspectProduct}
        />

        <CapsuleBuilder
          collections={collections}
          onAddBundle={handleAddBundle}
        />

        <ShowroomCraftAndReviews />
      </main>

      <Footer
        onApplyPromo={handleQuickPromo}
        onOpenPolicy={(tab) => setActivePolicyTab(tab)}
      />

      <HairFitModal
        isOpen={isQuizOpen}
        products={allProducts.length ? allProducts : ALL_PRODUCTS}
        onClose={() => setIsQuizOpen(false)}
        onAddToCart={handleAddToCart}
        onInspectProduct={handleInspectProduct}
      />

      <ProductModal
        product={inspectingProduct}
        allProducts={allProducts.length ? allProducts : ALL_PRODUCTS}
        isWishlisted={
          inspectingProduct ? wishlistIds.includes(inspectingProduct.id) : false
        }
        onToggleWishlist={handleToggleWishlist}
        onClose={handleCloseProduct}
        onAddToCart={handleAddToCart}
        onSelectProduct={handleInspectProduct}
      />

      <PolicyFaqModal
        activeTab={activePolicyTab}
        onSelectTab={setActivePolicyTab}
        onClose={() => setActivePolicyTab(null)}
      />

      <CartDrawer
        isOpen={isCartOpen}
        cart={cart}
        appliedPromo={appliedPromo}
        upsellProducts={[
          allProducts[3] || ALL_PRODUCTS[3],
          allProducts[16] || ALL_PRODUCTS[16],
          allProducts[10] || ALL_PRODUCTS[10],
        ]}
        onClose={() => setIsCartOpen(false)}
        onUpdateQty={handleUpdateQty}
        onAddProduct={handleAddToCart}
        onApplyPromoCode={handleApplyPromoCode}
        onClearCart={() => setCart([])}
      />

      <div
        className={`fixed bottom-6 right-6 z-50 surface-card text-xs font-medium px-5 py-3 rounded-full shadow-2xl transition-all duration-300 pointer-events-none ${
          toastMsg ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
        }`}
      >
        {toastMsg || ''}
      </div>
    </div>
  );
}

export default App;
