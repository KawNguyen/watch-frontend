import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import Image from "./ui/image";

const poster = [
  {
    id: 1,
    url: "https://luxatch-store-newdemo.myshopify.com/cdn/shop/files/h1sl1.jpg",
    text: "Time is Precious Shop Watches Effortlessly.",
  },
  {
    id: 2,
    url: "https://luxatch-store-newdemo.myshopify.com/cdn/shop/files/h1sl2.jpg",
    text: "Luxury Redefined Second by Second.",
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1731759992339-1b079071ab89?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDV8fHxlbnwwfHx8fHw%3D",
    text: "Precision and Style ",
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1731759992338-f44243163ba4?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    text: "Timeless Prestige Seamlessly Yours.",
  },
];

const HomeHero = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div className="w-full mt-20">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        speed={2000}
        effect="fade"
        modules={[Autoplay, Pagination, EffectFade]}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        className="md:h-[800px] h-52"
      >
        {poster.map((item, index) => (
          <SwiperSlide key={index} className="relative">
            <Image
              src={item.url}
              className={`w-full h-full aspect-auto transition duration-1000 ${
                activeIndex === index
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-125"
              }`}
            />
            <div
              className={`absolute top-0 bg-gradient-to-r from-black w-[50%] h-full`}
            >
              <div
                className={`absolute w-full h-full top-0 content-center md:pl-40 pl-10 text-white transform transition-all duration-1200 ease-out  ${
                  activeIndex === index
                    ? "translate-y-0 opacity-100"
                    : "translate-y-60 opacity-0"
                }`}
              >
                <div className="flex flex-col space-y-4">
                  <span className="w-full md:text-7xl text-[12px]">
                    {item.text}
                  </span>
                  <Link
                    to="/"
                    className={`transform transition-all duration-1000 ease-out ${
                      activeIndex === index
                        ? "opacity-100 delay-1100"
                        : "opacity-0"
                    }`}
                  >
                    <Button className="text-black bg-white duration-300 hover:bg-black hover:text-white text-[12px] md:text-[16px] px-4 py-2 ">
                      Shop Now
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HomeHero;
