import { getAllCreators, getAllRepos, getAllSkills } from "@/lib/api";
import { CreatorCard } from "@/components/creator-card";
import { RepoCard } from "@/components/repo-card";
import { SkillCard } from "@/components/skill-card";

export default async function SearchPage() {
  const [creators, repos, skills] = await Promise.all([
    getAllCreators({ limit: 6 }).catch(() => [] as Awaited<ReturnType<typeof getAllCreators>>),
    getAllRepos({ limit: 6 }).catch(() => [] as Awaited<ReturnType<typeof getAllRepos>>),
    getAllSkills({ limit: 12 }).catch(() => [] as Awaited<ReturnType<typeof getAllSkills>>),
  ]);

  return (
    <div className="mx-auto max-w-7xl px-6 py-14">
      <h1 className="text-4xl font-semibold text-white">Search</h1>
      <p className="mt-4 max-w-2xl text-white/65">Browse the full catalog of creators, repositories, and skills.</p>
      <div className="mt-12">
        <h2 className="text-xl font-semibold text-white">Creators</h2>
        <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {creators.map((item) => <CreatorCard key={item.id} creator={item} />)}
        </div>
        <h2 className="mt-12 text-xl font-semibold text-white">Repositories</h2>
        <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {repos.map((item) => <RepoCard key={item.id} repo={item} />)}
        </div>
        <h2 className="mt-12 text-xl font-semibold text-white">Skills</h2>
        <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {skills.map((item) => <SkillCard key={item.id} skill={item} />)}
        </div>
      </div>
    </div>
  );
}
