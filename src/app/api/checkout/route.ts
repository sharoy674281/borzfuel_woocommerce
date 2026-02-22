import { NextRequest, NextResponse } from "next/server";
import api from "@/lib/woocommerce";
import type { WooProduct, WooOrder } from "@/types/woocommerce";

interface CheckoutItem {
  product_id: number;
  quantity: number;
}

interface CheckoutBody {
  items: CheckoutItem[];
  coupon_code?: string | null;
}

export async function POST(req: NextRequest) {
  try {
    const body: CheckoutBody = await req.json();
    const { items, coupon_code } = body;

    if (!items?.length) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    // Server-side price verification — fetch real prices from WooCommerce
    const productIds = items.map((i) => i.product_id);
    const { data: products }: { data: WooProduct[] } = await api.get(
      "products",
      {
        include: productIds.join(","),
        per_page: productIds.length,
      }
    );

    const productMap = new Map(products.map((p) => [p.id, p]));

    // Build verified line items
    const lineItems: { product_id: number; quantity: number }[] = [];

    for (const item of items) {
      const product = productMap.get(item.product_id);
      if (!product) {
        return NextResponse.json(
          { error: `Product ${item.product_id} not found` },
          { status: 400 }
        );
      }

      lineItems.push({
        product_id: product.id,
        quantity: item.quantity,
      });
    }

    // Build order data
    const orderData: Record<string, unknown> = {
      status: "pending",
      line_items: lineItems,
    };

    // Apply coupon if provided
    if (coupon_code) {
      orderData.coupon_lines = [{ code: coupon_code }];
    }

    // Create WooCommerce order with pending status
    const { data: order }: { data: WooOrder } = await api.post(
      "orders",
      orderData
    );

    // Build redirect URL to WooCommerce order-pay page
    const wpUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL!;
    const redirectUrl = `${wpUrl}/checkout/order-pay/${order.id}/?pay_for_order=true&key=${order.order_key}`;

    return NextResponse.json({ url: redirectUrl, orderId: order.id });
  } catch (err) {
    console.error("Checkout error:", err);
    return NextResponse.json(
      { error: "Failed to create checkout" },
      { status: 500 }
    );
  }
}
