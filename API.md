# Skills Market API

**Base URL:** `https://skills-market-api.hnrayer.workers.dev`

> 本地开发时 Base URL 为 `http://localhost:8787`，可通过 `pnpm dev:api` 启动。

---

## 目录

- [健康检查](#健康检查)
- [Skills（技能）](#skills技能)
- [Repos（仓库）](#repos仓库)
- [Creators（创作者）](#creators创作者)
- [Search（搜索）](#search搜索)
- [Stats（统计）](#stats统计)
- [通用响应格式](#通用响应格式)

---

## 健康检查

### `GET /health`

检查服务是否正常运行。

```bash
curl https://skills-market-api.hnrayer.workers.dev/health
```

**响应示例：**

```json
{
  "status": "ok",
  "env": "production"
}
```

---

## Skills（技能）

### `GET /api/skills`

获取技能列表，支持搜索和分页。

**Query 参数：**

| 参数       | 类型   | 必填 | 说明                          |
|-----------|--------|------|-------------------------------|
| `q`       | string | 否   | 关键词搜索（name/description/tags）|
| `category`| string | 否   | 按分类过滤                      |
| `page`    | number | 否   | 页码，默认 `1`                  |
| `limit`   | number | 否   | 每页数量，默认 `20`              |

```bash
# 获取第一页
curl "https://skills-market-api.hnrayer.workers.dev/api/skills"

# 关键词搜索
curl "https://skills-market-api.hnrayer.workers.dev/api/skills?q=design"

# 按分类过滤
curl "https://skills-market-api.hnrayer.workers.dev/api/skills?category=coding"

# 分页
curl "https://skills-market-api.hnrayer.workers.dev/api/skills?page=2&limit=10"
```

**响应示例：**

```json
{
  "data": [
    {
      "id": "skill-1",
      "slug": "doc-coauthoring",
      "name": "Doc Coauthoring",
      "description": "...",
      "description_zh": "...",
      "longDescription": "...",
      "longDescription_zh": "...",
      "repoId": "repo-1",
      "creatorId": "creator-1",
      "category": "writing",
      "tags": ["docs", "workflow"],
      "stars": 13010,
      "downloads": 135120,
      "isOfficial": true,
      "version": "1.0.0",
      "updatedAt": "2026-03-25",
      "triggerDescription": "...",
      "triggerDescription_zh": "...",
      "exampleUseCases": ["Shipping faster", "Improving quality"],
      "exampleUseCases_zh": ["更快交付", "提高质量"],
      "installCommand": "npx skills add anthropics/skills/doc-coauthoring"
    }
  ],
  "total": 42,
  "page": 1,
  "limit": 20,
  "pages": 3
}
```

---

### `GET /api/skills/:slug`

获取单个技能详情。

**路径参数：**

| 参数   | 说明        |
|-------|-------------|
| `slug`| 技能的唯一标识 |

```bash
curl "https://skills-market-api.hnrayer.workers.dev/api/skills/doc-coauthoring"
curl "https://skills-market-api.hnrayer.workers.dev/api/skills/canvas-design"
curl "https://skills-market-api.hnrayer.workers.dev/api/skills/frontend-design"
```

**响应示例（成功）：**

```json
{
  "data": { /* 单个 Skill 对象 */ }
}
```

**响应示例（未找到）：**

```json
{ "error": "Not found" }
```
HTTP 状态码：`404`

---

## Repos（仓库）

### `GET /api/repos`

获取仓库列表，支持搜索和分页。

**Query 参数：**

| 参数       | 类型   | 必填 | 说明                          |
|-----------|--------|------|-------------------------------|
| `q`       | string | 否   | 关键词搜索（name/description）  |
| `category`| string | 否   | 按分类过滤                      |
| `page`    | number | 否   | 页码，默认 `1`                  |
| `limit`   | number | 否   | 每页数量，默认 `20`              |

```bash
# 获取所有仓库
curl "https://skills-market-api.hnrayer.workers.dev/api/repos"

# 关键词搜索
curl "https://skills-market-api.hnrayer.workers.dev/api/repos?q=cloudflare"

# 按分类过滤
curl "https://skills-market-api.hnrayer.workers.dev/api/repos?category=devops"
```

**Repo 对象字段：**

```json
{
  "id": "repo-1",
  "slug": "anthropic-skills",
  "name": "skills",
  "description": "...",
  "description_zh": "...",
  "creatorId": "creator-1",
  "category": "writing",
  "tags": ["official", "reasoning"],
  "totalSkills": 4,
  "stars": 52000,
  "downloads": 540000,
  "isOfficial": true,
  "updatedAt": "2026-03-20",
  "version": "2.8.0",
  "license": "MIT"
}
```

**分页响应结构同 `/api/skills`。**

---

### `GET /api/repos/:slug`

获取单个仓库详情，包含该仓库下的所有 Skills 和关联 Creator。

**路径参数：**

| 参数   | 说明        |
|-------|-------------|
| `slug`| 仓库的唯一标识 |

```bash
curl "https://skills-market-api.hnrayer.workers.dev/api/repos/anthropic-skills"
curl "https://skills-market-api.hnrayer.workers.dev/api/repos/cloudflare-skills"
curl "https://skills-market-api.hnrayer.workers.dev/api/repos/vercel-agent-skills"
```

**响应示例（成功）：**

```json
{
  "data": {
    "id": "repo-1",
    "slug": "anthropic-skills",
    "name": "skills",
    "description": "...",
    "skills": [ /* Skill 对象数组 */ ],
    "creator": { /* Creator 对象 */ }
  }
}
```

**响应示例（未找到）：**

```json
{ "error": "Not found" }
```
HTTP 状态码：`404`

---

## Creators（创作者）

### `GET /api/creators`

获取创作者列表，支持搜索和分页。

**Query 参数：**

| 参数    | 类型   | 必填 | 说明                            |
|--------|--------|------|---------------------------------|
| `q`    | string | 否   | 关键词搜索（name/handle）         |
| `page` | number | 否   | 页码，默认 `1`                   |
| `limit`| number | 否   | 每页数量，默认 `20`               |

```bash
# 获取所有创作者
curl "https://skills-market-api.hnrayer.workers.dev/api/creators"

# 关键词搜索
curl "https://skills-market-api.hnrayer.workers.dev/api/creators?q=anthropic"

# 限制数量
curl "https://skills-market-api.hnrayer.workers.dev/api/creators?limit=3"
```

**Creator 对象字段：**

```json
{
  "id": "creator-1",
  "slug": "anthropic",
  "name": "Anthropic",
  "handle": "anthropics",
  "bio": "...",
  "bio_zh": "...",
  "website": "https://www.anthropic.com",
  "github": "https://github.com/anthropics",
  "verified": true,
  "isOfficial": true,
  "totalSkills": 8,
  "totalStars": 128000,
  "totalDownloads": 816000,
  "joinedAt": "2025-01-12",
  "tags": ["official", "llm", "writing"]
}
```

---

### `GET /api/creators/:slug`

获取单个创作者详情，包含其所有 Repos 和 Skills。

**路径参数：**

| 参数   | 说明          |
|-------|---------------|
| `slug`| 创作者的唯一标识 |

```bash
curl "https://skills-market-api.hnrayer.workers.dev/api/creators/anthropic"
curl "https://skills-market-api.hnrayer.workers.dev/api/creators/cloudflare"
curl "https://skills-market-api.hnrayer.workers.dev/api/creators/vercel"
curl "https://skills-market-api.hnrayer.workers.dev/api/creators/openai"
curl "https://skills-market-api.hnrayer.workers.dev/api/creators/github"
curl "https://skills-market-api.hnrayer.workers.dev/api/creators/supabase"
```

**响应示例（成功）：**

```json
{
  "data": {
    "id": "creator-1",
    "slug": "anthropic",
    "name": "Anthropic",
    "repos": [ /* Repo 对象数组 */ ],
    "skills": [ /* Skill 对象数组 */ ]
  }
}
```

**响应示例（未找到）：**

```json
{ "error": "Not found" }
```
HTTP 状态码：`404`

---

## Search（搜索）

### `GET /api/search`

全局跨类型搜索，同时搜索 Skills、Repos、Creators。

**Query 参数：**

| 参数 | 类型   | 必填 | 说明     |
|-----|--------|------|----------|
| `q` | string | 是   | 搜索关键词 |

```bash
curl "https://skills-market-api.hnrayer.workers.dev/api/search?q=design"
curl "https://skills-market-api.hnrayer.workers.dev/api/search?q=cloudflare"
curl "https://skills-market-api.hnrayer.workers.dev/api/search?q=postgres"
```

**响应示例：**

```json
{
  "data": {
    "skills": [ /* 最多 10 条 Skill 对象 */ ],
    "repos":   [ /* 最多 6 条 Repo 对象 */ ],
    "creators":[ /* 最多 4 条 Creator 对象 */ ],
    "total": 15
  }
}
```

---

## Stats（统计）

### `GET /api/stats`

获取平台汇总统计数据。

```bash
curl "https://skills-market-api.hnrayer.workers.dev/api/stats"
```

**响应示例：**

```json
{
  "data": {
    "totalSkills": 42,
    "totalRepos": 12,
    "totalCreators": 6,
    "totalDownloads": 1502000
  }
}
```

---

## 通用响应格式

### 列表接口

```json
{
  "data": [ /* 对象数组 */ ],
  "total": 42,
  "page": 1,
  "limit": 20,
  "pages": 3
}
```

### 单对象接口

```json
{
  "data": { /* 单个对象 */ }
}
```

### 错误

```json
{ "error": "Not found" }
```

| HTTP 状态码 | 说明     |
|------------|----------|
| `200`      | 成功      |
| `404`      | 资源未找到 |

---

## 已知 Slug 列表

**Creators：** `anthropic` · `cloudflare` · `openai` · `vercel` · `github` · `supabase`

**Repos：** `anthropic-skills` · `anthropic-claude-code` · `cloudflare-skills` · `cloudflare-docs` · `openai-skills` · `vercel-agent-skills` · `vercel-next-skills` · `github-awesome-copilot` · `github-actions-skills` · `supabase-agent-skills` · `supabase-starter-skills` · `cloudflare-workerd`

**Skills（部分）：** `doc-coauthoring` · `canvas-design` · `theme-factory` · `pdf` · `frontend-design` · `skill-creator`
