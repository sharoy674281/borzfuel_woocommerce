"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import Button from "@/components/ui/Button";

export default function CheckoutPage() {
  const { items, clearCart, coupon } = useCart();
  const [error, setError] = useState("");
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    if (items.length === 0 || redirecting) return;

    async function redirect() {
      setRedirecting(true);
      setError("");

      try {
        const res = await fetch("/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            items: items.map((i) => ({ product_id: i.id, quantity: i.quantity })),
            coupon_code: coupon?.code || null,
          }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Noe gikk galt");

        clearCart();
        window.location.href = data.url;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Noe gikk galt");
        setRedirecting(false);
      }
    }

    redirect();
  }, [items, clearCart, redirecting]);

  if (items.length === 0 && !redirecting) {
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

  return (
    <div className="bg-white mx-auto max-w-7xl px-6 py-32 text-center">
      {error ? (
        <>
          <p className="text-sm text-red-500 mb-4">{error}</p>
          <Button onClick={() => setRedirecting(false)}>Prøv igjen</Button>
        </>
      ) : (
        <>
          <div className="inline-block w-8 h-8 border-2 border-neutral-300 border-t-black rounded-full animate-spin mb-6" />
          <h1 className="text-xl font-bold text-black uppercase tracking-tight">
            Forbereder kassen...
          </h1>
          <p className="mt-3 text-sm text-neutral-400">
            Du blir videresendt til betalingssiden.
          </p>
        </>
      )}
    </div>
  );
}
