declare module "swiper/css";
declare module "swiper/css/pagination";
declare module "swiper/css/effect-coverflow";
declare module "swiper/css/navigation";
declare module "swiper/css/effect-fade";

interface LoginCredentials {
  email: string;
  password: string;
  remember: boolean;
}

type WatchGender = "MEN" | "WOMEN" | "UNISEX";

interface WatchData {
  name: string;
  description: string;
  price: number;
  gender: WatchGender;
  brandId: string;
  materialId: string;
  bandMaterialId: string;
  movementId: string;
  diameter: number;
  waterResistance: number;
  warranty: number;
  videoUrl: string;
  images: { url: string }[];
}

interface UpdateWatchData extends WatchData {
  id: string;
}

interface CartItemType {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
  quantity: number;
}

interface FavoriteItemType {
  id: number;
  title: string;
  description: string;
  image: string;
}

interface OrderType {
  id: string;
  date: string;
  status: "pending" | "processing" | "shipped" | "delivered";
  products: {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
  }[];
}

interface CartItem  {
  id: string;
  watchId: string;
  quantity: number;
  watch: {
      title: string;
      description: string;
      image: string;
      price: number;
  };
}
