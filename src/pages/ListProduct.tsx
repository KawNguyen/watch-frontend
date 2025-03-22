export default function ListProduct() {
  return (
    <div className="w-full">
      {/* Slider Section */}
      <div className="relative">
        <img
          src="https://luxatch-store-newdemo.myshopify.com/cdn/shop/files/breadcumb.jpg"
          alt="Slider"
          className="w-full h-[400px] object-cover"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black bg-opacity-50">
          <h1 className="text-4xl font-bold">Modern Marvels</h1>
          <p className="mt-2 text-sm">
            <a href="/" className="hover:underline">
              Home
            </a>{" "}
            &gt; Modern Marvels
          </p>
        </div>
      </div>

      <div className="container mx-auto py-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {[
            { name: "Casual Chic", img: "https://via.placeholder.com/100" },
            { name: "Daily Dose", img: "https://via.placeholder.com/100" },
            { name: "Future Focus", img: "https://via.placeholder.com/100" },
            { name: "Limited Edition", img: "https://via.placeholder.com/100" },
            { name: "Modern Marvels", img: "https://via.placeholder.com/100" },
            { name: "Smart Watch", img: "https://via.placeholder.com/100" },
          ].map((product, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center space-y-2"
            >
              <div className="w-20 h-20 rounded-full overflow-hidden border border-gray-300">
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-sm font-medium">{product.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
