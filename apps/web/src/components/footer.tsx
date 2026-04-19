export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950">
      <div className="mx-auto max-w-7xl px-6 py-10 text-sm text-white/55">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p>Built for fast exploration and clean browsing.</p>
          <div className="flex gap-4">
            <a href="/official" className="hover:text-white">Official</a>
            <a href="/creators" className="hover:text-white">Creators</a>
            <a href="/about" className="hover:text-white">About</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
