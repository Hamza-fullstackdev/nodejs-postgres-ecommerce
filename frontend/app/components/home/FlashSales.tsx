import React from "react";
import Clock from "./Clock";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";

const FlashSales = () => {
  return (
    <section className='my-22'>
      <div>
        <div className='border-l-12 border-[#DB4444]'>
          <p className='text-[#DB4444] ml-3 font-semibold'>Today&apos;s</p>
        </div>
        <div className='my-3 flex items-center gap-5 justify-between'>
          <h3 className='text-3xl font-semibold'>Flash Sales</h3>
          <Clock targetDate='2025-11-22T23:59:59' />
        </div>
      </div>
      <div>
        <Carousel className='w-full h-[300px]'>
          <CarouselContent className='-ml-1'>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem
                key={index}
                className='relative pl-1 md:basis-1/2 lg:basis-1/3 xl:basis-1/4'
              >
                <div className='p-1'>
                  <div>
                    <div className='flex items-center justify-center p-6'>
                      <div>
                        <div className='w-[290px] h-[230px] bg-gray-50 flex items-center justify-center'>
                          <Image
                            src={"/static/product.png"}
                            alt='flash-sale'
                            width={100}
                            height={100}
                            className='object-cover size-auto'
                          />
                        </div>
                        <span className='absolute top-10 left-6 bg-[#DB4444] text-white text-sm px-3 py-1 rounded'>
                          -40%
                        </span>
                        <div className='absolute top-10 right-6 flex flex-col gap-3'>
                          <div className='bg-white p-2 rounded-full cursor-pointer'>
                            <CiHeart className='w-5 h-5' />
                          </div>
                          <div className='bg-white p-2 rounded-full cursor-pointer'>
                            <IoEyeOutline className='w-5 h-5' />
                          </div>
                        </div>
                        <div className='my-2'>
                          <h5 className='text-lg font-semibold'>
                            This is a product title
                          </h5>
                          <div className='my-1 flex items-center gap-x-3'>
                            <span className='text-[#DB4444] text-sm'>
                              $ 100
                            </span>
                            <span className='text-gray-400 text-sm line-through ml-2'>
                              $ 200
                            </span>
                          </div>
                          <div className='flex gap-1'>
                            {Array.from({ length: 5 }).map((_, index) => (
                              <FaStar
                                key={index}
                                className='text-yellow-400 w-4 h-4'
                              />
                            ))}
                            <span className='ml-2 text-sm'>(99)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <div className='mt-22 flex items-center justify-center'>
        <button className='bg-[#DB4444] text-white px-8 cursor-pointer py-3 text-sm rounded'>
          View All Products
        </button>
      </div>
    </section>
  );
};

export default FlashSales;
