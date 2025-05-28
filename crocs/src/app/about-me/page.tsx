import React from "react";

export default function About() {
  return (
    <div className="bg-green-50 p-8 rounded-lg shadow-lg">
    <div className="max-w-4xl mx-auto text-center bg-white rounded-lg shadow-xl p-8">
      <div className="mb-8">
        <img
          src="/img-crocs.png" 
          alt="CROCS Shoes"
          className="w-3/5 h-auto mx-auto rounded shadow-1xl transition-transform duration-300 hover:scale-90"
        />
      </div>
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6">
          About CROCS: The Ultimate Comfort Shoes
        </h1>
        <p className="text-gray-700 mb-4 leading-relaxed">
        Born in Boulder, Colo. as a simple, comfortable boat shoe, today Crocs™ footwear can be found across the globe and in more than 120 styles for men, women and children. With distinct collections, Crocs offers colorful, lightweight comfort for any occasion and every season.

        All Crocs™ shoes are uniquely designed and manufactured using the company’s proprietary closed-cell resin, Croslite™, a technology that gives each pair of shoes the soft, comfortable, lightweight, non-marking and odor-resistant qualities that Crocs wearers know and love. Crocs™ footwear is ideal for casual wear, as well as for professional use and recreational activities.
        More than 100 million pairs of Crocs™ footwear have been sold. So what are you waiting for? “Feel the love™” and try a pair of Crocs™ shoes today. We promise your feet will thank you for it.
        </p>

        <div className="bg-green-50 p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Why Choose CROCS?
          </h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            CROCS is designed for people who value comfort without compromising
            on style. Our shoes are made from high-quality, lightweight, and
            durable materials, ensuring that every step you take is effortless.
            Whether you are strolling through the park, running errands, or
            relaxing at home, CROCS provides the perfect balance of support and
            flexibility.
          </p>
          <p className="text-gray-700 mb-4 leading-relaxed">
            With its water-friendly design, CROCS is perfect for all kinds of
            weather conditions—rain or shine! The slip-on style makes them easy
            to wear, while the breathable material keeps your feet fresh and dry
            throughout the day.
          </p>
        </div>

        <div className="bg-green-50 p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Our Story
          </h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Born out of the desire for a functional yet stylish shoe, CRECS was
            created by a team of passionate designers and footwear enthusiasts
            who wanted to make everyday wear more enjoyable. We were inspired by
            the versatility and ease of shoes like Crocs, but we wanted to take
            it a step further, combining the latest trends with superior comfort
            technology. CROCS shoes are not just about looks they are about
            creating an experience.
          </p>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Our journey began with a simple idea: to create a shoe that can be
            worn anywhere, at any time, by anyone. Today, CROCS continues to
            innovate, offering new designs, colors, and features, while always
            maintaining the core principles of comfort, convenience, and
            quality.
          </p>
        </div>

        <div className="bg-green-50 p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Join the CROCS Movement
          </h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            At CROCS, we believe that comfort is key, but style is equally
            important. Join thousands of happy customers who have made CROCS
            their go-to footwear. Whether you are on-the-go, at home, or hanging
            out with friends, CROCS provides the perfect combination of casual
            style and all-day comfort.
          </p>
        </div>
      </div>
    </div>
  );
}
