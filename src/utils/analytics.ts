type AnalyticsEventName =
  | 'view_item'
  | 'add_to_cart'
  | 'begin_checkout'
  | 'apply_promo'
  | 'purchase';

interface EventPayload {
  item_id?: string;
  item_name?: string;
  value?: number;
  currency?: string;
  promo_code?: string;
  items_count?: number;
}

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    ttq?: { track: (event: string, data?: Record<string, unknown>) => void };
  }
}

export function trackEvent(event: AnalyticsEventName, payload: EventPayload = {}): void {
  if (typeof window === 'undefined') return;

  const data = { currency: 'USD', ...payload };

  window.dataLayer?.push({ event, ...data });
  window.gtag?.('event', event, data);

  const metaMap: Record<AnalyticsEventName, string | null> = {
    view_item: 'ViewContent',
    add_to_cart: 'AddToCart',
    begin_checkout: 'InitiateCheckout',
    purchase: 'Purchase',
    apply_promo: null,
  };

  const fbEvent = metaMap[event];
  if (fbEvent) {
    window.fbq?.('track', fbEvent, {
      content_ids: payload.item_id ? [payload.item_id] : undefined,
      content_name: payload.item_name,
      value: payload.value,
      currency: 'USD',
    });
    window.ttq?.track(fbEvent, {
      content_id: payload.item_id,
      content_name: payload.item_name,
      value: payload.value,
      currency: 'USD',
    });
  }
}
