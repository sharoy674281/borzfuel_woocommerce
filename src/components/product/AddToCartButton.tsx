"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import Button from "@/components/ui/Button";
import type { WooProduct } from "@/types/woocommerce";
import { trackPixelEvent } from "@/components/MetaPixel";

export default function AddToCartButton({ product }: { product: WooProduct }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleAdd = () => {
    addItem({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      image: product.images[0]?.src || "",
      quantity,
    });
    trackPixelEvent("AddToCart", {
      content_name: product.name,
      content_ids: [String(product.id)],
      content_type: "product",
      value: parseFloat(product.price) * quantity,
      currency: "NOK",
      num_items: quantity,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="flex items-stretch gap-3">
      {/* Quantity selector */}
      <div className="flex items-center border border-neutral-200">
        <button
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          className="w-8 h-full flex items-center justify-center text-neutral-500 hover:text-black transition-colors cursor-pointer text-sm"
        >
          −
        </button>
        <span className="w-8 flex items-center justify-center text-xs font-medium border-x border-neutral-200">
          {quantity}
        </span>
        <button
          onClick={() => setQuantity((q) => q + 1)}
          className="w-8 h-full flex items-center justify-center text-neutral-500 hover:text-black transition-colors cursor-pointer text-sm"
        >
          +
        </button>
      </div>

      <Button onClick={handleAdd} size="lg" className="w-full">
        {added ? "Lagt til!" : "Legg i handlekurv"}
      </Button>
    </div>
  );
}
