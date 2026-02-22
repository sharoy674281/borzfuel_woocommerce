import type { MetadataRoute } from "next";
import api from "@/lib/woocommerce";
import type { WooProduct } from "@/types/woocommerce";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://borzfuelnutrition.com";

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/butikk`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  // Dynamic product pages
  try {
    const { data: products }: { data: WooProduct[] } = await api.get(
      "products",
      { per_page: 100 }
    );

    const productPages: MetadataRoute.Sitemap = products.map((product) => ({
      url: `${siteUrl}/product/${product.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

    return [...staticPages, ...productPages];
  } catch {
    return staticPages;
  }
}
