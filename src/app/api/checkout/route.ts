import { NextRequest, NextResponse } from "next/server";

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

    const wpUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL!;

    // Encode cart data for WooCommerce to process
    const cartData = {
      items: items.map((i) => ({ id: i.product_id, qty: i.quantity })),
      coupon: coupon_code || null,
    };

    const encoded = Buffer.from(JSON.stringify(cartData)).toString("base64");
    const redirectUrl = `${wpUrl}/?headless_checkout=${encodeURIComponent(encoded)}`;

    return NextResponse.json({ url: redirectUrl });
  } catch (err) {
    console.error("Checkout error:", err);
    return NextResponse.json(
      { error: "Failed to create checkout" },
      { status: 500 }
    );
  }
}
