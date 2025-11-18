import React from "react";
import Sidebar from "@/app/components/home/Sidebar";
import Banners from "@/app/components/home/Banners";

const HeroSection = () => {
  return (
    <section>
      <div className='flex justify-between gap-5'>
        <Sidebar />
        <Banners />
      </div>
    </section>
  );
};

export default HeroSection;
