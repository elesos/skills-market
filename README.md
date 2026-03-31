# Skills Market

A bilingual, modern skills directory inspired by official agent skill ecosystems.

## Features
- Multi-page site: home, official, creators, creator detail, repo detail, skill detail, search, about
- zh / en language routes
- Rich local seed catalog: 6 creators, 12 repositories, 35 skills
- Cloudflare Worker API scaffold
- Prepared for GitHub + Cloudflare Pages/Workers deployment

## Run locally
```bash
pnpm install
pnpm dev:web
pnpm dev:api
```

## Deploy targets
- Frontend: Cloudflare Pages
- API: Cloudflare Workers
- Data: D1 (planned next step)

## Notes
This repo currently uses local seed data for both frontend rendering and worker API responses.
