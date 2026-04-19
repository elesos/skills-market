import type { Repo } from "@/types";

export function RepoCard({ repo }: { repo: Repo }) {
  return (
    <a
      href={`/${repo.creatorId}/${repo.id}`}
      className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-5 transition hover:border-cyan-400/40"
    >
      <h3 className="text-base font-semibold text-white">{repo.name}</h3>
      <p className="mt-2 line-clamp-2 text-sm text-white/60">{repo.description}</p>
    </a>
  );
}
