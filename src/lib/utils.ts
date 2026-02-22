export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export function formatPrice(price: string | number) {
  const num = Number(price);
  return `kr ${num % 1 === 0 ? num : num.toFixed(2)}`;
}
