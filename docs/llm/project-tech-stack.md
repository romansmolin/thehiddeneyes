# Project Tech Stack

## Core

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript (strict mode) |
| Runtime | Node.js 20+ |
| UI | React 19 |

## Styling

| Tool | Purpose |
|------|---------|
| Tailwind CSS v4 | Utility-first CSS |
| shadcn/ui (new-york) | Component library |
| CSS Variables | Theme tokens (light/dark) |
| tw-animate-css | Animation utilities |

## Data

| Tool | Purpose |
|------|---------|
| Prisma ORM | Database access |
| PostgreSQL | Primary database |
| @prisma/adapter-pg | Prisma PostgreSQL adapter |

## Client State

| Tool | Purpose |
|------|---------|
| Redux Toolkit | Global state |
| RTK Query | Server state / caching |
| Axios | HTTP client (service layer) |

## Auth

| Tool | Purpose |
|------|---------|
| BetterAuth | Authentication framework |
| bcryptjs | Password hashing |

## Validation

| Tool | Purpose |
|------|---------|
| Zod | Schema validation |
| react-hook-form | Form management |
| @hookform/resolvers | Zod + RHF integration |

## DI

| Tool | Purpose |
|------|---------|
| Inversify | IoC container |
| reflect-metadata | Decorator metadata |

## AI

| Tool | Purpose |
|------|---------|
| OpenAI API | Text generation, JSON extraction, PDF parsing |
| Google Gemini (@google/genai) | Text, JSON, and image generation |

## Email

| Tool | Purpose |
|------|---------|
| Nodemailer | SMTP email sending |

## UI Libraries

| Tool | Purpose |
|------|---------|
| lucide-react | Icons |
| motion (Framer Motion) | Animations |
| embla-carousel-react | Carousel |
| next-themes | Dark mode |
| sonner | Toast notifications |
