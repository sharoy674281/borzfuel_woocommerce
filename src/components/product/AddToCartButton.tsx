"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import Button from "@/components/ui/Button";
import type { WooProduct } from "@/types/woocommerce";

export default function AddToCartButton({ product }: { product: WooProduct }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      image: product.images[0]?.src || "",
      quantity: 1,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <Button onClick={handleAdd} size="lg" className="w-full">
      {added ? "Lagt til!" : "Legg i handlekurv"}
    </Button>
  );
}
