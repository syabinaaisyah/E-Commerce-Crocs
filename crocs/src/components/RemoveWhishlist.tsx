"use client";

import Swal from "sweetalert2";
const baseURL = process.env.NEXT_PUBLIC_BASE_URL || process.env.BASE_URL || "http://localhost:3000";

export default function RemoveFromWishlists({
  productId,
  onRemove,
}: {
  productId: string;
  onRemove: (productId: string) => void;
}) {
  const handleRemoveFromWishlist = async () => {
    try {
      const res = await fetch(`${baseURL}/api/wishlists`, {
        method: "DELETE",
        body: JSON.stringify({ productId }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const response = await res.json();
      if (!res.ok)
        throw new Error(response.message || "Failed to add to wishlist");

      onRemove(productId);

      Swal.fire({
        title: "Success",
        text: "Item successfully removed from wishlist",
        icon: "success",
      });
    } catch (err: Error | unknown) {
      const errorMessage = err instanceof Error ? err.message : "Something went wrong";
      Swal.fire({
        title: "Error",
        text: errorMessage,
        icon: "error",
        confirmButtonColor: "#d33",
      });
    }
  };
  return (
    <button
      className="btn btn-danger ml-4 px-6 py-3 text-gray-300 font-medium rounded-full shadow-md bg-red-500 hover:bg-red-700 transition-colors duration-300"
      onClick={handleRemoveFromWishlist}
    >
      Remove from Wishlist
    </button>
  );
}
