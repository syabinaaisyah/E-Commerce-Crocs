import AddToWishList from "@/components/AddToWishList";
import { ProductType } from "@/types";
import { Metadata } from "next";
const baseURL = process.env.NEXT_PUBLIC_BASE_URL || process.env.BASE_URL || "https://crocs-one.vercel.app";


async function fetchProduct(slug: string): Promise<ProductType> {
  const res = await fetch(`${baseURL}/api/products/${slug}`, {
    cache: "no-cache",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch product details");
  }

  const productJson = await res.json();

  return {
    ...productJson,
    _id: new Object(productJson._id),
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await fetchProduct(slug);

  return {
    title: `${product.name} - Explore Exclusive Products`,
    description: product.excerpt,
    openGraph: {
      title: product.name,
      description: product.excerpt,
      url: `${baseURL}/products/${product.slug}`,
      images: [
        {
          url: product.thumbnail,
          width: 800,
          height: 600,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.excerpt,
      images: [product.thumbnail],
    },
  };
}

export default async function ProductDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}){
  const { slug } = await params;
  const product = await fetchProduct(slug);

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 bg-white shadow-lg rounded-lg">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="flex justify-center">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full max-w-md rounded-lg shadow-md"
          />
        </div>
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {product.name}
          </h1>
          <p className="text-lg text-gray-700 mb-6">{product.description}</p>
          <p className="text-2xl font-semibold text-green-600 mb-4">
            {`${product.price.toLocaleString("id-ID", {
              style: "currency",
              currency: "IDR",
            })}`}
          </p>
          <div className="mb-6">
            <span className="text-gray-500 text-sm">
              Available since:{" "}
              {new Date(product.createdAt).toLocaleDateString()}
            </span>
          </div>
          <AddToWishList productId={product._id.toString()} />
        </div>
      </div>
    </div>
  );
}