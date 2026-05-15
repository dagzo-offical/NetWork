import Link from "next/link";
import { ShieldCheck, Code2, Terminal } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/5 bg-bg-primary/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-2 mb-3">
              <ShieldCheck className="h-6 w-6 text-neon-green" />
              <span className="font-bold gradient-text">NetSec Academy</span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed">
              A premium, hands-on platform for mastering network security,
              infrastructure and penetration testing — from packets to PKI.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 text-sm">
            <div className="flex flex-col gap-2">
              <span className="text-slate-300 font-medium mb-1">Learn</span>
              <Link href="/courses" className="text-slate-500 hover:text-neon-green">
                All Courses
              </Link>
              <Link href="/dashboard" className="text-slate-500 hover:text-neon-green">
                Dashboard
              </Link>
              <Link href="/certificate" className="text-slate-500 hover:text-neon-green">
                Certificate
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-slate-300 font-medium mb-1">Connect</span>
              <span className="flex items-center gap-1.5 text-slate-500">
                <Code2 className="h-4 w-4" /> Open Source
              </span>
              <span className="flex items-center gap-1.5 text-slate-500">
                <Terminal className="h-4 w-4" /> Built for hackers
              </span>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-white/5 pt-6 text-xs text-slate-600">
          © {new Date().getFullYear()} NetSec Academy. For educational use only.
          Always test only systems you are authorised to assess.
        </div>
      </div>
    </footer>
  );
}
