"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
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
  country: "NO",
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
      <div className="bg-white mx-auto max-w-7xl px-6 py-32 text-center">
        <h1 className="text-2xl font-bold text-black uppercase tracking-tight">
          Handlekurven er tom
        </h1>
        <p className="mt-3 text-sm text-neutral-400">
          Legg til produkter før du går til kassen.
        </p>
        <Link href="/butikk" className="mt-8 inline-block">
          <Button>Gå til butikk</Button>
        </Link>
      </div>
    );
  }

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof WooAddress, string>> = {};
    const required: (keyof WooAddress)[] = [
      "first_name", "last_name", "email", "address_1", "city", "state", "postcode", "country",
    ];
    for (const field of required) {
      if (!address[field]?.trim()) {
        newErrors[field] = "Påkrevd";
      }
    }
    if (address.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address.email)) {
      newErrors.email = "Ugyldig e-post";
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
          items: items.map((i) => ({ product_id: i.id, quantity: i.quantity })),
          billing: address,
          shipping: address,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Noe gikk galt");
      window.location.href = data.url;
    } catch (err) {
      setApiError(err instanceof Error ? err.message : "Noe gikk galt");
      setLoading(false);
    }
  };

  return (
    <div className="bg-white mx-auto max-w-7xl px-6 py-12">
      <h1 className="text-2xl font-bold text-black uppercase tracking-tight">
        Kasse
      </h1>

      <div className="grid lg:grid-cols-5 gap-16 mt-10">
        <div className="lg:col-span-3">
          <h2 className="text-[11px] font-semibold text-black uppercase tracking-[0.15em] mb-5">
            Leveringsinformasjon
          </h2>
          <ShippingForm address={address} onChange={setAddress} errors={errors} />

          {apiError && <p className="mt-4 text-sm text-red-500">{apiError}</p>}

          <Button size="lg" className="w-full mt-8" onClick={handleSubmit} disabled={loading}>
            {loading ? "Behandler..." : "Fortsett til betaling"}
          </Button>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-neutral-50 p-6 sticky top-20">
            <h2 className="text-[11px] font-semibold text-black uppercase tracking-[0.15em] mb-5">
              Ordresammendrag
            </h2>
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-neutral-500">{item.name} &times; {item.quantity}</span>
                  <span className="text-black">{formatPrice(Number(item.price) * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-neutral-200 mt-4 pt-4 flex justify-between font-semibold text-black">
              <span>Totalt</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
