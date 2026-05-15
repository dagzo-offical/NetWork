"use client";

import { useState } from "react";
import { Check, Copy, Terminal as TerminalIcon } from "lucide-react";

const KEYWORDS = [
  "iptables", "nmap", "ssh", "openssl", "nginx", "ip", "ping", "traceroute",
  "tshark", "systemctl", "ssh-keygen", "GET", "POST", "PUT", "DELETE",
  "server", "location", "listen", "proxy_pass", "VirtualHost", "Directory",
  "reverse_proxy", "encode", "header",
];

/** Lightweight token highlighter — no heavy syntax-highlighting dependency. */
function highlight(line: string): React.ReactNode {
  if (line.trim().startsWith("#") || line.trim().startsWith("//")) {
    return <span className="text-slate-500 italic">{line}</span>;
  }
  const parts = line.split(/(\s+)/);
  return parts.map((part, i) => {
    if (KEYWORDS.includes(part)) {
      return (
        <span key={i} className="text-neon-green font-semibold">
          {part}
        </span>
      );
    }
    if (/^-{1,2}[a-zA-Z]/.test(part)) {
      return (
        <span key={i} className="text-neon-blue">
          {part}
        </span>
      );
    }
    if (/^["'].*["']$/.test(part) || /^\d+$/.test(part)) {
      return (
        <span key={i} className="text-amber-300">
          {part}
        </span>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

export function CodeBlock({
  code,
  language,
  description,
}: {
  code: string;
  language: string;
  description?: string;
}) {
  const [copied, setCopied] = useState(false);
  const isShell = ["bash", "sh", "shell", "console", "text"].includes(
    language.toLowerCase()
  );

  const copy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };

  return (
    <div className="my-4">
      {description && (
        <p className="text-xs text-slate-400 mb-1.5">{description}</p>
      )}
      <div className="code-block overflow-hidden">
        <div className="flex items-center justify-between border-b border-neon-green/15 px-4 py-2">
          <span className="flex items-center gap-1.5 text-xs text-slate-400">
            <TerminalIcon className="h-3.5 w-3.5 text-neon-green" />
            {language}
          </span>
          <button
            onClick={copy}
            className="flex items-center gap-1 text-xs text-slate-500 hover:text-neon-green transition-colors"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5" /> Copied
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" /> Copy
              </>
            )}
          </button>
        </div>
        <pre className="overflow-x-auto p-4 text-sm leading-relaxed font-mono">
          {code.split("\n").map((line, i) => (
            <div key={i} className="flex">
              <span className="select-none w-8 shrink-0 text-slate-700 text-right pr-3">
                {i + 1}
              </span>
              <code className="text-slate-200">
                {isShell && line.trim() && !line.trim().startsWith("#") && (
                  <span className="text-neon-green mr-1.5">$</span>
                )}
                {highlight(line)}
              </code>
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
}
