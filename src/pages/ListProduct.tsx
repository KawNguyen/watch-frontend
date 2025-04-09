import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper/modules";

export default function ListProduct() {
  const categories = [
    {
      name: "Casual Chic",
      img: "https://luxatch-store-newdemo.myshopify.com/cdn/shop/collections/1_32a064e6-7fc1-4a68-bb94-9c72d060daaf.jpg?v=1721981459&width=600",
    },
    {
      name: "Daily Dose",
      img: "https://luxatch-store-newdemo.myshopify.com/cdn/shop/collections/1_32a064e6-7fc1-4a68-bb94-9c72d060daaf.jpg?v=1721981459&width=600",
    },
    {
      name: "Future Focus",
      img: "https://luxatch-store-newdemo.myshopify.com/cdn/shop/collections/1_32a064e6-7fc1-4a68-bb94-9c72d060daaf.jpg?v=1721981459&width=600",
    },
    {
      name: "Limited Edition",
      img: "https://luxatch-store-newdemo.myshopify.com/cdn/shop/collections/1_32a064e6-7fc1-4a68-bb94-9c72d060daaf.jpg?v=1721981459&width=600",
    },
    {
      name: "Modern Marvels",
      img: "https://luxatch-store-newdemo.myshopify.com/cdn/shop/collections/1_32a064e6-7fc1-4a68-bb94-9c72d060daaf.jpg?v=1721981459&width=600",
    },
    {
      name: "Smart Watch",
      img: "https://luxatch-store-newdemo.myshopify.com/cdn/shop/collections/1_32a064e6-7fc1-4a68-bb94-9c72d060daaf.jpg?v=1721981459&width=600",
    },
    {
      name: "Casual Chic",
      img: "https://luxatch-store-newdemo.myshopify.com/cdn/shop/collections/1_32a064e6-7fc1-4a68-bb94-9c72d060daaf.jpg?v=1721981459&width=600",
    },
    {
      name: "Daily Dose",
      img: "https://luxatch-store-newdemo.myshopify.com/cdn/shop/collections/1_32a064e6-7fc1-4a68-bb94-9c72d060daaf.jpg?v=1721981459&width=600",
    },
    {
      name: "Future Focus",
      img: "https://luxatch-store-newdemo.myshopify.com/cdn/shop/collections/1_32a064e6-7fc1-4a68-bb94-9c72d060daaf.jpg?v=1721981459&width=600",
    },
    {
      name: "Limited Edition",
      img: "https://luxatch-store-newdemo.myshopify.com/cdn/shop/collections/1_32a064e6-7fc1-4a68-bb94-9c72d060daaf.jpg?v=1721981459&width=600",
    },
    {
      name: "Modern Marvels",
      img: "https://luxatch-store-newdemo.myshopify.com/cdn/shop/collections/1_32a064e6-7fc1-4a68-bb94-9c72d060daaf.jpg?v=1721981459&width=600",
    },
    {
      name: "Smart Watch",
      img: "https://luxatch-store-newdemo.myshopify.com/cdn/shop/collections/1_32a064e6-7fc1-4a68-bb94-9c72d060daaf.jpg?v=1721981459&width=600",
    },
  ];

  //product list nha
  const products = [
    {
      name: "Chronographs",
      price: "$60.00",
      oldPrice: "$70.00",
      img: "https://luxatch-store-newdemo.myshopify.com/cdn/shop/files/d1.jpg?v=1721978930&width=600",
    },
    {
      name: "Aviator Watches",
      price: "$60.00",
      oldPrice: "$70.00",
      img: "https://luxatch-store-newdemo.myshopify.com/cdn/shop/files/d1.jpg?v=1721978930&width=600",
    },
    {
      name: "Vintage Watches",
      price: "$90.00",
      oldPrice: "$100.00",
      img: "https://luxatch-store-newdemo.myshopify.com/cdn/shop/files/d1.jpg?v=1721978930&width=600",
    },
    {
      name: "Modern Watch",
      price: "$80.00",
      oldPrice: "$90.00",
      img: "https://luxatch-store-newdemo.myshopify.com/cdn/shop/files/d1.jpg?v=1721978930&width=600",
    },
    {
      name: "Luxury Watch",
      price: "$120.00",
      oldPrice: "$150.00",
      img: "https://luxatch-store-newdemo.myshopify.com/cdn/shop/files/d1.jpg?v=1721978930&width=600",
    },
    {
      name: "Classic Watch",
      price: "$50.00",
      oldPrice: "$60.00",
      img: "https://luxatch-store-newdemo.myshopify.com/cdn/shop/files/d1.jpg?v=1721978930&width=600",
    },
  ];

  const [selectedCategory, setSelectedCategory] = useState(null);
  return (
    <div className="w-full">
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

          {/* Categories Section */}
          <div className="container mx-auto px-4">
            <Swiper
              navigation={true}
              modules={[Navigation]}
              spaceBetween={30}
              slidesPerView={6}
              loop={true}
              breakpoints={{
                320: { slidesPerView: 2, spaceBetween: 20 },
                640: { slidesPerView: 3, spaceBetween: 20 },
                768: { slidesPerView: 4, spaceBetween: 30 },
                1024: { slidesPerView: 6, spaceBetween: 30 },
              }}
              className="mySwiper"
            >
              {categories.map((category, index) => (
                <SwiperSlide key={index}>
                  <div className="flex flex-col items-center text-center space-y-2 hover:scale-105 transition-transform duration-300">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white shadow-md hover:shadow-lg bg-white">
                      <img
                        src={category.img}
                        alt={category.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-sm font-medium text-white">
                      {category.name}
                    </p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
      <div className="flex">
        {/* Sidebar */}
        <div className="w-1/4 p-4 border-r">
          <h2 className="text-lg font-bold mb-4">Categories</h2>
          <ul className="space-y-2">
            {categories.map((category, index) => (
              <li
                key={index}
                className={`cursor-pointer ${
                  selectedCategory === category
                    ? "text-blue-500 font-semibold"
                    : "text-gray-700"
                }`}
                // onClick={() => setSelectedCategory(category.name)}
              >
                {category.name}
              </li>
            ))}
          </ul>

          {/* Price Filter */}
          <div className="mt-8">
            <h2 className="text-lg font-bold mb-4">Price</h2>
            <input type="range" min="0" max="100" className="w-full" />
            <p className="text-sm mt-2">Price: $0 - $90</p>
          </div>

          {/* Color Filter */}
          <div className="mt-8">
            <h2 className="text-lg font-bold mb-4">Color</h2>
            <div className="flex space-x-2">
              <div className="w-6 h-6 rounded-full bg-gray-700 cursor-pointer"></div>
              <div className="w-6 h-6 rounded-full bg-brown-500 cursor-pointer"></div>
              <div className="w-6 h-6 rounded-full bg-gray-300 cursor-pointer"></div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="w-3/4 p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Products</h2>
            <select className="border p-2 rounded">
              <option value="featured">Featured</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
            </select>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {products.map((product, index) => (
              <div
                key={index}
                className="border p-4 rounded hover:shadow-lg transition-shadow"
              >
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-full h-40 object-cover mb-4"
                />
                <h3 className="text-sm font-bold">{product.name}</h3>
                <p className="text-red-500 font-bold">{product.price}</p>
                <p className="text-gray-500 line-through text-sm">
                  {product.oldPrice}
                </p>
                <button className="mt-2 w-full bg-blue-500 text-white py-1 rounded hover:bg-blue-600">
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
