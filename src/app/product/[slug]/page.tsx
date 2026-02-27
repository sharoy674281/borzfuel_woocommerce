import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import api from "@/lib/woocommerce";
import { WooProduct, WooReview } from "@/types/woocommerce";
import { formatPrice } from "@/lib/utils";
import AddToCartButton from "@/components/product/AddToCartButton";
import ProductAccordion from "@/components/product/ProductAccordion";
import PaymentIcons from "@/components/product/PaymentIcons";
import ProductTabs from "@/components/product/ProductTabs";
import ProductGallery from "@/components/product/ProductGallery";
import StarRatingLink from "@/components/product/StarRatingLink";
import PixelViewContent from "@/components/product/PixelViewContent";

export const revalidate = 60;

async function getProduct(slug: string): Promise<WooProduct | null> {
  const { data } = await api.get("products", { slug });
  return data[0] ?? null;
}

async function getProductReviews(productId: number): Promise<WooReview[]> {
  try {
    const { data } = await api.get("products/reviews", {
      product: productId,
      per_page: 20,
    });
    return data;
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return { title: "Produkt ikke funnet" };

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://borzfuelnutrition.com";
  const description = product.short_description.replace(/<[^>]+>/g, "").trim();

  return {
    title: product.name,
    description,
    openGraph: {
      type: "website",
      title: `${product.name} — Borzfuel Nutrition`,
      description,
      url: `${siteUrl}/product/${product.slug}`,
      images: product.images[0]
        ? [{ url: product.images[0].src, alt: product.name }]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} — Borzfuel Nutrition`,
      description,
      images: product.images[0] ? [product.images[0].src] : [],
    },
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

  const reviews = await getProductReviews(product.id);

  // Extract ingredients from meta_data
  const ingredientsMeta = product.meta_data?.find(
    (m) => m.key === "ingredienser" || m.key === "ingredients"
  );

  // Build accordion items
  const accordionItems: { title: string; content: React.ReactNode }[] = [];

  if (ingredientsMeta?.value) {
    accordionItems.push({
      title: "Ingredienser",
      content: <p>{ingredientsMeta.value}</p>,
    });
  }

  accordionItems.push({
    title: "Frakt",
    content: (
      <div className="space-y-2">
        <p>Pakke i postkassen: fra kr 49</p>
        <p>Pakke til hentested: kr 179</p>
        <p>Gratis frakt ved bestilling over kr 1 000</p>
        <p className="text-neutral-400 text-xs mt-2">
          Eksakt pris beregnes i kassen (Bring Fraktguiden)
        </p>
      </div>
    ),
  });

  accordionItems.push({
    title: "Betaling",
    content: <PaymentIcons />,
  });

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://borzfuelnutrition.com";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.short_description.replace(/<[^>]+>/g, "").trim(),
    image: product.images.map((img) => img.src),
    url: `${siteUrl}/product/${product.slug}`,
    brand: {
      "@type": "Brand",
      name: "Borzfuel Nutrition",
    },
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "NOK",
      availability:
        product.stock_status === "instock"
          ? "https://schema.org/InStock"
          : product.stock_status === "onbackorder"
            ? "https://schema.org/PreOrder"
            : "https://schema.org/OutOfStock",
      url: `${siteUrl}/product/${product.slug}`,
    },
    ...(product.rating_count > 0 && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: product.average_rating,
        reviewCount: product.rating_count,
      },
    }),
    ...(reviews.length > 0 && {
      review: reviews.map((r) => ({
        "@type": "Review",
        author: { "@type": "Person", name: r.reviewer },
        datePublished: r.date_created,
        reviewRating: {
          "@type": "Rating",
          ratingValue: r.rating,
        },
        reviewBody: r.review.replace(/<[^>]+>/g, "").trim(),
      })),
    }),
  };

  return (
    <div className="bg-white overflow-x-hidden">
      <PixelViewContent
        productName={product.name}
        productId={product.id}
        price={product.price}
        category={product.categories?.[0]?.name}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
          {/* Images */}
          <ProductGallery
            images={product.images}
            productName={product.name}
            onSale={product.on_sale}
          />

          {/* Info */}
          <div className="py-4">
            <h1 className="text-2xl md:text-3xl font-bold text-black uppercase tracking-tight">
              {product.name}
            </h1>

            {/* Star rating + review count */}
            {product.rating_count > 0 && (
              <StarRatingLink
                averageRating={product.average_rating}
                ratingCount={product.rating_count}
              />
            )}

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

            {/* Stock status */}
            <div className="mt-3">
              {product.stock_status === "instock" && (
                <span className="text-xs font-medium text-green-600">
                  På lager
                </span>
              )}
              {product.stock_status === "outofstock" && (
                <span className="text-xs font-medium text-red-600">
                  Ikke på lager
                </span>
              )}
              {product.stock_status === "onbackorder" && (
                <span className="text-xs font-medium text-amber-600">
                  Restordre
                </span>
              )}
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

            <ProductAccordion items={accordionItems} />
          </div>
        </div>
      </section>

      {/* Product tabs: Beskrivelse, Tilleggsinformasjon, Omtaler */}
      <ProductTabs product={product} reviews={reviews} />
    </div>
  );
}
