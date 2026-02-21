import api from "@/lib/woocommerce";
import { WooProduct } from "@/types/woocommerce";
import ProductCard from "@/components/product/ProductCard";

async function getProducts(): Promise<WooProduct[]> {
  const { data } = await api.get("products", { per_page: 20 });
  return data;
}

export default async function Home() {
  const products = await getProducts();

  return (
    <div>
      <section className="bg-zinc-900 dark:bg-zinc-900 text-white py-20">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Fuel Your Performance
          </h1>
          <p className="mt-4 text-lg text-zinc-400 max-w-2xl mx-auto">
            Premium sports nutrition and supplements to help you train harder,
            recover faster, and perform at your best.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-8">
          All Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
