import React from "react";
import { ThanhCategory } from "../Category/ThanhCategory";

interface Category {
  name: string;
  img: string;
}

interface HeroSectionProps {
  categories: Category[];
}

export const HeroSection: React.FC<HeroSectionProps> = ({ categories }) => {
  return (
    <div className="relative">
      <img
        src="https://luxatch-store-newdemo.myshopify.com/cdn/shop/files/breadcumb.jpg"
        alt="Slider"
        className="w-full h-[500px] object-cover"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white py-10">
        {/* Text Section */}
        <div className="text-center p-10 mb-4">
          <h1 className="text-4xl font-bold">Products</h1>
          <p className="mt-2 text-sm">
            <a href="/" className="hover:underline">
              Home
            </a>{" "}
            &gt; Products
          </p>
        </div>

        {/* Categories Carousel */}
        <ThanhCategory categories={categories} />
      </div>
    </div>
  );
};
