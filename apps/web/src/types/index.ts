// Core data models for Skills Market

export type SkillCategory =
  | 'coding'
  | 'writing'
  | 'analysis'
  | 'design'
  | 'research'
  | 'automation'
  | 'communication'
  | 'data'
  | 'devops'
  | 'security';

export type SkillTag = string;

export interface Creator {
  id: string;
  slug: string;
  name: string;
  handle: string;
  avatar: string;
  bio: string;
  website?: string;
  github?: string;
  twitter?: string;
  verified: boolean;
  isOfficial: boolean;
  totalSkills: number;
  totalStars: number;
  totalDownloads: number;
  joinedAt: string;
  tags: string[];
}

export interface Repo {
  id: string;
  slug: string;
  name: string;
  description: string;
  creatorId: string;
  creator?: Creator;
  category: SkillCategory;
  tags: SkillTag[];
  totalSkills: number;
  stars: number;
  downloads: number;
  isOfficial: boolean;
  updatedAt: string;
  version: string;
  license: string;
}

export interface Skill {
  id: string;
  slug: string;
  name: string;
  description: string;
  longDescription?: string;
  repoId: string;
  repo?: Repo;
  creatorId: string;
  creator?: Creator;
  category: SkillCategory;
  tags: SkillTag[];
  stars: number;
  downloads: number;
  isOfficial: boolean;
  version: string;
  updatedAt: string;
  // Skill content
  triggerDescription?: string;
  exampleUseCases?: string[];
  installCommand?: string;
}

export interface SearchResult {
  skills: Skill[];
  repos: Repo[];
  creators: Creator[];
  total: number;
}
