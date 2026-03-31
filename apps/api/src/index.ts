import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import { skills, repos, creators } from "./data/mock";

type Env = {
  ENVIRONMENT: string;
};

const app = new Hono<{ Bindings: Env }>();

// --- Middleware ---
app.use("*", logger());
app.use("*", prettyJSON());
app.use(
  "*",
  cors({
    origin: ["http://localhost:3000", "https://skills.market"],
    allowMethods: ["GET", "OPTIONS"],
    allowHeaders: ["Content-Type"],
    maxAge: 86400,
  })
);

// --- Health ---
app.get("/health", (c) => c.json({ status: "ok", env: c.env.ENVIRONMENT ?? "development" }));

// --- Skills ---
app.get("/api/skills", (c) => {
  const { q, category, page = "1", limit = "20" } = c.req.query();
  let result = [...skills];
  if (q) {
    const lq = q.toLowerCase();
    result = result.filter(
      (s) =>
        s.name.toLowerCase().includes(lq) ||
        s.description.toLowerCase().includes(lq) ||
        s.tags.some((t) => t.includes(lq))
    );
  }
  if (category) result = result.filter((s) => s.category === category);
  const p = parseInt(page, 10);
  const l = parseInt(limit, 10);
  const total = result.length;
  const data = result.slice((p - 1) * l, p * l);
  return c.json({ data, total, page: p, limit: l, pages: Math.ceil(total / l) });
});

app.get("/api/skills/featured", (c) => {
  return c.json({ data: skills.filter((s) => s.isFeatured).slice(0, 8) });
});

app.get("/api/skills/:slug", (c) => {
  const skill = skills.find((s) => s.slug === c.req.param("slug"));
  if (!skill) return c.json({ error: "Not found" }, 404);
  return c.json({ data: skill });
});

// --- Repos ---
app.get("/api/repos", (c) => {
  const { q, category, page = "1", limit = "20" } = c.req.query();
  let result = [...repos];
  if (q) {
    const lq = q.toLowerCase();
    result = result.filter(
      (r) =>
        r.name.toLowerCase().includes(lq) ||
        r.description.toLowerCase().includes(lq)
    );
  }
  if (category) result = result.filter((r) => r.category === category);
  const p = parseInt(page, 10);
  const l = parseInt(limit, 10);
  const total = result.length;
  const data = result.slice((p - 1) * l, p * l);
  return c.json({ data, total, page: p, limit: l, pages: Math.ceil(total / l) });
});

app.get("/api/repos/featured", (c) => {
  return c.json({ data: repos.filter((r) => r.isFeatured).slice(0, 6) });
});

app.get("/api/repos/:slug", (c) => {
  const repo = repos.find((r) => r.slug === c.req.param("slug"));
  if (!repo) return c.json({ error: "Not found" }, 404);
  const repoSkills = skills.filter((s) => s.repoId === repo.id);
  const creator = creators.find((cr) => cr.id === repo.creatorId);
  return c.json({ data: { ...repo, skills: repoSkills, creator } });
});

// --- Creators ---
app.get("/api/creators", (c) => {
  const { q, page = "1", limit = "20" } = c.req.query();
  let result = [...creators];
  if (q) {
    const lq = q.toLowerCase();
    result = result.filter(
      (cr) =>
        cr.name.toLowerCase().includes(lq) ||
        cr.handle.toLowerCase().includes(lq)
    );
  }
  const p = parseInt(page, 10);
  const l = parseInt(limit, 10);
  const total = result.length;
  const data = result.slice((p - 1) * l, p * l);
  return c.json({ data, total, page: p, limit: l, pages: Math.ceil(total / l) });
});

app.get("/api/creators/:slug", (c) => {
  const creator = creators.find((cr) => cr.slug === c.req.param("slug"));
  if (!creator) return c.json({ error: "Not found" }, 404);
  const creatorRepos = repos.filter((r) => r.creatorId === creator.id);
  const creatorSkills = skills.filter((s) => s.creatorId === creator.id);
  return c.json({ data: { ...creator, repos: creatorRepos, skills: creatorSkills } });
});

// --- Search ---
app.get("/api/search", (c) => {
  const { q = "" } = c.req.query();
  const lq = q.toLowerCase();
  const matchSkills = skills
    .filter(
      (s) =>
        s.name.toLowerCase().includes(lq) ||
        s.description.toLowerCase().includes(lq) ||
        s.tags.some((t) => t.includes(lq))
    )
    .slice(0, 10);
  const matchRepos = repos
    .filter(
      (r) =>
        r.name.toLowerCase().includes(lq) || r.description.toLowerCase().includes(lq)
    )
    .slice(0, 6);
  const matchCreators = creators
    .filter(
      (cr) =>
        cr.name.toLowerCase().includes(lq) || cr.handle.toLowerCase().includes(lq)
    )
    .slice(0, 4);
  return c.json({
    data: {
      skills: matchSkills,
      repos: matchRepos,
      creators: matchCreators,
      total: matchSkills.length + matchRepos.length + matchCreators.length,
    },
  });
});

// --- Stats ---
app.get("/api/stats", (c) => {
  return c.json({
    data: {
      totalSkills: skills.length,
      totalRepos: repos.length,
      totalCreators: creators.length,
      totalDownloads: skills.reduce((acc, s) => acc + s.downloads, 0),
    },
  });
});

export default app;
