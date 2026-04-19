import { getSkillBySlug, getAllSkills, getAllRepos, getAllCreators } from "@/lib/api";
import { SkillCard } from "@/components/skill-card";

export async function generateStaticParams() {
  try {
    const skills = await getAllSkills({ limit: 200 });
    return skills.map((s) => ({ slug: s.slug }));
  } catch {
    return [];
  }
}

export default async function SkillDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const [skill, allRepos, allCreators, allSkills] = await Promise.all([
    getSkillBySlug(slug),
    getAllRepos(),
    getAllCreators(),
    getAllSkills({ limit: 50 }),
  ]);

  if (!skill) return <div className="mx-auto max-w-7xl px-6 py-20 text-white">Not found</div>;

  const repo = allRepos.find((item) => item.id === skill.repoId);
  const creator = allCreators.find((item) => item.id === skill.creatorId);
  const related = allSkills
    .filter((item) => item.id !== skill.id && (item.repoId === skill.repoId || item.category === skill.category))
    .slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-6 py-14">
      <div className="rounded-[2rem] border border-cyan-400/20 bg-gradient-to-b from-cyan-400/10 to-white/[0.03] p-8">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">skill</p>
            <h1 className="mt-3 text-4xl font-semibold text-white">{skill.name}</h1>
            <p className="mt-4 text-white/70">{skill.longDescription || skill.description}</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-black/20 p-5 text-sm text-white/70">
            <div>Creator: <a href={`/creators/${creator?.slug || ""}`} className="text-cyan-300">{creator?.name}</a></div>
            <div className="mt-2">Repo: <a href={`/repos/${repo?.slug || ""}`} className="text-cyan-300">{repo?.name}</a></div>
            <div className="mt-2">Version: {skill.version}</div>
            <div className="mt-2">Downloads: {skill.downloads}</div>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          {skill.tags.map((tag) => <span key={tag} className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/60">{tag}</span>)}
        </div>
        <div className="mt-8 rounded-3xl border border-white/10 bg-black/20 p-5">
          <div className="text-xs uppercase tracking-[0.3em] text-white/45">Install</div>
          <code className="mt-3 block overflow-x-auto text-sm text-cyan-300">{skill.installCommand}</code>
        </div>
      </div>
      <h2 className="mt-12 text-2xl font-semibold text-white">Related skills</h2>
      <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {related.map((item) => <SkillCard key={item.id} skill={item} />)}
      </div>
    </div>
  );
}
