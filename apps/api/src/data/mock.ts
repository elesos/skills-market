export const creators = [
  {
    "id": "creator-1",
    "slug": "anthropic",
    "name": "Anthropic",
    "handle": "anthropics",
    "avatar": "🧠",
    "bio": "Official skills for reasoning, writing, research, and knowledge work.",
    "bio_zh": "面向推理、写作、研究与知识工作的官方技能。",
    "website": "https://www.anthropic.com",
    "github": "https://github.com/anthropics",
    "verified": true,
    "isOfficial": true,
    "totalSkills": 8,
    "totalStars": 128000,
    "totalDownloads": 816000,
    "joinedAt": "2025-01-12",
    "tags": [
      "official",
      "llm",
      "writing"
    ]
  },
  {
    "id": "creator-2",
    "slug": "cloudflare",
    "name": "Cloudflare",
    "handle": "cloudflare",
    "avatar": "☁️",
    "bio": "Edge, Workers, Pages and infrastructure-focused skills.",
    "bio_zh": "聚焦 Edge、Workers、Pages 与基础设施的官方技能。",
    "website": "https://www.cloudflare.com",
    "github": "https://github.com/cloudflare",
    "verified": true,
    "isOfficial": true,
    "totalSkills": 9,
    "totalStars": 35800,
    "totalDownloads": 32300,
    "joinedAt": "2025-02-01",
    "tags": [
      "official",
      "edge",
      "infra"
    ]
  },
  {
    "id": "creator-3",
    "slug": "openai",
    "name": "OpenAI",
    "handle": "openai",
    "avatar": "◎",
    "bio": "Skills for multimodal assistants, coding, and evaluation pipelines.",
    "bio_zh": "面向多模态助手、编码与评测流水线的技能。",
    "website": "https://openai.com",
    "github": "https://github.com/openai",
    "verified": true,
    "isOfficial": true,
    "totalSkills": 5,
    "totalStars": 91000,
    "totalDownloads": 89600,
    "joinedAt": "2025-01-28",
    "tags": [
      "official",
      "agents",
      "multimodal"
    ]
  },
  {
    "id": "creator-4",
    "slug": "vercel",
    "name": "Vercel",
    "handle": "vercel-labs",
    "avatar": "▲",
    "bio": "Skills for frontend craft, React patterns, and performance.",
    "bio_zh": "聚焦前端工程、React 模式与性能优化的技能。",
    "website": "https://vercel.com",
    "github": "https://github.com/vercel",
    "verified": true,
    "isOfficial": true,
    "totalSkills": 6,
    "totalStars": 154000,
    "totalDownloads": 231000,
    "joinedAt": "2025-03-02",
    "tags": [
      "official",
      "frontend",
      "performance"
    ]
  },
  {
    "id": "creator-5",
    "slug": "github",
    "name": "GitHub",
    "handle": "github",
    "avatar": "🐙",
    "bio": "Skills for repos, PR workflows, CI, and developer collaboration.",
    "bio_zh": "面向仓库、PR 流程、CI 与协作开发的技能。",
    "website": "https://github.com",
    "github": "https://github.com/github",
    "verified": true,
    "isOfficial": true,
    "totalSkills": 4,
    "totalStars": 110000,
    "totalDownloads": 52800,
    "joinedAt": "2025-02-18",
    "tags": [
      "official",
      "git",
      "ci"
    ]
  },
  {
    "id": "creator-6",
    "slug": "supabase",
    "name": "Supabase",
    "handle": "supabase",
    "avatar": "⚡",
    "bio": "Skills for Postgres, auth, storage, and app backends.",
    "bio_zh": "聚焦 Postgres、认证、存储与应用后端的技能。",
    "website": "https://supabase.com",
    "github": "https://github.com/supabase",
    "verified": true,
    "isOfficial": true,
    "totalSkills": 4,
    "totalStars": 78000,
    "totalDownloads": 50900,
    "joinedAt": "2025-03-11",
    "tags": [
      "official",
      "database",
      "backend"
    ]
  }
] as const;

