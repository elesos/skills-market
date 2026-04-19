# Admin Panel Implementation Design

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a standalone admin panel (`apps/admin`) for CRUD management of creators, repos, and skills, backed by the existing Cloudflare D1 database via new authenticated endpoints on the existing Hono Worker.

**Architecture:** New `apps/admin` Next.js 15 app with `output: export` (static, client-side only), deployed to Cloudflare Pages as project `skills-market-admin`. The existing `apps/api` Worker gains `/api/admin/*` endpoints protected by a `ADMIN_TOKEN` environment variable. The admin frontend stores the token in `localStorage` and sends it as `Authorization: Bearer <token>`.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS, Hono (Worker), Cloudflare D1, Cloudflare Pages

---

## 1. Project Structure

```
apps/
├── api/src/index.ts     — Add auth middleware + 9 new admin CRUD endpoints
└── admin/               — New Next.js app
    ├── next.config.ts
    ├── package.json
    ├── tsconfig.json
    ├── tailwind.config.ts
    ├── postcss.config.mjs
    └── src/
        ├── lib/
        │   ├── api.ts        — API client (fetch wrapper with auth header)
        │   └── auth.ts       — Token read/write from localStorage
        ├── types/index.ts    — Creator, Repo, Skill interfaces (same as apps/web)
        ├── components/
        │   ├── nav.tsx       — Top navigation tabs
        │   ├── modal.tsx     — Generic form modal wrapper
        │   └── confirm.tsx   — Delete confirmation dialog
        └── app/
            ├── layout.tsx
            ├── page.tsx                    — Redirect to /creators
            ├── login/page.tsx             — Token input form
            ├── creators/
            │   ├── page.tsx               — Creators list
            │   └── creators-view.tsx      — Client component
            ├── repos/
            │   ├── page.tsx               — Repos list
            │   └── repos-view.tsx         — Client component
            └── skills/
                ├── page.tsx               — Skills list
                └── skills-view.tsx        — Client component
```

---

## 2. API Changes (`apps/api/src/index.ts`)

Also add `ADMIN_TOKEN: string` to the `Env` type in `apps/api/src/index.ts`.

### Auth Middleware

Applied to all routes matching `/api/admin/*`:

```ts
app.use("/api/admin/*", async (c, next) => {
  const token = c.req.header("Authorization")?.replace("Bearer ", "");
  if (!token || token !== c.env.ADMIN_TOKEN) {
    return c.json({ error: "Unauthorized" }, 401);
  }
  await next();
});
```

The `ADMIN_TOKEN` secret is set in Cloudflare Worker environment variables (via `wrangler secret put ADMIN_TOKEN` or the dashboard).

Update CORS in the existing middleware to also allow `POST, PUT, DELETE` methods and the `Authorization` header:

```ts
app.use("*", cors({
  origin: "*",
  allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowHeaders: ["Content-Type", "Authorization"],
  maxAge: 86400,
}));
```

### New Public Read Endpoints (no auth)

- `GET /api/repos` — list all repos (used by admin dropdowns and repo list)
- `GET /api/skills` — list all skills (used by admin skills list)

Both support optional query params `?creator=<slug>` and (for skills) `?repo=<slug>` for server-side filtering.

### New Endpoints

#### Creators
- `POST /api/admin/creators` — body: `{ slug, name, description, avatar_url?, website? }` → INSERT, return new record
- `PUT /api/admin/creators/:id` — body: same fields (partial) → UPDATE, return updated record
- `DELETE /api/admin/creators/:id` → manually cascade: DELETE skills WHERE creator_slug matches, DELETE repos WHERE creator_slug matches, then DELETE creator

#### Repos
- `POST /api/admin/repos` — body: `{ slug, name, description, creator_slug }` → INSERT
- `PUT /api/admin/repos/:id` — body: same fields (partial) → UPDATE
- `DELETE /api/admin/repos/:id` → manually cascade: DELETE skills WHERE creator_slug + repo_slug match, then DELETE repo

#### Skills
- `POST /api/admin/skills` — body: `{ slug, name, description, long_description?, category, tags_json?, version?, url?, creator_slug, repo_slug }`
- `PUT /api/admin/skills/:id` — body: same fields (partial)
- `DELETE /api/admin/skills/:id` → DELETE skill

