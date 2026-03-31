import type { Repo } from "@/types";

export function RepoCard({ repo, locale }: { repo: Repo; locale: string }) {
  return (
    <a href={`/${locale}/repos/${repo.slug}`} className="group rounded-3xl border border-white/10 bg-slate-900/80 p-5 transition hover:border-cyan-400/40 hover:bg-slate-900">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-lg font-semibold text-white">{repo.name}</h3>
        {repo.isFeatured && <span className="rounded-full bg-cyan-400/10 px-2 py-1 text-[11px] text-cyan-300">featured</span>}
      </div>
      <p className="mt-3 line-clamp-2 text-sm text-white/70">{locale === "zh" ? repo.description_zh || repo.description : repo.description}</p>
      <div className="mt-4 flex flex-wrap gap-2">{repo.tags.map((tag) => <span key={tag} className="rounded-full border border-white/10 px-2 py-1 text-xs text-white/55">{tag}</span>)}</div>
      <div className="mt-5 flex items-center justify-between text-xs text-white/55"><span>{repo.totalSkills} skills</span><span>{Math.round(repo.downloads/1000)}k downloads</span></div>
    </a>
  );
}