export const repos = [
  {
    "id": "repo-1",
    "slug": "anthropic-skills",
    "name": "skills",
    "description": "Anthropic official skills collection.",
    "description_zh": "Anthropic 官方技能合集。",
    "creatorId": "creator-1",
    "category": "writing",
    "tags": [
      "official",
      "reasoning"
    ],
    "totalSkills": 4,
    "stars": 52000,
    "downloads": 540000,
    "isOfficial": true,
    "isFeatured": true,
    "updatedAt": "2026-03-20",
    "version": "2.8.0",
    "license": "MIT"
  },
  {
    "id": "repo-2",
    "slug": "anthropic-claude-code",
    "name": "claude-code",
    "description": "Developer workflows and frontend craft.",
    "description_zh": "开发流程与前端工程技能。",
    "creatorId": "creator-1",
    "category": "coding",
    "tags": [
      "coding",
      "frontend"
    ],
    "totalSkills": 4,
    "stars": 41000,
    "downloads": 276000,
    "isOfficial": true,
    "isFeatured": true,
    "updatedAt": "2026-03-18",
    "version": "1.9.0",
    "license": "MIT"
  },
  {
    "id": "repo-3",
    "slug": "cloudflare-skills",
    "name": "skills",
    "description": "Cloudflare platform skills for edge development.",
    "description_zh": "Cloudflare 边缘平台技能集。",
    "creatorId": "creator-2",
    "category": "devops",
    "tags": [
      "workers",
      "pages",
      "edge"
    ],
    "totalSkills": 5,
    "stars": 18300,
    "downloads": 32100,
    "isOfficial": true,
    "isFeatured": true,
    "updatedAt": "2026-03-26",
    "version": "1.6.0",
    "license": "Apache-2.0"
  },
  {
    "id": "repo-4",
    "slug": "cloudflare-docs",
    "name": "cloudflare-docs",
    "description": "Documentation-derived skills for product workflows.",
    "description_zh": "基于文档提炼的产品工作流技能。",
    "creatorId": "creator-2",
    "category": "research",
    "tags": [
      "docs",
      "ops"
    ],
    "totalSkills": 4,
    "stars": 2400,
    "downloads": 800,
    "isOfficial": true,
    "isFeatured": false,
    "updatedAt": "2026-03-15",
    "version": "1.1.0",
    "license": "Apache-2.0"
  },
  {
    "id": "repo-5",
    "slug": "openai-skills",
    "name": "skills",
    "description": "OpenAI official skills for apps and agents.",
    "description_zh": "OpenAI 面向应用与智能体的官方技能。",
    "creatorId": "creator-3",
    "category": "analysis",
    "tags": [
      "agents",
      "evals"
    ],
    "totalSkills": 5,
    "stars": 30800,
    "downloads": 89600,
    "isOfficial": true,
    "isFeatured": true,
    "updatedAt": "2026-03-24",
    "version": "1.4.0",
    "license": "MIT"
  },
  {
    "id": "repo-6",
    "slug": "vercel-agent-skills",
    "name": "agent-skills",
    "description": "Vercel frontend and framework best practices.",
    "description_zh": "Vercel 前端与框架最佳实践技能。",
    "creatorId": "creator-4",
    "category": "design",
    "tags": [
      "nextjs",
      "react"
    ],
    "totalSkills": 3,
    "stars": 67200,
    "downloads": 164000,
    "isOfficial": true,
    "isFeatured": true,
    "updatedAt": "2026-03-21",
    "version": "3.2.0",
    "license": "MIT"
  },
  {
    "id": "repo-7",
    "slug": "vercel-next-skills",
    "name": "next-skills",
    "description": "Patterns for shipping modern Next.js products.",
    "description_zh": "现代 Next.js 产品交付模式技能。",
    "creatorId": "creator-4",
    "category": "coding",
    "tags": [
      "nextjs",
      "fullstack"
    ],
    "totalSkills": 3,
    "stars": 41800,
    "downloads": 67000,
    "isOfficial": true,
    "isFeatured": false,
    "updatedAt": "2026-03-17",
    "version": "2.0.0",
    "license": "MIT"
  },
  {
    "id": "repo-8",
    "slug": "github-awesome-copilot",
    "name": "awesome-copilot",
    "description": "GitHub Copilot and Azure-oriented skills.",
    "description_zh": "面向 GitHub Copilot 与 Azure 的技能集。",
    "creatorId": "creator-5",
    "category": "automation",
    "tags": [
      "copilot",
      "azure"
    ],
    "totalSkills": 2,
    "stars": 53900,
    "downloads": 52800,
    "isOfficial": true,
    "isFeatured": false,
    "updatedAt": "2026-03-10",
    "version": "4.0.0",
    "license": "MIT"
  },
  {
    "id": "repo-9",
    "slug": "github-actions-skills",
    "name": "actions-skills",
    "description": "Skills for CI/CD and repo automation.",
    "description_zh": "CI/CD 与仓库自动化技能。",
    "creatorId": "creator-5",
    "category": "automation",
    "tags": [
      "actions",
      "ci"
    ],
    "totalSkills": 2,
    "stars": 22500,
    "downloads": 21300,
    "isOfficial": true,
    "isFeatured": false,
    "updatedAt": "2026-03-09",
    "version": "1.2.0",
    "license": "MIT"
  },
  {
    "id": "repo-10",
    "slug": "supabase-agent-skills",
    "name": "agent-skills",
    "description": "Supabase best practices for auth and Postgres apps.",
    "description_zh": "Supabase 认证与 Postgres 应用最佳实践技能。",
    "creatorId": "creator-6",
    "category": "data",
    "tags": [
      "postgres",
      "auth"
    ],
    "totalSkills": 2,
    "stars": 19300,
    "downloads": 50900,
    "isOfficial": true,
    "isFeatured": true,
    "updatedAt": "2026-03-22",
    "version": "2.3.0",
    "license": "Apache-2.0"
  },
  {
    "id": "repo-11",
    "slug": "supabase-starter-skills",
    "name": "starter-skills",
    "description": "Backend starter workflows for product teams.",
    "description_zh": "适合产品团队的后端启动工作流技能。",
    "creatorId": "creator-6",
    "category": "data",
    "tags": [
      "backend",
      "starter"
    ],
    "totalSkills": 2,
    "stars": 9100,
    "downloads": 13100,
    "isOfficial": true,
    "isFeatured": false,
    "updatedAt": "2026-03-05",
    "version": "1.0.0",
    "license": "Apache-2.0"
  },
  {
    "id": "repo-12",
    "slug": "cloudflare-workerd",
    "name": "workerd",
    "description": "Runtime-focused skills for compatibility and execution.",
    "description_zh": "聚焦运行时兼容性与执行能力的技能。",
    "creatorId": "creator-2",
    "category": "security",
    "tags": [
      "runtime",
      "compat"
    ],
    "totalSkills": 2,
    "stars": 1200,
    "downloads": 68,
    "isOfficial": true,
    "isFeatured": false,
    "updatedAt": "2026-03-01",
    "version": "0.8.0",
    "license": "Apache-2.0"
  }
] as const;

