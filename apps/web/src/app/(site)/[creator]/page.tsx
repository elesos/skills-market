import CreatorView from "./creator-view";

export const dynamicParams = false;

export async function generateStaticParams() {
  return [{ creator: "_" }];
}

export default async function CreatorPage({ params }: { params: Promise<{ creator: string }> }) {
  const { creator } = await params;
  return <CreatorView creatorId={creator} />;
}
