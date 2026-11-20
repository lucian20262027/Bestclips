# BestClips Atelier

US-headquartered hair architecture collective partnering with independent city designers across California, Miami, New York, and Tokyo—crafted in China & Japan.

## Local Development
```bash
npm install
npm run dev
npm run build
```

## Activating Real Payments (Stripe Checkout)
`api/create-checkout-session.ts` is pre-wired for Stripe Checkout (Credit Card, Apple Pay, Google Pay, Link) with server-side price & promo verification:
1. Add `STRIPE_SECRET_KEY=sk_live_...` (or `sk_test_...`) in Vercel → Project Settings → Environment Variables.
2. Redeploy. Without `STRIPE_SECRET_KEY`, checkout automatically runs in Showroom Demo Mode.

## Paid Ad Deep Links
- Direct product landing page: `https://www.bestclips.app/?clip=miami-4`
- City tab pre-selected: `https://www.bestclips.app/?city=nyc`
- Open Hair Fit Quiz: `https://www.bestclips.app/?quiz=1`
- Open Policies / FAQ: `https://www.bestclips.app/?policy=shipping` or `?policy=faq`

## Swapping Showroom Images With Real Yiwu Photography
All product and editorial images live in `public/assets/studio/`. Replace any file below 1-for-1 (recommended `1080x1080` JPG) and push to `main` to auto-deploy to Vercel:

- **01 · Spring in Cali**: `cali-1.jpg` (Malibu Sunset), `cali-2.jpg` (Oat Milk Cloud Matte), `cali-3.jpg` (Big Sur Seafoam), `cali-4.jpg` (Santa Barbara Mini Set), `cali-5.jpg` (Venice Rose Cloud), `editorial-cali.jpg`
- **02 · Hot Miami**: `miami-1.jpg` (South Beach Tiger), `miami-2.jpg` (Wynwood Leopard), `miami-3.jpg` (Ocean Drive Coral), `miami-4.jpg` (Brickell 24K Havana), `miami-5.jpg` (Star Island Bronze Arch), `editorial-miami.jpg`
- **03 · NYC Office**: `nyc-1.jpg` (SoHo Brushed Gold Arch), `nyc-2.jpg` (Tribeca Matte Noir Bar), `macro-gloss.jpg` (Fifth Ave Classic Tortoise), `nyc-4.jpg` (Madison Sterling Arch), `tokyo-2.jpg` (Upper East Pearl Duo), `editorial-nyc.jpg`
- **04 · Tokyo Trade**: `tokyo-1.jpg` (Harajuku Silk Bow), `tokyo-2.jpg` (Ginza Akoya Pearl Pin Set), `tokyo-3.jpg` (Shibuya Mini Pack), `tokyo-4.jpg` (Aoyama Bordeaux Bow), `tokyo-5.jpg` (Daikanyama Milk-Tea Claw), `editorial-tokyo.jpg`
- **Showroom Hero & Packaging**: `hero-showroom.jpg`, `showroom-packaging.jpg`, `macro-spring.jpg`, `macro-gloss.jpg`
