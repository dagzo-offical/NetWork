"use client";

import { cva, type VariantProps } from "class-variance-authority";
import Link from "next/link";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-green/60",
  {
    variants: {
      variant: {
        primary:
          "bg-neon-green/15 text-neon-green border border-neon-green/40 hover:bg-neon-green/25 hover:shadow-[0_0_20px_rgba(0,255,136,0.35)]",
        secondary:
          "bg-neon-blue/15 text-neon-blue border border-neon-blue/40 hover:bg-neon-blue/25 hover:shadow-[0_0_20px_rgba(0,136,255,0.35)]",
        danger:
          "bg-neon-red/15 text-neon-red border border-neon-red/40 hover:bg-neon-red/25 hover:shadow-[0_0_20px_rgba(255,0,102,0.35)]",
        ghost:
          "bg-transparent text-slate-300 border border-white/10 hover:border-neon-green/40 hover:text-neon-green",
        solid:
          "bg-gradient-to-r from-neon-green to-neon-blue text-black font-semibold hover:shadow-[0_0_28px_rgba(0,255,136,0.5)]",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-10 px-4 text-sm",
        lg: "h-12 px-7 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & { href?: string };

export function Button({
  className,
  variant,
  size,
  href,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(buttonVariants({ variant, size }), className);
  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
