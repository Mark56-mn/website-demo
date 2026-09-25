import type { SVGProps } from "react";

const base = (props: SVGProps<SVGSVGElement>) => ({
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  ...props,
});

export const ArrowRight = (p: SVGProps<SVGSVGElement>) => <svg {...base(p)}><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
export const ArrowUpRight = (p: SVGProps<SVGSVGElement>) => <svg {...base(p)}><path d="M7 17 17 7M7 7h10v10" /></svg>;
export const Check = (p: SVGProps<SVGSVGElement>) => <svg {...base(p)}><path d="m5 12 4 4L19 6" /></svg>;
export const Menu = (p: SVGProps<SVGSVGElement>) => <svg {...base(p)}><path d="M4 7h16M4 12h16M4 17h16" /></svg>;
export const X = (p: SVGProps<SVGSVGElement>) => <svg {...base(p)}><path d="m6 6 12 12M18 6 6 18" /></svg>;
export const ChevronDown = (p: SVGProps<SVGSVGElement>) => <svg {...base(p)}><path d="m6 9 6 6 6-6" /></svg>;
export const LogOut = (p: SVGProps<SVGSVGElement>) => <svg {...base(p)}><path d="M10 17l5-5-5-5M15 12H3M21 3v18" /></svg>;
export const RefreshCw = (p: SVGProps<SVGSVGElement>) => <svg {...base(p)}><path d="M20 11a8.1 8.1 0 0 0-14.8-3L3 11m0 0V5m0 6h6M4 13a8.1 8.1 0 0 0 14.8 3L21 13m0 0v6m0-6h-6" /></svg>;
export const Sparkles = (p: SVGProps<SVGSVGElement>) => <svg {...base(p)}><path d="m12 3 1.2 3.8L17 8l-3.8 1.2L12 13l-1.2-3.8L7 8l3.8-1.2L12 3ZM5 14l.9 2.1L8 17l-2.1.9L5 20l-.9-2.1L2 17l2.1-.9L5 14ZM19 13l.7 1.3L21 15l-1.3.7L19 17l-.7-1.3L17 15l1.3-.7L19 13Z" /></svg>;
export const Phone = (p: SVGProps<SVGSVGElement>) => <svg {...base(p)}><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.8a2 2 0 0 1-.4 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" /></svg>;
export const Mail = (p: SVGProps<SVGSVGElement>) => <svg {...base(p)}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6" /></svg>;
export const MapPin = (p: SVGProps<SVGSVGElement>) => <svg {...base(p)}><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5" /></svg>;
export const Clock = (p: SVGProps<SVGSVGElement>) => <svg {...base(p)}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2" /></svg>;
export const Shield = (p: SVGProps<SVGSVGElement>) => <svg {...base(p)}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4" /></svg>;
export const Star = (p: SVGProps<SVGSVGElement>) => <svg {...base(p)}><path d="m12 2 3 6 6.5 1-4.7 4.6 1.1 6.4-5.9-3-5.9 3 1.1-6.4L2.5 9 9 8l3-6Z" /></svg>;
export const Instagram = (p: SVGProps<SVGSVGElement>) => <svg {...base(p)}><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01" /></svg>;
export const Facebook = (p: SVGProps<SVGSVGElement>) => <svg {...base(p)}><path d="M14 8h3V4h-3c-3 0-5 2-5 5v3H6v4h3v6h4v-6h3l1-4h-4V9c0-.7.3-1 1-1Z" /></svg>;
