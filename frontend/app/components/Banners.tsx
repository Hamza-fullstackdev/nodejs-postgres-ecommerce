import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { FaApple, FaArrowRight } from "react-icons/fa";

const Banners = () => {
  return (
    <div className='mt-5 w-full md:w-4/5'>
      <Carousel className='w-full h-[300px]'>
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <div className='w-full h-[350px] px-4 md:px-16 flex items-center justify-between bg-black'>
                <div className='w-1/2'>
                  <div className='flex items-center gap-3'>
                    <FaApple className='text-white w-10 h-10' />
                    <span className='text-white text-sm'>Iphone 14 Series</span>
                  </div>
                  <h2 className='text-4xl font-semibold text-white p-4 my-3 leading-relaxed tracking-wide whitespace-pre-line'>
                    Upto 10%{`\n`}Off Voucher
                  </h2>
                  <div>
                    <button className='ml-5 flex items-center gap-3 border-b border-white/70 text-white cursor-pointer'>
                      Shop Now <FaArrowRight />
                    </button>
                  </div>
                </div>
                <div className='relative w-1/2 h-[300px]'>
                  <Image src={"/static/banner-img.png"} alt='banner-img' fill />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default Banners;
