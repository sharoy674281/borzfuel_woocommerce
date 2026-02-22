"use client";

import { useState } from "react";

interface AccordionItem {
  title: string;
  content: React.ReactNode;
}

export default function ProductAccordion({ items }: { items: AccordionItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="border-t border-neutral-200 mt-8">
      {items.map((item, i) => (
        <div key={i} className="border-b border-neutral-200">
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full flex items-center justify-between py-4 text-left"
          >
            <span className="text-[11px] font-semibold text-black uppercase tracking-[0.15em]">
              {item.title}
            </span>
            <svg
              className={`w-4 h-4 text-neutral-400 transition-transform ${
                openIndex === i ? "rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {openIndex === i && (
            <div className="pb-4 text-sm text-neutral-500 leading-relaxed">
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
