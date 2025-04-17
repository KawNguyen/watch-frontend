import { ChevronDown, Facebook, Instagram, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import emailjs from 'emailjs-com';
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";

const routes = [
  {
    title: "Our Products",
    children: [
      { path: "/allproducts", title: "All products" },
      { path: "/men", title: "Men" },
      { path: "/women", title: "Women" },

    ],
  },
  {
    title: "Support",
    children: [
      { path: "/contact", title: "Contact" },
      { path: "/about", title: "About Us" },
      { path: "/", title: "FAQ" },

    ],
  },
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

// const cards = [
//   { path_svg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtEsc02ToGGTTAGB6EJcLgsVMNjoGp6iGfMQ&s", name: "Credit Card" },
//   { path_svg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3COWM_ZKAhlFk1oegOaER5-eu5oqQz2888A&s", name: "JCB" },
//   { path_svg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPjT1k-UiypgI080po56u-2w9BIle0rngmvA&s", name: "Visa" },
// ];

const Footer = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  const { toast } = useToast();
  const [email, setEmail] = useState('');

  const handleEmailChange = (event: any) => {
    setEmail(event.target.value);  // Cập nhật giá trị email khi người dùng nhập
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();  // Ngừng hành động mặc định của form (không tải lại trang)

    // Gọi hàm gửi email (sử dụng emailjs hoặc cách khác)
    const templateParams = {
      user_email: email,
    };

    emailjs
      .send('service_kai5al5', 'template_42p8gqt', templateParams, 'hCS0IHarjxuWOm4BO')
      .then(() => {
        toast({
          title: "Sent!",
          description: "Thanks for registering.",
        });
        setEmail("");
      })
      .catch((error) => {
        console.error(error);
        toast({
          variant: "destructive",
          title: "Failed",
          description: "Check your email and try again.",
        });
      });
  };
  return (
    <div className="bg-white">
      <div className="container mx-auto text-black py-10 md:grid md:grid-cols-4 md:space-y-0 space-y-8 ">
        <div className="md:space-y-4 space-y-2 px-4 flex flex-col justify-between">
          <div className="font-bold text-xl">FROM LUXWATCH INC</div>
          <div>THE LUXURIOUS WATCH</div>
          <img
            src="https://uploads.turbologo.com/uploads/design/preview_image/68461085/preview_image20241130-1-sil8qo.png"
            alt="icon"
            className="w-40  aspect-square "
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
          <div className="text-lg md:text-2xl font-bold">Join the LUXWATCH family</div>
          <form onSubmit={handleSubmit} className="space-x-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="border rounded py-1 px-2 text-black"
              value={email}
              onChange={handleEmailChange}
              required
            />
            <button
              type="submit"
              className="py-1 px-2 bg-black text-white rounded hover:bg-slate-700"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>

      <div className="border-t-[1px]"></div>

      <div className="container mx-auto py-4 flex flex-col md:flex-row   md:flex justify-between items-center text-black">
        <div>
          <p>tranhailoc7@gmail.com</p>
        </div>
        <div>
          <p>khoanguyencool12@gmail.com</p>
        </div>
        <div>
          <p>danghoaian230903@gmail.com</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
