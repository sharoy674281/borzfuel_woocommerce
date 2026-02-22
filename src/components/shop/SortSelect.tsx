"use client";

interface SortSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SortSelect({ value, onChange }: SortSelectProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="bg-white border border-neutral-300 text-black text-xs uppercase tracking-wider px-3 py-2 focus:outline-none focus:border-black cursor-pointer"
    >
      <option value="default">Sorter etter</option>
      <option value="price-asc">Pris: lav til høy</option>
      <option value="price-desc">Pris: høy til lav</option>
      <option value="on-sale">På salg</option>
    </select>
  );
}
