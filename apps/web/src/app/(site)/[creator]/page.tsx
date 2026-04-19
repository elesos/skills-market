import CreatorView from "./creator-view";

const CREATOR_IDS = ["c-1", "c-2", "c-3", "c-4", "c-5", "c-6"];

export async function generateStaticParams() {
  return CREATOR_IDS.map((creator) => ({ creator }));
}

export default async function CreatorPage({ params }: { params: Promise<{ creator: string }> }) {
  const { creator } = await params;
  return <CreatorView creatorId={creator} />;
}
