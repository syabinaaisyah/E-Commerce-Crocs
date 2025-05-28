"use client";

import { useState } from "react";

const bannerImages = [
  "https://www.crocs.co.id/media/wysiwyg/Classic_Collection_dekstop.jpg",
  "https://www.crocs.co.id/media/wysiwyg/Baya_Bayaband_Jan_2025_dekstop.jpg",
  "https://www.crocs.co.id/media/wysiwyg/Squid_Game_dekstop.jpg",
  "https://www.crocs.co.id/media/wysiwyg/wicked_dekstop.jpg",
  "https://www.crocs.co.id/media/wysiwyg/bluey_dekstop.jpg",
];

export default function Banner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + bannerImages.length) % bannerImages.length
    );
  };

  return (
    <section className="relative overflow-hidden bg-gray-800">
      <div className="relative">
        <img
          src={bannerImages[currentIndex]}
          alt={`Banner ${currentIndex + 1}`}
          className="w-full h-[450px] object-cover"
        />
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-900 bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 transition"
        >
          ❮
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-900 bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 transition"
        >
          ❯
        </button>
      </div>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {bannerImages.map((_, idx) => (
          <div
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              idx === currentIndex
                ? "bg-white"
                : "bg-gray-400 hover:bg-white transition"
            }`}
          ></div>
        ))}
      </div>
    </section>
  );
}
