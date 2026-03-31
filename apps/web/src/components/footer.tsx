export function Footer({ locale }: { locale: string }) {
  return (
    <footer className="border-t border-white/10 bg-slate-950">
      <div className="mx-auto max-w-7xl px-6 py-10 text-sm text-white/55">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p>{locale === "zh" ? "为高效浏览、清晰探索和双语发现而构建。" : "Built for fast exploration, clean browsing, and bilingual discovery."}</p>
          <div className="flex gap-4">
            <a href={`/${locale}/official`} className="hover:text-white">Official</a>
            <a href={`/${locale}/creators`} className="hover:text-white">Creators</a>
            <a href={`/${locale}/about`} className="hover:text-white">About</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
