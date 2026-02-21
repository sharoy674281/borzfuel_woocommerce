export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export function formatPrice(price: string | number) {
  return `$${Number(price).toFixed(2)}`;
}
