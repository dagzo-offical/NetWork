import {
  Network,
  Globe,
  Server,
  HardDrive,
  Boxes,
  ShieldAlert,
  Crosshair,
  Footprints,
  Flame,
  Star,
  Trophy,
  Crown,
  Award,
  BookOpen,
  type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  Network,
  Globe,
  Server,
  HardDrive,
  Boxes,
  ShieldAlert,
  Crosshair,
  Footprints,
  Flame,
  Star,
  Trophy,
  Crown,
  Award,
  BookOpen,
};

export function Icon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Cmp = ICONS[name] ?? BookOpen;
  return <Cmp className={className} />;
}
