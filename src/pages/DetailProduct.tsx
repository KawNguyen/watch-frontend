import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product, getProductById } from "@/services/ServicesProduct";
import { ProductCardSkeleton } from "@/components/ListProducts/ProductCardSkeleton";
import { useKeenSlider } from "keen-slider/react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import HoverZoom from "@/components/ui/HoverZoom";

import "keen-slider/keen-slider.min.css";

export default function DetailProduct() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    slideChanged(slider) {
      setCurrentIndex(slider.track.details.rel);
    },
    initial: 0,
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        if (id) {
          const response = await getProductById(id);
          if (response.success) {
            setProduct(response.data);
          } else {
            setError(response.error || "Không thể tải sản phẩm");
          }
        }
      } catch (err) {
        setError("Đã xảy ra lỗi khi tải sản phẩm");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="p-4">
        <ProductCardSkeleton />
      </div>
    );
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  if (!product) {
    return <div className="p-4">Không tìm thấy sản phẩm</div>;
  }

  return (
    <div className="p-4">
      <div className="max-w-screen-lg mx-auto flex flex-col md:flex-row gap-6">
        {/* Hình ảnh với Zoom */}
        <div className="w-full md:w-1/2">
          <div className="aspect-square w-full rounded-lg overflow-hidden flex items-center justify-center bg-gray-50">
            <Zoom>
              <HoverZoom
                src={product.images[currentIndex]}
                alt={product.name}
                scale={2.5}
              />
            </Zoom>
          </div>

          {/* Thumbnail */}
          <div className="flex gap-2 mt-4 justify-center flex-wrap">
            {product.images.map((img, index) => (
              <img
                key={index}
                src={img}
                onClick={() => setCurrentIndex(index)}
                className={`w-16 h-16 object-cover rounded cursor-pointer border ${
                  currentIndex === index ? "border-black" : "border-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Thông tin sản phẩm */}
        <div className="w-full md:w-1/2">
          <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
          <div className="flex items-center gap-4">
            <p className="text-red-500 text-xl">${product.price}</p>
            <p className="line-through text-gray-500">${product.oldPrice}</p>
          </div>
          <p className="mt-4 text-gray-700">{product.description}</p>

          <div className="mt-6 flex gap-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded">
              Add to Cart
            </button>
            <button className="bg-gray-500 text-white px-4 py-2 rounded">
              Buy It Now
            </button>
          </div>

          {/* Thông tin bổ sung */}
          <ul className="mt-6 space-y-4 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-blue-500">
                <i className="fas fa-store"></i>
              </span>
              <span>
                Pickup available at <strong>US store</strong>. Usually ready in
                24 hours.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500">
                <i className="fas fa-truck"></i>
              </span>
              <span>
                Estimate delivery times: <strong>12-26 days</strong>{" "}
                (International), <strong>3-6 days</strong> (United States).
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500">
                <i className="fas fa-undo"></i>
              </span>
              <span>
                Return within <strong>45 days</strong> of purchase. Duties &
                taxes are non-refundable.
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Sản phẩm liên quan */}
      <div className="mt-12 max-w-screen-lg mx-auto">
        <h2 className="text-xl font-bold mb-4">You Might Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
