-- Seed data for skills-market D1 database

-- Creators
INSERT OR REPLACE INTO creators (id, name, description, avatar_url, created_at, updated_at) VALUES
('c-1','Anthropics','The team behind Claude — AI research and safety company building reliable, interpretable AI.','https://avatars.githubusercontent.com/u/76263028','2026-01-01T00:00:00Z','2026-01-01T00:00:00Z'),
('c-2','Cloudflare','Internet infrastructure and security company powering a better, faster, safer internet.','https://avatars.githubusercontent.com/u/314135','2026-01-01T00:00:00Z','2026-01-01T00:00:00Z'),
('c-3','OpenAI','AI research lab focused on building safe AGI that benefits all of humanity.','https://avatars.githubusercontent.com/u/14957082','2026-01-01T00:00:00Z','2026-01-01T00:00:00Z'),
('c-4','Vercel Labs','Experimental projects and agent skills from the Vercel platform team.','https://avatars.githubusercontent.com/u/76263028','2026-01-01T00:00:00Z','2026-01-01T00:00:00Z'),
('c-5','GitHub','The world''s leading AI-powered developer platform and home of open source.','https://avatars.githubusercontent.com/u/9919','2026-01-01T00:00:00Z','2026-01-01T00:00:00Z'),
('c-6','Supabase','Open source Firebase alternative — Postgres database, auth, storage, and edge functions.','https://avatars.githubusercontent.com/u/54469796','2026-01-01T00:00:00Z','2026-01-01T00:00:00Z');

-- Repos
INSERT OR REPLACE INTO repos (id, name, description, repo_url, creator_id, created_at, updated_at) VALUES
('r-1','Skills','General-purpose agent skills for writing, design, and productivity.','https://github.com/anthropics/skills','c-1','2026-01-01T00:00:00Z','2026-01-01T00:00:00Z'),
('r-2','Claude Code','Skills for software development, testing, and code generation workflows.','https://github.com/anthropics/claude-code','c-1','2026-01-01T00:00:00Z','2026-01-01T00:00:00Z'),
('r-3','Skills','Cloudflare platform skills for Workers, Pages, and edge computing.','https://github.com/cloudflare/skills','c-2','2026-01-01T00:00:00Z','2026-01-01T00:00:00Z'),
('r-4','Cloudflare Docs','Skills derived from Cloudflare documentation and best practices.','https://github.com/cloudflare/cloudflare-docs','c-2','2026-01-01T00:00:00Z','2026-01-01T00:00:00Z'),
('r-5','Workerd','Skills for the workerd runtime and Workers compatibility layer.','https://github.com/cloudflare/workerd','c-2','2026-01-01T00:00:00Z','2026-01-01T00:00:00Z'),
('r-6','Skills','OpenAI agent skills for building AI-powered applications and pipelines.','https://github.com/openai/skills','c-3','2026-01-01T00:00:00Z','2026-01-01T00:00:00Z'),
('r-7','Agent Skills','Agent skills for React, web design, and frontend development.','https://github.com/vercel-labs/agent-skills','c-4','2026-01-01T00:00:00Z','2026-01-01T00:00:00Z'),
('r-8','Next Skills','Skills for building production Next.js applications with modern patterns.','https://github.com/vercel-labs/next-skills','c-4','2026-01-01T00:00:00Z','2026-01-01T00:00:00Z'),
('r-9','Awesome Copilot','Curated GitHub Copilot skills for Azure and cloud development.','https://github.com/github/awesome-copilot','c-5','2026-01-01T00:00:00Z','2026-01-01T00:00:00Z'),
('r-10','Actions Skills','Skills for automating CI/CD with GitHub Actions.','https://github.com/github/actions-skills','c-5','2026-01-01T00:00:00Z','2026-01-01T00:00:00Z'),
('r-11','Agent Skills','Supabase agent skills for Postgres, auth, and backend development.','https://github.com/supabase/agent-skills','c-6','2026-01-01T00:00:00Z','2026-01-01T00:00:00Z'),
('r-12','Starter Skills','Starter kit skills for bootstrapping Supabase-powered projects.','https://github.com/supabase/starter-skills','c-6','2026-01-01T00:00:00Z','2026-01-01T00:00:00Z');

