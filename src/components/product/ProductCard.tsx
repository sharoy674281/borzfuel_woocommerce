import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import type { WooProduct } from "@/types/woocommerce";

export default function ProductCard({ product }: { product: WooProduct }) {
  return (
    <Link href={`/product/${product.slug}`} className="group bg-white">
      <div className="relative aspect-[4/5] bg-neutral-50 overflow-hidden mb-4">
        {product.on_sale && (
          <span className="absolute top-3 left-3 z-10 px-2.5 py-1 bg-red-600 text-white text-[10px] font-medium uppercase tracking-wider">
            Salg
          </span>
        )}
        {product.images[0] && (
          <Image
            src={product.images[0].src}
            alt={product.images[0].alt || product.name}
            fill
            className="object-contain p-10 group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
          />
        )}
      </div>
      <h3 className="text-sm text-black">
        {product.name}
      </h3>
      <div className="mt-1 flex items-center gap-2">
        {product.on_sale && product.regular_price && (
          <span className="text-xs text-neutral-300 line-through">
            {formatPrice(product.regular_price)}
          </span>
        )}
        <span className="text-sm text-black">
          {formatPrice(product.price)}
        </span>
      </div>
    </Link>
  );
}
