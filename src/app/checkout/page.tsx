"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import ShippingForm from "@/components/checkout/ShippingForm";
import Button from "@/components/ui/Button";
import Link from "next/link";
import type { WooAddress } from "@/types/woocommerce";

const emptyAddress: WooAddress = {
  first_name: "",
  last_name: "",
  address_1: "",
  address_2: "",
  city: "",
  state: "",
  postcode: "",
  country: "US",
  email: "",
  phone: "",
};

export default function CheckoutPage() {
  const { items, totalPrice } = useCart();
  const [address, setAddress] = useState<WooAddress>(emptyAddress);
  const [errors, setErrors] = useState<Partial<Record<keyof WooAddress, string>>>({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-24 text-center">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
          Your cart is empty
        </h1>
        <p className="mt-2 text-zinc-500">Add items before checking out.</p>
        <Link href="/" className="mt-6 inline-block">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof WooAddress, string>> = {};
    const required: (keyof WooAddress)[] = [
      "first_name",
      "last_name",
      "email",
      "address_1",
      "city",
      "state",
      "postcode",
      "country",
    ];
    for (const field of required) {
      if (!address[field]?.trim()) {
        newErrors[field] = "Required";
      }
    }
    if (address.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address.email)) {
      newErrors.email = "Invalid email";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setLoading(true);
    setApiError("");

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({
            product_id: i.id,
            quantity: i.quantity,
          })),
          billing: address,
          shipping: address,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Checkout failed");
      }

      // Redirect to Stripe Checkout
      window.location.href = data.url;
    } catch (err) {
      setApiError(err instanceof Error ? err.message : "Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-8">
        Checkout
      </h1>

      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Shipping Information
          </h2>
          <ShippingForm
            address={address}
            onChange={setAddress}
            errors={errors}
          />

          {apiError && (
            <p className="mt-4 text-sm text-red-500">{apiError}</p>
          )}

          <Button
            size="lg"
            className="w-full mt-8"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Processing..." : "Continue to Payment"}
          </Button>
        </div>

        <div className="lg:col-span-1">
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 sticky top-24">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
              Order Summary
            </h2>

            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between text-sm text-zinc-600 dark:text-zinc-400"
                >
                  <span>
                    {item.name} &times; {item.quantity}
                  </span>
                  <span>
                    ${(Number(item.price) * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-zinc-200 dark:border-zinc-800 mt-4 pt-4 flex justify-between font-semibold text-zinc-900 dark:text-white">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
