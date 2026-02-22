import { NextRequest, NextResponse } from "next/server";
import api from "@/lib/woocommerce";

const WP_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL!;
const CK = process.env.WOOCOMMERCE_KEY!;
const CS = process.env.WOOCOMMERCE_SECRET!;

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") || "";

    let product_id: number;
    let reviewer: string;
    let reviewer_email: string;
    let review: string;
    let rating: number;
    let imageFile: File | null = null;

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      product_id = Number(formData.get("product_id"));
      reviewer = String(formData.get("reviewer") || "");
      reviewer_email = String(formData.get("reviewer_email") || "");
      review = String(formData.get("review") || "");
      rating = Number(formData.get("rating"));
      const file = formData.get("image");
      if (file instanceof File && file.size > 0) {
        imageFile = file;
      }
    } else {
      const body = await req.json();
      product_id = body.product_id;
      reviewer = body.reviewer;
      reviewer_email = body.reviewer_email;
      review = body.review;
      rating = body.rating;
    }

    if (!product_id || !reviewer || !reviewer_email || !review || !rating) {
      return NextResponse.json(
        { error: "Alle felt er påkrevd" },
        { status: 400 }
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Vurdering må være mellom 1 og 5" },
        { status: 400 }
      );
    }

    // Create review via WooCommerce API
    const { data: reviewData } = await api.post("products/reviews", {
      product_id,
      reviewer,
      reviewer_email,
      review,
      rating,
    });

    // Upload image if provided
    if (imageFile) {
      try {
        // Upload image to WordPress
        const uploadForm = new FormData();
        uploadForm.append("file", imageFile);

        const uploadRes = await fetch(
          `${WP_URL}/wp-json/borzfuel/v1/upload-review-image?consumer_key=${CK}&consumer_secret=${CS}`,
          { method: "POST", body: uploadForm }
        );

        if (uploadRes.ok) {
          const uploadData = await uploadRes.json();

          // Link image to the review comment
          const linkForm = new URLSearchParams();
          linkForm.append("comment_id", String(reviewData.id));
          linkForm.append("attachment_id", String(uploadData.attachment_id));
          linkForm.append("consumer_key", CK);
          linkForm.append("consumer_secret", CS);

          await fetch(
            `${WP_URL}/wp-json/borzfuel/v1/set-review-image`,
            {
              method: "POST",
              headers: { "Content-Type": "application/x-www-form-urlencoded" },
              body: linkForm.toString(),
            }
          );
        }
      } catch {
        // Review was created, image upload failed silently
      }
    }

    return NextResponse.json(reviewData, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Kunne ikke sende anmeldelse. Prøv igjen senere." },
      { status: 500 }
    );
  }
}
