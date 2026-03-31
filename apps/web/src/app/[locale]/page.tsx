import { creators, repos, skills, stats } from "@/lib/data";
import { CreatorCard } from "@/components/creator-card";
import { RepoCard } from "@/components/repo-card";
import { SkillCard } from "@/components/skill-card";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const featuredCreators = creators.slice(0, 3);
  const featuredRepos = repos.filter((item) => item.isFeatured).slice(0, 4);
  const featuredSkills = skills.filter((item) => item.isFeatured).slice(0, 6);
  return (
    <div>
      <section className="mx-auto max-w-7xl px-6 pb-10 pt-16">
        <div className="max-w-4xl">
          <div className="mb-5 inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-cyan-300">{locale === "zh" ? "官方技能生态" : "The official skills ecosystem"}</div>
          <h1 className="max-w-4xl text-5xl font-semibold leading-tight text-white md:text-7xl">{locale === "zh" ? "发现适用于真实智能体的生产级技能。" : "Discover production-ready skills for real agents."}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/65">{locale === "zh" ? "不是一页展示，而是一套可浏览、可搜索、可切换语言的完整技能目录站。" : "Not a single demo page, but a navigable, searchable, bilingual catalog of creators, repositories, and skill details."}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={`/${locale}/official`} className="rounded-full bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950">{locale === "zh" ? "浏览官方技能" : "Explore official skills"}</a>
            <a href={`/${locale}/search`} className="rounded-full border border-white/10 px-5 py-3 text-sm text-white/80">{locale === "zh" ? "搜索目录" : "Search catalog"}</a>
          </div>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-4">
          {[['Creators',stats.totalCreators],['Repos',stats.totalRepos],['Skills',stats.totalSkills],['Downloads',`${Math.round(stats.totalDownloads/1000)}k`]].map(([label,value]) => (
            <div key={String(label)} className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
              <div className="text-sm text-white/50">{label}</div>
              <div className="mt-2 text-3xl font-semibold text-white">{value}</div>
            </div>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-6 py-8"><div className="mb-5 flex items-end justify-between"><h2 className="text-2xl font-semibold text-white">{locale === "zh" ? "精选创作者" : "Featured creators"}</h2><a href={`/${locale}/creators`} className="text-sm text-cyan-300">{locale === "zh" ? "查看全部" : "View all"}</a></div><div className="grid gap-5 md:grid-cols-3">{featuredCreators.map((creator)=> <CreatorCard key={creator.id} creator={creator} locale={locale} />)}</div></section>
      <section className="mx-auto max-w-7xl px-6 py-8"><div className="mb-5 flex items-end justify-between"><h2 className="text-2xl font-semibold text-white">{locale === "zh" ? "精选仓库" : "Featured repositories"}</h2><a href={`/${locale}/official`} className="text-sm text-cyan-300">Official</a></div><div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">{featuredRepos.map((repo)=> <RepoCard key={repo.id} repo={repo} locale={locale} />)}</div></section>
      <section className="mx-auto max-w-7xl px-6 py-8 pb-20"><div className="mb-5 flex items-end justify-between"><h2 className="text-2xl font-semibold text-white">{locale === "zh" ? "精选技能" : "Featured skills"}</h2><a href={`/${locale}/search`} className="text-sm text-cyan-300">Search</a></div><div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{featuredSkills.map((skill)=> <SkillCard key={skill.id} skill={skill} locale={locale} />)}</div></section>
    </div>
  );
}
