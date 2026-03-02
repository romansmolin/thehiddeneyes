# Setup and Commands

## Prerequisites

- Node.js 20+
- PostgreSQL instance
- npm

## Setup

```bash
npm install
cp .env.example .env
# Edit .env with your database URL and secrets
npx prisma generate
npx prisma db push
npm run dev
```

## Commands

| Command | Description |
|---------|------------|
| `npm run dev` | Start dev server (http://localhost:3000) |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npx prisma generate` | Generate Prisma client |
| `npx prisma db push` | Push schema to database |
| `npx prisma studio` | Open Prisma Studio GUI |
