# New Boilerplate

A reusable Next.js boilerplate with FSD architecture, Clean Architecture backend, BetterAuth, credits/payments system, and pre-built landing page sections.

## Tech Stack

- **Framework**: Next.js 16 (App Router) + React 19
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **Auth**: BetterAuth (email/password + Google OAuth)
- **Database**: PostgreSQL + Prisma ORM
- **DI**: Inversify
- **State**: Redux Toolkit + RTK Query
- **AI**: OpenAI + Google Gemini
- **Payments**: Secure Processor gateway
- **Email**: Nodemailer (SMTP)
- **Validation**: Zod
- **Animations**: Motion (Framer Motion)

## Getting Started

### Prerequisites

- Node.js 20+
- PostgreSQL database
- npm

### Setup

```bash
# 1. Install dependencies
npm install

# 2. Copy environment variables
cp .env.example .env

# 3. Edit .env with your values (database URL, auth secret, etc.)

# 4. Generate Prisma client
npx prisma generate

# 5. Push database schema
npx prisma db push

# 6. Start development server
npm run dev
```

### Environment Variables

See `.env.example` for all required variables. At minimum you need:

- `DATABASE_URL` — PostgreSQL connection string
- `BETTER_AUTH_SECRET` — Random 32+ char secret for auth
- `NEXT_PUBLIC_APP_URL` — Your app URL (default: `http://localhost:3000`)

## Project Structure

```
src/
├── app/            — Next.js routes, layouts, API handlers
├── entities/       — Domain models (user, payment, credit)
├── features/       — User actions (auth, credit-purchase, etc.)
├── views/          — Page-level compositions
├── widgets/        — Layout (header, footer, sidebar) + section blocks
└── shared/         — Utilities, UI, services, config
```

## Available Scripts

| Command | Description |
|---------|------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Landing Page Sections

Pre-built, props-driven section widgets with variant support:

| Section | Variants |
|---------|----------|
| Hero | 3 |
| Features | 3 |
| Testimonials | 2 |
| How It Works | 2 |
| Pricing | 2 |
| Social Proof | 2 |
| Content | 2 |
| FAQ | 1 |
| CTA | 1 |

Each section accepts custom props and has mock data for quick preview.
