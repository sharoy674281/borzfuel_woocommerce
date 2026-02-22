import { Suspense } from "react";
import type { Metadata } from "next";
import api from "@/lib/woocommerce";
import { WooProduct } from "@/types/woocommerce";
import ShopClient from "./ShopClient";

export const metadata: Metadata = {
  title: "Butikk — BorzFuel Nutrition",
  description: "Se alle kosttilskudd fra BorzFuel. Filtrér etter kategori og finn det som passer deg.",
};

async function getProducts(): Promise<WooProduct[]> {
  const { data } = await api.get("products", { per_page: 100 });
  return data;
}

export default async function ButikkPage() {
  const products = await getProducts();

  return (
    <div className="bg-white mx-auto max-w-7xl px-6 py-12">
      <div className="mb-10 text-center">
        <h1 className="text-2xl font-bold text-black uppercase tracking-tight">
          Butikk
        </h1>
        <p className="mt-2 text-sm text-neutral-400">
          Alle våre produkter
        </p>
      </div>

      <Suspense fallback={<div className="text-neutral-400 text-center">Laster...</div>}>
        <ShopClient products={products} />
      </Suspense>
    </div>
  );
}
