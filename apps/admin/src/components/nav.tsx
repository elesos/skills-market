"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { clearToken } from "@/lib/auth";
import { useRouter } from "next/navigation";

const tabs = [
  { label: "Creators", href: "/creators/" },
  { label: "Repos", href: "/repos/" },
  { label: "Skills", href: "/skills/" },
];

export default function Nav() {
  const pathname = usePathname();
  const router = useRouter();

  function handleLogout() {
    clearToken();
    router.push("/login/");
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[#0d0d0d]/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <div className="flex items-center gap-6">
          <span className="text-sm font-semibold text-white">Skills Market Admin</span>
          <div className="flex items-center gap-1">
            {tabs.map((tab) => (
              <Link
                key={tab.href}
                href={tab.href}
                className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
                  pathname.startsWith(tab.href.replace(/\/$/, ""))
                    ? "bg-white/10 text-white"
                    : "text-white/55 hover:text-white"
                }`}
              >
                {tab.label}
              </Link>
            ))}
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="text-sm text-white/55 hover:text-white transition-colors"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
