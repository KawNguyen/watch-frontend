const Category = () => {
  return (
    <div className="container my-10 mx-auto flex flex-col md:flex-row justify-center items-center gap-10 p-4">
      <div className="relative overflow-hidden rounded-lg max-w-xl group ">
        <img
          src="https://luxatch-store-newdemo.myshopify.com/cdn/shop/files/h1bn1.jpg?v=1722307763&width=1077"
          alt="Men's Best Watch"
          className="w-full h-full object-cover transform group-hover:scale-110 transition duration-300"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-end pr-10 text-white">
          <h2 className="text-xs md:text-sm  uppercase opacity-90">
            Luxatch Shop
          </h2>
          <h3 className="text-xl md:text-3xl font-bold mt-2">Men's Watch</h3>
          <button className="mt-4 px-5 py-2 text-xs font-medium uppercase bg-white text-black rounded-md shadow-md hover:bg-gray-200 transition">
            Shop Now
          </button>
        </div>
      </div>
      <div className="relative overflow-hidden rounded-lg max-w-xl group">
        <img
          src="https://luxatch-store-newdemo.myshopify.com/cdn/shop/files/h1bn2.jpg?v=1722309719&width=983"
          alt="Women's Best Watch"
          className="w-full h-full object-cover transform group-hover:scale-110 transition duration-300"
        />
        <div className=" absolute inset-0 flex flex-col justify-center items-end pr-10 text-white">
          <h2 className="text-xs md:text-sm  uppercase opacity-90">
            Luxatch Shop
          </h2>
          <h3 className="text-xl md:text-3xl font-bold mt-2">Women's Watch</h3>
          <button className="mt-4 px-5 py-2 text-xs font-medium uppercase bg-white text-black rounded-md shadow-md hover:bg-gray-200 transition">
            Shop Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Category;
