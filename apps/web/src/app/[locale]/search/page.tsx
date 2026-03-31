import { creators, repos, skills } from "@/lib/data";
import { CreatorCard } from "@/components/creator-card";
import { RepoCard } from "@/components/repo-card";
import { SkillCard } from "@/components/skill-card";

export default async function SearchPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <div className="mx-auto max-w-7xl px-6 py-14">
    <h1 className="text-4xl font-semibold text-white">{locale === "zh" ? "搜索" : "Search"}</h1>
    <p className="mt-4 max-w-2xl text-white/65">{locale === "zh" ? "当前为静态 Pages 版本，先提供完整目录浏览；下一步可接入 Worker 搜索 API 或客户端即时搜索。" : "This static Pages build ships with full directory browsing first; next step can wire live Worker search or client-side instant filtering."}</p>
    <div className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 text-sm text-white/65">
      <div className="text-xs uppercase tracking-[0.3em] text-cyan-300">Status</div>
      <p className="mt-3">{locale === "zh" ? "已支持完整多页面跳转。为了兼容 Cloudflare Pages 静态导出，搜索结果当前展示精选目录内容。" : "All multi-page navigation works. To stay compatible with static Cloudflare Pages export, this page currently showcases curated catalog content."}</p>
    </div>
    <div className="mt-12">
      <h2 className="text-xl font-semibold text-white">Creators</h2>
      <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{creators.slice(0,6).map((item)=> <CreatorCard key={item.id} creator={item} locale={locale} />)}</div>
      <h2 className="mt-12 text-xl font-semibold text-white">Repositories</h2>
      <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{repos.slice(0,6).map((item)=> <RepoCard key={item.id} repo={item} locale={locale} />)}</div>
      <h2 className="mt-12 text-xl font-semibold text-white">Skills</h2>
      <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{skills.slice(0,12).map((item)=> <SkillCard key={item.id} skill={item} locale={locale} />)}</div>
    </div>
  </div>;
}
