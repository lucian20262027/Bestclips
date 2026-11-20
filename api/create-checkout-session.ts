interface ApiRequest {
  method?: string;
  headers: Record<string, string | string[] | undefined>;
  [Symbol.asyncIterator](): AsyncIterator<Uint8Array | string>;
}

interface ApiResponse {
  statusCode: number;
  setHeader(name: string, value: string): void;
  end(body?: string): void;
}

// Authoritative server-side catalog pricing (cents) so client payloads cannot tamper with prices
const SERVER_PRICE_CENTS: Record<string, { name: string; unitAmount: number }> = {
  'cali-1': { name: 'Malibu Sunset Claw', unitAmount: 1600 },
  'cali-2': { name: 'Oat Milk Cloud Matte', unitAmount: 1400 },
  'cali-3': { name: 'Big Sur Seafoam Claw', unitAmount: 1500 },
  'cali-4': { name: 'Santa Barbara Mini Set', unitAmount: 1500 },
  'cali-5': { name: 'Venice Rose Cloud Claw', unitAmount: 1500 },
  'miami-1': { name: 'South Beach Tiger Claw', unitAmount: 1800 },
  'miami-2': { name: 'Wynwood Leopard Jaw', unitAmount: 1700 },
  'miami-3': { name: 'Ocean Drive Flame Coral', unitAmount: 1600 },
  'miami-4': { name: 'Brickell 24K Havana Claw', unitAmount: 1900 },
  'miami-5': { name: 'Star Island Molten Arch', unitAmount: 2100 },
  'nyc-1': { name: 'SoHo Brushed Gold Arch', unitAmount: 2000 },
  'nyc-2': { name: 'Tribeca Matte Noir Bar', unitAmount: 1500 },
  'nyc-3': { name: 'Fifth Ave Classic Tortoise', unitAmount: 1800 },
  'nyc-4': { name: 'Madison Sterling Arch', unitAmount: 2000 },
  'nyc-5': { name: 'Upper East Pearl Duo', unitAmount: 1900 },
  'tokyo-1': { name: 'Harajuku Silk Ribbon Bow', unitAmount: 1600 },
  'tokyo-2': { name: 'Ginza Akoya Pearl Pin Set', unitAmount: 1900 },
  'tokyo-3': { name: 'Shibuya Pastel Mini Pack', unitAmount: 1500 },
  'tokyo-4': { name: 'Aoyama Bordeaux Bow', unitAmount: 1700 },
  'tokyo-5': { name: 'Daikanyama Milk-Tea Claw', unitAmount: 1600 },
};

const PROMO_RATES: Record<string, number> = {
  PRETTY15: 0.15,
  CAPSULE15: 0.15,
  WELCOME10: 0.1,
};

interface CheckoutRequestBody {
  items?: { id: string; quantity: number }[];
  promoCode?: string | null;
}

function sendJson(res: ApiResponse, status: number, payload: unknown) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(payload));
}

async function readBody(req: ApiRequest): Promise<CheckoutRequestBody> {
  const chunks: Uint8Array[] = [];
  const encoder = new TextEncoder();
  for await (const chunk of req) {
    chunks.push(typeof chunk === 'string' ? encoder.encode(chunk) : chunk);
  }
  const totalLen = chunks.reduce((s, c) => s + c.length, 0);
  const merged = new Uint8Array(totalLen);
  let offset = 0;
  for (const c of chunks) {
    merged.set(c, offset);
    offset += c.length;
  }
  const raw = new TextDecoder().decode(merged);
  return raw ? (JSON.parse(raw) as CheckoutRequestBody) : {};
}

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== 'POST') {
    return sendJson(res, 405, { error: 'Method not allowed' });
  }

  const stripeKey = (globalThis as { process?: { env?: Record<string, string | undefined> } })
    .process?.env?.STRIPE_SECRET_KEY;

  if (!stripeKey) {
    return sendJson(res, 503, {
      mode: 'demo',
      message: 'Live Stripe checkout activates when STRIPE_SECRET_KEY is configured in Vercel.',
    });
  }

  try {
    const body = await readBody(req);
    const requestedItems = Array.isArray(body.items) ? body.items : [];
    if (requestedItems.length === 0) {
      return sendJson(res, 400, { error: 'Cart is empty' });
    }

    const totalQty = requestedItems.reduce(
      (sum, i) => sum + Math.max(1, Math.min(20, Number(i.quantity) || 1)),
      0
    );
    const normalizedCode = (body.promoCode || '').trim().toUpperCase();
    const discountRate =
      PROMO_RATES[normalizedCode] ?? (totalQty >= 3 ? PROMO_RATES.CAPSULE15 : 0);

    const params = new URLSearchParams();
    params.set('mode', 'payment');
    params.set('shipping_address_collection[allowed_countries][0]', 'US');
    params.set('shipping_address_collection[allowed_countries][1]', 'CA');
    params.set('allow_promotion_codes', 'false');

    const rawHost = req.headers.host;
    const host = Array.isArray(rawHost) ? rawHost[0] : rawHost || 'www.bestclips.app';
    const proto = host.includes('localhost') ? 'http' : 'https';
    params.set('success_url', `${proto}://${host}/?checkout=success`);
    params.set('cancel_url', `${proto}://${host}/?checkout=cancelled`);

    let discountedSubtotalCents = 0;
    let lineIdx = 0;

    for (const entry of requestedItems) {
      const catalogItem = SERVER_PRICE_CENTS[entry.id];
      if (!catalogItem) continue;
      const qty = Math.max(1, Math.min(20, Math.floor(Number(entry.quantity) || 1)));
      const unitAfterDiscount = Math.round(catalogItem.unitAmount * (1 - discountRate));
      discountedSubtotalCents += unitAfterDiscount * qty;

      params.set(`line_items[${lineIdx}][price_data][currency]`, 'usd');
      params.set(`line_items[${lineIdx}][price_data][product_data][name]`, catalogItem.name);
      params.set(`line_items[${lineIdx}][price_data][unit_amount]`, String(unitAfterDiscount));
      params.set(`line_items[${lineIdx}][quantity]`, String(qty));
      lineIdx += 1;
    }

    if (lineIdx === 0) {
      return sendJson(res, 400, { error: 'No valid products found' });
    }

    const shippingCents = discountedSubtotalCents >= 3500 ? 0 : 495;
    params.set('shipping_options[0][shipping_rate_data][type]', 'fixed_amount');
    params.set('shipping_options[0][shipping_rate_data][fixed_amount][amount]', String(shippingCents));
    params.set('shipping_options[0][shipping_rate_data][fixed_amount][currency]', 'usd');
    params.set(
      'shipping_options[0][shipping_rate_data][display_name]',
      shippingCents === 0 ? 'Complimentary US Tracked Shipping' : 'US Tracked Shipping'
    );

    const stripeRes = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${stripeKey}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    const session = (await stripeRes.json()) as { url?: string; error?: { message?: string } };
    if (!stripeRes.ok || !session.url) {
      return sendJson(res, 502, {
        error: session.error?.message || 'Unable to initiate Stripe Checkout',
      });
    }

    return sendJson(res, 200, { url: session.url });
  } catch (err) {
    return sendJson(res, 500, {
      error: err instanceof Error ? err.message : 'Checkout error',
    });
  }
}
