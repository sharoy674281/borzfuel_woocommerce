"use client";

import { useState } from "react";
import Image from "next/image";
import type { WooImage } from "@/types/woocommerce";

export default function ProductGallery({
  images,
  productName,
  onSale,
}: {
  images: WooImage[];
  productName: string;
  onSale: boolean;
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images.length) return null;

  return (
    <div>
      {/* Main image */}
      <div className="relative aspect-square bg-neutral-50 overflow-hidden">
        {onSale && (
          <span className="absolute top-4 left-4 z-10 px-3 py-1 bg-red-600 text-white text-[10px] font-medium uppercase tracking-wider">
            Salg
          </span>
        )}
        <Image
          src={images[activeIndex].src}
          alt={images[activeIndex].alt || productName}
          fill
          className="object-contain p-10"
          priority
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-3 mt-4">
          {images.map((img, i) => (
            <button
              key={img.id}
              onClick={() => setActiveIndex(i)}
              className={`relative w-20 h-20 bg-neutral-50 overflow-hidden cursor-pointer border-2 transition-colors ${
                activeIndex === i
                  ? "border-black"
                  : "border-transparent hover:border-neutral-300"
              }`}
            >
              <Image
                src={img.src}
                alt={img.alt || productName}
                fill
                className="object-contain p-2"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
