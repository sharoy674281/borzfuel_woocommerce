"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import CartItemRow from "@/components/cart/CartItem";
import Button from "@/components/ui/Button";

export default function CartPage() {
  const { items, totalPrice } = useCart();

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
              <div className="flex justify-between">
                <span className="text-neutral-500">Frakt</span>
                <span className="text-black">Gratis</span>
              </div>
              <div className="border-t border-neutral-200 pt-3 flex justify-between font-semibold text-black">
                <span>Totalt</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
            </div>

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
