import Link from "next/link";
import Image from "next/image";

const categories = [
  {
    name: "Styrke & Kreatin",
    slug: "styrke",
    image: "https://borzfuelnutrition.com/wp-content/uploads/2026/01/transparent-scaled.png",
    placeholder: "Legg til treningsbilde her",
  },
  {
    name: "Ledd & Mobilitet",
    slug: "ledd-mobilitet",
    image: "https://borzfuelnutrition.com/wp-content/uploads/2024/12/ultrajointflex_transparent.png",
    placeholder: "Legg til competition-bilde her",
  },
];

export default function Categories() {
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-4">
      <div className="grid md:grid-cols-2 gap-4">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/butikk?kategori=${cat.slug}`}
            className="group relative overflow-hidden bg-neutral-100 aspect-[3/4] sm:aspect-[4/5]"
          >
            {/*
              PLACEHOLDER: Bytt ut bg-neutral-100 med et lifestyle-bilde.
              Bruk: <Image src="/kategori-styrke.jpg" fill className="object-cover" />
            */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-3/5 h-3/5">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-contain group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* Bottom text */}
            <div className="absolute inset-x-0 bottom-0 p-8 text-center bg-gradient-to-t from-black/20 to-transparent">
              <h3 className="text-xl font-semibold text-neutral-900 uppercase tracking-[0.15em]">
                {cat.name}
              </h3>
              <span className="inline-block mt-3 px-8 py-2.5 bg-white text-black text-[11px] font-medium uppercase tracking-[0.2em] group-hover:bg-black group-hover:text-white transition-colors duration-300">
                Handle nå
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
