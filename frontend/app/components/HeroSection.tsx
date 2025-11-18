import React from "react";
import Sidebar from "@/app/components/Sidebar";
import Banners from "@/app/components/Banners";

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
