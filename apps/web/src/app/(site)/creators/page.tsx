import { getAllCreators } from "@/lib/api";
import { CreatorCard } from "@/components/creator-card";

export default async function CreatorsPage() {
  const creators = await getAllCreators().catch(() => []);
  return (
    <div className="mx-auto max-w-7xl px-6 py-14">
      <h1 className="text-4xl font-semibold text-white">Creators</h1>
      <p className="mt-4 text-white/65">Browse organizations and authors behind the skill ecosystem.</p>
      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {creators.map((creator) => <CreatorCard key={creator.id} creator={creator} />)}
      </div>
    </div>
  );
}
