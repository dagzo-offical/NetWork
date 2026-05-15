"use client";

import { useEffect, useRef, useState } from "react";
import { Workflow } from "lucide-react";

let mermaidInitialized = false;

/**
 * Renders a Mermaid diagram client-side with the cyber dark theme.
 */
export function DiagramViewer({
  code,
  title,
  id,
}: {
  code: string;
  title?: string;
  id: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const mermaid = (await import("mermaid")).default;
        if (!mermaidInitialized) {
          mermaid.initialize({
            startOnLoad: false,
            theme: "dark",
            themeVariables: {
              background: "#0d0d1a",
              primaryColor: "#0d1f1a",
              primaryBorderColor: "#00ff88",
              primaryTextColor: "#e2e8f0",
              lineColor: "#0088ff",
              secondaryColor: "#1a0d1f",
              tertiaryColor: "#0d1620",
              fontFamily: "var(--font-geist-mono), monospace",
            },
          });
          mermaidInitialized = true;
        }
        const renderId = `mmd-${id}-${Math.random().toString(36).slice(2, 8)}`;
        const { svg } = await mermaid.render(renderId, code);
        if (!cancelled && ref.current) {
          ref.current.innerHTML = svg;
        }
      } catch {
        if (!cancelled) setError(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [code, id]);

  return (
    <figure className="glass rounded-xl p-5 my-4">
      {title && (
        <figcaption className="flex items-center gap-2 mb-3 text-sm text-slate-300">
          <Workflow className="h-4 w-4 text-neon-blue" />
          {title}
        </figcaption>
      )}
      {error ? (
        <pre className="code-block p-4 text-xs text-slate-400 overflow-x-auto">
          {code}
        </pre>
      ) : (
        <div ref={ref} className="flex justify-center overflow-x-auto" />
      )}
    </figure>
  );
}
