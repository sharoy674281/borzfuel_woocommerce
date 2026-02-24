import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vilkår & Personvern",
  description:
    "Les om brukervilkår, personvern og informasjonskapsler hos Borzfuel Nutrition.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
