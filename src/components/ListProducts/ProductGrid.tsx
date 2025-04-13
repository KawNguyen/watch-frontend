import React from "react";
import { ProductCard } from "./ProductCard";
import { Pagination } from "./Pagination";

interface ProductGridProps {
  products: Array<{
    id: string;
    name: string;
    price: string;
    oldPrice: string;
    description: string;
    images: string[];
  }>;
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
  setIsSidebarOpen: (isOpen: boolean) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  currentPage,
  totalPages,
  setCurrentPage,
  setIsSidebarOpen,
}) => {
  return (
    <div className="w-full p-4">
      {/* Nút Filter hiển thị */}
      <div className="flex justify-between items-center mb-4">
        <div className="md:hidden">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2"
          >
            <i className="fas fa-filter"></i>
            <span>Filter</span>
          </button>
        </div>
        <h2 className="text-lg font-bold hidden md:block">Products</h2>
        <select className="border p-2 rounded">
          <option value="featured">Featured</option>
          <option value="price-low-high">Price: Low to High</option>
          <option value="price-high-low">Price: High to Low</option>
        </select>
      </div>

      {/* Product List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
};
