CREATE TABLE IF NOT EXISTS creators (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  avatar_url TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS repos (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  repo_url TEXT,
  creator_id TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS skills (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL,
  description TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  url TEXT,
  creator_id TEXT NOT NULL,
  repo_id TEXT,
  UNIQUE(creator_id, slug)
);

CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  salt TEXT NOT NULL,
  created_at TEXT NOT NULL
);
