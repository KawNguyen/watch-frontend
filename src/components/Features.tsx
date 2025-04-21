import React from "react";
import {
  ShieldCheckIcon,
  TruckIcon,
  RefreshCwIcon,
  ClockIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Features = () => {
  const benefits = [
    {
      icon: <ShieldCheckIcon size={32} className="text-gray-900" />,
      title: "Authentic Guarantee",
      description:
        "Every timepiece comes with a certificate of authenticity and a 5-year warranty.",
    },
    {
      icon: <TruckIcon size={32} className="text-gray-900" />,
      title: "Free Shipping",
      description:
        "Enjoy complimentary express shipping on all orders worldwide.",
    },
    {
      icon: <RefreshCwIcon size={32} className="text-gray-900" />,
      title: "Easy Returns",
      description: "Not satisfied? Return within 30 days for a full refund.",
    },
    {
      icon: <ClockIcon size={32} className="text-gray-900" />,
      title: "Lifetime Support",
      description:
        "Our master watchmakers provide maintenance and repair services.",
    },
  ];

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
          Why Choose LUXWATCH
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <Card key={index} className="text-center">
              <CardContent className="pt-6">
                <div className="flex justify-center mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Features;
