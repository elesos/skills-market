import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function localeHref(locale: string, path = "") {
  return `/${locale}${path.startsWith("/") ? path : `/${path}`}`.replace(/\/$/, "") || `/${locale}`;
}
