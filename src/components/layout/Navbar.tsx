"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShieldCheck } from "lucide-react";

const links = [
  { href: "/", label: "Bosh sahifa" },
  { href: "/courses", label: "Kurslar" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/certificate", label: "Sertifikat" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 40,
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        background: "rgba(10,10,15,0.85)",
      }}
    >
      <nav
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 24px",
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}>
          <ShieldCheck
            size={28}
            style={{ color: "#00ff88", filter: "drop-shadow(0 0 6px rgba(0,255,136,0.5))" }}
          />
          <div style={{ lineHeight: 1.2 }}>
            <div
              style={{
                fontWeight: 800,
                fontSize: "14px",
                background: "linear-gradient(135deg, #00ff88, #0088ff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              NetSec Academy
            </div>
            <div style={{ fontSize: "9px", color: "#64748b", letterSpacing: "2px", textTransform: "uppercase" }}>
              Tarmoq Xavfsizligi
            </div>
          </div>
        </Link>

        {/* Links */}
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          {links.map(({ href, label }) => {
            const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                style={{
                  textDecoration: "none",
                  padding: "8px 14px",
                  borderRadius: "8px",
                  fontSize: "13px",
                  fontWeight: active ? 600 : 400,
                  color: active ? "#00ff88" : "#94a3b8",
                  background: active ? "rgba(0,255,136,0.1)" : "transparent",
                  border: active ? "1px solid rgba(0,255,136,0.3)" : "1px solid transparent",
                  transition: "all 0.2s ease",
                }}
              >
                {label}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
