import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Skills Market Admin",
  description: "Admin panel for Skills Market",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#0d0d0d] text-white antialiased">{children}</body>
    </html>
  );
}
