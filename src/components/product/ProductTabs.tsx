"use client";

import { useState } from "react";
import type { WooProduct, WooReview } from "@/types/woocommerce";
import ProductReviews from "./ProductReviews";

interface ProductTabsProps {
  product: WooProduct;
  reviews: WooReview[];
}

export default function ProductTabs({ product, reviews }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState(0);

  const ingredientsMeta = product.meta_data?.find(
    (m) => m.key === "ingredienser" || m.key === "ingredients"
  );

  const hasAdditionalInfo = !!(product.weight || ingredientsMeta?.value);

  const tabs = [
    { label: "Beskrivelse", key: "description" },
    ...(hasAdditionalInfo
      ? [{ label: "Tilleggsinformasjon", key: "info" }]
      : []),
    { label: `Omtaler (${product.rating_count})`, key: "reviews" },
  ];

  return (
    <section id="product-tabs" className="border-t border-neutral-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        {/* Tab buttons */}
        <div className="flex gap-4 sm:gap-8 border-b border-neutral-200 mb-8 overflow-x-auto">
          {tabs.map((tab, i) => (
            <button
              key={i}
              data-tab={tab.key}
              onClick={() => setActiveTab(i)}
              className={`pb-3 text-[11px] font-semibold uppercase tracking-[0.15em] transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === i
                  ? "text-black border-b-2 border-black -mb-px"
                  : "text-neutral-400 hover:text-black"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {tabs[activeTab]?.key === "description" && product.description && (
          <div
            className="product-description max-w-3xl"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />
        )}
        {tabs[activeTab]?.key === "description" && !product.description && (
          <p className="text-sm text-neutral-400">
            Ingen beskrivelse tilgjengelig.
          </p>
        )}

        {tabs[activeTab]?.key === "info" && (
          <div className="max-w-3xl space-y-4">
            <table className="w-full text-sm">
              <tbody>
                {product.weight && (
                  <tr className="border-b border-neutral-100">
                    <td className="py-3 font-medium text-neutral-700 w-40">
                      Vekt
                    </td>
                    <td className="py-3 text-neutral-500">
                      {product.weight} g
                    </td>
                  </tr>
                )}
                {ingredientsMeta?.value && (
                  <tr className="border-b border-neutral-100">
                    <td className="py-3 font-medium text-neutral-700 w-40">
                      Ingredienser
                    </td>
                    <td className="py-3 text-neutral-500">
                      {ingredientsMeta.value}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {tabs[activeTab]?.key === "reviews" && (
          <ProductReviews
            reviews={reviews}
            averageRating={product.average_rating}
            ratingCount={product.rating_count}
            productId={product.id}
            embedded
          />
        )}
      </div>
    </section>
  );
}
