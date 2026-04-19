import type { Skill } from "@/types";

export function SkillCard({ skill }: { skill: Skill }) {
  return (
    <a href={`/skills/${skill.slug}`} className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/6 to-white/[0.03] p-5 transition hover:border-cyan-400/40">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-white">{skill.name}</h3>
          <p className="mt-3 line-clamp-2 text-sm text-white/70">{skill.description}</p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">{skill.tags.map((tag) => <span key={tag} className="rounded-full border border-white/10 px-2 py-1 text-xs text-white/55">{tag}</span>)}</div>
      <div className="mt-5 flex items-center justify-between text-xs text-white/50"><span>{skill.category}</span><span>{Math.round(skill.downloads/1000)}k</span></div>
    </a>
  );
}
