import { getAllCreators, getAllRepos, getAllSkills } from "@/lib/api";
import { CreatorCard } from "@/components/creator-card";
import { RepoCard } from "@/components/repo-card";
import { SkillCard } from "@/components/skill-card";

export default async function OfficialPage() {
  const [creators, repos, skills] = await Promise.all([
    getAllCreators().catch(() => [] as Awaited<ReturnType<typeof getAllCreators>>),
    getAllRepos().catch(() => [] as Awaited<ReturnType<typeof getAllRepos>>),
    getAllSkills({ limit: 50 }).catch(() => [] as Awaited<ReturnType<typeof getAllSkills>>),
  ]);

  return (
    <div className="mx-auto max-w-7xl px-6 py-14">
      <h1 className="text-4xl font-semibold text-white">Official skills</h1>
      <p className="mt-4 max-w-2xl text-white/65">A structured overview of official creators, repositories, and skills.</p>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {creators.map((creator) => <CreatorCard key={creator.id} creator={creator} />)}
      </div>
      <h2 className="mt-16 text-2xl font-semibold text-white">Repositories</h2>
      <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {repos.map((repo) => <RepoCard key={repo.id} repo={repo} />)}
      </div>
      <h2 className="mt-16 text-2xl font-semibold text-white">Skills</h2>
      <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {skills.slice(0, 12).map((skill) => <SkillCard key={skill.id} skill={skill} />)}
      </div>
    </div>
  );
}
