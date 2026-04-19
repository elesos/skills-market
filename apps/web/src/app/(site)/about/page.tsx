export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-14">
      <h1 className="text-4xl font-semibold text-white">About the project</h1>
      <div className="mt-8 space-y-6 text-white/70">
        <p>Skills Market is a multi-page directory inspired by official skill ecosystems, with creators, repositories, skill detail pages, and search.</p>
        <p>The frontend uses Next.js, deployed on Cloudflare Pages, backed by a Cloudflare Workers API and D1 database.</p>
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
          <div className="text-sm uppercase tracking-[0.3em] text-cyan-300">Stack</div>
          <ul className="mt-4 list-disc space-y-2 pl-5">
            <li>Next.js 15 + TypeScript + Tailwind CSS</li>
            <li>Cloudflare Workers API (Hono)</li>
            <li>Cloudflare D1 database</li>
            <li>Cloudflare Pages deployment</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
