"use client";

import { useState } from "react";
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

function ClickableStars({
  rating,
  onChange,
}: {
  rating: number;
  onChange: (r: number) => void;
}) {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-6 h-6 cursor-pointer transition-colors ${
            star <= (hover || rating) ? "text-yellow-400" : "text-neutral-200"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          onClick={() => onChange(star)}
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

function ImageLightbox({
  src,
  alt,
  onClose,
}: {
  src: string;
  alt: string;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-[200] bg-black/80 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white text-3xl leading-none hover:opacity-70 cursor-pointer"
      >
        &times;
      </button>
      <div
        className="relative max-w-3xl max-h-[85vh] w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={src}
          alt={alt}
          width={900}
          height={900}
          className="object-contain w-full h-auto max-h-[85vh] rounded"
        />
      </div>
    </div>
  );
}

function ReviewForm({
  productId,
  onSuccess,
}: {
  productId: number;
  onSuccess: () => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImageFile(file);
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
    } else {
      setImagePreview(null);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImagePreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating) {
      setError("Velg en vurdering");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("product_id", String(productId));
      formData.append("reviewer", name);
      formData.append("reviewer_email", email);
      formData.append("review", review);
      formData.append("rating", String(rating));
      if (imageFile) {
        formData.append("image", imageFile);
      }

      const res = await fetch("/api/reviews", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Noe gikk galt");
        return;
      }

      setSuccess(true);
      setName("");
      setEmail("");
      setReview("");
      setRating(0);
      removeImage();
      onSuccess();
    } catch {
      setError("Kunne ikke sende anmeldelse. Prøv igjen.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="border border-green-200 bg-green-50 p-4 rounded text-sm text-green-700">
        Takk for din anmeldelse! Den vil bli synlig etter godkjenning.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-[11px] font-semibold text-black uppercase tracking-[0.15em] mb-2">
          Din vurdering
        </label>
        <ClickableStars rating={rating} onChange={setRating} />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-neutral-500 mb-1">Navn *</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-neutral-200 text-sm focus:outline-none focus:border-black transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs text-neutral-500 mb-1">
            E-post * (vises ikke)
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-neutral-200 text-sm focus:outline-none focus:border-black transition-colors"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs text-neutral-500 mb-1">
          Din anmeldelse *
        </label>
        <textarea
          required
          rows={4}
          value={review}
          onChange={(e) => setReview(e.target.value)}
          className="w-full px-3 py-2 border border-neutral-200 text-sm focus:outline-none focus:border-black transition-colors resize-none"
        />
      </div>

      {/* Image upload */}
      <div>
        <label className="block text-xs text-neutral-500 mb-1">
          Legg til bilde (valgfritt)
        </label>
        {!imagePreview ? (
          <label className="inline-flex items-center gap-2 px-4 py-2 border border-neutral-200 text-xs text-neutral-600 hover:border-black hover:text-black transition-colors cursor-pointer">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
            </svg>
            Velg bilde
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        ) : (
          <div className="flex items-start gap-3">
            <div className="relative w-20 h-20 rounded overflow-hidden border border-neutral-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imagePreview}
                alt="Forhåndsvisning"
                className="w-full h-full object-cover"
              />
            </div>
            <button
              type="button"
              onClick={removeImage}
              className="text-xs text-red-500 hover:text-red-700 underline cursor-pointer"
            >
              Fjern
            </button>
          </div>
        )}
      </div>

      {error && <p className="text-xs text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="px-6 py-2.5 text-[11px] font-medium uppercase tracking-wider bg-black text-white hover:bg-neutral-800 transition-colors disabled:opacity-50 cursor-pointer"
      >
        {loading ? "Sender..." : "Send anmeldelse"}
      </button>
    </form>
  );
}

function getReviewImages(review: WooReview): string[] {
  if (review.review_images && review.review_images.length > 0) {
    return review.review_images;
  }
  return [];
}

export default function ProductReviews({
  reviews,
  averageRating,
  ratingCount,
  productId,
  embedded = false,
}: {
  reviews: WooReview[];
  averageRating: string;
  ratingCount: number;
  productId?: number;
  embedded?: boolean;
}) {
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const content = (
    <>
      <AverageRating average={averageRating} count={ratingCount} />

      {reviews.length > 0 ? (
        <div className="space-y-8 max-w-3xl">
          {reviews.map((review) => {
            const images = getReviewImages(review);
            const cleanedReview = review.review.replace(/<img[^>]*>/gi, "");

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
                      <button
                        key={i}
                        onClick={() => setLightbox(src)}
                        className="relative w-20 h-20 rounded overflow-hidden bg-neutral-50 border border-neutral-100 hover:opacity-80 transition-opacity cursor-pointer"
                      >
                        <Image
                          src={src}
                          alt={`Bilde fra ${review.reviewer}`}
                          fill
                          className="object-cover"
                        />
                      </button>
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

      {/* Review form */}
      {productId && !submitted && (
        <div className="max-w-3xl mt-12 border-t border-neutral-200 pt-8">
          <h3 className="text-[11px] font-semibold text-black uppercase tracking-[0.15em] mb-6">
            Skriv en anmeldelse
          </h3>
          <ReviewForm
            productId={productId}
            onSuccess={() => setSubmitted(true)}
          />
        </div>
      )}

      {submitted && (
        <div className="max-w-3xl mt-12 border-t border-neutral-200 pt-8">
          <div className="border border-green-200 bg-green-50 p-4 rounded text-sm text-green-700">
            Takk for din anmeldelse! Den vil bli synlig etter godkjenning.
          </div>
        </div>
      )}

      {/* Lightbox */}
      {lightbox && (
        <ImageLightbox
          src={lightbox}
          alt="Forstørret bilde"
          onClose={() => setLightbox(null)}
        />
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
