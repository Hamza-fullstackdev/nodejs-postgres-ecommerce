import Image from "next/image";
import React from "react";

const categories = [
  {
    image: "/static/women.png",
    title: "Women's Collection",
    description: "Featured woman collections that give you another vibe.",
  },
  {
    image: "/static/freshner.png",
    title: "Speakers",
    description: "Amazon wireless speakers",
  },
  {
    image: "/static/gucci.png",
    title: "Perfumes",
    description: "GUCCI INTENSE OUD EDP",
  },
];
const Feature = () => {
  return (
    <section className='my-22'>
      <div>
        <div className='border-l-12 border-[#DB4444]'>
          <p className='text-[#DB4444] ml-3 font-semibold'>Featured</p>
        </div>
        <div className='my-3 flex items-center gap-5 justify-between'>
          <h3 className='text-3xl font-semibold'>New Arrival</h3>
        </div>
      </div>
      <div className='mt-6 grid grid-cols-1 md:grid-cols-2 gap-5'>
        <div className='relative w-full h-80 md:h-[500px] overflow-hidden bg-black'>
          <Image src='/static/ps5.png' alt='flash-sale' fill />

          <div className='absolute bottom-8 left-8 text-white w-[280px]'>
            <h4 className='font-semibold text-xl'>Playstation 5</h4>
            <p className='my-2'>
              Black and white version of PS5 coming this season
            </p>
            <button className='border-b border-white/70 hover:border-white'>
              Shop Now
            </button>
          </div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
          {categories.map((category, index) => (
            <div
              key={index}
              className={`relative w-full h-80 md:h-60 overflow-hidden bg-black ${
                index === 0 ? "md:col-span-2" : ""
              }`}
            >
              <Image src={category.image} alt={category.title} fill />

              <div className='absolute bottom-6 left-6 text-white max-w-[220px]'>
                <h4 className='font-semibold text-lg md:text-xl'>
                  {category.title}
                </h4>
                <p className='my-1 text-sm md:text-base'>
                  {category.description}
                </p>

                <button className='border-b border-white/70 hover:border-white'>
                  Shop Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Feature;
