const WP_API_URL =
  (process.env.NEXT_PUBLIC_WORDPRESS_URL || "https://checkout.borzfuelnutrition.com") +
  "/wp-json/wp/v2";

export interface WPPost {
  id: number;
  slug: string;
  date: string;
  modified: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  featured_media: number;
  _embedded?: {
    author?: { name: string }[];
    "wp:featuredmedia"?: { source_url: string; alt_text: string }[];
  };
}

export async function getBlogPosts(perPage = 20): Promise<WPPost[]> {
  const res = await fetch(
    `${WP_API_URL}/posts?per_page=${perPage}&_embed=author,wp:featuredmedia&orderby=date&order=desc`,
    { next: { revalidate: 60 } }
  );
  if (!res.ok) return [];
  return res.json();
}

export async function getBlogPost(slug: string): Promise<WPPost | null> {
  const res = await fetch(
    `${WP_API_URL}/posts?slug=${encodeURIComponent(slug)}&_embed=author,wp:featuredmedia`,
    { next: { revalidate: 60 } }
  );
  if (!res.ok) return null;
  const posts: WPPost[] = await res.json();
  return posts[0] ?? null;
}

export async function getAllPostSlugs(): Promise<string[]> {
  const res = await fetch(
    `${WP_API_URL}/posts?per_page=100&_fields=slug`,
    { next: { revalidate: 60 } }
  );
  if (!res.ok) return [];
  const posts: { slug: string }[] = await res.json();
  return posts.map((p) => p.slug);
}

// Helper to strip HTML tags for meta descriptions
export function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
}

// Get author name from embedded data
export function getAuthorName(post: WPPost): string {
  return post._embedded?.author?.[0]?.name || "BorzFuel";
}

// Get featured image from embedded data
export function getFeaturedImage(post: WPPost): { url: string; alt: string } | null {
  const media = post._embedded?.["wp:featuredmedia"]?.[0];
  if (!media) return null;
  return { url: media.source_url, alt: media.alt_text || stripHtml(post.title.rendered) };
}
