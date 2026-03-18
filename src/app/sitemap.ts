import type { MetadataRoute } from "next";
import api from "@/lib/woocommerce";
import type { WooProduct } from "@/types/woocommerce";
import { getBlogPosts } from "@/lib/blog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://borzfuelnutrition.com";

  // Dynamic product pages
  let productPages: MetadataRoute.Sitemap = [];
  let latestProductDate = new Date("2026-02-01");

  try {
    const { data: products }: { data: (WooProduct & { date_modified?: string })[] } = await api.get(
      "products",
      { per_page: 100 }
    );

    productPages = products.map((product) => ({
      url: `${siteUrl}/product/${product.slug}`,
      lastModified: product.date_modified ? new Date(product.date_modified) : new Date(),
    }));

    // Find the most recent product modification for homepage/shop
    for (const p of products) {
      if (p.date_modified) {
        const d = new Date(p.date_modified);
        if (d > latestProductDate) latestProductDate = d;
      }
    }
  } catch {
    // fallback: no product pages
  }

  // Static pages with real last-modified dates
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: latestProductDate,
    },
    {
      url: `${siteUrl}/butikk`,
      lastModified: latestProductDate,
    },
    {
      url: `${siteUrl}/om-oss`,
      lastModified: new Date("2026-03-17"),
    },
    {
      url: `${siteUrl}/vilkar-personvern`,
      lastModified: new Date("2026-01-15"),
    },
    {
      url: `${siteUrl}/frakt-levering`,
      lastModified: new Date("2026-01-15"),
    },
    {
      url: `${siteUrl}/retur-reklamasjon`,
      lastModified: new Date("2026-01-15"),
    },
    {
      url: `${siteUrl}/kjopsvilkar`,
      lastModified: new Date("2026-01-15"),
    },
  ];

  // Blog pages from WordPress
  let blogPages: MetadataRoute.Sitemap = [];
  try {
    const posts = await getBlogPosts(100);
    if (posts.length > 0) {
      blogPages = [
        {
          url: `${siteUrl}/blogg`,
          lastModified: new Date(posts[0].modified),
        },
        ...posts.map((post) => ({
          url: `${siteUrl}/blogg/${post.slug}`,
          lastModified: new Date(post.modified),
        })),
      ];
    }
  } catch {
    // fallback: no blog pages
  }

  return [...staticPages, ...productPages, ...blogPages];
}
