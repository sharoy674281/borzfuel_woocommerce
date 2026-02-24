"use client";

import { useEffect } from "react";
import { trackPixelEvent } from "@/components/MetaPixel";

export default function PixelPurchase({
  orderId,
  total,
  items,
}: {
  orderId: number;
  total: string;
  items: { id?: number; name?: string; quantity: number }[];
}) {
  useEffect(() => {
    trackPixelEvent("Purchase", {
      content_ids: items.map((i) => String(i.id || 0)),
      content_type: "product",
      value: parseFloat(total) || 0,
      currency: "NOK",
      num_items: items.reduce((sum, i) => sum + i.quantity, 0),
      order_id: String(orderId),
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return null;
}
