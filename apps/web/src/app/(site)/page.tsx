"use client";

import { useState, useEffect } from "react";
import { getCreators } from "@/lib/api";
import { CreatorCard } from "@/components/creator-card";
import type { Creator } from "@/types";

export default function HomePage() {
  const [creators, setCreators] = useState<Creator[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCreators()
      .then(setCreators)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-6 py-14">
      <div className="mb-10">
        <h1 className="text-4xl font-semibold text-white">Skills Market</h1>
        <p className="mt-3 text-white/55">Browse skills by official creator</p>
      </div>

      {loading ? (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-24 animate-pulse rounded-3xl border border-white/10 bg-white/[0.03]" />
          ))}
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {creators.map((c) => (
            <CreatorCard key={c.id} creator={c} />
          ))}
        </div>
      )}
    </div>
  );
}
