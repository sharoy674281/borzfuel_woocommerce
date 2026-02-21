import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import api from "@/lib/woocommerce";
import { WooProduct } from "@/types/woocommerce";
import AddToCartButton from "@/components/product/AddToCartButton";

async function getProduct(slug: string): Promise<WooProduct | null> {
  const { data } = await api.get("products", { slug });
  return data[0] ?? null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return { title: "Product Not Found" };
  return {
    title: `${product.name} — BorzFuel Nutrition`,
    description: product.short_description.replace(/<[^>]+>/g, ""),
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return (
      <div className="flex items-center justify-center py-32">
        <p className="text-xl text-zinc-500">Product not found.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <Link
        href="/"
        className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-white mb-8 inline-block"
      >
        &larr; Back to shop
      </Link>

      <div className="grid md:grid-cols-2 gap-12 mt-4">
        <div className="relative aspect-square bg-zinc-50 dark:bg-zinc-900 rounded-xl overflow-hidden">
          {product.images[0] && (
            <Image
              src={product.images[0].src}
              alt={product.images[0].alt || product.name}
              fill
              className="object-cover"
              priority
            />
          )}
        </div>

        <div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
            {product.name}
          </h1>

          <div className="mt-4 flex items-center gap-3">
            {product.on_sale && product.regular_price && (
              <span className="text-xl text-zinc-400 line-through">
                ${product.regular_price}
              </span>
            )}
            <span className="text-3xl font-bold text-zinc-900 dark:text-white">
              ${product.price}
            </span>
          </div>

          <div
            className="mt-6 text-zinc-600 dark:text-zinc-400 prose dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />

          <div className="mt-8">
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}
