# Website Demo Business V1

A mobile-first sales and portfolio website for a small business that builds professional one-page websites for African small businesses and entrepreneurs starting at **$20**.

The project is both:

1. A production-oriented business site designed to win and collect the first customer.
2. Three interactive fictional portfolio websites prospects can explore before ordering.

## Business model

The starter offer is a professionally designed, mobile-friendly one-page website with business information, services/products, contact and WhatsApp links, social links, location, basic SEO, fast delivery, and one revision.

The V1 deliberately excludes customer accounts, a CRM, complex databases, full e-commerce, booking systems, AI features, and unlimited revisions. These are future upgrade possibilities rather than V1 scope.

## Tech stack

- React + TypeScript
- Vite
- React Router
- Plain responsive CSS with reusable design tokens
- Vitest for unit tests
- ESLint and TypeScript project builds
- Vercel-compatible static hosting

No authentication, database, or server runtime is required for the public portfolio. Order delivery and payments use configurable external HTTPS endpoints/hosted checkout links so payment secrets are never exposed in the browser.

## Local development

Requirements: [Bun](https://bun.sh/) and Node-compatible Vite tooling.

```bash
bun install
cp env.example .env.local
bun run dev
```

The development server binds to `0.0.0.0` and Vite injects/uses the available port.

## Environment variables

Copy `env.example` to `.env.local` and replace placeholders. The workspace environment guard may require renaming `env.example` to `.env.example` before committing it. These variables are public build-time values; never place secret payment API keys in any `VITE_*` variable.

| Variable | Purpose |
| --- | --- |
| `VITE_SITE_URL` | Public production URL for future canonical/social metadata. |
| `VITE_WHATSAPP_NUMBER` | Owner’s international WhatsApp number, digits only. |
| `VITE_STARTER_PRICE_USD` | Configurable USD display price. Defaults to `20`. |
| `VITE_STARTER_PRICE_NAIRA` | Configurable Naira display reference. Defaults to `30000`. This is presentation only, not a live exchange-rate conversion. |
| `VITE_PAYMENT_URL` | Hosted one-time checkout URL from a real payment provider. |
| `VITE_ORDER_ENDPOINT` | HTTPS endpoint that accepts the order JSON and records it. |

`VITE_PAYMENT_URL` should point to a hosted checkout/payment page, not a secret API endpoint. The order app never marks an order paid from client state. For production, the payment provider’s verified webhook or dashboard should be the source of truth for `PAID` and later statuses.

If both `VITE_ORDER_ENDPOINT` and `VITE_WHATSAPP_NUMBER` are absent, the order page displays a configuration error rather than discarding details. If no order endpoint is configured but WhatsApp is, it offers a pre-filled WhatsApp delivery path.

## Verification

```bash
bun run lint
bun run typecheck
bun run test
bun run build
```

## Production build

```bash
bun run build
```

Vite emits the static production site to `dist/`.

## Vercel deployment

1. Import the repository into Vercel.
2. Use the detected Vite framework preset.
3. Add the production environment values from `env.example` in Vercel project settings.
4. Deploy. `vercel.json` preserves client-side routes for the React Router application.
5. After deployment, verify `/`, all demo routes, `/order`, and direct refreshes on nested routes.

No payment secret belongs in `VITE_*` variables or committed files.

## Routes

- `/` — sales, offer, package, demos, process, pricing, FAQ, and CTAs
- `/demos/cleaning` — SparklePro Cleaning fictional service-business demo
- `/demos/fashion` — Zuri Fashion fictional fashion-brand demo
- `/demos/real-estate` — PrimeNest Properties fictional property demo
- `/order` — mobile-friendly intake and payment handoff

## Order flow

1. The customer completes required business/contact fields and optional content, style, links, and notes.
2. The app validates required fields, phone, optional email, URLs, and reasonable text lengths.
3. If `VITE_ORDER_ENDPOINT` exists, the form sends JSON with `status: NEW` and an ISO submission timestamp.
4. If no order endpoint exists but WhatsApp is configured, the form prepares a complete, pre-filled WhatsApp message. The user must send it.
5. The customer proceeds to a configured hosted checkout link.
6. A verified provider webhook/dashboard—not the client—must later update status to `PAID`, `BUILDING`, etc.

Supported V1 status model: `NEW`, `CONTACTED`, `PAYMENT_PENDING`, `PAID`, `BUILDING`, `PREVIEW`, `REVISION`, `COMPLETED`, `CANCELLED`.

## Payment architecture

This repository intentionally keeps payment provider selection open. The UI consumes only a public hosted checkout URL. To finish a live payment integration:

1. Choose a provider and create a reusable one-time $20 payment product.
2. Put its provider-hosted checkout URL in `VITE_PAYMENT_URL`.
3. Configure the order endpoint to persist the request with `NEW` status.
4. Use the provider’s verified webhook in a trusted backend/admin workflow to set `PAID` only after confirmation.
5. Add reconciliation and access controls before marking work as delivered.

Do not paste secret keys into frontend code or `.env.example`.

## Customizing the demos

The shared portfolio structure lives in `src/components/DemoShell.tsx`. Each fictional business has a focused page in `src/pages/demos/`:

- `CleaningDemo.tsx`
- `FashionDemo.tsx`
- `RealEstateDemo.tsx`

Change the business name, palette (`color`), hero image, description, contact prompt, sections, images, services/products, location, and social information. Shared demo navigation and layout remain in `DemoShell.tsx` to avoid duplicating the template.

## Asset guidance

Demo images are loaded from Unsplash and resized by its image CDN. They are presentation assets for this fictional portfolio, not claims about the businesses shown. A production custom site should use customer-owned or properly licensed images and should avoid implying endorsement.

## Known limitations

- No hosted order backend is bundled; `VITE_ORDER_ENDPOINT` must be configured to persist submissions.
- No live payment provider is bundled; `VITE_PAYMENT_URL` must be configured for checkout.
- The Naira amount is a configurable display reference, not a live exchange-rate conversion.
- Assets are collected as links rather than uploaded in this V1.
- V1 has no admin dashboard, automated payment webhooks, accounts, or order-management UI.
- Testimonials, properties, products, prices, and business details in the demos are explicitly fictional.
- Per-page metadata is managed client-side for this SPA. A prerender/SSR system can be added later if server-delivered SEO metadata is required.
