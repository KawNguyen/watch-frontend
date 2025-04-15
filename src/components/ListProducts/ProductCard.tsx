import React from "react";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    price: string;
    oldPrice: string;
    description: string;
    images: string[];
  };
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/products/${product.id}`, { state: { product } });
  };
  return (
    <div
      className="group relative bg-white p-0 rounded-lg overflow-hidden cursor-pointer"
      onClick={handleClick}
    >
      <div className="absolute top-0 right-0 z-20 overflow-hidden w-[100px] h-[100px]">
        <div className="absolute top-2 right-[-30px] w-[110px] bg-red-500 text-white text-center text-xs font-bold py-1 rotate-45 shadow-md">
          Sale
        </div>
      </div>

      <div className="relative w-full h-80 overflow-hidden">
        {/* Image mặc định */}
        <img
          src={product.images[0]}
          alt={product.name}
          className=" w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0 "
        />

        {/* Hover Image */}
        <img
          src={product.images[1]}
          alt={`${product.name} Hover`}
          className=" absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />

        {/* Hover Icons */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-3 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <button className="w-10 h-10 bg-white rounded-full shadow flex items-center justify-center hover:bg-gray-100">
            <i className="fas fa-shopping-bag text-gray-700"></i>
          </button>
          <button className="w-10 h-10 bg-white rounded-full shadow flex items-center justify-center hover:bg-gray-100">
            <i className="fas fa-search text-gray-700"></i>
          </button>
          <button className="w-10 h-10 bg-white rounded-full shadow flex items-center justify-center hover:bg-gray-100">
            <i className="fas fa-heart text-gray-700"></i>
          </button>
        </div>
      </div>

      {/* Thông tin Product */}
      <div className="flex flex-col justify-center items-center text-center p-4 h-[120px]">
        <h3 className="text-base font-semibold line-clamp-2">{product.name}</h3>
        <div className="flex justify-center items-center w-full mt-2">
          <p className="text-red-500 font-bold text-sm pr-5">{product.price}</p>
          <p className="text-gray-500 line-through text-sm pl-5">
            {product.oldPrice}
          </p>
        </div>
      </div>
    </div>
  );
};
