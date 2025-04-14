import React from "react";
import { Category } from "@/services/Services"; // Import Category từ Services

import { ThanhCategory } from "../Category/ThanhCategory";

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
        <div className="text-center p-10 mb-4">
          <h1 className="font-manrope text-4xl font-bold">Products</h1>
          <p className="mt-2 text-sm">
            <a href="/" className="hover:underline">
              Home
            </a>{" "}
            &gt; Products
          </p>
        </div>

        <ThanhCategory categories={categories} />
      </div>
    </div>
  );
};
