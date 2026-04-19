import type { Creator, Repo, Skill } from "@/types";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ?? "https://skills-market-api.hnrayer.workers.dev";

async function apiFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    cache: "force-cache",
  });
  if (!res.ok) throw new Error(`API error ${res.status}: ${path}`);
  return res.json() as Promise<T>;
}

// ── Skills ───────────────────────────────────────────────────────────────────

// ── Repos ─────────────────────────────────────────────────────────────────────

export async function getAllSkills(params?: { q?: string; category?: string; limit?: number }): Promise<Skill[]> {
  const qs = new URLSearchParams();
  if (params?.q) qs.set("q", params.q);
  if (params?.category) qs.set("category", params.category);
  if (params?.limit) qs.set("limit", String(params.limit));
  const json = await apiFetch<{ data: Skill[] }>(`/api/skills?${qs}`);
  return json.data;
}

export async function getSkillBySlug(slug: string): Promise<Skill | null> {
  try {
    const json = await apiFetch<{ data: Skill }>(`/api/skills/${slug}`);
    return json.data;
  } catch {
    return null;
  }
}

// ── Repos ─────────────────────────────────────────────────────────────────────

// ── Creators ──────────────────────────────────────────────────────────────────

export async function getAllRepos(params?: { q?: string; limit?: number }): Promise<Repo[]> {
  const qs = new URLSearchParams();
  if (params?.q) qs.set("q", params.q);
  if (params?.limit) qs.set("limit", String(params.limit));
  const json = await apiFetch<{ data: Repo[] }>(`/api/repos?${qs}`);
  return json.data;
}

export async function getRepoBySlug(slug: string): Promise<(Repo & { skills: Skill[]; creator: Creator }) | null> {
  try {
    const json = await apiFetch<{ data: Repo & { skills: Skill[]; creator: Creator } }>(`/api/repos/${slug}`);
    return json.data;
  } catch {
    return null;
  }
}

// ── Creators ──────────────────────────────────────────────────────────────────

export async function getAllCreators(params?: { q?: string; limit?: number }): Promise<Creator[]> {
  const qs = new URLSearchParams();
  if (params?.q) qs.set("q", params.q);
  if (params?.limit) qs.set("limit", String(params.limit));
  const json = await apiFetch<{ data: Creator[] }>(`/api/creators?${qs}`);
  return json.data;
}

export async function getCreatorBySlug(
  slug: string
): Promise<(Creator & { repos: Repo[]; skills: Skill[] }) | null> {
  try {
    const json = await apiFetch<{ data: Creator & { repos: Repo[]; skills: Skill[] } }>(
      `/api/creators/${slug}`
    );
    return json.data;
  } catch {
    return null;
  }
}

// ── Search ────────────────────────────────────────────────────────────────────

export async function search(q: string): Promise<{
  skills: Skill[];
  repos: Repo[];
  creators: Creator[];
  total: number;
}> {
  const json = await apiFetch<{
    data: { skills: Skill[]; repos: Repo[]; creators: Creator[]; total: number };
  }>(`/api/search?q=${encodeURIComponent(q)}`);
  return json.data;
}

// ── Stats ─────────────────────────────────────────────────────────────────────

export async function getStats(): Promise<{
  totalSkills: number;
  totalRepos: number;
  totalCreators: number;
  totalDownloads: number;
}> {
  const json = await apiFetch<{
    data: {
      totalSkills: number;
      totalRepos: number;
      totalCreators: number;
      totalDownloads: number;
    };
  }>("/api/stats");
  return json.data;
}
