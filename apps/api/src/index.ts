import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";

type Env = {
  ENVIRONMENT: string;
  DB: D1Database;
};

// ---------- JWT helpers (Web Crypto API) ----------

function b64url(buf: ArrayBuffer): string {
  return btoa(String.fromCharCode(...new Uint8Array(buf)))
    .replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

function b64urlDecode(s: string): Uint8Array {
  const padded = s.replace(/-/g, "+").replace(/_/g, "/").padEnd(s.length + (4 - s.length % 4) % 4, "=");
  return Uint8Array.from(atob(padded), c => c.charCodeAt(0));
}

async function signJWT(payload: Record<string, unknown>, secret: string): Promise<string> {
  const enc = new TextEncoder();
  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" })).replace(/=/g, "");
  const body = btoa(JSON.stringify(payload)).replace(/=/g, "");
  const key = await crypto.subtle.importKey(
    "raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(`${header}.${body}`));
  return `${header}.${body}.${b64url(sig)}`;
}

async function verifyJWT(token: string, secret: string): Promise<Record<string, unknown> | null> {
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const [header, body, sig] = parts;
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["verify"]
  );
  const valid = await crypto.subtle.verify("HMAC", key, b64urlDecode(sig), enc.encode(`${header}.${body}`));
  if (!valid) return null;
  const payload = JSON.parse(atob(body.replace(/-/g, "+").replace(/_/g, "/"))) as Record<string, unknown>;
  if (typeof payload.exp === "number" && payload.exp < Date.now() / 1000) return null;
  return payload;
}

// ---------- Password helpers (PBKDF2) ----------

async function verifyPassword(password: string, salt: string, storedHash: string): Promise<boolean> {
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    "raw", enc.encode(password), { name: "PBKDF2" }, false, ["deriveBits"]
  );
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt: enc.encode(salt), iterations: 100000, hash: "SHA-256" },
    keyMaterial, 256
  );
  const hash = btoa(String.fromCharCode(...new Uint8Array(bits)));
  return hash === storedHash;
}

// --------------------------------------------------

const app = new Hono<{ Bindings: Env }>();

function mapCreator(row: Record<string, unknown>) {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    avatarUrl: row.avatar_url,
  };
}

function mapRepo(row: Record<string, unknown>) {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    repoUrl: row.repo_url,
    creatorId: row.creator_id,
  };
}

function mapSkill(row: Record<string, unknown>) {
  return {
    id: row.id,
    slug: row.slug,
    description: row.description,
    updatedAt: row.updated_at,
    url: row.url,
    creatorId: row.creator_id,
    repoId: row.repo_id,
  };
}

app.use("*", logger());
app.use("*", prettyJSON());
app.use("*", cors({
  origin: "*",
  allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowHeaders: ["Content-Type", "Authorization"],
  maxAge: 86400,
}));

// Admin auth middleware — verifies JWT signed with the user's password_hash
app.use("/api/admin/*", async (c, next) => {
  const raw = c.req.header("Authorization")?.replace("Bearer ", "");
  if (!raw) return c.json({ error: "Unauthorized" }, 401);
  // Decode payload without verifying to extract sub (username)
  const parts = raw.split(".");
  if (parts.length !== 3) return c.json({ error: "Unauthorized" }, 401);
  let sub: string;
  try {
    const p = JSON.parse(atob(parts[1].replace(/-/g, "+").replace(/_/g, "/"))) as Record<string, unknown>;
    sub = p.sub as string;
    if (!sub) return c.json({ error: "Unauthorized" }, 401);
  } catch {
    return c.json({ error: "Unauthorized" }, 401);
  }
  const user = await c.env.DB.prepare("SELECT password_hash FROM users WHERE username = ?")
    .bind(sub).first<{ password_hash: string }>();
  if (!user) return c.json({ error: "Unauthorized" }, 401);
  const payload = await verifyJWT(raw, user.password_hash);
  if (!payload) return c.json({ error: "Unauthorized" }, 401);
  await next();
});

app.get("/health", (c) => c.json({ status: "ok", env: c.env.ENVIRONMENT ?? "development" }));

// Admin login — verify username/password against D1, return JWT
app.post("/api/login", async (c) => {
  const body = await c.req.json<{ username?: string; password?: string }>().catch(() => ({} as { username?: string; password?: string }));
  if (!body.username || !body.password) {
    return c.json({ error: "username and password required" }, 400);
  }
  const user = await c.env.DB.prepare("SELECT * FROM users WHERE username = ?")
    .bind(body.username).first<{ id: string; username: string; password_hash: string; salt: string }>();
  if (!user) return c.json({ error: "Invalid credentials" }, 401);

  const valid = await verifyPassword(body.password, user.salt, user.password_hash);
  if (!valid) return c.json({ error: "Invalid credentials" }, 401);

  const exp = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7; // 7 days
  const token = await signJWT({ sub: user.username, exp }, user.password_hash);
  return c.json({ token });
});

