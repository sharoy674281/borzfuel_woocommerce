import Image from "next/image";

const images = [
  { src: "https://borzfuelnutrition.com/wp-content/uploads/2025/11/PHIL.jpg", alt: "BorzFuel athlete" },
  { src: "https://borzfuelnutrition.com/wp-content/uploads/2025/11/IMG_3253.jpg", alt: "BorzFuel training" },
  { src: "https://borzfuelnutrition.com/wp-content/uploads/2025/11/croat.jpg", alt: "BorzFuel competition" },
  { src: "https://borzfuelnutrition.com/wp-content/uploads/2025/11/chaborz.jpg", alt: "BorzFuel team" },
  { src: "https://borzfuelnutrition.com/wp-content/uploads/2025/11/Chab.jpg", alt: "BorzFuel athlete" },
];

export default function SocialGallery() {
  return (
    <section className="bg-white py-16">
      <div className="text-center mb-10">
        <p className="text-[11px] text-neutral-400 uppercase tracking-[0.3em] mb-2">
          @borzfuelnutrition
        </p>
        <h2 className="text-2xl font-bold text-black uppercase tracking-tight">
          Følg oss på sosiale medier
        </h2>
      </div>

      <div className="grid grid-cols-5 gap-1">
        {images.map((img, i) => (
          <a
            key={i}
            href="https://www.instagram.com/borzfuelnutrition/"
            target="_blank"
            rel="noopener noreferrer"
            className="relative aspect-square overflow-hidden group"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="20vw"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
          </a>
        ))}
      </div>
    </section>
  );
}
