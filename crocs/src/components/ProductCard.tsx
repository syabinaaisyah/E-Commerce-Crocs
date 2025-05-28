import { ProductType } from "@/types";
import Link from "next/link";

export default function ProductCard({ product }: { product: ProductType }) {
  return (
    <div className="flex flex-col gap-4 p-5 rounded-lg shadow-lg hover:shadow-2xl transition-shadow bg-gradient-to-t from-green-50 to-white border border-gray-200 hover:scale-105 transform">
      <div className="relative w-full h-48 overflow-hidden rounded-lg bg-gray-100 transition-transform group">
        <img
          src={product.thumbnail}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 group-hover:blur-sm transition-all duration-300"
        />
      </div>

      <div className="flex flex-col flex-grow mt-4">
        <h2 className="text-xl font-semibold text-gray-900 hover:text-green-600 transition-colors duration-300">
          {product.name}
        </h2>
        <p className="text-green-700 font-bold text-lg mb-2">
          {`${product.price.toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
          })}`}
        </p>

        <p className="text-gray-700 text-sm mb-3 line-clamp-3">
          {product.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {product.tags.map((tag, idx) => (
            <span
              key={idx}
              className="text-xs bg-green-100 text-green-600 px-3 py-1 rounded-full transition-all hover:bg-green-200"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto p-4 flex justify-center">
          <Link
            href={`/products/${product.slug}`}
            className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-3 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105"
          >
            View Product
          </Link>
        </div>
      </div>
    </div>
  );
}
