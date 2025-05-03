import { ClockIcon, ShieldIcon, AwardIcon, RefreshCwIcon } from "lucide-react";
import { ProductTrailer } from "./ProductTrailer";

const features = [
  {
    icon: ClockIcon,
    title: "Precision Movement",
    description:
      "Swiss-made automatic movement with 28,800 vibrations per hour for exceptional accuracy.",
  },
  {
    icon: ShieldIcon,
    title: "Premium Materials",
    description:
      "Crafted from surgical-grade stainless steel and scratch-resistant sapphire crystal.",
  },
  {
    icon: AwardIcon,
    title: "Master Craftsmanship",
    description:
      "Hand-finished by master watchmakers with decades of experience in fine horology.",
  },
  {
    icon: RefreshCwIcon,
    title: "Lasting Heritage",
    description:
      "Built to be passed down through generations with proper care and regular servicing.",
  },
];
const specifications = [
  {
    label: "Power Reserve",
    value: "72 Hours",
  },
  {
    label: "Accuracy",
    value: "+/- 2 sec/day",
  },
  {
    label: "Warranty",
    value: "2 Years",
  },
];
export const ProductFeatures = ({ watch }: any) => {
  return (
    <section className="py-16 my-4 rounded-md bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900">
            Unparalleled Excellence
          </h2>
          <p className="mt-4 text-lg text-gray-600 w-full mx-auto">
            The
            <span className="m-1 strong font-bold">{watch?.name}</span>
            is not only just a watch but also a testament to precision and
            craftsmanship.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
              <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center mb-5">
                <feature.icon className="h-6 w-6 text-gray-900" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <div className="flex justify-around items-center border-t border-b border-gray-200 py-5 px-4">
            {specifications.map((spec, index) => (
              <div
                key={index}
                className={`text-left ${index !== specifications.length - 1 ? "mr-8" : ""}`}
              >
                <p className="text-sm font-medium text-gray-900">
                  {spec.label}
                </p>
                <p className="text-2xl font-bold">{spec.value}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full h-full mt-16">
          <ProductTrailer videoUrl={watch?.videoUrl} />
        </div>
      </div>
    </section>
  );
};
