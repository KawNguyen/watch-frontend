import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface ProductImagesProps {
  id: string;
  images: any[];
  name: string;
}

export const ProductCard = ({ id, images, name }: ProductImagesProps) => {
  return (
    <Link to={`/product/${id}`}>
      <Card className="overflow-hidden group hover:shadow-lg transition-shadow">
        <CardContent className="p-0">
          <div className="aspect-square overflow-hidden">
            <img
              src={images[0]?.url}
              alt={name}
              className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </CardContent>
        <CardHeader className="text-center">
          <h3 className="text-lg font-medium text-gray-900">{name}</h3>
        </CardHeader>
      </Card>
    </Link>
  );
};