// List all creators
app.get("/api/creators", async (c) => {
  const rows = await c.env.DB.prepare("SELECT * FROM creators ORDER BY name").all();
  return c.json({ data: rows.results.map(mapCreator) });
});

// Creator detail + repos (+ skills when no repos)
app.get("/api/creators/:id", async (c) => {
  const { id } = c.req.param();
  const creatorRow = await c.env.DB.prepare("SELECT * FROM creators WHERE id = ?")
    .bind(id).first<Record<string, unknown>>();
  if (!creatorRow) return c.json({ error: "Not found" }, 404);

  const repos = await c.env.DB.prepare("SELECT * FROM repos WHERE creator_id = ? ORDER BY name")
    .bind(id).all();

  let skills: ReturnType<typeof mapSkill>[] = [];
  if (repos.results.length === 0) {
    const skillRows = await c.env.DB.prepare("SELECT * FROM skills WHERE creator_id = ? ORDER BY slug")
      .bind(id).all();
    skills = skillRows.results.map(mapSkill);
  }

  return c.json({ data: mapCreator(creatorRow), repos: repos.results.map(mapRepo), skills });
});

// Public: list all repos (with optional ?creator_id=<id>)
app.get("/api/repos", async (c) => {
  const creatorId = c.req.query("creator_id");
  let rows;
  if (creatorId) {
    rows = await c.env.DB.prepare("SELECT * FROM repos WHERE creator_id = ? ORDER BY name").bind(creatorId).all();
  } else {
    rows = await c.env.DB.prepare("SELECT * FROM repos ORDER BY name").all();
  }
  return c.json({ data: rows.results.map(mapRepo) });
});

// Repo detail + skills
app.get("/api/repos/:id", async (c) => {
  const { id } = c.req.param();
  const repoRow = await c.env.DB.prepare("SELECT * FROM repos WHERE id = ?")
    .bind(id).first<Record<string, unknown>>();
  if (!repoRow) return c.json({ error: "Not found" }, 404);

  const creatorRow = await c.env.DB.prepare("SELECT * FROM creators WHERE id = ?")
    .bind(repoRow.creator_id).first<Record<string, unknown>>();

  const skills = await c.env.DB.prepare("SELECT * FROM skills WHERE repo_id = ? ORDER BY slug")
    .bind(id).all();

  return c.json({ creator: creatorRow ? mapCreator(creatorRow) : null, data: mapRepo(repoRow), skills: skills.results.map(mapSkill) });
});

// Public: list all skills (with optional ?creator_id=<id>&repo_id=<id>)
app.get("/api/skills", async (c) => {
  const creatorId = c.req.query("creator_id");
  const repoId = c.req.query("repo_id");
  let rows;
  if (creatorId && repoId) {
    rows = await c.env.DB.prepare("SELECT * FROM skills WHERE creator_id = ? AND repo_id = ? ORDER BY slug").bind(creatorId, repoId).all();
  } else if (creatorId) {
    rows = await c.env.DB.prepare("SELECT * FROM skills WHERE creator_id = ? ORDER BY slug").bind(creatorId).all();
  } else {
    rows = await c.env.DB.prepare("SELECT * FROM skills ORDER BY slug").all();
  }
  return c.json({ data: rows.results.map(mapSkill) });
});

// Skill detail
app.get("/api/skills/:id", async (c) => {
  const { id } = c.req.param();
  const row = await c.env.DB.prepare("SELECT * FROM skills WHERE id = ?")
    .bind(id).first<Record<string, unknown>>();
  if (!row) return c.json({ error: "Not found" }, 404);
  return c.json({ data: mapSkill(row) });
});

// --- Admin CRUD: Creators ---
app.post("/api/admin/creators", async (c) => {
  const body = await c.req.json<{ name: string; description: string; avatar_url?: string }>();
  const id = crypto.randomUUID();
  const now = new Date().toISOString();
  await c.env.DB.prepare(
    "INSERT INTO creators (id, name, description, avatar_url, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)"
  ).bind(id, body.name, body.description, body.avatar_url ?? null, now, now).run();
  const row = await c.env.DB.prepare("SELECT * FROM creators WHERE id = ?").bind(id).first<Record<string, unknown>>();
  return c.json({ data: mapCreator(row!) }, 201);
});

app.put("/api/admin/creators/:id", async (c) => {
  const { id } = c.req.param();
  const body = await c.req.json<{ name?: string; description?: string; avatar_url?: string }>();
  const now = new Date().toISOString();
  await c.env.DB.prepare(
    "UPDATE creators SET name = COALESCE(?, name), description = COALESCE(?, description), avatar_url = COALESCE(?, avatar_url), updated_at = ? WHERE id = ?"
  ).bind(body.name ?? null, body.description ?? null, body.avatar_url ?? null, now, id).run();
  const row = await c.env.DB.prepare("SELECT * FROM creators WHERE id = ?").bind(id).first<Record<string, unknown>>();
  if (!row) return c.json({ error: "Not found" }, 404);
  return c.json({ data: mapCreator(row) });
});

