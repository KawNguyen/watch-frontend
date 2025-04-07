import { useState } from "react";
import Card from "./Card";

const products = [
    {
        image: "https://luxatch-store-newdemo.myshopify.com/cdn/shop/files/2_176ba832-cfe3-4eba-b56e-35b9061e889f.jpg?v=1721979767&width=600",
        name: "Mechanical Watches",
        price: "€65,95",
    },
    {
        image: "https://luxatch-store-newdemo.myshopify.com/cdn/shop/files/3_df5d4fba-adaf-466d-9807-d1618e340602.jpg?v=1721980091&width=600",
        name: "Elite Timepiece",
        price: "€65,95",
    },
    {
        image: "https://luxatch-store-newdemo.myshopify.com/cdn/shop/files/1_4410c75e-9adc-4559-ae61-e932b2cecfc1.jpg?v=1721979761&width=600",
        name: "Automatic Watches",
        price: "€56,95",
    },
    {
        image: "https://luxatch-store-newdemo.myshopify.com/cdn/shop/files/2_bd3d83b8-4600-4aed-8b86-0c2ce763f7bf.jpg?v=1721979980&width=600",
        name: "Alarm Watches",
        price: "€56,95",
    },
];

const categories = ["TOP RATING", "BEST SELLER", "SPECIAL OFFERS", "PROMOTION"];

const BestSeller: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState(categories[0]);

    return (
        <div className="container mx-auto px-4">
            {/* Danh mục */}
            <div className="w-full overflow-x-auto scroll-smooth">
                <div className="flex justify-start sm:justify-center w-fit mx-auto gap-4 sm:gap-6 md:gap-8 px-4 py-2">
                    {categories.map((category, index) => (
                        <div
                            key={index}
                            onClick={() => setActiveCategory(category)}
                            className={`px-4 py-2 text-sm sm:text-base md:text-lg rounded-md whitespace-nowrap transition-all duration-200 
                 ${activeCategory === category
                                    ? "bg-[#373A40] text-white"
                                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                                }`}
                        >
                            {category}
                        </div>
                    ))}
                </div>
            </div>
            {/* Hiển thị sản phẩm theo danh mục */}
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-x-20  md:px-16">
                {products.map((product, index) => (
                    <Card key={index} {...product} />
                ))}
            </div>
        </div>
    );
};

export default BestSeller;
