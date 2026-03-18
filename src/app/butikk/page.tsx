import { Suspense } from "react";
import type { Metadata } from "next";
import api from "@/lib/woocommerce";
import { WooProduct } from "@/types/woocommerce";
import ShopClient from "./ShopClient";

export const revalidate = 60;

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://borzfuelnutrition.com";

export const metadata: Metadata = {
  title: "Butikk — Kosttilskudd for kampsportutøvere",
  description:
    "Utforsk vårt utvalg av kosttilskudd utviklet for kampsportutøvere. Kreatin-tyggetabletter, leddstøtte og mer. GMP-sertifisert. Rask levering i Norge.",
  alternates: {
    canonical: "/butikk",
  },
  openGraph: {
    url: "/butikk",
  },
};

async function getProducts(): Promise<WooProduct[]> {
  const { data } = await api.get("products", { per_page: 100 });
  return data;
}

export default async function ButikkPage() {
  const products = await getProducts();

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Hjem", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Butikk" },
    ],
  };

  const collectionLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Butikk",
    description:
      "Utforsk vårt utvalg av kosttilskudd for kampsportutøvere.",
    url: `${siteUrl}/butikk`,
    isPartOf: { "@id": `${siteUrl}/#website` },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: products.length,
      itemListElement: products.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${siteUrl}/product/${p.slug}`,
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

      <div className="mb-10">
        <h1 className="text-2xl font-bold text-black uppercase tracking-tight text-center">
          Butikk
        </h1>
        <div className="mt-4 max-w-2xl mx-auto text-center">
          <p className="text-sm text-neutral-500 leading-relaxed">
            Hos BorzFuel finner du kosttilskudd utviklet spesielt for
            kampsportutøvere. Enten du trener MMA, bryting, jiu-jitsu eller
            boksing — produktene våre er laget for å støtte prestasjon,
            restitusjon og langsiktig helse. Alt er GMP-sertifisert og
            sendes raskt til hele Norge.
          </p>
        </div>
      </div>

      <Suspense fallback={<div className="text-neutral-400 text-center">Laster...</div>}>
        <ShopClient products={products} />
      </Suspense>
    </div>
  );
}
