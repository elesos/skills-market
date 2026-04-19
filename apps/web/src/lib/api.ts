import type { Creator, Repo, Skill } from "@/types";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ?? "https://skill-market-api.elesos.cc";

async function apiFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`);
  if (!res.ok) throw new Error(`API error ${res.status}: ${path}`);
  return res.json() as Promise<T>;
}

export async function getCreators(): Promise<Creator[]> {
  const json = await apiFetch<{ data: Creator[] }>("/api/creators");
  return json.data;
}

export async function getCreator(
  id: string
): Promise<{ creator: Creator; repos: Repo[]; skills: Skill[] } | null> {
  try {
    const json = await apiFetch<{ data: Creator; repos: Repo[]; skills: Skill[] }>(`/api/creators/${id}`);
    return { creator: json.data, repos: json.repos, skills: json.skills ?? [] };
  } catch {
    return null;
  }
}

export async function getRepo(
  id: string
): Promise<{ creator: Creator; repo: Repo; skills: Skill[] } | null> {
  try {
    const json = await apiFetch<{ creator: Creator; data: Repo; skills: Skill[] }>(
      `/api/repos/${id}`
    );
    return { creator: json.creator, repo: json.data, skills: json.skills };
  } catch {
    return null;
  }
}

export async function getSkill(
  id: string
): Promise<Skill | null> {
  try {
    const json = await apiFetch<{ data: Skill }>(`/api/skills/${id}`);
    return json.data;
  } catch {
    return null;
  }
}
