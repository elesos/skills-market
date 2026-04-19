export interface Creator {
  id: string;
  name: string;
  description: string;
  avatarUrl?: string;
}

export interface Repo {
  id: string;
  name: string;
  description: string;
  repoUrl?: string;
  creatorId: string;
}

export interface Skill {
  id: string;
  slug: string;
  description: string;
  updatedAt: string;
  url?: string;
  creatorId: string;
  repoId: string;
}
