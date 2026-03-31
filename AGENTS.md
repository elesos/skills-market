# AGENTS.md

## Project Overview
Skills Market is a bilingual skills directory web app inspired by official skill ecosystem catalogs. It includes a Next.js frontend and a Cloudflare Worker API layer, with data structured to move to D1 later.

## Tech Stack
- Frontend: Next.js 15, React 19, TypeScript, Tailwind CSS
- API: Cloudflare Workers, Hono, Wrangler
- Deployment: Cloudflare Pages + Workers
- Data: local seed data now, D1-ready next

## Directory Structure
- apps/web: frontend app
- apps/api: Cloudflare Worker API
- future packages/: shared libs if needed

## Commands
- pnpm install
- pnpm dev:web
- pnpm dev:api
- pnpm build
- pnpm type-check

## Code Style
- Prefer server components for static content
- Keep UI components presentational and data in lib/data.ts
- Favor bilingual copy for user-facing text
- Keep Cloudflare deployment concerns isolated to apps/api and future Pages config