export const skills = [
  {
    "id": "skill-1",
    "slug": "doc-coauthoring",
    "name": "Doc Coauthoring",
    "description": "doc coauthoring skill for Anthropic.",
    "description_zh": "Anthropic 的 doc-coauthoring 技能。",
    "longDescription": "A production-ready skill page for doc-coauthoring in the skills repository.",
    "longDescription_zh": "这是 skills 仓库中的 doc-coauthoring 技能详情页。",
    "repoId": "repo-1",
    "creatorId": "creator-1",
    "category": "writing",
    "tags": [
      "docs",
      "workflow"
    ],
    "stars": 13010,
    "downloads": 135120,
    "isOfficial": true,
    "isFeatured": true,
    "version": "1.0.0",
    "updatedAt": "2026-03-25",
    "triggerDescription": "Use when the task clearly matches the skill focus.",
    "triggerDescription_zh": "当任务与技能目标明确匹配时使用。",
    "exampleUseCases": [
      "Shipping faster",
      "Improving quality",
      "Reducing manual work"
    ],
    "exampleUseCases_zh": [
      "更快交付",
      "提高质量",
      "减少重复劳动"
    ],
    "installCommand": "npx skills add anthropics/skills/doc-coauthoring"
  },
  {
    "id": "skill-2",
    "slug": "canvas-design",
    "name": "Canvas Design",
    "description": "canvas design skill for Anthropic.",
    "description_zh": "Anthropic 的 canvas-design 技能。",
    "longDescription": "A production-ready skill page for canvas-design in the skills repository.",
    "longDescription_zh": "这是 skills 仓库中的 canvas-design 技能详情页。",
    "repoId": "repo-1",
    "creatorId": "creator-1",
    "category": "design",
    "tags": [
      "art",
      "static"
    ],
    "stars": 13020,
    "downloads": 135240,
    "isOfficial": true,
    "isFeatured": true,
    "version": "1.0.0",
    "updatedAt": "2026-03-25",
    "triggerDescription": "Use when the task clearly matches the skill focus.",
    "triggerDescription_zh": "当任务与技能目标明确匹配时使用。",
    "exampleUseCases": [
      "Shipping faster",
      "Improving quality",
      "Reducing manual work"
    ],
    "exampleUseCases_zh": [
      "更快交付",
      "提高质量",
      "减少重复劳动"
    ],
    "installCommand": "npx skills add anthropics/skills/canvas-design"
  },
  {
    "id": "skill-3",
    "slug": "theme-factory",
    "name": "Theme Factory",
    "description": "theme factory skill for Anthropic.",
    "description_zh": "Anthropic 的 theme-factory 技能。",
    "longDescription": "A production-ready skill page for theme-factory in the skills repository.",
    "longDescription_zh": "这是 skills 仓库中的 theme-factory 技能详情页。",
    "repoId": "repo-1",
    "creatorId": "creator-1",
    "category": "design",
    "tags": [
      "theme",
      "branding"
    ],
    "stars": 13030,
    "downloads": 135360,
    "isOfficial": true,
    "isFeatured": false,
    "version": "1.0.0",
    "updatedAt": "2026-03-25",
    "triggerDescription": "Use when the task clearly matches the skill focus.",
    "triggerDescription_zh": "当任务与技能目标明确匹配时使用。",
    "exampleUseCases": [
      "Shipping faster",
      "Improving quality",
      "Reducing manual work"
    ],
    "exampleUseCases_zh": [
      "更快交付",
      "提高质量",
      "减少重复劳动"
    ],
    "installCommand": "npx skills add anthropics/skills/theme-factory"
  },
  {
    "id": "skill-4",
    "slug": "pdf",
    "name": "Pdf",
    "description": "pdf skill for Anthropic.",
    "description_zh": "Anthropic 的 pdf 技能。",
    "longDescription": "A production-ready skill page for pdf in the skills repository.",
    "longDescription_zh": "这是 skills 仓库中的 pdf 技能详情页。",
    "repoId": "repo-1",
    "creatorId": "creator-1",
    "category": "analysis",
    "tags": [
      "pdf",
      "ocr"
    ],
    "stars": 13040,
    "downloads": 135480,
    "isOfficial": true,
    "isFeatured": false,
    "version": "1.0.0",
    "updatedAt": "2026-03-25",
    "triggerDescription": "Use when the task clearly matches the skill focus.",
    "triggerDescription_zh": "当任务与技能目标明确匹配时使用。",
    "exampleUseCases": [
      "Shipping faster",
      "Improving quality",
      "Reducing manual work"
    ],
    "exampleUseCases_zh": [
      "更快交付",
      "提高质量",
      "减少重复劳动"
    ],
    "installCommand": "npx skills add anthropics/skills/pdf"
  },
  {
    "id": "skill-5",
    "slug": "frontend-design",
    "name": "Frontend Design",
    "description": "frontend design skill for Anthropic.",
    "description_zh": "Anthropic 的 frontend-design 技能。",
    "longDescription": "A production-ready skill page for frontend-design in the claude-code repository.",
    "longDescription_zh": "这是 claude-code 仓库中的 frontend-design 技能详情页。",
    "repoId": "repo-2",
    "creatorId": "creator-1",
    "category": "design",
    "tags": [
      "frontend",
      "ui"
    ],
    "stars": 10300,
    "downloads": 69600,
    "isOfficial": true,
    "isFeatured": true,
    "version": "1.0.0",
    "updatedAt": "2026-03-25",
    "triggerDescription": "Use when the task clearly matches the skill focus.",
    "triggerDescription_zh": "当任务与技能目标明确匹配时使用。",
    "exampleUseCases": [
      "Shipping faster",
      "Improving quality",
      "Reducing manual work"
    ],
    "exampleUseCases_zh": [
      "更快交付",
      "提高质量",
      "减少重复劳动"
    ],
    "installCommand": "npx skills add anthropics/claude-code/frontend-design"
  },
  {
    "id": "skill-6",
    "slug": "skill-creator",
    "name": "Skill Creator",
    "description": "skill creator skill for Anthropic.",
    "description_zh": "Anthropic 的 skill-creator 技能。",
    "longDescription": "A production-ready skill page for skill-creator in the claude-code repository.",
    "longDescription_zh": "这是 claude-code 仓库中的 skill-creator 技能详情页。",
    "repoId": "repo-2",
    "creatorId": "creator-1",
    "category": "coding",
    "tags": [
      "skills",
      "builder"
    ],
    "stars": 10310,
    "downloads": 69720,
    "isOfficial": true,
    "isFeatured": true,
    "version": "1.0.0",
    "updatedAt": "2026-03-25",
    "triggerDescription": "Use when the task clearly matches the skill focus.",
    "triggerDescription_zh": "当任务与技能目标明确匹配时使用。",
    "exampleUseCases": [
      "Shipping faster",
      "Improving quality",
      "Reducing manual work"
    ],
    "exampleUseCases_zh": [
      "更快交付",
      "提高质量",
      "减少重复劳动"
    ],
    "installCommand": "npx skills add anthropics/claude-code/skill-creator"
  },
  {
    "id": "skill-7",
    "slug": "webapp-testing",
    "name": "Webapp Testing",
    "description": "webapp testing skill for Anthropic.",
    "description_zh": "Anthropic 的 webapp-testing 技能。",
    "longDescription": "A production-ready skill page for webapp-testing in the claude-code repository.",
    "longDescription_zh": "这是 claude-code 仓库中的 webapp-testing 技能详情页。",
    "repoId": "repo-2",
    "creatorId": "creator-1",
    "category": "automation",
    "tags": [
      "playwright",
      "qa"
    ],
    "stars": 10320,
    "downloads": 69840,
    "isOfficial": true,
    "isFeatured": false,
    "version": "1.0.0",
    "updatedAt": "2026-03-25",
    "triggerDescription": "Use when the task clearly matches the skill focus.",
    "triggerDescription_zh": "当任务与技能目标明确匹配时使用。",
    "exampleUseCases": [
      "Shipping faster",
      "Improving quality",
      "Reducing manual work"
    ],
    "exampleUseCases_zh": [
      "更快交付",
      "提高质量",
      "减少重复劳动"
    ],
    "installCommand": "npx skills add anthropics/claude-code/webapp-testing"
  },
  {
    "id": "skill-8",
    "slug": "pptx",
    "name": "Pptx",
    "description": "pptx skill for Anthropic.",
    "description_zh": "Anthropic 的 pptx 技能。",
    "longDescription": "A production-ready skill page for pptx in the claude-code repository.",
    "longDescription_zh": "这是 claude-code 仓库中的 pptx 技能详情页。",
    "repoId": "repo-2",
    "creatorId": "creator-1",
    "category": "writing",
    "tags": [
      "slides",
      "deck"
    ],
    "stars": 10330,
    "downloads": 69960,
    "isOfficial": true,
    "isFeatured": false,
    "version": "1.0.0",
    "updatedAt": "2026-03-25",
    "triggerDescription": "Use when the task clearly matches the skill focus.",
    "triggerDescription_zh": "当任务与技能目标明确匹配时使用。",
    "exampleUseCases": [
      "Shipping faster",
      "Improving quality",
      "Reducing manual work"
    ],
    "exampleUseCases_zh": [
      "更快交付",
      "提高质量",
      "减少重复劳动"
    ],
    "installCommand": "npx skills add anthropics/claude-code/pptx"
  },
  {
    "id": "skill-9",
    "slug": "wrangler",
    "name": "Wrangler",
    "description": "wrangler skill for Cloudflare.",
    "description_zh": "Cloudflare 的 wrangler 技能。",
    "longDescription": "A production-ready skill page for wrangler in the skills repository.",
    "longDescription_zh": "这是 skills 仓库中的 wrangler 技能详情页。",
    "repoId": "repo-3",
    "creatorId": "creator-2",
    "category": "devops",
    "tags": [
      "workers",
      "cli"
    ],
    "stars": 3750,
    "downloads": 7500,
    "isOfficial": true,
    "isFeatured": true,
    "version": "1.0.0",
    "updatedAt": "2026-03-25",
    "triggerDescription": "Use when the task clearly matches the skill focus.",
    "triggerDescription_zh": "当任务与技能目标明确匹配时使用。",
    "exampleUseCases": [
      "Shipping faster",
      "Improving quality",
      "Reducing manual work"
    ],
    "exampleUseCases_zh": [
      "更快交付",
      "提高质量",
      "减少重复劳动"
    ],
    "installCommand": "npx skills add cloudflare/skills/wrangler"
  },
  {
    "id": "skill-10",
    "slug": "cloudflare",
    "name": "Cloudflare",
    "description": "cloudflare skill for Cloudflare.",
    "description_zh": "Cloudflare 的 cloudflare 技能。",
    "longDescription": "A production-ready skill page for cloudflare in the skills repository.",
    "longDescription_zh": "这是 skills 仓库中的 cloudflare 技能详情页。",
    "repoId": "repo-3",
    "creatorId": "creator-2",
    "category": "devops",
    "tags": [
      "pages",
      "d1"
    ],
    "stars": 3760,
    "downloads": 7620,
    "isOfficial": true,
    "isFeatured": true,
    "version": "1.0.0",
    "updatedAt": "2026-03-25",
    "triggerDescription": "Use when the task clearly matches the skill focus.",
    "triggerDescription_zh": "当任务与技能目标明确匹配时使用。",
    "exampleUseCases": [
      "Shipping faster",
      "Improving quality",
      "Reducing manual work"
    ],
    "exampleUseCases_zh": [
      "更快交付",
      "提高质量",
      "减少重复劳动"
    ],
    "installCommand": "npx skills add cloudflare/skills/cloudflare"
  },
  {
    "id": "skill-11",
    "slug": "sandbox-sdk",
    "name": "Sandbox Sdk",
    "description": "sandbox sdk skill for Cloudflare.",
    "description_zh": "Cloudflare 的 sandbox-sdk 技能。",
    "longDescription": "A production-ready skill page for sandbox-sdk in the skills repository.",
    "longDescription_zh": "这是 skills 仓库中的 sandbox-sdk 技能详情页。",
    "repoId": "repo-3",
    "creatorId": "creator-2",
    "category": "automation",
    "tags": [
      "sandbox",
      "execution"
    ],
    "stars": 3770,
    "downloads": 7740,
    "isOfficial": true,
    "isFeatured": false,
    "version": "1.0.0",
    "updatedAt": "2026-03-25",
    "triggerDescription": "Use when the task clearly matches the skill focus.",
    "triggerDescription_zh": "当任务与技能目标明确匹配时使用。",
    "exampleUseCases": [
      "Shipping faster",
      "Improving quality",
      "Reducing manual work"
    ],
    "exampleUseCases_zh": [
      "更快交付",
      "提高质量",
      "减少重复劳动"
    ],
    "installCommand": "npx skills add cloudflare/skills/sandbox-sdk"
  },
  {
    "id": "skill-12",
    "slug": "migrate-to-vinext",
    "name": "Migrate To Vinext",
    "description": "migrate to vinext skill for Cloudflare.",
    "description_zh": "Cloudflare 的 migrate-to-vinext 技能。",
    "longDescription": "A production-ready skill page for migrate-to-vinext in the skills repository.",
    "longDescription_zh": "这是 skills 仓库中的 migrate-to-vinext 技能详情页。",
    "repoId": "repo-3",
    "creatorId": "creator-2",
    "category": "coding",
    "tags": [
      "migration",
      "vite"
    ],
    "stars": 3780,
    "downloads": 7860,
    "isOfficial": true,
    "isFeatured": false,
    "version": "1.0.0",
    "updatedAt": "2026-03-25",
    "triggerDescription": "Use when the task clearly matches the skill focus.",
    "triggerDescription_zh": "当任务与技能目标明确匹配时使用。",
    "exampleUseCases": [
      "Shipping faster",
      "Improving quality",
      "Reducing manual work"
    ],
    "exampleUseCases_zh": [
      "更快交付",
      "提高质量",
      "减少重复劳动"
    ],
    "installCommand": "npx skills add cloudflare/skills/migrate-to-vinext"
  },
  {
    "id": "skill-13",
    "slug": "web-perf",
    "name": "Web Perf",
    "description": "web perf skill for Cloudflare.",
    "description_zh": "Cloudflare 的 web-perf 技能。",
    "longDescription": "A production-ready skill page for web-perf in the cloudflare-docs repository.",
    "longDescription_zh": "这是 cloudflare-docs 仓库中的 web-perf 技能详情页。",
    "repoId": "repo-4",
    "creatorId": "creator-2",
    "category": "analysis",
    "tags": [
      "performance",
      "audit"
    ],
    "stars": 730,
    "downloads": 1760,
    "isOfficial": true,
    "isFeatured": false,
    "version": "1.0.0",
    "updatedAt": "2026-03-25",
    "triggerDescription": "Use when the task clearly matches the skill focus.",
    "triggerDescription_zh": "当任务与技能目标明确匹配时使用。",
    "exampleUseCases": [
      "Shipping faster",
      "Improving quality",
      "Reducing manual work"
    ],
    "exampleUseCases_zh": [
      "更快交付",
      "提高质量",
      "减少重复劳动"
    ],
    "installCommand": "npx skills add cloudflare/cloudflare-docs/web-perf"
  },
  {
    "id": "skill-14",
    "slug": "changelog",
    "name": "Changelog",
    "description": "changelog skill for Cloudflare.",
    "description_zh": "Cloudflare 的 changelog 技能。",
    "longDescription": "A production-ready skill page for changelog in the cloudflare-docs repository.",
    "longDescription_zh": "这是 cloudflare-docs 仓库中的 changelog 技能详情页。",
    "repoId": "repo-4",
    "creatorId": "creator-2",
    "category": "research",
    "tags": [
      "release",
      "updates"
    ],
    "stars": 740,
    "downloads": 1880,
    "isOfficial": true,
    "isFeatured": false,
    "version": "1.0.0",
    "updatedAt": "2026-03-25",
    "triggerDescription": "Use when the task clearly matches the skill focus.",
    "triggerDescription_zh": "当任务与技能目标明确匹配时使用。",
    "exampleUseCases": [
      "Shipping faster",
      "Improving quality",
      "Reducing manual work"
    ],
    "exampleUseCases_zh": [
      "更快交付",
      "提高质量",
      "减少重复劳动"
    ],
    "installCommand": "npx skills add cloudflare/cloudflare-docs/changelog"
  },
  {
    "id": "skill-15",
    "slug": "module-registry",
    "name": "Module Registry",
    "description": "module registry skill for Cloudflare.",
    "description_zh": "Cloudflare 的 module-registry 技能。",
    "longDescription": "A production-ready skill page for module-registry in the workerd repository.",
    "longDescription_zh": "这是 workerd 仓库中的 module-registry 技能详情页。",
    "repoId": "repo-12",
    "creatorId": "creator-2",
    "category": "security",
    "tags": [
      "runtime",
      "modules"
    ],
    "stars": 750,
    "downloads": 1834,
    "isOfficial": true,
    "isFeatured": false,
    "version": "1.0.0",
    "updatedAt": "2026-03-25",
    "triggerDescription": "Use when the task clearly matches the skill focus.",
    "triggerDescription_zh": "当任务与技能目标明确匹配时使用。",
    "exampleUseCases": [
      "Shipping faster",
      "Improving quality",
      "Reducing manual work"
    ],
    "exampleUseCases_zh": [
      "更快交付",
      "提高质量",
      "减少重复劳动"
    ],
    "installCommand": "npx skills add cloudflare/workerd/module-registry"
  },
  {
    "id": "skill-16",
    "slug": "add-compat-flag",
    "name": "Add Compat Flag",
    "description": "add compat flag skill for Cloudflare.",
    "description_zh": "Cloudflare 的 add-compat-flag 技能。",
    "longDescription": "A production-ready skill page for add-compat-flag in the workerd repository.",
    "longDescription_zh": "这是 workerd 仓库中的 add-compat-flag 技能详情页。",
    "repoId": "repo-12",
    "creatorId": "creator-2",
    "category": "security",
    "tags": [
      "compatibility",
      "runtime"
    ],
    "stars": 760,
    "downloads": 1954,
    "isOfficial": true,
    "isFeatured": false,
    "version": "1.0.0",
    "updatedAt": "2026-03-25",
    "triggerDescription": "Use when the task clearly matches the skill focus.",
    "triggerDescription_zh": "当任务与技能目标明确匹配时使用。",
    "exampleUseCases": [
      "Shipping faster",
      "Improving quality",
      "Reducing manual work"
    ],
    "exampleUseCases_zh": [
      "更快交付",
      "提高质量",
      "减少重复劳动"
    ],
    "installCommand": "npx skills add cloudflare/workerd/add-compat-flag"
  },
  {
    "id": "skill-17",
    "slug": "agents-sdk",
    "name": "Agents Sdk",
    "description": "agents sdk skill for OpenAI.",
    "description_zh": "OpenAI 的 agents-sdk 技能。",
    "longDescription": "A production-ready skill page for agents-sdk in the skills repository.",
    "longDescription_zh": "这是 skills 仓库中的 agents-sdk 技能详情页。",
    "repoId": "repo-5",
    "creatorId": "creator-3",
    "category": "coding",
    "tags": [
      "agents",
      "sdk"
    ],
    "stars": 6330,
    "downloads": 19960,
    "isOfficial": true,
    "isFeatured": true,
    "version": "1.0.0",
    "updatedAt": "2026-03-25",
    "triggerDescription": "Use when the task clearly matches the skill focus.",
    "triggerDescription_zh": "当任务与技能目标明确匹配时使用。",
    "exampleUseCases": [
      "Shipping faster",
      "Improving quality",
      "Reducing manual work"
    ],
    "exampleUseCases_zh": [
      "更快交付",
      "提高质量",
      "减少重复劳动"
    ],
    "installCommand": "npx skills add openai/skills/agents-sdk"
  },
  {
    "id": "skill-18",
    "slug": "evals-pipeline",
    "name": "Evals Pipeline",
    "description": "evals pipeline skill for OpenAI.",
    "description_zh": "OpenAI 的 evals-pipeline 技能。",
    "longDescription": "A production-ready skill page for evals-pipeline in the skills repository.",
    "longDescription_zh": "这是 skills 仓库中的 evals-pipeline 技能详情页。",
    "repoId": "repo-5",
    "creatorId": "creator-3",
    "category": "analysis",
    "tags": [
      "evals",
      "quality"
    ],
    "stars": 6340,
    "downloads": 20080,
    "isOfficial": true,
    "isFeatured": true,
    "version": "1.0.0",
    "updatedAt": "2026-03-25",
    "triggerDescription": "Use when the task clearly matches the skill focus.",
    "triggerDescription_zh": "当任务与技能目标明确匹配时使用。",
    "exampleUseCases": [
      "Shipping faster",
      "Improving quality",
      "Reducing manual work"
    ],
    "exampleUseCases_zh": [
      "更快交付",
      "提高质量",
      "减少重复劳动"
    ],
    "installCommand": "npx skills add openai/skills/evals-pipeline"
  },
  {
    "id": "skill-19",
    "slug": "realtime-apps",
    "name": "Realtime Apps",
    "description": "realtime apps skill for OpenAI.",
    "description_zh": "OpenAI 的 realtime-apps 技能。",
    "longDescription": "A production-ready skill page for realtime-apps in the skills repository.",
    "longDescription_zh": "这是 skills 仓库中的 realtime-apps 技能详情页。",
    "repoId": "repo-5",
    "creatorId": "creator-3",
    "category": "communication",
    "tags": [
      "realtime",
      "voice"
    ],
    "stars": 6350,
    "downloads": 20200,
    "isOfficial": true,
    "isFeatured": false,
    "version": "1.0.0",
    "updatedAt": "2026-03-25",
    "triggerDescription": "Use when the task clearly matches the skill focus.",
    "triggerDescription_zh": "当任务与技能目标明确匹配时使用。",
    "exampleUseCases": [
      "Shipping faster",
      "Improving quality",
      "Reducing manual work"
    ],
    "exampleUseCases_zh": [
      "更快交付",
      "提高质量",
      "减少重复劳动"
    ],
    "installCommand": "npx skills add openai/skills/realtime-apps"
  },
  {
    "id": "skill-20",
    "slug": "multimodal-studio",
    "name": "Multimodal Studio",
    "description": "multimodal studio skill for OpenAI.",
    "description_zh": "OpenAI 的 multimodal-studio 技能。",
    "longDescription": "A production-ready skill page for multimodal-studio in the skills repository.",
    "longDescription_zh": "这是 skills 仓库中的 multimodal-studio 技能详情页。",
    "repoId": "repo-5",
    "creatorId": "creator-3",
    "category": "design",
    "tags": [
      "vision",
      "audio"
    ],
    "stars": 6360,
    "downloads": 20320,
    "isOfficial": true,
    "isFeatured": false,
    "version": "1.0.0",
    "updatedAt": "2026-03-25",
    "triggerDescription": "Use when the task clearly matches the skill focus.",
    "triggerDescription_zh": "当任务与技能目标明确匹配时使用。",
    "exampleUseCases": [
      "Shipping faster",
      "Improving quality",
      "Reducing manual work"
    ],
    "exampleUseCases_zh": [
      "更快交付",
      "提高质量",
      "减少重复劳动"
    ],
    "installCommand": "npx skills add openai/skills/multimodal-studio"
  },
  {
    "id": "skill-21",
    "slug": "tool-calling-best-practices",
    "name": "Tool Calling Best Practices",
    "description": "tool calling best practices skill for OpenAI.",
    "description_zh": "OpenAI 的 tool-calling-best-practices 技能。",
    "longDescription": "A production-ready skill page for tool-calling-best-practices in the skills repository.",
    "longDescription_zh": "这是 skills 仓库中的 tool-calling-best-practices 技能详情页。",
    "repoId": "repo-5",
    "creatorId": "creator-3",
    "category": "automation",
    "tags": [
      "tools",
      "best-practices"
    ],
    "stars": 6370,
    "downloads": 20440,
    "isOfficial": true,
    "isFeatured": false,
    "version": "1.0.0",
    "updatedAt": "2026-03-25",
    "triggerDescription": "Use when the task clearly matches the skill focus.",
    "triggerDescription_zh": "当任务与技能目标明确匹配时使用。",
    "exampleUseCases": [
      "Shipping faster",
      "Improving quality",
      "Reducing manual work"
    ],
    "exampleUseCases_zh": [
      "更快交付",
      "提高质量",
      "减少重复劳动"
    ],
    "installCommand": "npx skills add openai/skills/tool-calling-best-practices"
  },
  {
    "id": "skill-22",
    "slug": "vercel-react-best-practices",
    "name": "Vercel React Best Practices",
    "description": "vercel react best practices skill for Vercel.",
    "description_zh": "Vercel 的 vercel-react-best-practices 技能。",
    "longDescription": "A production-ready skill page for vercel-react-best-practices in the agent-skills repository.",
    "longDescription_zh": "这是 agent-skills 仓库中的 vercel-react-best-practices 技能详情页。",
    "repoId": "repo-6",
    "creatorId": "creator-4",
    "category": "coding",
    "tags": [
      "react",
      "patterns"
    ],
    "stars": 22620,
    "downloads": 57306,
    "isOfficial": true,
    "isFeatured": true,
    "version": "1.0.0",
    "updatedAt": "2026-03-25",
    "triggerDescription": "Use when the task clearly matches the skill focus.",
    "triggerDescription_zh": "当任务与技能目标明确匹配时使用。",
    "exampleUseCases": [
      "Shipping faster",
      "Improving quality",
      "Reducing manual work"
    ],
    "exampleUseCases_zh": [
      "更快交付",
      "提高质量",
      "减少重复劳动"
    ],
    "installCommand": "npx skills add vercel-labs/agent-skills/vercel-react-best-practices"
  },
  {
    "id": "skill-23",
    "slug": "web-design-guidelines",
    "name": "Web Design Guidelines",
    "description": "web design guidelines skill for Vercel.",
    "description_zh": "Vercel 的 web-design-guidelines 技能。",
    "longDescription": "A production-ready skill page for web-design-guidelines in the agent-skills repository.",
    "longDescription_zh": "这是 agent-skills 仓库中的 web-design-guidelines 技能详情页。",
    "repoId": "repo-6",
    "creatorId": "creator-4",
    "category": "design",
    "tags": [
      "ui",
      "ux"
    ],
    "stars": 22630,
    "downloads": 57426,
    "isOfficial": true,
    "isFeatured": true,
    "version": "1.0.0",
    "updatedAt": "2026-03-25",
    "triggerDescription": "Use when the task clearly matches the skill focus.",
    "triggerDescription_zh": "当任务与技能目标明确匹配时使用。",
    "exampleUseCases": [
      "Shipping faster",
      "Improving quality",
      "Reducing manual work"
    ],
    "exampleUseCases_zh": [
      "更快交付",
      "提高质量",
      "减少重复劳动"
    ],
    "installCommand": "npx skills add vercel-labs/agent-skills/web-design-guidelines"
  },
  {
    "id": "skill-24",
    "slug": "seo-audit",
    "name": "Seo Audit",
    "description": "seo audit skill for Vercel.",
    "description_zh": "Vercel 的 seo-audit 技能。",
    "longDescription": "A production-ready skill page for seo-audit in the agent-skills repository.",
    "longDescription_zh": "这是 agent-skills 仓库中的 seo-audit 技能详情页。",
    "repoId": "repo-6",
    "creatorId": "creator-4",
    "category": "analysis",
    "tags": [
      "seo",
      "audit"
    ],
    "stars": 22640,
    "downloads": 57546,
    "isOfficial": true,
    "isFeatured": false,
    "version": "1.0.0",
    "updatedAt": "2026-03-25",
    "triggerDescription": "Use when the task clearly matches the skill focus.",
    "triggerDescription_zh": "当任务与技能目标明确匹配时使用。",
    "exampleUseCases": [
      "Shipping faster",
      "Improving quality",
      "Reducing manual work"
    ],
    "exampleUseCases_zh": [
      "更快交付",
      "提高质量",
      "减少重复劳动"
    ],
    "installCommand": "npx skills add vercel-labs/agent-skills/seo-audit"
  },
  {
    "id": "skill-25",
    "slug": "next-best-practices",
    "name": "Next Best Practices",
    "description": "next best practices skill for Vercel.",
    "description_zh": "Vercel 的 next-best-practices 技能。",
    "longDescription": "A production-ready skill page for next-best-practices in the next-skills repository.",
    "longDescription_zh": "这是 next-skills 仓库中的 next-best-practices 技能详情页。",
    "repoId": "repo-7",
    "creatorId": "creator-4",
    "category": "coding",
    "tags": [
      "nextjs",
      "app-router"
    ],
    "stars": 14183,
    "downloads": 25333,
    "isOfficial": true,
    "isFeatured": true,
    "version": "1.0.0",
    "updatedAt": "2026-03-25",
    "triggerDescription": "Use when the task clearly matches the skill focus.",
    "triggerDescription_zh": "当任务与技能目标明确匹配时使用。",
    "exampleUseCases": [
      "Shipping faster",
      "Improving quality",
      "Reducing manual work"
    ],
    "exampleUseCases_zh": [
      "更快交付",
      "提高质量",
      "减少重复劳动"
    ],
    "installCommand": "npx skills add vercel-labs/next-skills/next-best-practices"
  },
  {
    "id": "skill-26",
    "slug": "edge-rendering-patterns",
    "name": "Edge Rendering Patterns",
    "description": "edge rendering patterns skill for Vercel.",
    "description_zh": "Vercel 的 edge-rendering-patterns 技能。",
    "longDescription": "A production-ready skill page for edge-rendering-patterns in the next-skills repository.",
    "longDescription_zh": "这是 next-skills 仓库中的 edge-rendering-patterns 技能详情页。",
    "repoId": "repo-7",
    "creatorId": "creator-4",
    "category": "coding",
    "tags": [
      "edge",
      "rendering"
    ],
    "stars": 14193,
    "downloads": 25453,
    "isOfficial": true,
    "isFeatured": false,
    "version": "1.0.0",
    "updatedAt": "2026-03-25",
    "triggerDescription": "Use when the task clearly matches the skill focus.",
    "triggerDescription_zh": "当任务与技能目标明确匹配时使用。",
    "exampleUseCases": [
      "Shipping faster",
      "Improving quality",
      "Reducing manual work"
    ],
    "exampleUseCases_zh": [
      "更快交付",
      "提高质量",
      "减少重复劳动"
    ],
    "installCommand": "npx skills add vercel-labs/next-skills/edge-rendering-patterns"
  },
  {
    "id": "skill-27",
    "slug": "streaming-ux",
    "name": "Streaming Ux",
    "description": "streaming ux skill for Vercel.",
    "description_zh": "Vercel 的 streaming-ux 技能。",
    "longDescription": "A production-ready skill page for streaming-ux in the next-skills repository.",
    "longDescription_zh": "这是 next-skills 仓库中的 streaming-ux 技能详情页。",
    "repoId": "repo-7",
    "creatorId": "creator-4",
    "category": "design",
    "tags": [
      "streaming",
      "ux"
    ],
    "stars": 14203,
    "downloads": 25573,
    "isOfficial": true,
    "isFeatured": false,
    "version": "1.0.0",
    "updatedAt": "2026-03-25",
    "triggerDescription": "Use when the task clearly matches the skill focus.",
    "triggerDescription_zh": "当任务与技能目标明确匹配时使用。",
    "exampleUseCases": [
      "Shipping faster",
      "Improving quality",
      "Reducing manual work"
    ],
    "exampleUseCases_zh": [
      "更快交付",
      "提高质量",
      "减少重复劳动"
    ],
    "installCommand": "npx skills add vercel-labs/next-skills/streaming-ux"
  },
  {
    "id": "skill-28",
    "slug": "azure-ai",
    "name": "Azure Ai",
    "description": "azure ai skill for GitHub.",
    "description_zh": "GitHub 的 azure-ai 技能。",
    "longDescription": "A production-ready skill page for azure-ai in the awesome-copilot repository.",
    "longDescription_zh": "这是 awesome-copilot 仓库中的 azure-ai 技能详情页。",
    "repoId": "repo-8",
    "creatorId": "creator-5",
    "category": "automation",
    "tags": [
      "azure",
      "copilot"
    ],
    "stars": 27230,
    "downloads": 29760,
    "isOfficial": true,
    "isFeatured": false,
    "version": "1.0.0",
    "updatedAt": "2026-03-25",
    "triggerDescription": "Use when the task clearly matches the skill focus.",
    "triggerDescription_zh": "当任务与技能目标明确匹配时使用。",
    "exampleUseCases": [
      "Shipping faster",
      "Improving quality",
      "Reducing manual work"
    ],
    "exampleUseCases_zh": [
      "更快交付",
      "提高质量",
      "减少重复劳动"
    ],
    "installCommand": "npx skills add github/awesome-copilot/azure-ai"
  },
  {
    "id": "skill-29",
    "slug": "azure-observability",
    "name": "Azure Observability",
    "description": "azure observability skill for GitHub.",
    "description_zh": "GitHub 的 azure-observability 技能。",
    "longDescription": "A production-ready skill page for azure-observability in the awesome-copilot repository.",
    "longDescription_zh": "这是 awesome-copilot 仓库中的 azure-observability 技能详情页。",
    "repoId": "repo-8",
    "creatorId": "creator-5",
    "category": "devops",
    "tags": [
      "telemetry",
      "azure"
    ],
    "stars": 27240,
    "downloads": 29880,
    "isOfficial": true,
    "isFeatured": false,
    "version": "1.0.0",
    "updatedAt": "2026-03-25",
    "triggerDescription": "Use when the task clearly matches the skill focus.",
    "triggerDescription_zh": "当任务与技能目标明确匹配时使用。",
    "exampleUseCases": [
      "Shipping faster",
      "Improving quality",
      "Reducing manual work"
    ],
    "exampleUseCases_zh": [
      "更快交付",
      "提高质量",
      "减少重复劳动"
    ],
    "installCommand": "npx skills add github/awesome-copilot/azure-observability"
  },
  {
    "id": "skill-30",
    "slug": "github-actions-ci",
    "name": "Github Actions Ci",
    "description": "github actions ci skill for GitHub.",
    "description_zh": "GitHub 的 github-actions-ci 技能。",
    "longDescription": "A production-ready skill page for github-actions-ci in the actions-skills repository.",
    "longDescription_zh": "这是 actions-skills 仓库中的 github-actions-ci 技能详情页。",
    "repoId": "repo-9",
    "creatorId": "creator-5",
    "category": "automation",
    "tags": [
      "github-actions",
      "ci"
    ],
    "stars": 11550,
    "downloads": 14250,
    "isOfficial": true,
    "isFeatured": true,
    "version": "1.0.0",
    "updatedAt": "2026-03-25",
    "triggerDescription": "Use when the task clearly matches the skill focus.",
    "triggerDescription_zh": "当任务与技能目标明确匹配时使用。",
    "exampleUseCases": [
      "Shipping faster",
      "Improving quality",
      "Reducing manual work"
    ],
    "exampleUseCases_zh": [
      "更快交付",
      "提高质量",
      "减少重复劳动"
    ],
    "installCommand": "npx skills add github/actions-skills/github-actions-ci"
  },
  {
    "id": "skill-31",
    "slug": "pr-review-automation",
    "name": "Pr Review Automation",
    "description": "pr review automation skill for GitHub.",
    "description_zh": "GitHub 的 pr-review-automation 技能。",
    "longDescription": "A production-ready skill page for pr-review-automation in the actions-skills repository.",
    "longDescription_zh": "这是 actions-skills 仓库中的 pr-review-automation 技能详情页。",
    "repoId": "repo-9",
    "creatorId": "creator-5",
    "category": "communication",
    "tags": [
      "pr",
      "review"
    ],
    "stars": 11560,
    "downloads": 14370,
    "isOfficial": true,
    "isFeatured": false,
    "version": "1.0.0",
    "updatedAt": "2026-03-25",
    "triggerDescription": "Use when the task clearly matches the skill focus.",
    "triggerDescription_zh": "当任务与技能目标明确匹配时使用。",
    "exampleUseCases": [
      "Shipping faster",
      "Improving quality",
      "Reducing manual work"
    ],
    "exampleUseCases_zh": [
      "更快交付",
      "提高质量",
      "减少重复劳动"
    ],
    "installCommand": "npx skills add github/actions-skills/pr-review-automation"
  },
  {
    "id": "skill-32",
    "slug": "supabase-postgres-best-practices",
    "name": "Supabase Postgres Best Practices",
    "description": "supabase postgres best practices skill for Supabase.",
    "description_zh": "Supabase 的 supabase-postgres-best-practices 技能。",
    "longDescription": "A production-ready skill page for supabase-postgres-best-practices in the agent-skills repository.",
    "longDescription_zh": "这是 agent-skills 仓库中的 supabase-postgres-best-practices 技能详情页。",
    "repoId": "repo-10",
    "creatorId": "creator-6",
    "category": "data",
    "tags": [
      "postgres",
      "sql"
    ],
    "stars": 9970,
    "downloads": 29290,
    "isOfficial": true,
    "isFeatured": true,
    "version": "1.0.0",
    "updatedAt": "2026-03-25",
    "triggerDescription": "Use when the task clearly matches the skill focus.",
    "triggerDescription_zh": "当任务与技能目标明确匹配时使用。",
    "exampleUseCases": [
      "Shipping faster",
      "Improving quality",
      "Reducing manual work"
    ],
    "exampleUseCases_zh": [
      "更快交付",
      "提高质量",
      "减少重复劳动"
    ],
    "installCommand": "npx skills add supabase/agent-skills/supabase-postgres-best-practices"
  },
  {
    "id": "skill-33",
    "slug": "supabase-auth-patterns",
    "name": "Supabase Auth Patterns",
    "description": "supabase auth patterns skill for Supabase.",
    "description_zh": "Supabase 的 supabase-auth-patterns 技能。",
    "longDescription": "A production-ready skill page for supabase-auth-patterns in the agent-skills repository.",
    "longDescription_zh": "这是 agent-skills 仓库中的 supabase-auth-patterns 技能详情页。",
    "repoId": "repo-10",
    "creatorId": "creator-6",
    "category": "security",
    "tags": [
      "auth",
      "session"
    ],
    "stars": 9980,
    "downloads": 29410,
    "isOfficial": true,
    "isFeatured": true,
    "version": "1.0.0",
    "updatedAt": "2026-03-25",
    "triggerDescription": "Use when the task clearly matches the skill focus.",
    "triggerDescription_zh": "当任务与技能目标明确匹配时使用。",
    "exampleUseCases": [
      "Shipping faster",
      "Improving quality",
      "Reducing manual work"
    ],
    "exampleUseCases_zh": [
      "更快交付",
      "提高质量",
      "减少重复劳动"
    ],
    "installCommand": "npx skills add supabase/agent-skills/supabase-auth-patterns"
  },
  {
    "id": "skill-34",
    "slug": "backend-starter-kit",
    "name": "Backend Starter Kit",
    "description": "backend starter kit skill for Supabase.",
    "description_zh": "Supabase 的 backend-starter-kit 技能。",
    "longDescription": "A production-ready skill page for backend-starter-kit in the starter-skills repository.",
    "longDescription_zh": "这是 starter-skills 仓库中的 backend-starter-kit 技能详情页。",
    "repoId": "repo-11",
    "creatorId": "creator-6",
    "category": "data",
    "tags": [
      "starter",
      "backend"
    ],
    "stars": 4890,
    "downloads": 10630,
    "isOfficial": true,
    "isFeatured": false,
    "version": "1.0.0",
    "updatedAt": "2026-03-25",
    "triggerDescription": "Use when the task clearly matches the skill focus.",
    "triggerDescription_zh": "当任务与技能目标明确匹配时使用。",
    "exampleUseCases": [
      "Shipping faster",
      "Improving quality",
      "Reducing manual work"
    ],
    "exampleUseCases_zh": [
      "更快交付",
      "提高质量",
      "减少重复劳动"
    ],
    "installCommand": "npx skills add supabase/starter-skills/backend-starter-kit"
  },
  {
    "id": "skill-35",
    "slug": "storage-and-rules",
    "name": "Storage And Rules",
    "description": "storage and rules skill for Supabase.",
    "description_zh": "Supabase 的 storage-and-rules 技能。",
    "longDescription": "A production-ready skill page for storage-and-rules in the starter-skills repository.",
    "longDescription_zh": "这是 starter-skills 仓库中的 storage-and-rules 技能详情页。",
    "repoId": "repo-11",
    "creatorId": "creator-6",
    "category": "security",
    "tags": [
      "storage",
      "rules"
    ],
    "stars": 4900,
    "downloads": 10750,
    "isOfficial": true,
    "isFeatured": false,
    "version": "1.0.0",
    "updatedAt": "2026-03-25",
    "triggerDescription": "Use when the task clearly matches the skill focus.",
    "triggerDescription_zh": "当任务与技能目标明确匹配时使用。",
    "exampleUseCases": [
      "Shipping faster",
      "Improving quality",
      "Reducing manual work"
    ],
    "exampleUseCases_zh": [
      "更快交付",
      "提高质量",
      "减少重复劳动"
    ],
    "installCommand": "npx skills add supabase/starter-skills/storage-and-rules"
  }
] as const;
