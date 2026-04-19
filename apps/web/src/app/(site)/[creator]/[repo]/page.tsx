import RepoView from "./repo-view";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "https://skill-market-api.elesos.cc";

export async function generateStaticParams() {
  try {
    const res = await fetch(`${API_BASE}/api/repos`, { cache: "no-store" });
    const json = await res.json() as { data: { id: string; creator_id?: string; creatorId?: string }[] };
    return json.data.map((r) => ({ creator: r.creatorId ?? r.creator_id ?? "", repo: r.id }));
  } catch {
    return [];
  }
}

export default async function RepoPage({ params }: { params: Promise<{ creator: string; repo: string }> }) {
  const { creator, repo } = await params;
  return <RepoView creatorId={creator} repoId={repo} />;
}
