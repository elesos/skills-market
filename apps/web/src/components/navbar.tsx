import { LanguageSwitcher } from "@/components/language-switcher";

export function Navbar({ locale }: { locale: string }) {
  const items = [
    ["/", locale === "zh" ? "首页" : "Home"],
    ["/official", locale === "zh" ? "官方" : "Official"],
    ["/creators", locale === "zh" ? "创作者" : "Creators"],
    ["/search", locale === "zh" ? "搜索" : "Search"],
    ["/about", locale === "zh" ? "关于" : "About"],
  ];
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href={`/${locale}`} className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-400/20 text-cyan-300 shadow-[0_0_40px_rgba(34,211,238,.2)]">✦</span>
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">Skills Market</div>
            <div className="text-xs text-white/45">Official skills discovery</div>
          </div>
        </a>
        <nav className="hidden gap-5 md:flex">
          {items.map(([href, label]) => (
            <a key={href} href={`/${locale}${href === "/" ? "" : href}`} className="text-sm text-white/70 hover:text-white">{label}</a>
          ))}
        </nav>
        <LanguageSwitcher locale={locale} />
      </div>
    </header>
  );
}
