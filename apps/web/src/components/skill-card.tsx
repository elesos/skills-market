import type { Skill } from "@/types";

export function SkillCard({ skill }: { skill: Skill }) {
  return (
    <a
      href={`/${skill.creatorId}/${skill.repoId}/${skill.id}`}
      className="flex flex-col rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-5 transition hover:border-cyan-400/40"
    >
      <p className="text-base font-semibold text-white font-mono">{skill.slug}</p>
      <p className="mt-2 line-clamp-2 text-sm text-white/60">{skill.description}</p>
      {skill.url && (
        <p className="mt-3 truncate text-xs text-cyan-400/70">{skill.url}</p>
      )}
    </a>
  );
}
