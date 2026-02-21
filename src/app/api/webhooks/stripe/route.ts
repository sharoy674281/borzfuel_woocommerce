import { NextRequest, NextResponse } from "next/server";
import stripe from "@/lib/stripe";
import api from "@/lib/woocommerce";
import type Stripe from "stripe";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const wooOrderId = session.metadata?.woo_order_id;

    if (wooOrderId) {
      try {
        await api.put(`orders/${wooOrderId}`, {
          status: "processing",
          set_paid: true,
          transaction_id: session.payment_intent,
        });
      } catch (err) {
        console.error("Failed to update WooCommerce order:", err);
        return NextResponse.json(
          { error: "Failed to update order" },
          { status: 500 }
        );
      }
    }
  }

  return NextResponse.json({ received: true });
}
