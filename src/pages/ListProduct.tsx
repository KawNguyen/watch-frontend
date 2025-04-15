import React, { useState } from "react";
import { HeroSection } from "../components/ui/HeroSection";
import { ProductSidebar } from "../components/ListProducts/ProductSidebar";
import { ProductGrid } from "../components/ListProducts/ProductGrid";

export default function ListProduct() {
  // Data
  const categories = [
    {
      name: "Casual Chic",
      img: "https://luxatch-store-newdemo.myshopify.com/cdn/shop/collections/1_32a064e6-7fc1-4a68-bb94-9c72d060daaf.jpg?v=1721981459&width=600",
    },
    {
      name: "Casual Chic",
      img: "https://luxatch-store-newdemo.myshopify.com/cdn/shop/collections/1_32a064e6-7fc1-4a68-bb94-9c72d060daaf.jpg?v=1721981459&width=600",
    },
    {
      name: "Casual Chic",
      img: "https://luxatch-store-newdemo.myshopify.com/cdn/shop/collections/1_32a064e6-7fc1-4a68-bb94-9c72d060daaf.jpg?v=1721981459&width=600",
    },
    {
      name: "Casual Chic",
      img: "https://luxatch-store-newdemo.myshopify.com/cdn/shop/collections/1_32a064e6-7fc1-4a68-bb94-9c72d060daaf.jpg?v=1721981459&width=600",
    },
    {
      name: "Casual Chic",
      img: "https://luxatch-store-newdemo.myshopify.com/cdn/shop/collections/1_32a064e6-7fc1-4a68-bb94-9c72d060daaf.jpg?v=1721981459&width=600",
    },
    {
      name: "Casual Chic",
      img: "https://luxatch-store-newdemo.myshopify.com/cdn/shop/collections/1_32a064e6-7fc1-4a68-bb94-9c72d060daaf.jpg?v=1721981459&width=600",
    },
    {
      name: "Casual Chic",
      img: "https://luxatch-store-newdemo.myshopify.com/cdn/shop/collections/1_32a064e6-7fc1-4a68-bb94-9c72d060daaf.jpg?v=1721981459&width=600",
    },
    {
      name: "Casual Chic",
      img: "https://luxatch-store-newdemo.myshopify.com/cdn/shop/collections/1_32a064e6-7fc1-4a68-bb94-9c72d060daaf.jpg?v=1721981459&width=600",
    },
    {
      name: "Casual Chic",
      img: "https://luxatch-store-newdemo.myshopify.com/cdn/shop/collections/1_32a064e6-7fc1-4a68-bb94-9c72d060daaf.jpg?v=1721981459&width=600",
    },
    {
      name: "Casual Chic",
      img: "https://luxatch-store-newdemo.myshopify.com/cdn/shop/collections/1_32a064e6-7fc1-4a68-bb94-9c72d060daaf.jpg?v=1721981459&width=600",
    },
    {
      name: "Casual Chic",
      img: "https://luxatch-store-newdemo.myshopify.com/cdn/shop/collections/1_32a064e6-7fc1-4a68-bb94-9c72d060daaf.jpg?v=1721981459&width=600",
    },
    {
      name: "Casual Chic",
      img: "https://luxatch-store-newdemo.myshopify.com/cdn/shop/collections/1_32a064e6-7fc1-4a68-bb94-9c72d060daaf.jpg?v=1721981459&width=600",
    },
    {
      name: "Casual Chic",
      img: "https://luxatch-store-newdemo.myshopify.com/cdn/shop/collections/1_32a064e6-7fc1-4a68-bb94-9c72d060daaf.jpg?v=1721981459&width=600",
    },
  ];

  const products = [
    {
      name: "Classic Watch",
      price: "$50.00",
      oldPrice: "$60.00",
      img: "https://luxatch-store-newdemo.myshopify.com/cdn/shop/files/d1.jpg?v=1721978930&width=600",
    },
    {
      name: "Classic Watch",
      price: "$50.00",
      oldPrice: "$60.00",
      img: "https://luxatch-store-newdemo.myshopify.com/cdn/shop/files/d1.jpg?v=1721978930&width=600",
    },
    {
      name: "Classic Watch",
      price: "$50.00",
      oldPrice: "$60.00",
      img: "https://luxatch-store-newdemo.myshopify.com/cdn/shop/files/d1.jpg?v=1721978930&width=600",
    },
    {
      name: "Classic Watch",
      price: "$50.00",
      oldPrice: "$60.00",
      img: "https://luxatch-store-newdemo.myshopify.com/cdn/shop/files/d1.jpg?v=1721978930&width=600",
    },
    {
      name: "Classic Watch",
      price: "$50.00",
      oldPrice: "$60.00",
      img: "https://luxatch-store-newdemo.myshopify.com/cdn/shop/files/d1.jpg?v=1721978930&width=600",
    },
    {
      name: "Classic Watch",
      price: "$50.00",
      oldPrice: "$60.00",
      img: "https://luxatch-store-newdemo.myshopify.com/cdn/shop/files/d1.jpg?v=1721978930&width=600",
    },
    {
      name: "Classic Watch",
      price: "$50.00",
      oldPrice: "$60.00",
      img: "https://luxatch-store-newdemo.myshopify.com/cdn/shop/files/d1.jpg?v=1721978930&width=600",
    },
    {
      name: "Classic Watch",
      price: "$50.00",
      oldPrice: "$60.00",
      img: "https://luxatch-store-newdemo.myshopify.com/cdn/shop/files/d1.jpg?v=1721978930&width=600",
    },
    {
      name: "Classic Watch",
      price: "$50.00",
      oldPrice: "$60.00",
      img: "https://luxatch-store-newdemo.myshopify.com/cdn/shop/files/d1.jpg?v=1721978930&width=600",
    },
    {
      name: "Classic Watch",
      price: "$50.00",
      oldPrice: "$60.00",
      img: "https://luxatch-store-newdemo.myshopify.com/cdn/shop/files/d1.jpg?v=1721978930&width=600",
    },
    {
      name: "Classic Watch",
      price: "$50.00",
      oldPrice: "$60.00",
      img: "https://luxatch-store-newdemo.myshopify.com/cdn/shop/files/d1.jpg?v=1721978930&width=600",
    },
    {
      name: "Classic Watch",
      price: "$50.00",
      oldPrice: "$60.00",
      img: "https://luxatch-store-newdemo.myshopify.com/cdn/shop/files/d1.jpg?v=1721978930&width=600",
    },
    {
      name: "Classic Watch",
      price: "$50.00",
      oldPrice: "$60.00",
      img: "https://luxatch-store-newdemo.myshopify.com/cdn/shop/files/d1.jpg?v=1721978930&width=600",
    },
    {
      name: "Classic Watch",
      price: "$50.00",
      oldPrice: "$60.00",
      img: "https://luxatch-store-newdemo.myshopify.com/cdn/shop/files/d1.jpg?v=1721978930&width=600",
    },
    {
      name: "Classic Watch",
      price: "$50.00",
      oldPrice: "$60.00",
      img: "https://luxatch-store-newdemo.myshopify.com/cdn/shop/files/d1.jpg?v=1721978930&width=600",
    },
    {
      name: "Classic Watch",
      price: "$50.00",
      oldPrice: "$60.00",
      img: "https://luxatch-store-newdemo.myshopify.com/cdn/shop/files/d1.jpg?v=1721978930&width=600",
    },
  ];

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;
  // Sidebar state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Calculations
  const totalPages = Math.ceil(products.length / productsPerPage);
  const currentProducts = products.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  return (
    <div className="w-full">
      {/* Hero Section with Category Carousel */}
      <HeroSection categories={categories} />

      {/* Main Content with Sidebar and Products */}
      <div className="flex">
        {/* Sidebar with Filters */}
        <ProductSidebar
          categories={categories}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />

        {/* Product Grid with Pagination */}
        <ProductGrid
          products={currentProducts}
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      </div>
    </div>
  );
}
