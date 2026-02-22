"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import CartDrawer from "@/components/cart/CartDrawer";

export default function Header() {
  const { totalItems, openDrawer } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-neutral-200">
        <div className="mx-auto max-w-7xl px-6 h-14 flex items-center justify-between">
          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-black cursor-pointer"
          >
            {mobileOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>

          {/* Desktop left nav */}
          <nav className="hidden md:flex items-center gap-8 text-[11px] font-medium uppercase tracking-[0.15em]">
            <Link href="/butikk" className="text-neutral-600 hover:text-black transition-colors">
              Butikk
            </Link>
            <Link href="/butikk?kategori=styrke" className="text-neutral-600 hover:text-black transition-colors">
              Styrke
            </Link>
            <Link href="/butikk?kategori=ledd-mobilitet" className="text-neutral-600 hover:text-black transition-colors">
              Ledd & Mobilitet
            </Link>
          </nav>

          {/* Center logo */}
          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2"
          >
            <Image
              src="/logo borzfuel.png"
              alt="BorzFuel"
              width={120}
              height={40}
              className="h-30 w-auto brightness-0"
              priority
            />
          </Link>

          {/* Right — cart */}
          <div className="flex items-center gap-5">
            <button
              onClick={openDrawer}
              className="relative text-black hover:opacity-60 transition-opacity cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-2.5 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[9px] font-bold text-white">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-neutral-200 bg-white">
            <nav className="flex flex-col px-6 py-5 gap-4 text-[11px] uppercase tracking-[0.15em] font-medium">
              <Link href="/" onClick={() => setMobileOpen(false)} className="text-neutral-600">Hjem</Link>
              <Link href="/butikk" onClick={() => setMobileOpen(false)} className="text-neutral-600">Butikk</Link>
              <Link href="/butikk?kategori=styrke" onClick={() => setMobileOpen(false)} className="text-neutral-600">Styrke</Link>
              <Link href="/butikk?kategori=ledd-mobilitet" onClick={() => setMobileOpen(false)} className="text-neutral-600">Ledd & Mobilitet</Link>
            </nav>
          </div>
        )}
      </header>

      <CartDrawer />
    </>
  );
}
