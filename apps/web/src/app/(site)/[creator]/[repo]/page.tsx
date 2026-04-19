import RepoView from "./repo-view";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "https://skill-market-api.elesos.cc";

export const dynamicParams = false;

export async function generateStaticParams() {
  try {
    const res = await fetch(`${API_BASE}/api/repos`, { cache: "no-store" });
    const json = await res.json() as { data: { id: string; creator_id?: string; creatorId?: string }[] };
    const params = json.data.map((r) => ({ creator: r.creatorId ?? r.creator_id ?? "", repo: r.id }));
    return params.length > 0 ? params : [{ creator: "_", repo: "_" }];
  } catch {
    return [{ creator: "_", repo: "_" }];
  }
}

export default async function RepoPage({ params }: { params: Promise<{ creator: string; repo: string }> }) {
  const { creator, repo } = await params;
  return <RepoView creatorId={creator} repoId={repo} />;
}