-- Skills
INSERT OR REPLACE INTO skills (id, slug, description, updated_at, url, creator_id, repo_id) VALUES
('s-1','doc-coauthoring','Guide users through a structured workflow for co-authoring documentation.','2026-03-25','https://github.com/anthropics/skills/blob/main/doc-coauthoring.md','c-1','r-1'),
('s-2','canvas-design','Create beautiful visual art in .png and .pdf documents using design philosophy.','2026-03-25','https://github.com/anthropics/skills/blob/main/canvas-design.md','c-1','r-1'),
('s-3','theme-factory','Toolkit for styling artifacts with a theme.','2026-03-25','https://github.com/anthropics/skills/blob/main/theme-factory.md','c-1','r-1'),
('s-4','pdf','Use this skill whenever the user wants to do anything with PDF files.','2026-03-25','https://github.com/anthropics/skills/tree/main/skills/pdf','c-1','r-1'),
('s-5','frontend-design','Create distinctive, production-grade frontend interfaces with high design quality.','2026-03-25','https://github.com/anthropics/claude-code/blob/main/skills/frontend-design.md','c-1','r-2'),
('s-6','skill-creator','Create new skills, modify and improve existing skills, and measure skill performance.','2026-03-25','https://github.com/anthropics/claude-code/blob/main/skills/skill-creator.md','c-1','r-2'),
('s-7','webapp-testing','Automate browser interactions, test web pages and work with Playwright tests.','2026-03-25','https://github.com/anthropics/claude-code/blob/main/skills/webapp-testing.md','c-1','r-2'),
('s-8','pptx','Use this skill any time a .pptx file is involved in any way.','2026-03-25','https://github.com/anthropics/claude-code/blob/main/skills/pptx.md','c-1','r-2'),
('s-9','wrangler','Cloudflare Wrangler skill for deploying and managing Workers.','2026-03-25','https://github.com/cloudflare/skills/blob/main/wrangler.md','c-2','r-3'),
('s-10','cloudflare-platform','Comprehensive Cloudflare platform skill covering Workers, Pages, storage, AI, and networking.','2026-03-25','https://github.com/cloudflare/skills/blob/main/cloudflare-platform.md','c-2','r-3'),
('s-11','sandbox-sdk','Sandbox execution skill for running code safely in isolated environments.','2026-03-25','https://github.com/cloudflare/skills/blob/main/sandbox-sdk.md','c-2','r-3'),
('s-12','migrate-to-vite','Skill for migrating legacy build setups to Vite.','2026-03-25','https://github.com/cloudflare/skills/blob/main/migrate-to-vite.md','c-2','r-3'),
('s-13','web-perf','Audit and improve web performance metrics including Core Web Vitals.','2026-03-25','https://github.com/cloudflare/cloudflare-docs/blob/main/skills/web-perf.md','c-2','r-4'),
('s-14','changelog','Generate and manage changelogs for software projects.','2026-03-25','https://github.com/cloudflare/cloudflare-docs/blob/main/skills/changelog.md','c-2','r-4'),
('s-15','module-registry','Manage module registries for runtime environments.','2026-03-25','https://github.com/cloudflare/workerd/blob/main/skills/module-registry.md','c-2','r-5'),
('s-16','add-compat-flag','Add compatibility flags to Cloudflare Workers for gradual feature adoption.','2026-03-25','https://github.com/cloudflare/workerd/blob/main/skills/add-compat-flag.md','c-2','r-5'),
('s-17','agents-sdk','Build AI agents with the OpenAI Agents SDK.','2026-03-25','https://github.com/openai/skills/blob/main/agents-sdk.md','c-3','r-6'),
('s-18','evals-pipeline','Design and run evaluation pipelines for AI models and agents.','2026-03-25','https://github.com/openai/skills/blob/main/evals-pipeline.md','c-3','r-6'),
('s-19','realtime-apps','Build realtime voice and multimodal applications with OpenAI APIs.','2026-03-25','https://github.com/openai/skills/blob/main/realtime-apps.md','c-3','r-6'),
('s-20','multimodal-studio','Work with vision, audio, and multimodal AI capabilities.','2026-03-25','https://github.com/openai/skills/blob/main/multimodal-studio.md','c-3','r-6'),
('s-21','tool-calling-best-practices','Apply best practices for tool calling in AI agent systems.','2026-03-25','https://github.com/openai/skills/blob/main/tool-calling-best-practices.md','c-3','r-6'),
('s-22','vercel-react-best-practices','Apply Vercel and React best practices for production apps.','2026-03-25','https://github.com/vercel-labs/agent-skills/blob/main/vercel-react-best-practices.md','c-4','r-7'),
('s-23','web-design-guidelines','Apply modern web design guidelines for UI and UX quality.','2026-03-25','https://github.com/vercel-labs/agent-skills/blob/main/web-design-guidelines.md','c-4','r-7'),
('s-24','seo-audit','Audit and improve SEO for web applications.','2026-03-25','https://github.com/vercel-labs/agent-skills/blob/main/seo-audit.md','c-4','r-7'),
('s-25','next-best-practices','Apply Next.js best practices for App Router and modern fullstack development.','2026-03-25','https://github.com/vercel-labs/next-skills/blob/main/next-best-practices.md','c-4','r-8'),
('s-26','edge-rendering-patterns','Implement edge rendering patterns with Next.js and Vercel.','2026-03-25','https://github.com/vercel-labs/next-skills/blob/main/edge-rendering-patterns.md','c-4','r-8'),
('s-27','streaming-ux','Design and implement streaming UX patterns for AI applications.','2026-03-25','https://github.com/vercel-labs/next-skills/blob/main/streaming-ux.md','c-4','r-8'),
('s-28','azure-ai','Integrate Azure AI services into applications and agents.','2026-03-25','https://github.com/github/awesome-copilot/blob/main/azure-ai.md','c-5','r-9'),
('s-29','azure-observability','Monitor and observe Azure applications with telemetry best practices.','2026-03-25','https://github.com/github/awesome-copilot/blob/main/azure-observability.md','c-5','r-9'),
('s-30','github-actions-ci','Build CI/CD pipelines with GitHub Actions.','2026-03-25','https://github.com/github/actions-skills/blob/main/github-actions-ci.md','c-5','r-10'),
('s-31','pr-review-automation','Automate pull request review workflows with AI and GitHub Actions.','2026-03-25','https://github.com/github/actions-skills/blob/main/pr-review-automation.md','c-5','r-10'),
('s-32','supabase-postgres-best-practices','Apply Postgres and Supabase best practices for production databases.','2026-03-25','https://github.com/supabase/agent-skills/blob/main/supabase-postgres-best-practices.md','c-6','r-11'),
('s-33','supabase-auth-patterns','Implement auth with Supabase for web and mobile apps.','2026-03-25','https://github.com/supabase/agent-skills/blob/main/supabase-auth-patterns.md','c-6','r-11'),
('s-34','backend-starter-kit','Bootstrap backend projects with Supabase and modern patterns.','2026-03-25','https://github.com/supabase/starter-skills/blob/main/backend-starter-kit.md','c-6','r-12'),
('s-35','storage-and-rules','Manage storage and access rules with Supabase Storage.','2026-03-25','https://github.com/supabase/starter-skills/blob/main/storage-and-rules.md','c-6','r-12');
