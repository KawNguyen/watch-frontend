import { ChevronDown, Facebook, Instagram, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const routes = [
    {
        title: "Shop",
        children: [
            { path: "/supplement", title: "Supplement" },
            { path: "/about", title: "About Us" },
            { path: "/contact", title: "Contact" },
        ],
    },
    // {
    //     title: "Payment",
    //     children: [
    //         { path: "/guide-payment", title: "Guide" },
    //     ],
    // },
    {
        title: "Policy",
        children: [
            { path: "/term-of-use", title: "Term of use" },
            { path: "/privacy-policy", title: "Privacy Policy" },
            { path: "/shipping-return", title: "Shipping And Returns" },
            { path: "/refund-policy", title: "Refund policy" },
        ],
    },
];

const icons = [
    {
        icon_social: <Facebook size={24} />,
        url: "https://www.facebook.com/iambot710?locale=vi_VN",
    },
    {
        icon_social: <Instagram size={24} />,
        url: "https://www.instagram.com/iamkhoa29/",
    },
    {
        icon_social: <Youtube size={24} />,
        url: "https://www.youtube.com/@hailoc3403",
    },
];

const cards = [
    { path_svg: "/images/svg/credit-card.svg", name: "Credit Card" },
    { path_svg: "/images/svg/jcb-card.svg", name: "JCB" },
    { path_svg: "/images/svg/paypal-card.svg", name: "Paypal" },
    { path_svg: "/images/svg/visa-card.svg", name: "Visa" },
];

const Footer = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleAccordion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="bg-white">
            <div className="container mx-auto text-black py-10 md:grid md:grid-cols-4 md:space-y-0 space-y-8 ">
                <div className="md:space-y-4 space-y-2 px-4 flex flex-col justify-between">
                    <div className="font-bold text-xl">FROM THE RAW GROUP</div>
                    <div>PROVIDING THE BEST SUPPLEMENT</div>
                    <img
                        src="/images/iconweb2.png"
                        alt="icon"
                        className="w-32 aspect-square "
                    />
                    <div className="flex space-x-4">
                        {icons.map((icon, index: number) => (
                            <div key={index}>
                                <a href={icon.url} className="hover:text-secondary-600">
                                    {icon.icon_social}
                                </a>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="md:grid grid-cols-3 col-span-2">
                    {routes.map((route, index: number) => (
                        <div key={index} className="md:px-0 px-4">
                            <div className="mb-4 font-bold hidden md:block text-xl">
                                {route.title}
                            </div>

                            <div
                                className="mb-4 font-bold cursor-pointer flex justify-between items-center md:hidden"
                                onClick={() => toggleAccordion(index)}
                            >
                                {route.title}
                                <span
                                    className={`transition-transform duration-300 ${openIndex === index ? "rotate-180" : "rotate-0"
                                        }`}
                                >
                                    <ChevronDown size={24} />
                                </span>
                            </div>

                            <div className="md:flex hidden flex-col space-y-2 mb-4 ">
                                {route.children.map((subRoute, subIndex: number) => (
                                    <div key={subIndex} className="relative group">
                                        <Link
                                            to={subRoute.path}
                                            className="text-black group-hover:text-secondary-600 no-underline relative"
                                        >
                                            {subRoute.title}
                                            <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-secondary-600 transition-all ease-in-out duration-300 group-hover:w-full"></span>
                                        </Link>
                                    </div>
                                ))}
                            </div>

                            <div
                                className={`overflow-hidden transition-all duration-500 ease-in-out ${openIndex === index ? "max-h-[500px]" : "max-h-0"
                                    }`}
                            >
                                {route.children && route.children.length > 0 && (
                                    <div className="flex flex-col space-y-2 mb-4">
                                        {route.children.map((subRoute, subIndex: number) => (
                                            <div key={subIndex} className="relative group">
                                                <Link
                                                    to={subRoute.path}
                                                    className="text-black hover:text-gray-400 no-underline relative"
                                                >
                                                    {subRoute.title}
                                                    <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-gray-400 transition-all ease-in-out duration-500 group-hover:w-full"></span>
                                                </Link>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="space-y-4 md:px-0 px-4">
                    <div>Subscribe to get news and special offers.</div>
                    <div className="space-x-4">
                        <input
                            type="text"
                            placeholder="Enter your email"
                            className="border rounded py-1 px-2 text-black "
                        />
                        <button className="py-1 px-2 bg-black text-white rounded hover:bg-slate-700">
                            Sign Up
                        </button>
                    </div>
                </div>
            </div>

            <div className="border-t-[1px]"></div>

            <div className="container mx-auto md:flex justify-between items-center text-black">
                <div className="flex space-x-2 py-4 md:px-0 px-4">
                    {cards.map((card, index: number) => (
                        <div key={index}>
                            <img src={card.path_svg} alt={card.name} className="h-10 w-10" />
                        </div>
                    ))}
                </div>
                <div className="text-[12px] md:px-0 px-4 md:pb-0 pb-4">
                    2024 || tranhailoc7@gmail.com || khoanguyencool12@gmail.com ||
                </div>
            </div>
        </div>
    );
};

export default Footer;
