import Advertisement from "@/components/Advertisement";
import BestSeller from "@/components/BestSeller";
import Category from "@/components/Category";
import Features from "@/components/Features";
import Slide from "@/components/HomeHero";

const HomePage = () => {
  return (
    <main className="space-y-10">
      <Slide />
      <Category />
      <BestSeller />
      <Features />
      <Advertisement />
    </main>
  );
};

export default HomePage;
