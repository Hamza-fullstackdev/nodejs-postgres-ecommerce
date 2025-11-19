import HeroSection from "@/app/components/home/HeroSection";
import FlashSales from "@/app/components/home/FlashSales";
import Categories from "@/app/components/home/Categories";
import BestSelling from "@/app/components/home/BestSelling";
import Poster from "@/app/components/home/Poster";
import AllProducts from "@/app/components/home/AllProducts";
import Feature from "@/app/components/home/Feature";
import Services from "@/app/components/home/Services";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FlashSales />
      <Categories />
      <BestSelling />
      <Poster />
      <AllProducts />
      <Feature />
      <Services />
    </>
  );
}
