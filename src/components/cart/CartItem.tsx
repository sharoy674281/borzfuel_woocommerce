"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import type { CartItem as CartItemType } from "@/types/cart";

export default function CartItem({ item }: { item: CartItemType }) {
  const { updateQuantity, removeItem } = useCart();

  return (
    <div className="flex gap-5 py-6 border-b border-neutral-200">
      <Link
        href={`/product/${item.slug}`}
        className="relative h-20 w-20 flex-shrink-0 bg-neutral-50 overflow-hidden"
      >
        {item.image && (
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-contain p-2"
            sizes="80px"
          />
        )}
      </Link>

      <div className="flex flex-1 flex-col justify-between min-w-0">
        <div className="flex justify-between gap-4">
          <Link
            href={`/product/${item.slug}`}
            className="text-sm font-medium text-black hover:opacity-60 transition-opacity truncate"
          >
            {item.name}
          </Link>
          <span className="text-sm font-medium text-black whitespace-nowrap">
            {formatPrice(Number(item.price) * item.quantity)}
          </span>
        </div>

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-3">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="flex h-7 w-7 items-center justify-center border border-neutral-300 text-black text-sm hover:border-black transition-colors cursor-pointer bg-white"
            >
              &minus;
            </button>
            <span className="w-6 text-center text-sm text-black">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="flex h-7 w-7 items-center justify-center border border-neutral-300 text-black text-sm hover:border-black transition-colors cursor-pointer bg-white"
            >
              +
            </button>
          </div>

          <button
            onClick={() => removeItem(item.id)}
            className="text-xs text-neutral-400 underline hover:text-black cursor-pointer"
          >
            Fjern
          </button>
        </div>
      </div>
    </div>
  );
}
