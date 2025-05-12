import { Link } from "react-router-dom";
import Image from "./ui/image";

const BgAuth = () => {
  return (
    <div className="fixed h-full w-full">
      <Image src="/public/Images/bg-auth.webp" className="h-full w-full" />
      <div className="bg-black/70 absolute top-0 h-full w-full"></div>
      <div>
        <div className="absolute top-8 left-8">
          <Link to="/" className="text-white text-2xl font-bold">
            Luxwatch
          </Link>
        </div>
        <div className="absolute bottom-8 left-8 text-white">
          <p className="text-4xl font-bold">
            Discover the <br />
            World of Luxury
          </p>
          <p className="text-sm">
            Experience the finest selection of luxury watches
          </p>
        </div>
      </div>
    </div>
  );
};

export default BgAuth;
