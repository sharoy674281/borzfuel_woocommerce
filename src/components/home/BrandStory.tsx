import Image from "next/image";
import Link from "next/link";

export default function BrandStory() {
  return (
		<section className="mx-auto max-w-7xl px-6 py-20">
			<div className="grid md:grid-cols-2 min-h-[500px]">
			{/* Left — Image */}
			<div className="relative bg-neutral-100 min-h-[350px] md:min-h-0 overflow-hidden">
				<Image
					src="https://borzfuelnutrition.com/wp-content/uploads/2025/11/armin-og-august-scaled.jpg"
					alt="BorzFuel utøver på matta"
					fill
					className="object-cover"
					sizes="(max-width: 768px) 100vw, 50vw"
				/>
			</div>

			{/* Right — Text */}
			<div className="flex items-center bg-white px-8 sm:px-14 py-16">
				<div className="max-w-md">
					<p className="text-[11px] text-neutral-400 uppercase tracking-[0.3em] mb-4">
						Vår historie
					</p>
					<h2 className="text-3xl font-bold text-black uppercase tracking-tight leading-tight mb-6">
						For deg som er
						<br />
						på matta.
					</h2>
					<p className="text-neutral-500 text-sm leading-relaxed mb-4">
						BorzFuel ble startet av kampsportutøvere som var lei av
						generiske tilskudd. Vi trengte produkter som faktisk fungerer
						for de som trener hardt og konkurrerer ofte.
					</p>
					<p className="text-neutral-500 text-sm leading-relaxed mb-8">
						&laquo;Borz&raquo; betyr ulv på tsjetsjensk — styrke,
						utholdenhet og viljestyrke. Norskprodusert med
						GMP-sertifisering.
					</p>
					<Link
						href="/butikk"
						className="inline-block px-8 py-3 bg-black text-white text-[11px] font-medium uppercase tracking-[0.2em] hover:bg-neutral-800 transition-colors">
						Se produkter
					</Link>
				</div>
			</div>
			</div>
		</section>
  );
}
