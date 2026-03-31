type Props = { locale: string; path?: string };
export function LanguageSwitcher({ locale, path = "" }: Props) {
  const next = locale === "en" ? "zh" : "en";
  const href = `/${next}${path}`.replace(/\/$/, "");
  return <a href={href || `/${next}`} className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-white/80 hover:border-cyan-400/50 hover:text-white">{next.toUpperCase()}</a>;
}
