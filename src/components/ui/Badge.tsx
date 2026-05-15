import { cn } from "@/lib/utils";

type BadgeColor = "green" | "blue" | "red" | "purple" | "amber" | "slate";

const colorMap: Record<BadgeColor, string> = {
  green: "bg-neon-green/15 text-neon-green border-neon-green/40",
  blue: "bg-neon-blue/15 text-neon-blue border-neon-blue/40",
  red: "bg-neon-red/15 text-neon-red border-neon-red/40",
  purple: "bg-neon-purple/15 text-neon-purple border-neon-purple/40",
  amber: "bg-amber-400/15 text-amber-300 border-amber-400/40",
  slate: "bg-white/5 text-slate-300 border-white/15",
};

export function Badge({
  color = "green",
  className,
  children,
}: {
  color?: BadgeColor;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        colorMap[color],
        className
      )}
    >
      {children}
    </span>
  );
}

export function difficultyColor(
  difficulty: "Beginner" | "Intermediate" | "Advanced"
): BadgeColor {
  if (difficulty === "Beginner") return "green";
  if (difficulty === "Intermediate") return "blue";
  return "red";
}

export function severityColor(
  severity: "Low" | "Medium" | "High" | "Critical"
): BadgeColor {
  if (severity === "Low") return "slate";
  if (severity === "Medium") return "amber";
  if (severity === "High") return "red";
  return "purple";
}
