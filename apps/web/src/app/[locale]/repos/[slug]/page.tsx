import { getRepoBySlug, getSkillsByRepo, getCreatorBySlug, creators } from "@/lib/data";
import { SkillCard } from "@/components/skill-card";

export default async function RepoDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const repo = getRepoBySlug(slug);
  if (!repo) return <div className="mx-auto max-w-7xl px-6 py-20 text-white">Not found</div>;
  const skills = getSkillsByRepo(repo.id);
  const creator = creators.find((item) => item.id === repo.creatorId);
  return <div className="mx-auto max-w-7xl px-6 py-14">
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">repository</p>
          <h1 className="mt-3 text-4xl font-semibold text-white">{repo.name}</h1>
          <p className="mt-4 max-w-3xl text-white/70">{locale === "zh" ? repo.description_zh || repo.description : repo.description}</p>
        </div>
        <a href={`/${locale}/creators/${creator?.slug || ""}`} className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/80">{creator?.name || "Creator"}</a>
      </div>
      <div className="mt-6 flex flex-wrap gap-2">{repo.tags.map((tag)=><span key={tag} className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/60">{tag}</span>)}</div>
    </div>
    <h2 className="mt-12 text-2xl font-semibold text-white">Skills in this repository</h2>
    <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{skills.map((skill)=><SkillCard key={skill.id} skill={skill} locale={locale} />)}</div>
  </div>;
}
