import CreatorView from "./creator-view";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "https://skill-market-api.elesos.cc";

export async function generateStaticParams() {
  try {
    const res = await fetch(`${API_BASE}/api/creators`, { cache: "no-store" });
    const json = await res.json() as { data: { id: string }[] };
    return json.data.map((c) => ({ creator: c.id }));
  } catch {
    return [];
  }
}

export default async function CreatorPage({ params }: { params: Promise<{ creator: string }> }) {
  const { creator } = await params;
  return <CreatorView creatorId={creator} />;
}
