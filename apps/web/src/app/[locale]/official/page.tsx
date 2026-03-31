import { creators, repos, skills } from "@/lib/data";
import { CreatorCard } from "@/components/creator-card";
import { RepoCard } from "@/components/repo-card";
import { SkillCard } from "@/components/skill-card";

export default async function OfficialPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <div className="mx-auto max-w-7xl px-6 py-14">
    <h1 className="text-4xl font-semibold text-white">{locale === "zh" ? "官方技能" : "Official skills"}</h1>
    <p className="mt-4 max-w-2xl text-white/65">{locale === "zh" ? "聚合官方创作者、仓库与技能，模拟 skills.sh/official 的信息结构，但使用更现代的产品化呈现。" : "A structured overview of official creators, repositories, and skills, inspired by skills ecosystems with a more product-grade presentation."}</p>
    <div className="mt-10 grid gap-5 md:grid-cols-3">{creators.map((creator)=> <CreatorCard key={creator.id} creator={creator} locale={locale} />)}</div>
    <h2 className="mt-16 text-2xl font-semibold text-white">Repositories</h2>
    <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{repos.map((repo)=> <RepoCard key={repo.id} repo={repo} locale={locale} />)}</div>
    <h2 className="mt-16 text-2xl font-semibold text-white">Skills</h2>
    <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{skills.slice(0,12).map((skill)=> <SkillCard key={skill.id} skill={skill} locale={locale} />)}</div>
  </div>;
}
