CREATE TABLE IF NOT EXISTS creators (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  handle TEXT NOT NULL,
  bio TEXT NOT NULL,
  website TEXT,
  github TEXT,
  verified INTEGER NOT NULL DEFAULT 1,
  is_official INTEGER NOT NULL DEFAULT 1,
  total_skills INTEGER NOT NULL DEFAULT 0,
  total_stars INTEGER NOT NULL DEFAULT 0,
  total_downloads INTEGER NOT NULL DEFAULT 0,
  joined_at TEXT NOT NULL,
  tags_json TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS repos (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  creator_id TEXT NOT NULL,
  category TEXT NOT NULL,
  tags_json TEXT NOT NULL,
  total_skills INTEGER NOT NULL DEFAULT 0,
  stars INTEGER NOT NULL DEFAULT 0,
  downloads INTEGER NOT NULL DEFAULT 0,
  is_official INTEGER NOT NULL DEFAULT 1,
  updated_at TEXT NOT NULL,
  version TEXT NOT NULL,
  license TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS skills (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  long_description TEXT,
  repo_id TEXT NOT NULL,
  creator_id TEXT NOT NULL,
  category TEXT NOT NULL,
  tags_json TEXT NOT NULL,
  stars INTEGER NOT NULL DEFAULT 0,
  downloads INTEGER NOT NULL DEFAULT 0,
  is_official INTEGER NOT NULL DEFAULT 1,
  version TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  trigger_description TEXT,
  example_use_cases_json TEXT,
  install_command TEXT
);
