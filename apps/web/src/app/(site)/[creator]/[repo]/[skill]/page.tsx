import SkillView from "./skill-view";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "https://skill-market-api.elesos.cc";

export async function generateStaticParams() {
  try {
    const res = await fetch(`${API_BASE}/api/skills`, { cache: "no-store" });
    const json = await res.json() as { data: { id: string; creator_id?: string; creatorId?: string; repo_id?: string; repoId?: string }[] };
    return json.data.map((s) => ({
      creator: s.creatorId ?? s.creator_id ?? "",
      repo: s.repoId ?? s.repo_id ?? "",
      skill: s.id,
    }));
  } catch {
    return [];
  }
}

export default async function SkillPage({ params }: { params: Promise<{ creator: string; repo: string; skill: string }> }) {
  const { creator, repo, skill } = await params;
  return <SkillView creatorId={creator} repoId={repo} skillId={skill} />;
}
