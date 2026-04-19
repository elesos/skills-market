import type { Creator } from "@/types";

export function CreatorCard({ creator }: { creator: Creator }) {
  return (
    <a href={`/creators/${creator.slug}`} className="group rounded-3xl border border-white/10 bg-white/5 p-5 transition hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-white/7">
      <div className="mb-4 flex items-center justify-between">
        <div className="text-3xl">{creator.avatar}</div>
        <span className="rounded-full border border-white/10 px-2 py-1 text-[11px] uppercase tracking-[0.2em] text-cyan-300">official</span>
      </div>
      <h3 className="text-lg font-semibold text-white">{creator.name}</h3>
      <p className="mt-1 text-sm text-white/60">@{creator.handle}</p>
      <p className="mt-4 line-clamp-3 text-sm text-white/70">{creator.bio}</p>
      <div className="mt-5 grid grid-cols-3 gap-2 text-xs text-white/55">
        <div><div className="text-white">{creator.totalSkills}</div><div>Skills</div></div>
        <div><div className="text-white">{creator.tags.length}</div><div>Tags</div></div>
        <div><div className="text-white">{Math.round(creator.totalDownloads/1000)}k</div><div>Downloads</div></div>
      </div>
    </a>
  );
}
