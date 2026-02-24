"use client";

import { useEffect } from "react";
import { trackPixelEvent } from "@/components/MetaPixel";

export default function PixelViewContent({
  productName,
  productId,
  price,
  category,
}: {
  productName: string;
  productId: number;
  price: string;
  category?: string;
}) {
  useEffect(() => {
    trackPixelEvent("ViewContent", {
      content_name: productName,
      content_ids: [String(productId)],
      content_type: "product",
      value: parseFloat(price) || 0,
      currency: "NOK",
      ...(category && { content_category: category }),
    });
  }, [productName, productId, price, category]);

  return null;
}
