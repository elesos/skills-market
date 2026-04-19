import SkillView from "./skill-view";

const SKILL_PARAMS = [
  { creator: "c-1", repo: "r-1", skill: "s-1" },
  { creator: "c-1", repo: "r-1", skill: "s-2" },
  { creator: "c-1", repo: "r-1", skill: "s-3" },
  { creator: "c-1", repo: "r-1", skill: "s-4" },
  { creator: "c-1", repo: "r-2", skill: "s-5" },
  { creator: "c-1", repo: "r-2", skill: "s-6" },
  { creator: "c-1", repo: "r-2", skill: "s-7" },
  { creator: "c-1", repo: "r-2", skill: "s-8" },
  { creator: "c-2", repo: "r-3", skill: "s-9" },
  { creator: "c-2", repo: "r-3", skill: "s-10" },
  { creator: "c-2", repo: "r-3", skill: "s-11" },
  { creator: "c-2", repo: "r-3", skill: "s-12" },
  { creator: "c-2", repo: "r-4", skill: "s-13" },
  { creator: "c-2", repo: "r-4", skill: "s-14" },
  { creator: "c-2", repo: "r-5", skill: "s-15" },
  { creator: "c-2", repo: "r-5", skill: "s-16" },
  { creator: "c-3", repo: "r-6", skill: "s-17" },
  { creator: "c-3", repo: "r-6", skill: "s-18" },
  { creator: "c-3", repo: "r-6", skill: "s-19" },
  { creator: "c-3", repo: "r-6", skill: "s-20" },
  { creator: "c-3", repo: "r-6", skill: "s-21" },
  { creator: "c-4", repo: "r-7", skill: "s-22" },
  { creator: "c-4", repo: "r-7", skill: "s-23" },
  { creator: "c-4", repo: "r-7", skill: "s-24" },
  { creator: "c-4", repo: "r-8", skill: "s-25" },
  { creator: "c-4", repo: "r-8", skill: "s-26" },
  { creator: "c-4", repo: "r-8", skill: "s-27" },
  { creator: "c-5", repo: "r-9", skill: "s-28" },
  { creator: "c-5", repo: "r-9", skill: "s-29" },
  { creator: "c-5", repo: "r-10", skill: "s-30" },
  { creator: "c-5", repo: "r-10", skill: "s-31" },
  { creator: "c-6", repo: "r-11", skill: "s-32" },
  { creator: "c-6", repo: "r-11", skill: "s-33" },
  { creator: "c-6", repo: "r-12", skill: "s-34" },
  { creator: "c-6", repo: "r-12", skill: "s-35" },
];

export async function generateStaticParams() {
  return SKILL_PARAMS;
}

export default async function SkillPage({ params }: { params: Promise<{ creator: string; repo: string; skill: string }> }) {
  const { creator, repo, skill } = await params;
  return <SkillView creatorId={creator} repoId={repo} skillId={skill} />;
}
