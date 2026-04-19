import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";

type Env = {
  ENVIRONMENT: string;
  DB: D1Database;
};

const app = new Hono<{ Bindings: Env }>();

// --- Helpers ---
function parseJSON(val: string | null): unknown {
  if (!val) return [];
  try { return JSON.parse(val); } catch { return []; }
}

function mapSkill(row: Record<string, unknown>) {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    description: row.description,
    longDescription: row.long_description,
    repoId: row.repo_id,
    creatorId: row.creator_id,
    category: row.category,
    tags: parseJSON(row.tags_json as string),
    stars: row.stars,
    downloads: row.downloads,
    isOfficial: Boolean(row.is_official),
    version: row.version,
    updatedAt: row.updated_at,
    triggerDescription: row.trigger_description,
    exampleUseCases: parseJSON(row.example_use_cases_json as string),
    installCommand: row.install_command,
  };
}

function mapRepo(row: Record<string, unknown>) {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    description: row.description,
    creatorId: row.creator_id,
    category: row.category,
    tags: parseJSON(row.tags_json as string),
    totalSkills: row.total_skills,
    stars: row.stars,
    downloads: row.downloads,
    isOfficial: Boolean(row.is_official),
    updatedAt: row.updated_at,
    version: row.version,
    license: row.license,
  };
}

function mapCreator(row: Record<string, unknown>) {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    handle: row.handle,
    bio: row.bio,
    website: row.website,
    github: row.github,
    verified: Boolean(row.verified),
    isOfficial: Boolean(row.is_official),
    totalSkills: row.total_skills,
    totalStars: row.total_stars,
    totalDownloads: row.total_downloads,
    joinedAt: row.joined_at,
    tags: parseJSON(row.tags_json as string),
  };
}

// --- Middleware ---
app.use("*", logger());
app.use("*", prettyJSON());
app.use(
  "*",
  cors({
    origin: ["http://localhost:3000", "https://skills.market", "https://skills-market.pages.dev"],
    allowMethods: ["GET", "OPTIONS"],
    allowHeaders: ["Content-Type"],
    maxAge: 86400,
  })
);

// --- Health ---
app.get("/health", (c) => c.json({ status: "ok", env: c.env.ENVIRONMENT ?? "development" }));

// --- Skills ---
app.get("/api/skills", async (c) => {
  const { q, category, page = "1", limit = "20" } = c.req.query();
  const p = parseInt(page, 10);
  const l = parseInt(limit, 10);
  const offset = (p - 1) * l;

  let where = "WHERE 1=1";
  const params: unknown[] = [];

  if (q) {
    where += " AND (LOWER(name) LIKE ? OR LOWER(description) LIKE ? OR LOWER(tags_json) LIKE ?)";
    const lq = `%${q.toLowerCase()}%`;
    params.push(lq, lq, lq);
  }
  if (category) {
    where += " AND category = ?";
    params.push(category);
  }

  const countRow = await c.env.DB.prepare(`SELECT COUNT(*) as total FROM skills ${where}`)
    .bind(...params)
    .first<{ total: number }>();
  const total = countRow?.total ?? 0;

  const rows = await c.env.DB.prepare(`SELECT * FROM skills ${where} LIMIT ? OFFSET ?`)
    .bind(...params, l, offset)
    .all();

  return c.json({
    data: rows.results.map(mapSkill),
    total,
    page: p,
    limit: l,
    pages: Math.ceil(total / l),
  });
});

app.get("/api/skills/:slug", async (c) => {
  const row = await c.env.DB.prepare("SELECT * FROM skills WHERE slug = ?")
    .bind(c.req.param("slug"))
    .first<Record<string, unknown>>();
  if (!row) return c.json({ error: "Not found" }, 404);
  return c.json({ data: mapSkill(row) });
});

// --- Repos ---
app.get("/api/repos", async (c) => {
  const { q, category, page = "1", limit = "20" } = c.req.query();
  const p = parseInt(page, 10);
  const l = parseInt(limit, 10);
  const offset = (p - 1) * l;

  let where = "WHERE 1=1";
  const params: unknown[] = [];

  if (q) {
    where += " AND (LOWER(name) LIKE ? OR LOWER(description) LIKE ?)";
    const lq = `%${q.toLowerCase()}%`;
    params.push(lq, lq);
  }
  if (category) {
    where += " AND category = ?";
    params.push(category);
  }

  const countRow = await c.env.DB.prepare(`SELECT COUNT(*) as total FROM repos ${where}`)
    .bind(...params)
    .first<{ total: number }>();
  const total = countRow?.total ?? 0;

  const rows = await c.env.DB.prepare(`SELECT * FROM repos ${where} LIMIT ? OFFSET ?`)
    .bind(...params, l, offset)
    .all();

  return c.json({
    data: rows.results.map(mapRepo),
    total,
    page: p,
    limit: l,
    pages: Math.ceil(total / l),
  });
});

