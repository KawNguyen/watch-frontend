import React, { useState } from "react";

interface Category {
  id: number;
  name: string;
  img: string;
}

interface ProductSidebarProps {
  categories: Category[];
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
}

export const ProductSidebar: React.FC<ProductSidebarProps> = ({
  categories,
  isSidebarOpen,
  setIsSidebarOpen,
}) => {
  // State để theo dõi giá trị của thanh trượt
  const [priceValue, setPriceValue] = useState(90);

  // Hàm xử lý khi kéo thanh trượt
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPriceValue(parseInt(e.target.value));
  };

  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-4/5 bg-white z-40 p-4 border-r shadow-lg transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:w-1/4 md:shadow-none`}
      >
        {/* Header với nút đóng trên mobile */}
        <div className="flex justify-between items-center mb-6 md:hidden">
          <h2 className="text-xl font-bold">Filters</h2>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="p-2 text-gray-500 hover:text-gray-700"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        <h2 className="text-lg font-bold mb-4">Categories</h2>
        <ul className="space-y-2">
          {categories.map((category, index) => (
            <li
              key={index}
              className="cursor-pointer text-gray-700 hover:text-blue-500 transition-colors"
            >
              {category.name}
            </li>
          ))}
        </ul>

        {/* Price Filter - Cập nhật để hiển thị giá trị thời gian thực */}
        <div className="mt-8">
          <h2 className="text-lg font-bold mb-4">Price</h2>
          <input
            type="range"
            min="0"
            max="100"
            value={priceValue}
            onChange={handlePriceChange}
            className="w-full accent-blue-500"
          />
          <p className="text-sm mt-2">Price: $0 - ${priceValue}</p>
        </div>

        {/* Color Filter */}
        <div className="mt-8">
          <h2 className="text-lg font-bold mb-4">Color</h2>
          <div className="flex space-x-2">  
            <div className="w-6 h-6 rounded-full bg-gray-700 cursor-pointer hover:ring-2 hover:ring-gray-700"></div>
            <div className="w-6 h-6 rounded-full bg-orange-700 cursor-pointer hover:ring-2 hover:ring-orange-700"></div>
            <div className="w-6 h-6 rounded-full bg-gray-300 cursor-pointer hover:ring-2 hover:ring-gray-300"></div>
          </div>
        </div>
      </div>

      {/* Overlay khi sidebar mở */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
        ></div>
      )}
    </>
  );
};
