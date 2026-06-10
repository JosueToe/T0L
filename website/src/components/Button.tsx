import Link from "next/link";
import { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

interface ButtonProps {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-bg hover:brightness-110 cut-corner font-semibold tracking-wide",
  secondary:
    "border border-white/20 bg-transparent text-text hover:border-accent/60 hover:text-accent cut-corner",
  ghost: "text-text/80 hover:text-accent underline-reveal",
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
}: ButtonProps) {
  return (
    <Link
      href={href}
      data-cursor="link"
      className={`inline-flex items-center justify-center px-6 py-3 text-sm transition ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
