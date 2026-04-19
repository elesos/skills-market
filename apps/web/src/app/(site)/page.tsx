import { getStats } from "@/lib/api";

export default async function HomePage() {
  const stats = await getStats().catch(() => ({ totalCreators: 0, totalRepos: 0, totalSkills: 0, totalDownloads: 0 }));

  return (
    <div>
      <section className="mx-auto max-w-7xl px-6 pb-10 pt-16">
        <div className="max-w-4xl">
          <div className="mb-5 inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-cyan-300">The official skills ecosystem</div>
          <h1 className="max-w-4xl text-5xl font-semibold leading-tight text-white md:text-7xl">Discover production-ready skills for real agents.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/65">A navigable, searchable catalog of creators, repositories, and skill details — built for developers and agent workflows.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="/official" className="rounded-full bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950">Explore official skills</a>
            <a href="/search" className="rounded-full border border-white/10 px-5 py-3 text-sm text-white/80">Search catalog</a>
          </div>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-4">
          {([
            ["Creators", stats.totalCreators],
            ["Repos", stats.totalRepos],
            ["Skills", stats.totalSkills],
            ["Downloads", `${Math.round(stats.totalDownloads / 1000)}k`],
          ] as [string, string | number][]).map(([label, value]) => (
            <div key={String(label)} className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
              <div className="text-sm text-white/50">{label}</div>
              <div className="mt-2 text-3xl font-semibold text-white">{value}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
