import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getBlogPost,
  getAllPostSlugs,
  stripHtml,
  getAuthorName,
  getFeaturedImage,
} from "@/lib/blog";

export const revalidate = 60;

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://borzfuelnutrition.com";

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return { title: "Ikke funnet" };

  const title = stripHtml(post.title.rendered);
  const description = stripHtml(post.excerpt.rendered).slice(0, 160);
  const image = getFeaturedImage(post);

  return {
    title,
    description,
    alternates: {
      canonical: `/blogg/${post.slug}`,
    },
    openGraph: {
      type: "article",
      title,
      description,
      url: `${siteUrl}/blogg/${post.slug}`,
      publishedTime: post.date,
      modifiedTime: post.modified,
      authors: [getAuthorName(post)],
      ...(image && { images: [{ url: image.url, alt: image.alt }] }),
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const title = stripHtml(post.title.rendered);
  const author = getAuthorName(post);
  const image = getFeaturedImage(post);

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: stripHtml(post.excerpt.rendered).slice(0, 160),
    datePublished: post.date,
    dateModified: post.modified,
    author: {
      "@type": "Person",
      name: author,
    },
    publisher: {
      "@id": `${siteUrl}/#organization`,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}/blogg/${post.slug}`,
    },
    ...(image && {
      image: {
        "@type": "ImageObject",
        url: image.url,
      },
    }),
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Hjem", item: siteUrl },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blogg",
        item: `${siteUrl}/blogg`,
      },
      { "@type": "ListItem", position: 3, name: title },
    ],
  };

  return (
    <div className="bg-white mx-auto max-w-7xl px-6 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <nav className="flex items-center gap-2 text-[11px] text-neutral-400 uppercase tracking-[0.1em] mb-12">
        <Link href="/" className="hover:text-black transition-colors">
          Hjem
        </Link>
        <span>/</span>
        <Link href="/blogg" className="hover:text-black transition-colors">
          Blogg
        </Link>
        <span>/</span>
        <span className="text-black line-clamp-1">{title}</span>
      </nav>

      <article className="max-w-3xl mx-auto">
        <header className="mb-10">
          <time className="text-[11px] text-neutral-400 uppercase tracking-wider">
            {new Date(post.date).toLocaleDateString("nb-NO", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          <h1 className="mt-3 text-2xl md:text-3xl font-bold text-black tracking-tight leading-tight">
            {title}
          </h1>
          <p className="mt-3 text-sm text-neutral-400">
            Av {author}
          </p>
        </header>

        {image && (
          <div className="relative aspect-[2/1] bg-neutral-100 overflow-hidden mb-10">
            <Image
              src={image.url}
              alt={image.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 700px"
              priority
            />
          </div>
        )}

        <div
          className="prose prose-neutral prose-sm max-w-none
            prose-headings:font-bold prose-headings:text-black prose-headings:uppercase prose-headings:tracking-tight
            prose-h2:text-lg prose-h2:mt-10 prose-h2:mb-4
            prose-h3:text-base prose-h3:mt-8 prose-h3:mb-3
            prose-p:text-neutral-600 prose-p:leading-relaxed
            prose-li:text-neutral-600
            prose-strong:text-black
            prose-a:text-black prose-a:underline
            prose-img:rounded-none"
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        />

        <div className="mt-16 pt-8 border-t border-neutral-200">
          <Link
            href="/blogg"
            className="text-[11px] font-medium text-black uppercase tracking-[0.2em] hover:text-neutral-600 transition-colors"
          >
            &larr; Alle artikler
          </Link>
        </div>
      </article>
    </div>
  );
}
