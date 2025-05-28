"use client";
import ProductCard from "@/components/ProductCard";
import RemoveFromWishlists from "@/components/RemoveWhishlist";
import { WishlistType } from "@/types";
import { useEffect, useState } from "react";
const baseURL = process.env.NEXT_PUBLIC_BASE_URL || process.env.BASE_URL || "https://crocs-one.vercel.app";

export default function WishlistPage() {
  const [wishlists, setWishlists] = useState<WishlistType[]>([]);

  async function fetchData() {
    try {
      const res = await fetch(`${baseURL}/api/wishlists`);
      const response = await res.json();

      if (!res.ok) throw new Error(response.message);
      console.log(response);
      setWishlists(response);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleRemoveProduct = (productId: string) => {
    setWishlists(
      wishlists.filter((el) => el.productDetail?._id.toString() !== productId)
    );
    fetchData();
  };

  return (
    <div className="w-full px-6 py-10 bg-gradient-to-r from-green-200 via-green-100 to-green-50">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
          Your <span className="text-green-500">Wishlists</span>
        </h1>
        <p className="text-gray-600 mb-6">
          Keep track of your favorite products and make your shopping experience
          easier!
        </p>
      </div>

      {wishlists.length === 0 ? (
        <h2 className="text-center text-gray-600">
          Your wishlists are empty, add some!
        </h2>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {wishlists.map((el, idx) => {
            const productId = el.productDetail?._id?.toString() || "";
            if (!productId) return null;

            return (
              <div
                key={idx}
                className="card bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="card-body p-4">
                  {el.productDetail && (
                    <>
                      <ProductCard product={el.productDetail} />
                      <div className="flex justify-center mt-auto mb-4">
                        <RemoveFromWishlists
                          productId={productId}
                          onRemove={handleRemoveProduct}
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
