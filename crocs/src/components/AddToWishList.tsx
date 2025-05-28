"use client";

import Swal from "sweetalert2";
const baseURL = process.env.NEXT_PUBLIC_BASE_URL || process.env.BASE_URL || "https://crocs-one.vercel.app";

export default function AddToWishList({ productId }: { productId: string }) {
  const handleAddToWishlist = async () => {
    try {
      const res = await fetch(`${baseURL}/api/wishlists`, {
        method: "POST",
        body: JSON.stringify({ productId }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const response = await res.json();
      if (!res.ok) {
        if (res.status === 401) {
          window.location.href = "/login";
          return;
        }
        throw new Error(response.message || "Failed to add to wishlist");
      }

      Swal.fire({
        title: "Success",
        text: "Success add new wishlist",
        icon: "success",
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error instanceof Error ? error.message : "Something went wrong",
        icon: "error",
        confirmButtonColor: "#d33",
      });    }
  };
  return (
    <button
      className="btn btn-primary ml-4 px-6 py-3 text-white font-medium rounded-full shadow-md hover:bg-blue-600 transition-colors duration-300"
      onClick={() => handleAddToWishlist()}
    >
      Add to Wishlist
    </button>
  );
}
