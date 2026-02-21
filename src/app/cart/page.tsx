"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import CartItemRow from "@/components/cart/CartItem";
import Button from "@/components/ui/Button";

export default function CartPage() {
  const { items, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-24 text-center">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
          Your cart is empty
        </h1>
        <p className="mt-2 text-zinc-500">
          Looks like you haven&apos;t added anything yet.
        </p>
        <Link href="/" className="mt-6 inline-block">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-8">
        Shopping Cart
      </h1>

      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          {items.map((item) => (
            <CartItemRow key={item.id} item={item} />
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 sticky top-24">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
              Order Summary
            </h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                <span>Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="border-t border-zinc-200 dark:border-zinc-800 pt-3 flex justify-between font-semibold text-zinc-900 dark:text-white text-base">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </div>

            <Link href="/checkout" className="block mt-6">
              <Button size="lg" className="w-full">
                Proceed to Checkout
              </Button>
            </Link>

            <Link
              href="/"
              className="block mt-3 text-center text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
