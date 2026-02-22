import { cn } from "@/lib/utils";
import { type InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export default function Input({
  label,
  error,
  className,
  id,
  ...props
}: InputProps) {
  const inputId = id || label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={inputId}
        className="text-xs font-medium text-black uppercase tracking-wider"
      >
        {label}
      </label>
      <input
        id={inputId}
        className={cn(
          "border border-neutral-300 bg-white px-3 py-2.5 text-sm text-black placeholder:text-neutral-400 focus:outline-none focus:border-black transition-colors",
          error && "border-red-500 focus:border-red-500",
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
