import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

interface Category {
  name: string;
  img: string;
}

interface ThanhCategoryProps {
  categories: Category[];
}

export const ThanhCategory: React.FC<ThanhCategoryProps> = ({ categories }) => {
  return (
    <div className="container mx-auto px-4 relative">
      <Swiper
        navigation={{
          nextEl: ".swiper-button-next-custom",
          prevEl: ".swiper-button-prev-custom",
        }}
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
              <p className="text-sm font-medium text-white">{category.name}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation buttons */}
      <div className="swiper-button-prev-custom absolute top-1/2 left-2 transform -translate-y-1/2 z-10 cursor-pointer p-2 bg-gray-800 bg-opacity-90 rounded-full shadow-lg hover:bg-gray-700 hover:scale-110 transition-all duration-300">
        <i className="fas fa-chevron-left text-white text-lg"></i>
      </div>
      <div className="swiper-button-next-custom absolute top-1/2 right-2 transform -translate-y-1/2 z-10 cursor-pointer p-2 bg-gray-800 bg-opacity-90 rounded-full shadow-lg hover:bg-gray-700 hover:scale-110 transition-all duration-300">
        <i className="fas fa-chevron-right text-white text-lg"></i>
      </div>
    </div>
  );
};
