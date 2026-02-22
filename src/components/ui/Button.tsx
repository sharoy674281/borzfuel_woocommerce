import { cn } from "@/lib/utils";
import { type ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
}

export default function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center font-semibold uppercase tracking-wider transition-colors disabled:opacity-40 disabled:pointer-events-none cursor-pointer",
        variant === "primary" &&
          "bg-[#111] text-white hover:bg-[#333]",
        variant === "secondary" &&
          "border border-[#111] text-[#111] hover:bg-[#111] hover:text-white",
        variant === "ghost" &&
          "text-[#111] underline hover:opacity-60",
        size === "sm" && "px-4 py-2 text-xs",
        size === "md" && "px-6 py-2.5 text-xs",
        size === "lg" && "px-8 py-3.5 text-xs",
        className
      )}
      {...props}
    />
  );
}
