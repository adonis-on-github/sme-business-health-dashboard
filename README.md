
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Purpose

An MVP for computing a **business health score** from financial metrics and using AI to generate a **business strategy** (explanations and plan).

### Score Formula

The score (0–100) is a weighted sum of three normalized components:

| Component | Weight | Formula |
|-----------|--------|---------|
| **Revenue** (profit margin) | 30% | `(revenue - expenses) / revenue`, clamped 0–1 |
| **Liquidity** (cash runway) | 40% | `min(cashInBank / expenses, 12)` / 12 (months) |
| **Customer concentration** | 30% | `1 - topCustomerPct/100` (lower concentration = better) |

**Overall score**: `(profit + liquidity + customerConcentration) × 100`, rounded.

**Status bands**: GREEN (≥85), YELLOW (60–84), RED (<60).

### AI-Generated Strategy

Using the score and input data (revenue, expenses, cash, top customer %), the app calls an LLM (via OpenRouter) to generate explanations and a business plan. The plan is stored in the database.

### Data Model

- Each user has **one business**.
- A business has **many metrics** (snapshots over time).
- Each metric has a computed **score** and associated **explanations/plan**.
- The app displays only the **latest metric**, its **explanations**, and the **saved plan**.

## Documentation

- [Application flow](doc/01-application-flow.md) — Architecture, user journey, auth flow, data model
- [Setup and run](doc/02-setup-and-run.md) — Prerequisites, environment, database, E2E testing
- [UI parallel routes](doc/03-ui-parallel-routes.md) — Header and sidebar implementation
- [Testing strategy](doc/04-testing-strategy.md) — Vitest, Playwright, OpenRouter mocking

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


## Supabase SSL Connection

To get a working solution with incomming SSL connection to supabase cloud:
1. Download the CA certificate from supabase cloud
2. Encode the certificate in base64 string and save it in .env file as SUPABASE_SSL_CERT
3. Read use the content of SUPABASE_SSL_CERT in the prisma client and pass it as string to ssl option in config object. For more information, see lib/prisma/client.ts file.
4. O vercel add a secret with name SUPABASE_SSL_CERT and value of the base64 encoded certificate.

