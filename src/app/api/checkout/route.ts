import { NextRequest, NextResponse } from "next/server";
import stripe from "@/lib/stripe";
import api from "@/lib/woocommerce";
import type { WooProduct, WooAddress } from "@/types/woocommerce";

interface CheckoutItem {
  product_id: number;
  quantity: number;
}

interface CheckoutBody {
  items: CheckoutItem[];
  billing: WooAddress;
  shipping: WooAddress;
}

export async function POST(req: NextRequest) {
  try {
    const body: CheckoutBody = await req.json();
    const { items, billing, shipping } = body;

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
    const stripeLineItems: {
      price_data: {
        currency: string;
        product_data: { name: string; images?: string[] };
        unit_amount: number;
      };
      quantity: number;
    }[] = [];

    for (const item of items) {
      const product = productMap.get(item.product_id);
      if (!product) {
        return NextResponse.json(
          { error: `Product ${item.product_id} not found` },
          { status: 400 }
        );
      }

      const priceInCents = Math.round(Number(product.price) * 100);

      lineItems.push({
        product_id: product.id,
        quantity: item.quantity,
      });

      stripeLineItems.push({
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
            images: product.images[0] ? [product.images[0].src] : undefined,
          },
          unit_amount: priceInCents,
        },
        quantity: item.quantity,
      });
    }

    // Create WooCommerce order (pending payment)
    const { data: order } = await api.post("orders", {
      status: "pending",
      billing,
      shipping,
      line_items: lineItems,
      payment_method: "stripe",
      payment_method_title: "Credit Card (Stripe)",
    });

    // Create Stripe Checkout Session
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: stripeLineItems,
      customer_email: billing.email,
      metadata: {
        woo_order_id: String(order.id),
      },
      success_url: `${appUrl}/order/${order.id}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/checkout`,
    });

    return NextResponse.json({ url: session.url, orderId: order.id });
  } catch (err) {
    console.error("Checkout error:", err);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
