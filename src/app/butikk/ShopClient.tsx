"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import type { WooProduct } from "@/types/woocommerce";
import ProductCard from "@/components/product/ProductCard";
import CategoryFilter from "@/components/shop/CategoryFilter";
import SortSelect from "@/components/shop/SortSelect";

const categoryMap: Record<string, string[]> = {
  styrke: ["styrke", "kreatin", "creatine", "strength"],
  utholdenhet: ["utholdenhet", "endurance", "energi", "energy"],
  restitusjon: ["restitusjon", "recovery", "protein"],
  "ledd-mobilitet": ["ledd", "mobilitet", "joint", "flex"],
};

function matchesCategory(product: WooProduct, categorySlug: string): boolean {
  if (categorySlug === "alle") return true;
  const keywords = categoryMap[categorySlug] || [];
  return product.categories.some((cat) =>
    keywords.some(
      (kw) =>
        cat.slug.toLowerCase().includes(kw) ||
        cat.name.toLowerCase().includes(kw)
    )
  ) || keywords.some((kw) => product.name.toLowerCase().includes(kw));
}

export default function ShopClient({ products }: { products: WooProduct[] }) {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("kategori") || "alle";

  const [category, setCategory] = useState(initialCategory);
  const [sort, setSort] = useState("default");

  const filtered = useMemo(() => {
    let result = products.filter((p) => matchesCategory(p, category));

    switch (sort) {
      case "price-asc":
        result = [...result].sort((a, b) => Number(a.price) - Number(b.price));
        break;
      case "price-desc":
        result = [...result].sort((a, b) => Number(b.price) - Number(a.price));
        break;
      case "on-sale":
        result = [...result].sort((a, b) => (b.on_sale ? 1 : 0) - (a.on_sale ? 1 : 0));
        break;
    }

    return result;
  }, [products, category, sort]);

  return (
    <div className="bg-white">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
        <CategoryFilter active={category} onChange={setCategory} />
        <SortSelect value={sort} onChange={setSort} />
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20 bg-white">
          <p className="text-neutral-500">
            Ingen produkter i denne kategorien ennå.
          </p>
          <button
            onClick={() => setCategory("alle")}
            className="mt-4 text-black text-sm underline cursor-pointer"
          >
            Vis alle produkter
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
