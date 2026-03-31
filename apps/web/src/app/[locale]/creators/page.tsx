import { creators } from "@/lib/data";
import { CreatorCard } from "@/components/creator-card";

export default async function CreatorsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <div className="mx-auto max-w-7xl px-6 py-14">
    <h1 className="text-4xl font-semibold text-white">{locale === "zh" ? "创作者" : "Creators"}</h1>
    <p className="mt-4 text-white/65">{locale === "zh" ? "浏览技能生态中的官方组织与作者。" : "Browse organizations and authors behind the skill ecosystem."}</p>
    <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{creators.map((creator)=> <CreatorCard key={creator.id} creator={creator} locale={locale} />)}</div>
  </div>;
}
