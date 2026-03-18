import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { getBlogPosts, stripHtml, getAuthorName, getFeaturedImage } from "@/lib/blog";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Blogg — Kampsport og kosttilskudd",
  description:
    "Artikler om kreatin, leddstøtte, ernæring og kosttilskudd for kampsportutøvere. Skrevet av utøvere, for utøvere.",
  alternates: {
    canonical: "/blogg",
  },
};

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://borzfuelnutrition.com";

export default async function BloggPage() {
  const posts = await getBlogPosts();

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Hjem", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Blogg" },
    ],
  };

  const collectionLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Blogg",
    description:
      "Artikler om kreatin, leddstøtte, ernæring og kosttilskudd for kampsportutøvere.",
    url: `${siteUrl}/blogg`,
    isPartOf: { "@id": `${siteUrl}/#website` },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: posts.length,
      itemListElement: posts.map((post, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${siteUrl}/blogg/${post.slug}`,
        name: stripHtml(post.title.rendered),
      })),
    },
  };

  return (
    <div className="bg-white mx-auto max-w-7xl px-6 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionLd) }}
      />
      <nav className="flex items-center gap-2 text-[11px] text-neutral-400 uppercase tracking-[0.1em] mb-12">
        <Link href="/" className="hover:text-black transition-colors">
          Hjem
        </Link>
        <span>/</span>
        <span className="text-black">Blogg</span>
      </nav>

      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-[11px] text-neutral-400 uppercase tracking-[0.3em] mb-2">
            Kunnskap
          </p>
          <h1 className="text-2xl font-bold text-black uppercase tracking-tight">
            Blogg
          </h1>
          <p className="mt-4 text-sm text-neutral-500 leading-relaxed max-w-lg mx-auto">
            Artikler om kreatin, leddstøtte og ernæring for kampsportutøvere.
            Skrevet av utøvere som vet hva kroppen trenger.
          </p>
        </div>

        {posts.length === 0 ? (
          <p className="text-center text-neutral-400 text-sm py-20">
            Ingen artikler publisert ennå. Kom tilbake snart!
          </p>
        ) : (
          <div className="divide-y divide-neutral-200">
            {posts.map((post) => {
              const image = getFeaturedImage(post);
              return (
                <article key={post.id} className="py-8 first:pt-0">
                  <Link
                    href={`/blogg/${post.slug}`}
                    className="group block"
                  >
                    {image && (
                      <div className="relative aspect-[2/1] bg-neutral-100 overflow-hidden mb-4">
                        <Image
                          src={image.url}
                          alt={image.alt}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, 700px"
                        />
                      </div>
                    )}
                    <time className="text-[11px] text-neutral-400 uppercase tracking-wider">
                      {new Date(post.date).toLocaleDateString("nb-NO", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                    <h2 className="mt-2 text-lg font-bold text-black group-hover:text-neutral-600 transition-colors">
                      {stripHtml(post.title.rendered)}
                    </h2>
                    <div
                      className="mt-2 text-sm text-neutral-500 leading-relaxed line-clamp-3"
                      dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                    />
                    <p className="mt-3 text-[11px] text-neutral-400">
                      Av {getAuthorName(post)}
                    </p>
                  </Link>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
