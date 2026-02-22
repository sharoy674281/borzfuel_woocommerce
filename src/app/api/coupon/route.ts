import { NextRequest, NextResponse } from "next/server";
import api from "@/lib/woocommerce";

interface WooCoupon {
  id: number;
  code: string;
  discount_type: string;
  amount: string;
  date_expires: string | null;
  usage_count: number;
  usage_limit: number | null;
  minimum_amount: string;
  maximum_amount: string;
}

export async function POST(req: NextRequest) {
  try {
    const { code } = await req.json();

    if (!code || typeof code !== "string") {
      return NextResponse.json(
        { error: "Kupongkode mangler" },
        { status: 400 }
      );
    }

    const { data: coupons }: { data: WooCoupon[] } = await api.get("coupons", {
      code: code.trim().toLowerCase(),
    });

    if (!coupons.length) {
      return NextResponse.json(
        { error: "Ugyldig kupongkode" },
        { status: 404 }
      );
    }

    const coupon = coupons[0];

    // Check expiry
    if (coupon.date_expires) {
      const expires = new Date(coupon.date_expires);
      if (expires < new Date()) {
        return NextResponse.json(
          { error: "Kupongkoden har utløpt" },
          { status: 400 }
        );
      }
    }

    // Check usage limit
    if (
      coupon.usage_limit !== null &&
      coupon.usage_count >= coupon.usage_limit
    ) {
      return NextResponse.json(
        { error: "Kupongkoden er brukt opp" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      code: coupon.code,
      discount_type: coupon.discount_type,
      amount: coupon.amount,
      minimum_amount: coupon.minimum_amount,
    });
  } catch (err) {
    console.error("Coupon error:", err);
    return NextResponse.json(
      { error: "Kunne ikke validere kupongkode" },
      { status: 500 }
    );
  }
}
