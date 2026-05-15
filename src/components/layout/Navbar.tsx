"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShieldCheck, LayoutDashboard, BookOpen, Award, Home } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home", icon: Home },
  { href: "/courses", label: "Courses", icon: BookOpen },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/certificate", label: "Certificate", icon: Award },
];

export function Navbar() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-40 border-b border-white/5 backdrop-blur-xl bg-bg-primary/70">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative">
            <ShieldCheck className="h-7 w-7 text-neon-green group-hover:drop-shadow-[0_0_8px_rgba(0,255,136,0.8)] transition-all" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-bold text-sm gradient-text">NetSec Academy</span>
            <span className="text-[10px] text-slate-500 tracking-widest uppercase">
              Network Security
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-1">
          {links.map(({ href, label, icon: Icon }) => {
            const active =
              href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm transition-all",
                  active
                    ? "text-neon-green bg-neon-green/10 border border-neon-green/30"
                    : "text-slate-400 hover:text-slate-100 hover:bg-white/5"
                )}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
