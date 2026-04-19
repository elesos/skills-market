"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { getRepo, getSkill } from "@/lib/api";
import { SkillCard } from "@/components/skill-card";
import type { Creator, Repo, Skill } from "@/types";

export default function RepoView({ creatorId: _hintC, repoId: _hintR }: { creatorId: string; repoId: string }) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const creatorId = segments[0] || _hintC;
  const secondId = segments[1] || _hintR;
  const [creator, setCreator] = useState<Creator | null>(null);
  const [repo, setRepo] = useState<Repo | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [skill, setSkill] = useState<Skill | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRepo(secondId).then(async (res) => {
      if (res) {
        setCreator(res.creator);
        setRepo(res.repo);
        setSkills(res.skills);
      } else {
        // second segment is a skill ID (skill with no repo)
        const s = await getSkill(secondId);
        setSkill(s);
      }
      setLoading(false);
    });
  }, [secondId]);

  if (loading) return (
    <div className="mx-auto max-w-7xl px-6 py-14">
      <div className="h-16 w-64 animate-pulse rounded-2xl border border-white/10 bg-white/[0.03]" />
    </div>
  );

  // Render skill detail when second segment resolves to a skill
  if (skill) return (
    <div className="mx-auto max-w-7xl px-6 py-14">
      <nav className="flex items-center gap-2 text-sm text-white/40">
        <a href="/" className="hover:text-white">All Creators</a>
        <span>/</span>
        <a href={`/${creatorId}`} className="hover:text-white">{creatorId}</a>
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
              View Source
            </a>
          </div>
        )}
      </div>
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
        {repo.repoUrl && (
          <a
            href={repo.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 px-5 py-2 text-sm text-cyan-300 hover:border-cyan-400/60 hover:text-cyan-200 transition"
          >
            View Source
          </a>
        )}
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
