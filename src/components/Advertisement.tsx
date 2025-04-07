import React from "react";
interface Watch {
    id: number;
    image: string;
    alt: string;
}
const watches: Watch[] = [
    { id: 1, image: "https://i.pinimg.com/736x/2f/a8/2e/2fa82ea3b118054689825ddb20fb1008.jpg", alt: "Brown leather watch" },
    { id: 2, image: "https://i.pinimg.com/736x/b7/06/2b/b7062b84dca392cc8b0f23b443505153.jpg", alt: "Gold bracelet watch" },
    { id: 3, image: "https://i.pinimg.com/736x/72/bd/42/72bd4262f2c518b60d330e0cbaadb92e.jpg", alt: "Square gold watch" },
    { id: 4, image: "https://i.pinimg.com/736x/64/6e/db/646edbb4c44958167b5307c2ff0422f9.jpg", alt: "Square gold watch" },

];
const Advertisement: React.FC = () => {
    return (
        <section className="container mx-auto py-8 text-center">
            <h1 className="text-4xl font-bold mb-4">Hand-picked</h1>
            <p className="text-gray-500 mb-8">
                AI BiET GHI CÁI GÌ THÌ CMT BÊN DƯỚI.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-4 md:px-16">
                {watches.map((watch) => (
                    <div key={watch.id} className="relative group">
                        <img
                            src={watch.image}
                            alt={watch.alt}
                            className="w-full aspect-[4/5] object-cover rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105"
                        />

                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black bg-opacity-20 rounded-lg transition-opacity duration-300 group-hover:scale-105">
                            {/* <button className="bg-white p-2 rounded-lg shadow-lg text-black font-semibold text-lg">有趣</button> */}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Advertisement;
