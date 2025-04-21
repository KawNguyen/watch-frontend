import { useWatch } from "@/hooks/useWatch";
import { useState, useEffect } from "react";
import { ProductCard } from "../ProductCard";

interface RelevantProductsProps {
    currentProductId: string;
    category: string;
}

export const RelevantProducts = ({ currentProductId, category }: RelevantProductsProps) => {
    const { getAllWatches } = useWatch();
    const [relevantProducts, setRelevantProducts] = useState([]);

    useEffect(() => {
        const fetchRelevantProducts = async () => {
            try {
                const products = await getAllWatches();
                const filtered = products
                    .filter((product: any) =>
                        product.id !== currentProductId &&
                        product.category === category
                    )
                    .slice(0, 4);
                setRelevantProducts(filtered);
            } catch (error) {
                console.error("Failed to fetch relevant products:", error);
            }
        };

        fetchRelevantProducts();
    }, [currentProductId, category]);

    return (
        <div className="container  mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relevantProducts.map((product: any) => (
                    <ProductCard
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        images={product.images}
                    />
                ))}
            </div>
        </div>
    );
};