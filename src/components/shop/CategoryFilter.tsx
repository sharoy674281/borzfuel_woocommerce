"use client";

import { cn } from "@/lib/utils";

const categories = [
  { name: "Alle", slug: "alle" },
  { name: "Styrke", slug: "styrke" },
  { name: "Utholdenhet", slug: "utholdenhet" },
  { name: "Restitusjon", slug: "restitusjon" },
  { name: "Ledd & Mobilitet", slug: "ledd-mobilitet" },
];

interface CategoryFilterProps {
  active: string;
  onChange: (slug: string) => void;
}

export default function CategoryFilter({ active, onChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => (
        <button
          key={cat.slug}
          onClick={() => onChange(cat.slug)}
          className={cn(
            "px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer",
            active === cat.slug
              ? "bg-black text-white"
              : "bg-white border border-neutral-300 text-neutral-500 hover:border-black hover:text-black"
          )}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}
