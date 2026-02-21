import Link from "next/link";
import api from "@/lib/woocommerce";
import type { WooOrder } from "@/types/woocommerce";
import ClearCartOnMount from "./ClearCartOnMount";

async function getOrder(id: string): Promise<WooOrder | null> {
  try {
    const { data } = await api.get(`orders/${id}`);
    return data;
  } catch {
    return null;
  }
}

export default async function OrderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = await getOrder(id);

  if (!order) {
    return (
      <div className="flex items-center justify-center py-32">
        <p className="text-xl text-zinc-500">Order not found.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <ClearCartOnMount />

      <div className="text-center mb-12">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30 mb-4">
          <svg
            className="h-8 w-8 text-green-600 dark:text-green-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
          Thank you for your order!
        </h1>
        <p className="mt-2 text-zinc-500">
          Order #{order.id} has been placed successfully.
        </p>
      </div>

      <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
          Order Details
        </h2>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
            <span>Status</span>
            <span className="capitalize font-medium">{order.status}</span>
          </div>
          <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
            <span>Date</span>
            <span>{new Date(order.date_created).toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
            <span>Payment</span>
            <span>{order.payment_method_title}</span>
          </div>
        </div>

        <div className="border-t border-zinc-200 dark:border-zinc-800 mt-4 pt-4">
          <h3 className="font-semibold text-zinc-900 dark:text-white mb-3">
            Items
          </h3>
          <div className="space-y-2">
            {order.line_items.map((item, i) => (
              <div
                key={i}
                className="flex justify-between text-sm text-zinc-600 dark:text-zinc-400"
              >
                <span>
                  {item.name} &times; {item.quantity}
                </span>
                <span>${item.total}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-zinc-200 dark:border-zinc-800 mt-4 pt-4 flex justify-between font-semibold text-zinc-900 dark:text-white">
          <span>Total</span>
          <span>${order.total}</span>
        </div>

        {order.shipping && (
          <div className="border-t border-zinc-200 dark:border-zinc-800 mt-4 pt-4">
            <h3 className="font-semibold text-zinc-900 dark:text-white mb-2">
              Shipping Address
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              {order.shipping.first_name} {order.shipping.last_name}
              <br />
              {order.shipping.address_1}
              {order.shipping.address_2 && (
                <>
                  <br />
                  {order.shipping.address_2}
                </>
              )}
              <br />
              {order.shipping.city}, {order.shipping.state}{" "}
              {order.shipping.postcode}
              <br />
              {order.shipping.country}
            </p>
          </div>
        )}
      </div>

      <div className="mt-8 text-center">
        <Link
          href="/"
          className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
        >
          &larr; Continue Shopping
        </Link>
      </div>
    </div>
  );
}
