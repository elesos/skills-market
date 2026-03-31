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
- Data: D1 (schema included; database creation requires Cloudflare token scope for D1)

## Cloudflare deploy notes
```bash
# Frontend build output
cd apps/web && pnpm build
# output directory: out/

# Pages
wrangler pages project create skills-market
wrangler pages deploy ./out --project-name skills-market

# Workers API
cd ../api
wrangler deploy

# D1 (requires token with D1 edit/create permissions)
wrangler d1 create skills-market-db
wrangler d1 execute skills-market-db --remote --file ./schema.sql
```

## Notes
This repo currently uses local seed data for both frontend rendering and worker API responses.
