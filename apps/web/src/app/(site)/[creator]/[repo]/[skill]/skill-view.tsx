"use client";

import { useState, useEffect } from "react";
import { getSkill } from "@/lib/api";
import type { Skill } from "@/types";

export default function SkillView({ creatorId, repoId, skillId }: { creatorId: string; repoId: string; skillId: string }) {
  const [skill, setSkill] = useState<Skill | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSkill(skillId).then((s) => {
      setSkill(s);
      setLoading(false);
    });
  }, [skillId]);

  if (loading) return (
    <div className="mx-auto max-w-7xl px-6 py-14">
      <div className="h-64 animate-pulse rounded-[2rem] border border-white/10 bg-white/[0.03]" />
    </div>
  );

  if (!skill) return <div className="mx-auto max-w-7xl px-6 py-20 text-white/50">Not found.</div>;

  return (
    <div className="mx-auto max-w-7xl px-6 py-14">
      <nav className="flex items-center gap-2 text-sm text-white/40">
        <a href="/" className="hover:text-white">All Creators</a>
        <span>/</span>
        <a href={`/${creatorId}`} className="hover:text-white">{creatorId}</a>
        <span>/</span>
        <a href={`/${creatorId}/${repoId}`} className="hover:text-white">{repoId}</a>
      </nav>

      <div className="mt-6 rounded-[2rem] border border-cyan-400/20 bg-gradient-to-b from-cyan-400/10 to-white/[0.03] p-8">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">skill</p>
        <h1 className="mt-3 text-4xl font-semibold text-white font-mono">{skill.slug}</h1>
        <p className="mt-4 max-w-3xl text-white/70">{skill.description}</p>

        {skill.url && (
          <div className="mt-8">
            <a
              href={skill.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 px-5 py-2 text-sm text-cyan-300 hover:border-cyan-400/60 hover:text-cyan-200 transition"
            >
              View Source ↗
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
