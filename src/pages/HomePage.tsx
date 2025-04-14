import Advertisement from "@/components/Advertisement";
import BestSeller from "@/components/BestSeller";
import Category from "@/components/Category";
import Slide from "@/components/HomeHero";

const HomePage = () => {
  return (
    <div>
      <Slide />
      <Category />
      <BestSeller />
      <Advertisement />
    </div>
  );
};

export default HomePage;
