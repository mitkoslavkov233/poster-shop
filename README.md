# KALT Studio — Poster Shop

A limited edition print e-commerce store for KALT Studio, a Sofia-based artist. Built with Next.js, Tailwind CSS, and Stripe.

The shop features four art series — **GRAU**, **MALT**, **RUIS**, and **KLIP** — each a collection of limited edition prints created using a portable scanner as the primary creative tool.

---

## Tech Stack

- [Next.js 15](https://nextjs.org) (App Router)
- [React 19](https://react.dev)
- [Tailwind CSS 4](https://tailwindcss.com)
- [Stripe](https://stripe.com) — embedded checkout, European shipping
- TypeScript

---

## Prerequisites

- [Node.js](https://nodejs.org) v18 or higher
- A [Stripe](https://stripe.com) account (free to create)

---

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd poster-shop
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy the example env file and fill in your Stripe keys:

```bash
cp .env.example .env.local
```

Then open `.env.local` and replace the placeholder values:

```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```

You can find your API keys in the [Stripe Dashboard](https://dashboard.stripe.com/apikeys). Use **test mode** keys during development.

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
poster-shop/
├── app/
│   ├── page.tsx          # Home page — series overview
│   ├── layout.tsx        # Root layout
│   ├── globals.css       # Global styles
│   ├── api/
│   │   └── checkout/
│   │       └── route.ts  # POST /api/checkout — creates Stripe session
│   ├── grau/             # GRAU series page
│   ├── malt/             # MALT series page
│   ├── ruis/             # RUIS series page
│   ├── klip/             # KLIP series page
│   └── success/          # Order confirmation page
├── components/
│   └── CheckoutOverlay.tsx  # Stripe embedded checkout modal
├── public/
│   └── posters/          # Poster images (grau/, malt/, ruis/, klip/)
├── .env.example          # Environment variable template
└── package.json
```

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server at localhost:3000 |
| `npm run build` | Build for production |
| `npm run start` | Run the production build |
| `npm run lint` | Lint the codebase |

---

## How the Cart & Checkout Work

- Cart state is stored in **localStorage** — it persists across page refreshes and navigation between series pages.
- When the user clicks **Complete Order**, the app calls `POST /api/checkout` with the cart items.
- The API creates a Stripe embedded checkout session and returns a `clientSecret`.
- The `CheckoutOverlay` component renders Stripe's embedded UI using that secret.
- On successful payment, Stripe redirects to `/success`.

---

## Shipping

Checkout is restricted to **European countries + UK, Norway, and Switzerland** via Stripe's shipping address configuration.

---

## Deployment

The easiest way to deploy is [Vercel](https://vercel.com):

1. Push the repo to GitHub.
2. Import the project on [vercel.com/new](https://vercel.com/new).
3. Add your environment variables in the Vercel project settings:
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - `STRIPE_SECRET_KEY`
   - `NEXT_PUBLIC_BASE_URL` (set to your production domain, e.g. `https://kaltstudio.com`)
4. Deploy.

For other platforms (Railway, Render, AWS, etc.), make sure the environment variables above are set and that the platform supports Next.js serverless API routes.

> **Important:** Never commit your `.env.local` file. It is already excluded in `.gitignore`.
