export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <div className="mx-auto max-w-5xl px-6 py-14">
    <h1 className="text-4xl font-semibold text-white">{locale === "zh" ? "关于项目" : "About the project"}</h1>
    <div className="mt-8 space-y-6 text-white/70">
      <p>{locale === "zh" ? "Skills Market 是一个参考官方技能目录产品结构打造的多页面站点，支持中英文切换、创作者浏览、仓库详情、技能详情与搜索。" : "Skills Market is a bilingual multi-page directory inspired by official skill ecosystems, with creators, repositories, skill detail pages, and search."}</p>
      <p>{locale === "zh" ? "前端为 Next.js，后端预留 Cloudflare Workers API，并为后续 D1 数据化扩展做好结构准备。" : "The frontend uses Next.js, while the backend is prepared for Cloudflare Workers with a future D1-backed catalog model."}</p>
      <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
        <div className="text-sm uppercase tracking-[0.3em] text-cyan-300">Stack</div>
        <ul className="mt-4 list-disc space-y-2 pl-5">
          <li>Next.js 15 + TypeScript + Tailwind CSS</li>
          <li>Cloudflare Workers API</li>
          <li>Cloudflare Pages deployment target</li>
          <li>D1-ready data layer</li>
        </ul>
      </div>
    </div>
  </div>;
}
