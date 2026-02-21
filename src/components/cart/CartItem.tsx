"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import type { CartItem as CartItemType } from "@/types/cart";

export default function CartItem({ item }: { item: CartItemType }) {
  const { updateQuantity, removeItem } = useCart();

  return (
    <div className="flex gap-4 py-6 border-b border-zinc-200 dark:border-zinc-800">
      <Link
        href={`/product/${item.slug}`}
        className="relative h-24 w-24 flex-shrink-0 rounded-lg overflow-hidden bg-zinc-50 dark:bg-zinc-900"
      >
        {item.image && (
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover"
            sizes="96px"
          />
        )}
      </Link>

      <div className="flex flex-1 flex-col justify-between">
        <div className="flex justify-between">
          <Link
            href={`/product/${item.slug}`}
            className="font-semibold text-zinc-900 dark:text-white hover:underline"
          >
            {item.name}
          </Link>
          <span className="font-semibold text-zinc-900 dark:text-white">
            ${(Number(item.price) * item.quantity).toFixed(2)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="flex h-8 w-8 items-center justify-center rounded-md border border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              -
            </button>
            <span className="w-8 text-center text-sm font-medium text-zinc-900 dark:text-white">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="flex h-8 w-8 items-center justify-center rounded-md border border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              +
            </button>
          </div>

          <button
            onClick={() => removeItem(item.id)}
            className="text-sm text-zinc-500 hover:text-red-500 transition-colors"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
