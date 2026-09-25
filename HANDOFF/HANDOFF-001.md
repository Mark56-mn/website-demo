# HANDOFF-001

## Task

TASK-001 — Website Demo Business V1

## Status

PARTIALLY COMPLETED

The sales site, interactive portfolio demos, order intake, configuration architecture, documentation, tests, and production build are implemented. A live order backend, live payment checkout, and the exact `.env.example` filename remain environment/configuration handoff items.

## Summary

Built a mobile-first React/Vite website business called Website Demo. The public homepage explains the $20 starter offer, demonstrates the package, links to three live fictional portfolio sites, explains the four-step ordering process, answers common questions, and routes customers into the order form.

The three demos are interactive routes rather than screenshots:

- SparklePro Cleaning for a local service business
- Zuri Fashion for an image-led fashion brand
- PrimeNest Properties for a real-estate presentation

A shared `DemoShell` keeps the demo architecture reusable. Each demo has its own palette, content, imagery, sections, and metadata. Fictional claims and testimonials are labeled as demonstration content.

The order page collects the requested business, contact, description, services, style, asset-link, social-link, and notes fields. It validates required fields, phone, email, URLs, and text lengths. It sends JSON with `NEW` status to a configured order endpoint or presents a complete pre-filled WhatsApp fallback. The payment step uses a configured hosted checkout URL and never marks an order paid in client state.

## Files Changed

Important files/directories created:

- `src/App.tsx`
- `src/main.tsx`
- `src/config.ts`
- `src/styles.css`
- `src/components/Icons.tsx`
- `src/components/SiteLayout.tsx`
- `src/components/DemoShell.tsx`
- `src/pages/HomePage.tsx`
- `src/pages/OrderPage.tsx`
- `src/pages/demos/CleaningDemo.tsx`
- `src/pages/demos/FashionDemo.tsx`
- `src/pages/demos/RealEstateDemo.tsx`
- `src/lib/order.ts`
- `src/lib/order.test.ts`
- `src/lib/seo.ts`
- `src/test/setup.ts`
- `package.json`
- `bun.lock`
- `index.html`
- `vite.config.ts`
- `eslint.config.js`
- `tsconfig.json`
- `tsconfig.app.json`
- `tsconfig.node.json`
- `vercel.json`
- `env.example`
- `README.md`

The existing `TASKS/TASK-001-build-v1.md` was preserved.

## Features Implemented

- Conversion-focused mobile-first landing page
- $20 starter package and configurable Naira display reference
- Three interactive demo routes
- Shared reusable demo shell
- Demo-specific palette, hero, content, imagery, and metadata
- Responsive navigation with mobile menu and accessible skip link
- WhatsApp configuration through environment variable
- Four-step “How it works” section
- Starter pricing section
- FAQ accordion
- Separate upgrades section for future catalogue, store, booking, lead, automation, and domain features
- Order form with required-field and format validation
- Configurable order endpoint submission
- Pre-filled WhatsApp order fallback
- Hosted payment handoff with no frontend payment secrets
- V1 order status type including `NEW` and later workflow states
- Supabase email/password authentication for private admin access
- Protected `/admin` orders dashboard with metrics, status filtering, expandable request details, and sign out
- Supabase SQL schema with RLS allowing public order inserts but restricting order reads to allowlisted admin users
- Basic route-level document title and description updates
- Semantic headings, labels, alt text, focus states, and keyboard-friendly controls
- Lazy-loaded demo imagery
- Vercel SPA rewrite configuration
- Unit tests for order validation and WhatsApp summary generation
- README setup, architecture, deployment, customization, and limitations documentation

## Testing

- `bun run lint`: PASS
- `bun run typecheck`: PASS
- `bun run test`: PASS — 1 test file, 3 tests
- `bun run build`: PASS — Vite production output generated in `dist/`
- `freebuff-preview start`: PASS — preview reported ready on port 5173
- `freebuff-deploy check`: PASS — deployable, no problems reported
- Manual mobile testing: NOT PERFORMED in a real browser viewport in this environment
- Manual desktop testing: NOT PERFORMED in a real browser viewport in this environment
- Homepage runtime shell: preview URL returned HTTP 200 with the expected document title
- `/order` runtime shell: preview URL returned HTTP 200

## Deployment

- Vercel deployment: NOT TESTED
- Deployment URL: Not available
- Vercel configuration: `vercel.json` explicitly sets Bun install/build commands, `dist` output, and SPA route rewrites
- Production build command: `bun run build`
- Install command: `bun install`
- Preview command: `bun run dev`
- Preview port: `5173`

Before accepting live orders, configure the hosted checkout and order endpoint in the production environment.

## Environment Variables

Variable names only:

- `VITE_SITE_URL`
- `VITE_WHATSAPP_NUMBER`
- `VITE_STARTER_PRICE_USD`
- `VITE_STARTER_PRICE_NAIRA`
- `VITE_PAYMENT_URL`
- `VITE_ORDER_ENDPOINT`

The workspace environment guard blocked direct creation of a file named `.env.example`; the safe placeholder template is currently `env.example`. Rename it to `.env.example` in the repository or copy its contents into the platform-managed environment template before handoff.

## Known Limitations

- No live order database/backend is bundled; `VITE_ORDER_ENDPOINT` must be configured.
- No live payment provider is bundled; `VITE_PAYMENT_URL` must be configured.
- There are no verified payment webhooks or client-side “paid” state changes.
- The Naira value is a configurable display reference, not a live exchange-rate conversion.
- Assets are collected as public links rather than uploaded files.
- There is no admin dashboard, CRM, authentication, booking, e-commerce, or automated fulfillment workflow.
- Portfolio testimonials, products, properties, prices, and business details are fictional and clearly labeled.
- Per-page SEO metadata is client-side because this is a Vite SPA; a future prerender/SSR layer can improve server-rendered metadata.
- Real-browser manual responsive testing is still required.

## Incomplete Items

1. Create a Supabase project, run `supabase/schema.sql`, create an Auth user, and add the owner email to `admin_users`.
2. Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in the sandbox and Vercel production environment.
3. Configure the real WhatsApp number.
4. Select and configure a hosted payment checkout URL.
5. Add a trusted payment webhook/workflow that changes status to `PAID` only after verification.
6. Rename `env.example` to `.env.example`.
7. Run real-browser mobile and desktop checks across all routes, login, protected admin access, and form states.
8. Deploy to Vercel and verify direct refreshes on nested routes.

## Important Decisions

- Chose React + Vite + TypeScript because the repository was empty and the brief requires a lightweight, maintainable, Vercel-ready site.
- Kept the V1 public site static and avoided unnecessary accounts, databases, SaaS features, and admin complexity.
- Used a shared `DemoShell` so future customer sites can be customized by changing configuration/content rather than duplicating the whole application.
- Used a hosted checkout URL rather than putting payment secrets in frontend code.
- Kept order submission provider-agnostic through `VITE_ORDER_ENDPOINT`, with a WhatsApp fallback so leads are not silently lost when a form backend is not configured.
- Used fictional demonstration content with explicit disclaimers to avoid presenting fabricated testimonials, properties, products, or business claims as real.
- Kept prices configurable through public build-time environment values.

## Next Task Recommendation

Configure the live order/payment services and run a real-browser responsive QA pass, then deploy the verified site to Vercel. After the first real orders arrive, add a small authenticated order-management workflow rather than expanding into a full CRM.
