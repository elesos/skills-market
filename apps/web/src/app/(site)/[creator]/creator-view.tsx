"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { getCreator } from "@/lib/api";
import { RepoCard } from "@/components/repo-card";
import { SkillCard } from "@/components/skill-card";
import type { Creator, Repo, Skill } from "@/types";

export default function CreatorView({ creatorId: _hint }: { creatorId: string }) {
  const pathname = usePathname();
  const creatorId = pathname.split("/").filter(Boolean)[0] || _hint;
  const [creator, setCreator] = useState<Creator | null>(null);
  const [repos, setRepos] = useState<Repo[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCreator(creatorId).then((res) => {
      if (res) {
        setCreator(res.creator);
        setRepos(res.repos);
        setSkills(res.skills);
      }
      setLoading(false);
    });
  }, [creatorId]);

  if (loading) return (
    <div className="mx-auto max-w-7xl px-6 py-14">
      <div className="h-16 w-64 animate-pulse rounded-2xl border border-white/10 bg-white/[0.03]" />
    </div>
  );

  if (!creator) return <div className="mx-auto max-w-7xl px-6 py-20 text-white/50">Not found.</div>;

  return (
    <div className="mx-auto max-w-7xl px-6 py-14">
      <a href="/" className="text-sm text-white/40 hover:text-white">← All Creators</a>

      <div className="mt-6 flex items-center gap-4">
        {creator.avatarUrl && (
          <img src={creator.avatarUrl} alt={creator.name} className="h-12 w-12 rounded-full" />
        )}
        <div>
          <h1 className="text-3xl font-semibold text-white">{creator.name}</h1>
          <p className="mt-1 text-white/55">{creator.description}</p>
        </div>
      </div>

      <div className="mt-10">
        {repos.length > 0 ? (
          <>
            <h2 className="mb-5 text-sm uppercase tracking-[0.3em] text-white/40">Repositories</h2>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {repos.map((r) => <RepoCard key={r.id} repo={r} />)}
            </div>
          </>
        ) : (
          <>
            <h2 className="mb-5 text-sm uppercase tracking-[0.3em] text-white/40">Skills</h2>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {skills.map((s) => <SkillCard key={s.id} skill={s} />)}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
