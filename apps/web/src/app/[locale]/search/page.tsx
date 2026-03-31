import { searchAll, creators, repos, skills } from "@/lib/data";
import { CreatorCard } from "@/components/creator-card";
import { RepoCard } from "@/components/repo-card";
import { SkillCard } from "@/components/skill-card";

export default async function SearchPage({ params, searchParams }: { params: Promise<{ locale: string }>; searchParams: Promise<{ q?: string }> }) {
  const { locale } = await params;
  const { q = "" } = await searchParams;
  const results = q ? searchAll(q) : { creators, repos, skills: skills.slice(0, 12) };
  return <div className="mx-auto max-w-7xl px-6 py-14">
    <h1 className="text-4xl font-semibold text-white">{locale === "zh" ? "搜索" : "Search"}</h1>
    <form action={`/${locale}/search`} className="mt-6">
      <div className="flex max-w-2xl items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] p-2">
        <input name="q" defaultValue={q} placeholder={locale === "zh" ? "搜索技能、仓库、创作者" : "Search skills, repos, creators"} className="h-12 flex-1 bg-transparent px-4 text-white outline-none placeholder:text-white/35" />
        <button className="rounded-full bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950">{locale === "zh" ? "搜索" : "Search"}</button>
      </div>
    </form>
    <div className="mt-10">
      <h2 className="text-xl font-semibold text-white">Creators</h2>
      <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{results.creators.slice(0,6).map((item)=> <CreatorCard key={item.id} creator={item} locale={locale} />)}</div>
      <h2 className="mt-12 text-xl font-semibold text-white">Repositories</h2>
      <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{results.repos.slice(0,6).map((item)=> <RepoCard key={item.id} repo={item} locale={locale} />)}</div>
      <h2 className="mt-12 text-xl font-semibold text-white">Skills</h2>
      <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{results.skills.slice(0,12).map((item)=> <SkillCard key={item.id} skill={item} locale={locale} />)}</div>
    </div>
  </div>;
}
