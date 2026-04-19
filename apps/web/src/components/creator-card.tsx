import type { Creator } from "@/types";

export function CreatorCard({ creator }: { creator: Creator }) {
  return (
    <a
      href={`/${creator.id}`}
      className="group flex items-start gap-4 rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-5 transition hover:border-cyan-400/40"
    >
      {creator.avatarUrl && (
        <img
          src={creator.avatarUrl}
          alt={creator.name}
          className="h-10 w-10 rounded-full object-cover opacity-80 group-hover:opacity-100"
        />
      )}
      <div className="min-w-0">
        <h3 className="truncate text-base font-semibold text-white">{creator.name}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-white/60">{creator.description}</p>
      </div>
    </a>
  );
}
