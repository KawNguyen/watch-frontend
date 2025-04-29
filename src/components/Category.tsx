import { useNavigate } from "react-router-dom";
import Image from "./ui/image";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

const categories = [
  {
    title: "Men's Watch",
    subtitle: "Luxatch Collection",
    image:
      "https://luxatch-store-newdemo.myshopify.com/cdn/shop/files/h1bn1.jpg?v=1722307763&width=1077",
    alt: "Men's Luxury Watch Collection",
    path: "/products?gender=Men",
  },
  {
    title: "Women's Watch",
    subtitle: "Luxatch Collection",
    image:
      "https://luxatch-store-newdemo.myshopify.com/cdn/shop/files/h1bn2.jpg?v=1722309719&width=983",
    alt: "Women's Luxury Watch Collection",
    path: "/products?gender=Women",
  },
];

const Category = () => {
  const navigate = useNavigate();
  const handleCategoryClick = (category: string) => {
    navigate(category);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Shop By Category
          </h2>
          <div className="w-24 h-1 bg-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Explore our curated collections for men and women
          </p>
        </div>

        <div className="flex flex-col lg:flex-row justify-center items-center gap-8 lg:gap-12">
          {categories.map((category, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-xl max-w-xl w-full shadow-lg group"
            >
              <Image
                src={category.image}
                alt={category.alt}
                className="w-full object-cover transform group-hover:scale-110 transition duration-500 ease-in-out"
              />

              <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>

              <div className="absolute inset-0 flex flex-col justify-center items-end pr-10 text-white">
                <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium uppercase tracking-wider mb-2">
                  {category.subtitle}
                </span>
                <h3 className="text-xl md:text-3xl font-bold mb-4">
                  {category.title}
                </h3>
                <Button
                  onClick={() => handleCategoryClick(category.path)}
                  className="flex items-center gap-2 px-5 py-2 bg-white text-black rounded-md font-medium hover:bg-gray-200 transition shadow-md"
                >
                  <span className="text-xs font-medium uppercase">
                    Shop Now
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Category;
