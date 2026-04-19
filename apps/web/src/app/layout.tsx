import "@/app/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Skills Market",
  description: "Official skills directory for agents and developers.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