app.delete("/api/admin/creators/:id", async (c) => {
  const { id } = c.req.param();
  const creator = await c.env.DB.prepare("SELECT id FROM creators WHERE id = ?").bind(id).first();
  if (!creator) return c.json({ error: "Not found" }, 404);
  await c.env.DB.prepare("DELETE FROM skills WHERE creator_id = ?").bind(id).run();
  await c.env.DB.prepare("DELETE FROM repos WHERE creator_id = ?").bind(id).run();
  await c.env.DB.prepare("DELETE FROM creators WHERE id = ?").bind(id).run();
  return c.json({ success: true });
});

// --- Admin CRUD: Repos ---
app.post("/api/admin/repos", async (c) => {
  const body = await c.req.json<{ name: string; description: string; repo_url?: string; creator_id: string }>();
  const id = crypto.randomUUID();
  const now = new Date().toISOString();
  await c.env.DB.prepare(
    "INSERT INTO repos (id, name, description, repo_url, creator_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)"
  ).bind(id, body.name, body.description, body.repo_url ?? null, body.creator_id, now, now).run();
  const row = await c.env.DB.prepare("SELECT * FROM repos WHERE id = ?").bind(id).first<Record<string, unknown>>();
  return c.json({ data: mapRepo(row!) }, 201);
});

app.put("/api/admin/repos/:id", async (c) => {
  const { id } = c.req.param();
  const body = await c.req.json<{ name?: string; description?: string; repo_url?: string; creator_id?: string }>();
  const now = new Date().toISOString();
  await c.env.DB.prepare(
    "UPDATE repos SET name = COALESCE(?, name), description = COALESCE(?, description), repo_url = COALESCE(?, repo_url), creator_id = COALESCE(?, creator_id), updated_at = ? WHERE id = ?"
  ).bind(body.name ?? null, body.description ?? null, body.repo_url ?? null, body.creator_id ?? null, now, id).run();
  const row = await c.env.DB.prepare("SELECT * FROM repos WHERE id = ?").bind(id).first<Record<string, unknown>>();
  if (!row) return c.json({ error: "Not found" }, 404);
  return c.json({ data: mapRepo(row) });
});

app.delete("/api/admin/repos/:id", async (c) => {
  const { id } = c.req.param();
  const repo = await c.env.DB.prepare("SELECT id FROM repos WHERE id = ?").bind(id).first();
  if (!repo) return c.json({ error: "Not found" }, 404);
  await c.env.DB.prepare("DELETE FROM skills WHERE repo_id = ?").bind(id).run();
  await c.env.DB.prepare("DELETE FROM repos WHERE id = ?").bind(id).run();
  return c.json({ success: true });
});

// --- Admin CRUD: Skills ---
app.post("/api/admin/skills", async (c) => {
  const body = await c.req.json<{ slug: string; description: string; url?: string; creator_id: string; repo_id: string }>();
  const id = crypto.randomUUID();
  const now = new Date().toISOString();
  await c.env.DB.prepare(
    "INSERT INTO skills (id, slug, description, updated_at, url, creator_id, repo_id) VALUES (?, ?, ?, ?, ?, ?, ?)"
  ).bind(id, body.slug, body.description, now, body.url ?? null, body.creator_id, body.repo_id).run();
  const row = await c.env.DB.prepare("SELECT * FROM skills WHERE id = ?").bind(id).first<Record<string, unknown>>();
  return c.json({ data: mapSkill(row!) }, 201);
});

app.put("/api/admin/skills/:id", async (c) => {
  const { id } = c.req.param();
  const body = await c.req.json<{ slug?: string; description?: string; url?: string; creator_id?: string; repo_id?: string }>();
  const now = new Date().toISOString();
  await c.env.DB.prepare(
    "UPDATE skills SET slug = COALESCE(?, slug), description = COALESCE(?, description), url = COALESCE(?, url), creator_id = COALESCE(?, creator_id), repo_id = COALESCE(?, repo_id), updated_at = ? WHERE id = ?"
  ).bind(body.slug ?? null, body.description ?? null, body.url ?? null, body.creator_id ?? null, body.repo_id ?? null, now, id).run();
  const row = await c.env.DB.prepare("SELECT * FROM skills WHERE id = ?").bind(id).first<Record<string, unknown>>();
  if (!row) return c.json({ error: "Not found" }, 404);
  return c.json({ data: mapSkill(row) });
});

app.delete("/api/admin/skills/:id", async (c) => {
  const { id } = c.req.param();
  const skill = await c.env.DB.prepare("SELECT id FROM skills WHERE id = ?").bind(id).first();
  if (!skill) return c.json({ error: "Not found" }, 404);
  await c.env.DB.prepare("DELETE FROM skills WHERE id = ?").bind(id).run();
  return c.json({ success: true });
});

export default app;
