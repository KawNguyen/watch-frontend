import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Category } from "@/services/Services";
import "swiper/css";
import "swiper/css/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
        {categories.map((category) => (
          <SwiperSlide key={category.id}>
            <div className="flex flex-col items-center text-center space-y-2 hover:scale-105 transition-transform duration-300">
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white shadow-md hover:shadow-lg bg-white">
                <img
                  src={category.image}
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
      <div className="swiper-button-prev-custom absolute top-1/2 left-2 transform -translate-y-1/2 z-10 cursor-pointer p-2  rounded-full transition-all duration-300">
        <ChevronLeft />
      </div>
      <div className="swiper-button-next-custom absolute top-1/2 right-2 transform -translate-y-1/2 z-10 cursor-pointer p-2 rounded-full transition-all duration-300">
        <ChevronRight />
      </div>
    </div>
  );
};
