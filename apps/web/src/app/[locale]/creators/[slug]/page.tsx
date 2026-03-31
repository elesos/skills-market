import { creators, getCreatorBySlug, getReposByCreator, getSkillsByCreator } from "@/lib/data";
import { RepoCard } from "@/components/repo-card";
import { SkillCard } from "@/components/skill-card";

export function generateStaticParams() {
  return ["en", "zh"].flatMap((locale) => creators.map((creator) => ({ locale, slug: creator.slug })));
}

export default async function CreatorDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const creator = getCreatorBySlug(slug);
  if (!creator) return <div className="mx-auto max-w-7xl px-6 py-20 text-white">Not found</div>;
  const repos = getReposByCreator(creator.id);
  const skills = getSkillsByCreator(creator.id);
  return <div className="mx-auto max-w-7xl px-6 py-14">
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8">
      <div className="text-5xl">{creator.avatar}</div>
      <h1 className="mt-4 text-4xl font-semibold text-white">{creator.name}</h1>
      <p className="mt-2 text-white/55">@{creator.handle}</p>
      <p className="mt-5 max-w-3xl text-white/70">{locale === "zh" ? creator.bio_zh || creator.bio : creator.bio}</p>
      <div className="mt-6 flex flex-wrap gap-2">{creator.tags.map((tag)=><span key={tag} className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/60">{tag}</span>)}</div>
    </div>
    <h2 className="mt-12 text-2xl font-semibold text-white">Repositories</h2>
    <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{repos.map((repo)=><RepoCard key={repo.id} repo={repo} locale={locale} />)}</div>
    <h2 className="mt-12 text-2xl font-semibold text-white">Skills</h2>
    <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{skills.map((skill)=><SkillCard key={skill.id} skill={skill} locale={locale} />)}</div>
  </div>;
}
