import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glow?: boolean;
  gradientBorder?: boolean;
}

export function Card({
  className,
  glow,
  gradientBorder,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "glass glass-hover rounded-xl p-5",
        gradientBorder && "gradient-border",
        glow && "shadow-[0_0_24px_rgba(0,255,136,0.12)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardTitle({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <h3 className={cn("text-lg font-semibold text-slate-100", className)}>
      {children}
    </h3>
  );
}

export function CardDescription({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <p className={cn("text-sm text-slate-400 leading-relaxed", className)}>
      {children}
    </p>
  );
}
