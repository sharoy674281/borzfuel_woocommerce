import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BorzFuel Nutrition — Kosttilskudd for Kampsport",
  description:
    "Premium kosttilskudd for kampsportutøvere. Kreatin, leddstøtte og mer. Norskprodusert.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="no" data-theme="light" style={{ colorScheme: "light" }}>
      <body
        className={`${inter.variable} antialiased min-h-screen flex flex-col`}
        style={{ backgroundColor: "#ffffff", color: "#111111" }}
      >
        <CartProvider>
          <Header />
          <main className="flex-1 bg-white">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
