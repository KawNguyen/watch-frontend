import { Skeleton } from "@/components/ui/skeleton";

export const ProductCardSkeleton = () => {
  return (
    <div className="relative bg-white p-0 rounded-lg overflow-hidden shadow-md">
      {/* Góc "Sale" */}
      <div className="absolute top-0 right-0 z-20 overflow-hidden w-[100px] h-[100px]">
        <div className="absolute top-2 right-[-30px] w-[110px] bg-gray-300 text-white text-center text-xs font-bold py-1 rotate-45 shadow-md">
          {/* giả thanh SALE */}
        </div>
      </div>

      {/* Ảnh sản phẩm */}
      <div className="relative w-full h-80 overflow-hidden">
        <Skeleton className="w-full h-full object-cover" />

        {/* Hover icons (giả lập 3 nút tròn) */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-3">
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={i} className="w-10 h-10 rounded-full" />
            ))}
        </div>
      </div>

      {/* Thông tin sản phẩm */}
      <div className="flex flex-col justify-center items-center text-center p-4 h-[120px] space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <div className="flex justify-center items-center w-full space-x-4">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-12" />
        </div>
      </div>
    </div>
  );
};
