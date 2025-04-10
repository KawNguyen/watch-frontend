import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  setCurrentPage,
}) => {
  return (
    <div className="flex justify-center items-center mt-8 space-x-2">
      {/* Nút Previous */}
      <button
        onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className={`w-8 h-8 flex items-center justify-center rounded-full ${
          currentPage === 1
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-white text-gray-700 hover:bg-gray-100"
        }`}
      >
        <i className="fas fa-chevron-left text-sm"></i>
      </button>

      {/* Trang đầu tiên */}
      <button
        onClick={() => setCurrentPage(1)}
        className={`w-8 h-8 flex items-center justify-center rounded-full ${
          currentPage === 1
            ? "bg-gray-300 text-black font-bold"
            : "bg-white text-gray-700 hover:bg-gray-100"
        }`}
      >
        1
      </button>

      {/* Dấu "..." nếu cần */}
      {currentPage > 3 && <span className="text-gray-500">...</span>}

      {/* Các số trang xung quanh trang hiện tại */}
      {Array.from({ length: totalPages }).map((_, i) => {
        const page = i + 1;
        if (
          page !== 1 &&
          page !== totalPages &&
          Math.abs(page - currentPage) <= 1
        ) {
          return (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-8 h-8 flex items-center justify-center rounded-full ${
                currentPage === page
                  ? "bg-gray-300 text-black font-bold"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          );
        }
        return null;
      })}

      {/* Dấu "..." nếu cần */}
      {currentPage < totalPages - 2 && (
        <span className="text-gray-500">...</span>
      )}

      {/* Trang cuối cùng */}
      {totalPages > 1 && (
        <button
          onClick={() => setCurrentPage(totalPages)}
          className={`w-8 h-8 flex items-center justify-center rounded-full ${
            currentPage === totalPages
              ? "bg-gray-300 text-black font-bold"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          {totalPages}
        </button>
      )}

      {/* Nút Next */}
      <button
        onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        className={`w-8 h-8 flex items-center justify-center rounded-full ${
          currentPage === totalPages
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-white text-gray-700 hover:bg-gray-100"
        }`}
      >
        <i className="fas fa-chevron-right text-sm"></i>
      </button>
    </div>
  );
};
