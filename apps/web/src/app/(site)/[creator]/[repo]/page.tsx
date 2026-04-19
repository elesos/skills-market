import RepoView from "./repo-view";

const REPO_PARAMS = [
  { creator: "c-1", repo: "r-1" },
  { creator: "c-1", repo: "r-2" },
  { creator: "c-2", repo: "r-3" },
  { creator: "c-2", repo: "r-4" },
  { creator: "c-2", repo: "r-5" },
  { creator: "c-3", repo: "r-6" },
  { creator: "c-4", repo: "r-7" },
  { creator: "c-4", repo: "r-8" },
  { creator: "c-5", repo: "r-9" },
  { creator: "c-5", repo: "r-10" },
  { creator: "c-6", repo: "r-11" },
  { creator: "c-6", repo: "r-12" },
];

export async function generateStaticParams() {
  return REPO_PARAMS;
}

export default async function RepoPage({ params }: { params: Promise<{ creator: string; repo: string }> }) {
  const { creator, repo } = await params;
  return <RepoView creatorId={creator} repoId={repo} />;
}
