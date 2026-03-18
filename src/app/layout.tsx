import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CookieBanner from "@/components/CookieBanner";
import MetaPixel from "@/components/MetaPixel";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://borzfuelnutrition.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  title: {
    default: "Borzfuel Nutrition — Kosttilskudd for kampsport",
    template: "%s — Borzfuel Nutrition",
  },
  description:
    "Premium kosttilskudd utviklet for kampsportutøvere. Kreatin, leddstøtte og mer. GMP-sertifisert. Rask levering i hele Norge.",
  icons: {
    icon: "/logo-borzfuel.png",
    apple: "/logo-borzfuel.png",
  },
  openGraph: {
    type: "website",
    locale: "nb_NO",
    siteName: "Borzfuel Nutrition",
    title: "Borzfuel Nutrition — Kosttilskudd for kampsport",
    description:
      "Premium kosttilskudd utviklet for kampsportutøvere. Kreatin, leddstøtte og mer. GMP-sertifisert. Rask levering i hele Norge.",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "Borzfuel Nutrition — Kosttilskudd for kampsport",
    description:
      "Premium kosttilskudd utviklet for kampsportutøvere. Kreatin, leddstøtte og mer. GMP-sertifisert.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="no" data-theme="light" style={{ colorScheme: "light" }}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": `${siteUrl}/#organization`,
                  name: "Borzfuel DA",
                  alternateName: "Borzfuel Nutrition",
                  url: siteUrl,
                  logo: {
                    "@type": "ImageObject",
                    url: `${siteUrl}/logo-borzfuel.png`,
                  },
                  email: "support@borzfuelnutrition.no",
                  telephone: "+4798069142",
                  taxID: "934110374",
                  address: {
                    "@type": "PostalAddress",
                    streetAddress: "Gyldenprisveien 25",
                    postalCode: "5056",
                    addressLocality: "Bergen",
                    addressCountry: "NO",
                  },
                  sameAs: [
                    "https://www.instagram.com/borzfuelnutrition/",
                  ],
                },
                {
                  "@type": "WebSite",
                  "@id": `${siteUrl}/#website`,
                  name: "Borzfuel Nutrition",
                  url: siteUrl,
                  publisher: { "@id": `${siteUrl}/#organization` },
                  inLanguage: "nb-NO",
                },
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${inter.variable} antialiased min-h-screen flex flex-col`}
        style={{ backgroundColor: "#ffffff", color: "#111111" }}
      >
        <CartProvider>
          <Header />
          <main className="flex-1 bg-white">{children}</main>
          <Footer />
          <CookieBanner />
          <MetaPixel />
        </CartProvider>
      </body>
    </html>
  );
}
