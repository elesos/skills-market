"use client";

import { useState, useEffect } from "react";
import { getRepo } from "@/lib/api";
import { SkillCard } from "@/components/skill-card";
import type { Creator, Repo, Skill } from "@/types";

export default function RepoView({ creatorId, repoId }: { creatorId: string; repoId: string }) {
  const [creator, setCreator] = useState<Creator | null>(null);
  const [repo, setRepo] = useState<Repo | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRepo(repoId).then((res) => {
      if (res) { setCreator(res.creator); setRepo(res.repo); setSkills(res.skills); }
      setLoading(false);
    });
  }, [repoId]);

  if (loading) return (
    <div className="mx-auto max-w-7xl px-6 py-14">
      <div className="h-16 w-64 animate-pulse rounded-2xl border border-white/10 bg-white/[0.03]" />
    </div>
  );

  if (!repo) return <div className="mx-auto max-w-7xl px-6 py-20 text-white/50">Not found.</div>;

  return (
    <div className="mx-auto max-w-7xl px-6 py-14">
      <nav className="flex items-center gap-2 text-sm text-white/40">
        <a href="/" className="hover:text-white">All Creators</a>
        <span>/</span>
        <a href={`/${creatorId}`} className="hover:text-white">{creator?.name ?? creatorId}</a>
      </nav>

      <div className="mt-6">
        <h1 className="text-3xl font-semibold text-white">{repo.name}</h1>
        <p className="mt-2 text-white/55">{repo.description}</p>
      </div>

      <div className="mt-10">
        <h2 className="mb-5 text-sm uppercase tracking-[0.3em] text-white/40">Skills</h2>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {skills.map((s) => <SkillCard key={s.id} skill={s} />)}
        </div>
      </div>
    </div>
  );
}