All mutations use `crypto.randomUUID()` for new IDs. Timestamps: `new Date().toISOString()`.

---

## 3. Admin Frontend

### Auth (`src/lib/auth.ts`)

```ts
export const TOKEN_KEY = "admin_token";
export const getToken = () => (typeof window !== "undefined" ? localStorage.getItem(TOKEN_KEY) : null);
export const setToken = (t: string) => localStorage.setItem(TOKEN_KEY, t);
export const clearToken = () => localStorage.removeItem(TOKEN_KEY);
```

### API Client (`src/lib/api.ts`)

Base URL: `https://skill-market-api.elesos.cc`

All functions send `Authorization: Bearer <token>` header. On 401 response, redirect to `/login`. Exports:
- `getCreators()` → `Creator[]`
- `createCreator(data)`, `updateCreator(id, data)`, `deleteCreator(id)`
- `getRepos(creatorSlug?)` → `Repo[]`
- `createRepo(data)`, `updateRepo(id, data)`, `deleteRepo(id)`
- `getSkills(creatorSlug?, repoSlug?)` → `Skill[]`
- `createSkill(data)`, `updateSkill(id, data)`, `deleteSkill(id)`

### Login Page (`/login`)

Single centered input for the Bearer token + Save button. On save, writes to localStorage, redirects to `/creators`. No server-side validation — the next API call will return 401 if wrong.

### Navigation (`components/nav.tsx`)

Fixed top bar with logo + three tabs: **Creators** | **Repos** | **Skills** + logout button (clears token).

### List Pages (pattern, same for all three)

Each `*-view.tsx` client component:
1. On mount: load list data + load dependencies (creators for repos/skills, repos for skills)
2. Renders a table with columns appropriate to entity
3. **Add button** → opens `<Modal>` with create form
4. **Edit button** per row → opens `<Modal>` with pre-filled edit form
5. **Delete button** per row → opens `<Confirm>` dialog; on confirm calls DELETE

#### Creators table columns: Name, Slug, Website, Actions
#### Repos table columns: Name, Slug, Creator, Actions
#### Skills table columns: Name, Slug, Category, Creator, Repo, URL, Actions

### Form Fields

**Creator form:** slug (text), name (text), description (textarea), avatar_url (text), website (text)

**Repo form:** slug (text), name (text), description (textarea), creator_slug (dropdown — loaded from `/api/creators`)

**Skill form:** slug (text), name (text), description (textarea), long_description (textarea), category (text), tags (text, comma-separated — stored as JSON array), version (text, default "1.0.0"), url (text), creator_slug (dropdown), repo_slug (dropdown — filtered by selected creator_slug)

### Modal (`components/modal.tsx`)

Generic modal: accepts `title`, `children`, `onClose`. Dark overlay, centered card, ESC closes.

### Confirm Dialog (`components/confirm.tsx`)

Simple dialog: "Are you sure you want to delete X?" with Cancel / Delete buttons.

---

## 4. Deployment

### apps/admin `next.config.ts`

```ts
const nextConfig = {
  output: "export",
  trailingSlash: true,
};
```

### `package.json` scripts

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "deploy": "next build && npx wrangler pages deploy out --project-name skills-market-admin --branch master"
  }
}
```

### Cloudflare Pages project

Project name: `skills-market-admin`  
Custom domain (set in dashboard after first deploy): `skill-market-admin.elesos.cc`

### API Worker secret

```bash
cd apps/api && echo "<token>" | npx wrangler secret put ADMIN_TOKEN
```

---

## 5. Error Handling

- API errors display an inline error banner (red, dismissible) above the table
- 401 → clear token + redirect to `/login`
- Network errors show a retry prompt
- Optimistic UI: list re-fetches after every mutation

---

## 6. Styling

Consistent with `apps/web`:
- Background: `bg-[#0d0d0d]`
- Text: `text-white`, muted `text-white/55`
- Borders: `border-white/10`
- Inputs: `bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2 text-white`
- Primary button: `bg-white text-black rounded-lg px-4 py-2 font-medium`
- Danger button: `bg-red-500/20 text-red-400 border border-red-500/30`
