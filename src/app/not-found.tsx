import Link from "next/link";

export default function NotFound() {
  return (
    <div className="bg-white mx-auto max-w-7xl px-6 py-32 text-center">
      <p className="text-[11px] text-neutral-400 uppercase tracking-[0.3em] mb-4">
        404
      </p>
      <h1 className="text-3xl font-bold text-black uppercase tracking-tight mb-4">
        Siden ble ikke funnet
      </h1>
      <p className="text-sm text-neutral-500 mb-8 max-w-md mx-auto">
        Beklager, men siden du leter etter finnes ikke eller har blitt flyttet.
      </p>
      <div className="flex gap-4 justify-center">
        <Link
          href="/"
          className="px-8 py-3 bg-black text-white text-[11px] font-medium uppercase tracking-[0.2em] hover:bg-neutral-800 transition-colors"
        >
          Til forsiden
        </Link>
        <Link
          href="/butikk"
          className="px-8 py-3 border border-black text-black text-[11px] font-medium uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-colors"
        >
          Se produkter
        </Link>
      </div>
    </div>
  );
}
