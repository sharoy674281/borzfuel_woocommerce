import api from "@/lib/woocommerce";
import { WooProduct } from "@/types/woocommerce";
import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import Hero from "@/components/home/Hero";
import USPs from "@/components/home/USPs";
import ImageBanner from "@/components/home/ImageBanner";
import BrandStory from "@/components/home/BrandStory";
import Testimonials from "@/components/home/Testimonials";
import FAQ from "@/components/home/FAQ";
import Newsletter from "@/components/home/Newsletter";
import SocialGallery from "@/components/home/SocialGallery";

export const revalidate = 60;

async function getProducts(): Promise<WooProduct[]> {
  const { data } = await api.get("products", { per_page: 20 });
  return data;
}

export default async function Home() {
  const products = await getProducts();

  return (
    <div className="bg-white">
      <Hero />
      <USPs />

      {/* Featured products — big side-by-side cards */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-14">
            <p className="text-[11px] text-neutral-400 uppercase tracking-[0.3em] mb-2">
              Produkter
            </p>
            <h2 className="text-2xl font-bold text-black uppercase tracking-tight">
              Vårt utvalg
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.slug}`}
                className="group bg-white"
              >
                {/* Large product image */}
                <div className="relative aspect-[4/5] bg-neutral-50 overflow-hidden mb-5">
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
                      className="object-contain p-12 group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  )}
                </div>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-base font-medium text-black">
                      {product.name}
                    </h3>
                    {product.short_description && (
                      <p className="mt-1 text-xs text-neutral-400 line-clamp-1">
                        {product.short_description.replace(/<[^>]+>/g, "")}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {product.on_sale && product.regular_price && (
                      <span className="text-sm text-neutral-300 line-through">
                        {formatPrice(product.regular_price)}
                      </span>
                    )}
                    <span className="text-base font-medium text-black">
                      {formatPrice(product.price)}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-14 text-center">
            <Link
              href="/butikk"
              className="inline-block px-10 py-3 border border-black text-black text-[11px] font-medium uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-colors duration-300"
            >
              Se alle produkter
            </Link>
          </div>
        </div>
      </section>

      <ImageBanner />
      <BrandStory />
      <Testimonials />

      <div className="bg-white">
        <FAQ />
      </div>

      <Newsletter />
      <SocialGallery />
    </div>
  );
}
