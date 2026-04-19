import SkillView from "./skill-view";

export const dynamicParams = false;

export async function generateStaticParams() {
  return [{ creator: "_", repo: "_", skill: "_" }];
}

export default async function SkillPage({ params }: { params: Promise<{ creator: string; repo: string; skill: string }> }) {
  const { creator, repo, skill } = await params;
  return <SkillView creatorId={creator} repoId={repo} skillId={skill} />;
}
