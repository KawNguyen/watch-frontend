import React, { useEffect, useState } from "react";
import { HeroSection } from "../components/ui/HeroSection";
import { ProductSidebar } from "../components/ListProducts/ProductSidebar";
import { ProductGrid } from "../components/ListProducts/ProductGrid";
import {
  Product,
  Category,
  getAllProducts,
  getAllCategories,
} from "@/services/Services";
import { ProductCardSkeleton } from "../components/ListProducts/ProductCardSkeleton";

export default function ListProduct() {
  // Products state
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [productError, setProductError] = useState<string | null>(null);

  // Categories state
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [categoryError, setCategoryError] = useState<string | null>(null);

  // Fetch Products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoadingProducts(true);
        const response = await getAllProducts();
        if (response.success) {
          setProducts(response.data as Product[]);
        } else {
          setProductError(response.error || "Không thể tải sản phẩm");
        }
      } catch (error) {
        setProductError("Đã xảy ra lỗi khi tải danh sách sản phẩm");
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchProducts();
  }, []);

  // Fetch Categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoadingCategories(true);
        const response = await getAllCategories();
        if (response.success) {
          setCategories(response.data as Category[]);
        } else {
          setCategoryError(response.error || "Không thể tải danh mục");
        }
      } catch (error) {
        setCategoryError("Đã xảy ra lỗi khi tải danh mục");
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  // Pagination & sidebar state
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Calculations
  const totalPages = Math.ceil(products.length / productsPerPage);
  const currentProducts = products.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  return (
    <div className="w-full">
      {/* Hero Section */}
      {loadingCategories ? (
        <div className="h-32 bg-gray-100 animate-pulse"></div>
      ) : (
        <HeroSection categories={categories} />
      )}

      <div className="flex">
        {/* Sidebar */}
        <ProductSidebar
          categories={categories}
          loading={loadingCategories}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />

        {/* Product Grid */}
        <div className="flex-1">
          {loadingProducts ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Array(8)
                .fill(0)
                .map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
            </div>
          ) : productError ? (
            <div className="p-4 bg-red-100 text-red-700 rounded">
              {productError}
            </div>
          ) : (
            <ProductGrid
              products={currentProducts}
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
              setIsSidebarOpen={setIsSidebarOpen}
            />
          )}
        </div>
      </div>

      {/* Footer */}
    </div>
  );
}
