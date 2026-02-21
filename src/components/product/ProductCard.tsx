import Image from "next/image";
import Link from "next/link";
import type { WooProduct } from "@/types/woocommerce";

export default function ProductCard({ product }: { product: WooProduct }) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="group rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden hover:shadow-lg transition-all"
    >
      {product.images[0] && (
        <div className="relative aspect-square bg-zinc-50 dark:bg-zinc-900">
          <Image
            src={product.images[0].src}
            alt={product.images[0].alt || product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
          />
        </div>
      )}
      <div className="p-4">
        <h3 className="font-semibold text-zinc-900 dark:text-white line-clamp-2">
          {product.name}
        </h3>
        <div className="mt-2 flex items-center gap-2">
          {product.on_sale && product.regular_price && (
            <span className="text-sm text-zinc-400 line-through">
              ${product.regular_price}
            </span>
          )}
          <span className="text-lg font-bold text-zinc-900 dark:text-white">
            ${product.price}
          </span>
        </div>
      </div>
    </Link>
  );
}
