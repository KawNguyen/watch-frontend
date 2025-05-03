import Image from "@/components/ui/image";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface HeroBannerProps {
  title: string;
  description: string;
  imageUrl: string;
}

const HeroBanner = ({ title, description, imageUrl }: HeroBannerProps) => {
  return (
    <div className="relative">
      <Image src={imageUrl} alt="Banner" className="w-full object-cover" />
      <div className="absolute top-0 w-full h-full flex flex-col justify-center items-center">
        <h1 className="text-5xl font-bold text-white mb-4">{title}</h1>
        <p className="text-lg text-gray-300 mb-4">{description}</p>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink
                href="/"
                className=" text-white hover:text-gray-300"
              >
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-white" />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-white">Products</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
};

export default HeroBanner;
