import Banner from "@/components/Banner";
import ProductCard from "@/components/ProductCard";
import { ProductType } from "@/types";
import Link from "next/link";
const baseURL = process.env.NEXT_PUBLIC_BASE_URL || process.env.BASE_URL || "https://crocs-one.vercel.app";

export default async function Home() {
  const res = await fetch(`${baseURL}/api/products`, {
    cache: "no-cache",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const products: ProductType[] = await res.json();

  return (
    <main>
      <Banner />
      <section className="container mx-auto px-6 py-12">
        <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
          Example Product, Click{" "}
          <Link
            href="/products"
            className="text-green-600 underline hover:text-green-800 transition"
          >
            here
          </Link>{" "}
          to see more!
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id.toString()} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}
