"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";

export default function CartDrawer() {
  const {
    items,
    removeItem,
    updateQuantity,
    totalPrice,
    drawerOpen,
    closeDrawer,
  } = useCart();

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-[60] bg-black/40 transition-opacity duration-300 ${
          drawerOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeDrawer}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 z-[70] h-full w-full max-w-md bg-white shadow-xl flex flex-col transition-transform duration-300 ease-in-out ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200">
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.15em]">
            Handlekurv
          </h2>
          <button
            onClick={closeDrawer}
            className="text-neutral-400 hover:text-black transition-colors cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <p className="text-sm text-neutral-400 text-center mt-12">
              Handlekurven er tom.
            </p>
          ) : (
            <div className="space-y-5">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  {/* Image */}
                  <div className="relative w-20 h-20 flex-shrink-0 bg-neutral-50">
                    {item.image && (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-contain p-1"
                      />
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/product/${item.slug}`}
                      onClick={closeDrawer}
                      className="text-xs font-semibold text-black uppercase tracking-wide hover:opacity-60 transition-opacity line-clamp-2"
                    >
                      {item.name}
                    </Link>
                    <p className="text-sm text-neutral-500 mt-1">
                      {formatPrice(item.price)}
                    </p>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-0 mt-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="w-7 h-7 flex items-center justify-center border border-neutral-200 text-neutral-500 hover:text-black transition-colors cursor-pointer text-sm"
                      >
                        −
                      </button>
                      <span className="w-8 h-7 flex items-center justify-center border-y border-neutral-200 text-xs font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="w-7 h-7 flex items-center justify-center border border-neutral-200 text-neutral-500 hover:text-black transition-colors cursor-pointer text-sm"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="self-start text-neutral-300 hover:text-black transition-colors cursor-pointer mt-0.5"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18 18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-neutral-200 px-6 py-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-[0.15em]">
                Delsum
              </span>
              <span className="text-sm font-semibold text-black">
                {formatPrice(totalPrice)}
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <Link
                href="/cart"
                onClick={closeDrawer}
                className="w-full inline-flex items-center justify-center px-8 py-3 text-xs font-semibold uppercase tracking-wider border border-[#111] text-[#111] hover:bg-[#111] hover:text-white transition-colors"
              >
                Gå til handlekurv
              </Link>
              <Link
                href="/checkout"
                onClick={closeDrawer}
                className="w-full inline-flex items-center justify-center px-8 py-3 text-xs font-semibold uppercase tracking-wider bg-[#111] text-white hover:bg-[#333] transition-colors"
              >
                Gå til kassen
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
