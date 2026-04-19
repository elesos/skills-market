import RepoView from "./repo-view";

export const dynamicParams = false;

export async function generateStaticParams() {
  return [{ creator: "_", repo: "_" }];
}

export default async function RepoPage({ params }: { params: Promise<{ creator: string; repo: string }> }) {
  const { creator, repo } = await params;
  return <RepoView creatorId={creator} repoId={repo} />;
}
