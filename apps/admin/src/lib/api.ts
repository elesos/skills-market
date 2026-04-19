import { getToken, clearToken } from "./auth";
import type { Creator, Repo, Skill } from "@/types";

export const BASE_URL = "https://skill-market-api.elesos.cc";

export async function login(username: string, password: string): Promise<string> {
  const res = await fetch(`${BASE_URL}/api/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({})) as { error?: string };
    throw new Error(body.error ?? "Login failed");
  }
  const data = await res.json() as { token: string };
  return data.token;
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers ?? {}),
    },
  });

  if (res.status === 401) {
    clearToken();
    if (typeof window !== "undefined") {
      window.location.href = "/login/";
    }
    throw new Error("Unauthorized");
  }

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error((body as { error?: string }).error ?? `HTTP ${res.status}`);
  }

  return res.json() as Promise<T>;
}

// Creators
export async function getCreators(): Promise<Creator[]> {
  const data = await request<{ data: Creator[] }>("/api/creators");
  return data.data;
}

export async function createCreator(body: Omit<Creator, "id">): Promise<Creator> {
  const payload = {
    name: body.name,
    description: body.description,
    avatar_url: body.avatarUrl,
  };
  const data = await request<{ data: Creator }>("/api/admin/creators", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return data.data;
}

export async function updateCreator(id: string, body: Partial<Omit<Creator, "id">>): Promise<Creator> {
  const payload: Record<string, string | undefined> = {};
  if (body.name !== undefined) payload.name = body.name;
  if (body.description !== undefined) payload.description = body.description;
  if (body.avatarUrl !== undefined) payload.avatar_url = body.avatarUrl;
  const data = await request<{ data: Creator }>(`/api/admin/creators/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
  return data.data;
}

export async function deleteCreator(id: string): Promise<void> {
  await request(`/api/admin/creators/${id}`, { method: "DELETE" });
}

// Repos
export async function getRepos(creatorId?: string): Promise<Repo[]> {
  const qs = creatorId ? `?creator_id=${encodeURIComponent(creatorId)}` : "";
  const data = await request<{ data: Repo[] }>(`/api/repos${qs}`);
  return data.data;
}

export async function createRepo(body: Omit<Repo, "id">): Promise<Repo> {
  const payload = {
    name: body.name,
    description: body.description,
    repo_url: body.repoUrl,
    creator_id: body.creatorId,
  };
  const data = await request<{ data: Repo }>("/api/admin/repos", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return data.data;
}

export async function updateRepo(id: string, body: Partial<Omit<Repo, "id">>): Promise<Repo> {
  const payload: Record<string, string | undefined> = {};
  if (body.name !== undefined) payload.name = body.name;
  if (body.description !== undefined) payload.description = body.description;
  if (body.repoUrl !== undefined) payload.repo_url = body.repoUrl;
  if (body.creatorId !== undefined) payload.creator_id = body.creatorId;
  const data = await request<{ data: Repo }>(`/api/admin/repos/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
  return data.data;
}

export async function deleteRepo(id: string): Promise<void> {
  await request(`/api/admin/repos/${id}`, { method: "DELETE" });
}

// Skills
export async function getSkills(creatorId?: string, repoId?: string): Promise<Skill[]> {
  const params = new URLSearchParams();
  if (creatorId) params.set("creator_id", creatorId);
  if (repoId) params.set("repo_id", repoId);
  const qs = params.toString() ? `?${params.toString()}` : "";
  const data = await request<{ data: Skill[] }>(`/api/skills${qs}`);
  return data.data;
}

export async function createSkill(body: Omit<Skill, "id" | "updatedAt">): Promise<Skill> {
  const payload = {
    slug: body.slug,
    description: body.description,
    url: body.url,
    creator_id: body.creatorId,
    repo_id: body.repoId,
  };
  const data = await request<{ data: Skill }>("/api/admin/skills", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return data.data;
}

export async function updateSkill(id: string, body: Partial<Omit<Skill, "id" | "updatedAt">>): Promise<Skill> {
  const payload: Record<string, string | undefined> = {};
  if (body.slug !== undefined) payload.slug = body.slug;
  if (body.description !== undefined) payload.description = body.description;
  if (body.url !== undefined) payload.url = body.url;
  if (body.creatorId !== undefined) payload.creator_id = body.creatorId;
  if (body.repoId !== undefined) payload.repo_id = body.repoId;
  const data = await request<{ data: Skill }>(`/api/admin/skills/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
  return data.data;
}

export async function deleteSkill(id: string): Promise<void> {
  await request(`/api/admin/skills/${id}`, { method: "DELETE" });
}
