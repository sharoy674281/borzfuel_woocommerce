"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import CartItemRow from "@/components/cart/CartItem";
import Button from "@/components/ui/Button";
import type { AppliedCoupon } from "@/context/CartContext";

const FREE_SHIPPING_THRESHOLD = 1000;

export default function CartPage() {
  const {
    items,
    totalPrice,
    coupon,
    couponDiscount,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const [couponCode, setCouponCode] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponError, setCouponError] = useState("");

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;
    setCouponLoading(true);
    setCouponError("");

    try {
      const res = await fetch("/api/coupon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: couponCode.trim() }),
      });
      const data = await res.json();

      if (!res.ok) {
        setCouponError(data.error || "Ugyldig kupongkode");
        return;
      }

      applyCoupon(data as AppliedCoupon);
      setCouponCode("");
    } catch {
      setCouponError("Kunne ikke validere kupongkode");
    } finally {
      setCouponLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="bg-white mx-auto max-w-7xl px-6 py-32 text-center">
        <h1 className="text-2xl font-bold text-black uppercase tracking-tight">
          Handlekurven er tom
        </h1>
        <p className="mt-3 text-sm text-neutral-400">
          Finn noe du liker i butikken.
        </p>
        <Link href="/butikk" className="mt-8 inline-block">
          <Button>Gå til butikk</Button>
        </Link>
      </div>
    );
  }

  const freeShipping = totalPrice >= FREE_SHIPPING_THRESHOLD;
  const subtotalAfterDiscount = totalPrice - couponDiscount;

  return (
    <div className="bg-white mx-auto max-w-7xl px-6 py-12">
      <h1 className="text-2xl font-bold text-black uppercase tracking-tight">
        Handlekurv
      </h1>

      <div className="grid lg:grid-cols-5 gap-16 mt-10">
        <div className="lg:col-span-3">
          {items.map((item) => (
            <CartItemRow key={item.id} item={item} />
          ))}
        </div>

        <div className="lg:col-span-2">
          <div className="bg-neutral-50 p-6 sticky top-20">
            <h2 className="text-[11px] font-semibold text-black uppercase tracking-[0.15em] mb-5">
              Ordresammendrag
            </h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-neutral-500">Delsum</span>
                <span className="text-black">{formatPrice(totalPrice)}</span>
              </div>

              {/* Coupon discount */}
              {coupon && couponDiscount > 0 && (
                <div className="flex justify-between">
                  <span className="text-neutral-500">
                    Rabatt ({coupon.code})
                    <button
                      onClick={removeCoupon}
                      className="ml-2 text-[10px] text-red-500 hover:text-red-700 underline cursor-pointer"
                    >
                      Fjern
                    </button>
                  </span>
                  <span className="text-green-600">
                    −{formatPrice(couponDiscount)}
                  </span>
                </div>
              )}

              {/* Shipping info */}
              <div className="flex justify-between">
                <span className="text-neutral-500">Frakt</span>
                <span className="text-black">
                  {freeShipping ? "Gratis" : "Beregnes i kassen"}
                </span>
              </div>
              {!freeShipping && (
                <p className="text-[11px] text-neutral-400">
                  Gratis frakt over {formatPrice(FREE_SHIPPING_THRESHOLD)}
                </p>
              )}

              <div className="border-t border-neutral-200 pt-3 flex justify-between font-semibold text-black">
                <span>Delsum</span>
                <span>{formatPrice(subtotalAfterDiscount)}</span>
              </div>
            </div>

            {/* Coupon input */}
            {!coupon && (
              <div className="mt-5 border-t border-neutral-200 pt-5">
                <p className="text-[11px] font-semibold text-black uppercase tracking-[0.15em] mb-3">
                  Rabattkode
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => {
                      setCouponCode(e.target.value);
                      setCouponError("");
                    }}
                    onKeyDown={(e) => e.key === "Enter" && handleApplyCoupon()}
                    placeholder="Skriv inn kode"
                    className="flex-1 px-3 py-2 border border-neutral-200 text-xs focus:outline-none focus:border-black transition-colors"
                  />
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={handleApplyCoupon}
                    disabled={couponLoading || !couponCode.trim()}
                  >
                    {couponLoading ? "..." : "Bruk"}
                  </Button>
                </div>
                {couponError && (
                  <p className="mt-2 text-xs text-red-500">{couponError}</p>
                )}
              </div>
            )}

            <Link href="/checkout" className="block mt-6">
              <Button size="lg" className="w-full">
                Gå til kassen
              </Button>
            </Link>

            <Link
              href="/butikk"
              className="block mt-4 text-center text-xs text-neutral-400 underline hover:text-black"
            >
              Fortsett å handle
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