app.get("/api/repos/:slug", async (c) => {
  const row = await c.env.DB.prepare("SELECT * FROM repos WHERE slug = ?")
    .bind(c.req.param("slug"))
    .first<Record<string, unknown>>();
  if (!row) return c.json({ error: "Not found" }, 404);

  const skillRows = await c.env.DB.prepare("SELECT * FROM skills WHERE repo_id = ?")
    .bind(row.id)
    .all();
  const creatorRow = await c.env.DB.prepare("SELECT * FROM creators WHERE id = ?")
    .bind(row.creator_id)
    .first<Record<string, unknown>>();

  return c.json({
    data: {
      ...mapRepo(row),
      skills: skillRows.results.map(mapSkill),
      creator: creatorRow ? mapCreator(creatorRow) : null,
    },
  });
});

// --- Creators ---
app.get("/api/creators", async (c) => {
  const { q, page = "1", limit = "20" } = c.req.query();
  const p = parseInt(page, 10);
  const l = parseInt(limit, 10);
  const offset = (p - 1) * l;

  let where = "WHERE 1=1";
  const params: unknown[] = [];

  if (q) {
    where += " AND (LOWER(name) LIKE ? OR LOWER(handle) LIKE ?)";
    const lq = `%${q.toLowerCase()}%`;
    params.push(lq, lq);
  }

  const countRow = await c.env.DB.prepare(`SELECT COUNT(*) as total FROM creators ${where}`)
    .bind(...params)
    .first<{ total: number }>();
  const total = countRow?.total ?? 0;

  const rows = await c.env.DB.prepare(`SELECT * FROM creators ${where} LIMIT ? OFFSET ?`)
    .bind(...params, l, offset)
    .all();

  return c.json({
    data: rows.results.map(mapCreator),
    total,
    page: p,
    limit: l,
    pages: Math.ceil(total / l),
  });
});

app.get("/api/creators/:slug", async (c) => {
  const row = await c.env.DB.prepare("SELECT * FROM creators WHERE slug = ?")
    .bind(c.req.param("slug"))
    .first<Record<string, unknown>>();
  if (!row) return c.json({ error: "Not found" }, 404);

  const repoRows = await c.env.DB.prepare("SELECT * FROM repos WHERE creator_id = ?")
    .bind(row.id)
    .all();
  const skillRows = await c.env.DB.prepare("SELECT * FROM skills WHERE creator_id = ?")
    .bind(row.id)
    .all();

  return c.json({
    data: {
      ...mapCreator(row),
      repos: repoRows.results.map(mapRepo),
      skills: skillRows.results.map(mapSkill),
    },
  });
});

// --- Search ---
app.get("/api/search", async (c) => {
  const { q = "" } = c.req.query();
  const lq = `%${q.toLowerCase()}%`;

  const [skillRows, repoRows, creatorRows] = await Promise.all([
    c.env.DB.prepare(
      "SELECT * FROM skills WHERE LOWER(name) LIKE ? OR LOWER(description) LIKE ? OR LOWER(tags_json) LIKE ? LIMIT 10"
    ).bind(lq, lq, lq).all(),
    c.env.DB.prepare(
      "SELECT * FROM repos WHERE LOWER(name) LIKE ? OR LOWER(description) LIKE ? LIMIT 6"
    ).bind(lq, lq).all(),
    c.env.DB.prepare(
      "SELECT * FROM creators WHERE LOWER(name) LIKE ? OR LOWER(handle) LIKE ? LIMIT 4"
    ).bind(lq, lq).all(),
  ]);

  const skills = skillRows.results.map(mapSkill);
  const repos = repoRows.results.map(mapRepo);
  const creators = creatorRows.results.map(mapCreator);

  return c.json({
    data: {
      skills,
      repos,
      creators,
      total: skills.length + repos.length + creators.length,
    },
  });
});

// --- Stats ---
app.get("/api/stats", async (c) => {
  const [skillCount, repoCount, creatorCount, dlRow] = await Promise.all([
    c.env.DB.prepare("SELECT COUNT(*) as n FROM skills").first<{ n: number }>(),
    c.env.DB.prepare("SELECT COUNT(*) as n FROM repos").first<{ n: number }>(),
    c.env.DB.prepare("SELECT COUNT(*) as n FROM creators").first<{ n: number }>(),
    c.env.DB.prepare("SELECT SUM(downloads) as total FROM skills").first<{ total: number }>(),
  ]);

  return c.json({
    data: {
      totalSkills: skillCount?.n ?? 0,
      totalRepos: repoCount?.n ?? 0,
      totalCreators: creatorCount?.n ?? 0,
      totalDownloads: dlRow?.total ?? 0,
    },
  });
});

export default app;
