"use client";
const baseURL = process.env.NEXT_PUBLIC_BASE_URL || process.env.BASE_URL || "https://crocs-one.vercel.app";

import AddToWishList from "@/components/AddToWishList";
import ProductCard from "@/components/ProductCard";
import SubmitButton from "@/components/SubmitButton";
import { ProductType } from "@/types";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import InfiniteScroll from "react-infinite-scroll-component";

const bannerImages = [
  "https://www.crocs.co.id/media/weltpixel/owlcarouselslider/images/2/2/2200_590px-1-20250122-082942.jpg",
]

export default function Products() {
  const [currentIndex] = useState(0);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(3);
  const [hasMore, setHasMore] = useState(true);
  const [query, setQuery] = useState("");

  async function getData() {
    const res = await fetch(
      `${baseURL}/api/products?page=${page}&limit=${limit}&q=${query}`
    );

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const productsRes: ProductType[] = await res.json();

    if (productsRes.length === 0) {
      setHasMore(false);
    }
    setProducts((prevProducts) => {
      return [...prevProducts, ...productsRes];
    });
  }

  useEffect(() => {
    getData();
  }, [page, limit]);

  const fetchMoreData = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setProducts([]);
    setPage(1);
    getData();
    console.log("Search for: ", query);
  };

  return (
    <motion.section 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-green-900"
  >
    {/* Animated Banner with Rotation */}
    <motion.div 
      key={currentIndex}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="relative"
    >
      <img
        src={bannerImages[currentIndex]}
        alt={`Banner ${currentIndex + 1}`}
        className="w-full h-[320px] object-cover filter brightness-75 transition-all duration-500"
      />
      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
      </div>
    </motion.div>

    
    <div className="container mx-auto px-4 py-8">
        {/* Search and Header Section */}
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
      <form onSubmit={handleSearchSubmit}>
        <label className="relative">
          <input
            onChange={(el) => {
              setQuery(el.target.value);
            }}
            value={query}
            type="text"
            className="w-full p-4 pl-10 rounded-full bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
            placeholder="Search products..."
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
        <div className="text-center mt-4">
          <SubmitButton />
        </div>
      </form>
      <div className="text-center mb-12 text-white">
        <h1 className="text-5xl font-extrabold mb-4 flex justify-center items-center gap-3">
          Explore Our <span className="text-green-500">Exclusive</span> Products
        </h1>
        <p className="text-gray-600 mb-6">
          Discover high-quality Footwear curated just for you. Shop now and
          elevate your lifestyle!
        </p>
      </div>
      </motion.div>

      <InfiniteScroll
        dataLength={products.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4 className="text-center text-gray-600">Loading...</h4>}
        endMessage={
          <p className="text-center text-gray-600">No more products to show</p>
        }
        scrollThreshold={0.98}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((el, idx) => (
            <div
              key={idx}
              className="card bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="p-6">
                <ProductCard product={el} />
                <div className="flex justify-center mt-4">
                  <AddToWishList productId={el._id.toString()} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
    </motion.section>
  );
}
