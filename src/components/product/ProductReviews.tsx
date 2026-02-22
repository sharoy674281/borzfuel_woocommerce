import Image from "next/image";
import type { WooReview } from "@/types/woocommerce";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-4 h-4 ${star <= rating ? "text-yellow-400" : "text-neutral-200"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function AverageRating({
  average,
  count,
}: {
  average: string;
  count: number;
}) {
  const avg = parseFloat(average);
  if (!count) return null;

  return (
    <div className="flex items-center gap-3 mb-8">
      <Stars rating={Math.round(avg)} />
      <span className="text-sm text-neutral-500">
        {avg.toFixed(1)} av 5 ({count} {count === 1 ? "anmeldelse" : "anmeldelser"})
      </span>
    </div>
  );
}

function getReviewImages(review: WooReview): string[] {
  const images: string[] = [];

  // Check meta_data for image URLs (common plugin keys)
  if (review.meta_data) {
    for (const meta of review.meta_data) {
      const key = meta.key.toLowerCase();
      if (
        key.includes("image") ||
        key.includes("photo") ||
        key.includes("attachment")
      ) {
        const value = meta.value;
        if (typeof value === "string" && value.startsWith("http")) {
          images.push(value);
        }
      }
    }
  }

  // Extract <img> src from review HTML
  const imgRegex = /<img[^>]+src=["']([^"']+)["']/gi;
  let match;
  while ((match = imgRegex.exec(review.review)) !== null) {
    images.push(match[1]);
  }

  return images;
}

export default function ProductReviews({
  reviews,
  averageRating,
  ratingCount,
  embedded = false,
}: {
  reviews: WooReview[];
  averageRating: string;
  ratingCount: number;
  embedded?: boolean;
}) {
  if (!reviews.length && !ratingCount) {
    if (embedded) {
      return <p className="text-sm text-neutral-400">Ingen anmeldelser ennå.</p>;
    }
    return null;
  }

  const content = (
    <>
      <AverageRating average={averageRating} count={ratingCount} />

      {reviews.length > 0 ? (
        <div className="space-y-8 max-w-3xl">
          {reviews.map((review) => {
            const images = getReviewImages(review);
            // Strip <img> tags from review HTML to avoid double-rendering
            const cleanedReview = review.review.replace(
              /<img[^>]*>/gi,
              ""
            );

            return (
              <div
                key={review.id}
                className="border-b border-neutral-100 pb-6"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Stars rating={review.rating} />
                  <span className="text-sm font-medium text-black">
                    {review.reviewer}
                  </span>
                </div>
                <div
                  className="text-sm text-neutral-500 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: cleanedReview }}
                />
                {images.length > 0 && (
                  <div className="flex gap-3 mt-3">
                    {images.map((src, i) => (
                      <div
                        key={i}
                        className="relative w-20 h-20 rounded overflow-hidden bg-neutral-50 border border-neutral-100"
                      >
                        <Image
                          src={src}
                          alt={`Bilde fra ${review.reviewer}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
                <p className="mt-2 text-[11px] text-neutral-300">
                  {new Date(review.date_created).toLocaleDateString("nb-NO", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-sm text-neutral-400">Ingen anmeldelser ennå.</p>
      )}
    </>
  );

  if (embedded) {
    return content;
  }

  return (
    <section className="border-t border-neutral-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="text-sm font-semibold text-black uppercase tracking-[0.15em] mb-8">
          Anmeldelser
        </h2>
        {content}
      </div>
    </section>
  );
}
