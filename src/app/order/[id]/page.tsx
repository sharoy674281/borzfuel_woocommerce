import Link from "next/link";
import api from "@/lib/woocommerce";
import { formatPrice } from "@/lib/utils";
import type { WooOrder } from "@/types/woocommerce";
import ClearCartOnMount from "./ClearCartOnMount";
import PixelPurchase from "./PixelPurchase";

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
      <div className="bg-white flex items-center justify-center py-32">
        <p className="text-lg text-neutral-500">Bestillingen ble ikke funnet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white mx-auto max-w-[680px] px-6 py-16">
      <ClearCartOnMount />
      <PixelPurchase
        orderId={order.id}
        total={order.total}
        items={order.line_items.map((i) => ({
          id: i.product_id,
          name: i.name,
          quantity: i.quantity,
        }))}
      />

      <div className="text-center mb-12">
        <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-green-50 border border-green-200 mb-5">
          <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-black uppercase tracking-tight">
          Takk for din bestilling!
        </h1>
        <p className="mt-2 text-sm text-neutral-400">
          Ordre #{order.id} er registrert.
        </p>
      </div>

      <div className="bg-neutral-50 p-6">
        <h2 className="text-[11px] font-semibold text-black uppercase tracking-[0.15em] mb-5">
          Ordredetaljer
        </h2>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-neutral-500">Status</span>
            <span className="capitalize font-medium text-black">{order.status}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-500">Dato</span>
            <span className="text-black">{new Date(order.date_created).toLocaleDateString("nb-NO")}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-500">Betaling</span>
            <span className="text-black">{order.payment_method_title}</span>
          </div>
        </div>

        <div className="border-t border-neutral-200 mt-5 pt-5">
          <h3 className="text-[11px] font-semibold text-black uppercase tracking-[0.15em] mb-3">
            Produkter
          </h3>
          <div className="space-y-2">
            {order.line_items.map((item, i) => (
              <div key={i} className="flex justify-between text-sm">
                <span className="text-neutral-500">{item.name} &times; {item.quantity}</span>
                <span className="text-black">{formatPrice(item.total || "0")}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-neutral-200 mt-5 pt-5 flex justify-between font-semibold text-black">
          <span>Totalt</span>
          <span>{formatPrice(order.total)}</span>
        </div>

        {order.shipping && (
          <div className="border-t border-neutral-200 mt-5 pt-5">
            <h3 className="text-[11px] font-semibold text-black uppercase tracking-[0.15em] mb-2">
              Leveringsadresse
            </h3>
            <p className="text-sm text-neutral-500 leading-relaxed">
              {order.shipping.first_name} {order.shipping.last_name}<br />
              {order.shipping.address_1}
              {order.shipping.address_2 && <><br />{order.shipping.address_2}</>}
              <br />{order.shipping.city}, {order.shipping.state} {order.shipping.postcode}
              <br />{order.shipping.country}
            </p>
          </div>
        )}
      </div>

      <div className="mt-10 text-center">
        <Link href="/butikk" className="text-xs text-neutral-400 underline hover:text-black">
          Fortsett å handle
        </Link>
      </div>
    </div>
  );
}
