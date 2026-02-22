import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import api from "@/lib/woocommerce";
import { WooProduct } from "@/types/woocommerce";
import { formatPrice } from "@/lib/utils";
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
  if (!product) return { title: "Produkt ikke funnet" };
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
      <div className="bg-white flex items-center justify-center py-32">
        <p className="text-lg text-neutral-500">Produktet ble ikke funnet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-6 pt-6">
        <nav className="flex items-center gap-2 text-[11px] text-neutral-400 uppercase tracking-[0.1em]">
          <Link href="/" className="hover:text-black transition-colors">Hjem</Link>
          <span>/</span>
          <Link href="/butikk" className="hover:text-black transition-colors">Butikk</Link>
          <span>/</span>
          <span className="text-black">{product.name}</span>
        </nav>
      </div>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Image */}
          <div className="relative aspect-square bg-neutral-50 overflow-hidden">
            {product.on_sale && (
              <span className="absolute top-4 left-4 z-10 px-3 py-1 bg-red-600 text-white text-[10px] font-medium uppercase tracking-wider">
                Salg
              </span>
            )}
            {product.images[0] && (
              <Image
                src={product.images[0].src}
                alt={product.images[0].alt || product.name}
                fill
                className="object-contain p-10"
                priority
              />
            )}
          </div>

          {/* Info */}
          <div className="py-4">
            <h1 className="text-2xl md:text-3xl font-bold text-black uppercase tracking-tight">
              {product.name}
            </h1>

            <div className="mt-4 flex items-center gap-3">
              {product.on_sale && product.regular_price && (
                <span className="text-lg text-neutral-300 line-through">
                  {formatPrice(product.regular_price)}
                </span>
              )}
              <span className="text-xl font-semibold text-black">
                {formatPrice(product.price)}
              </span>
            </div>

            {product.short_description && (
              <div
                className="mt-6 text-sm text-neutral-500 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: product.short_description }}
              />
            )}

            <div className="mt-8 max-w-xs">
              <AddToCartButton product={product} />
            </div>

            <div className="mt-10 space-y-3 text-[11px] text-neutral-400 uppercase tracking-[0.1em]">
              <div className="flex items-center gap-3">
                <span className="w-1 h-1 bg-black rounded-full" />
                Gratis frakt i hele Norge
              </div>
              <div className="flex items-center gap-3">
                <span className="w-1 h-1 bg-black rounded-full" />
                1-3 virkedager levering
              </div>
              <div className="flex items-center gap-3">
                <span className="w-1 h-1 bg-black rounded-full" />
                Norskprodusert &middot; GMP-sertifisert
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product description */}
      {product.description && (
        <section className="border-t border-neutral-200 bg-white">
          <div className="mx-auto max-w-7xl px-6 py-16">
            <h2 className="text-sm font-semibold text-black uppercase tracking-[0.15em] mb-8">
              Om produktet
            </h2>
            <div
              className="product-description max-w-3xl"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          </div>
        </section>
      )}
    </div>
  );
}
