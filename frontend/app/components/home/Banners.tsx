"use client";
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
import useSWR from "swr";
import Link from "next/link";
import { fetcher, swrOptions } from "../fetch";
import { Spinner } from "@/components/ui/spinner";

interface Banners {
  id: number;
  heading: string;
  tagline: string;
  description: string;
  url: string;
  image: string;
}
const Banners = () => {
  const {
    data: banners,
    isLoading,
    error,
  } = useSWR<Banners[]>(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/banner/get-all`,
    fetcher,
    swrOptions
  );
  return (
    <div className='mt-5 w-full md:w-4/5'>
      {isLoading && (
        <div className='flex items-center justify-center'>
          <Spinner className='size-8' />
        </div>
      )}
      {error && (
        <p className='text-sm text-red-500'>
          {error?.message || "Something went wrong"}
        </p>
      )}
      <Carousel className='w-full h-[300px]'>
        <CarouselContent>
          {banners?.map((item, index) => (
            <CarouselItem key={index}>
              <div className='w-full h-[350px] px-4 md:px-16 flex items-center justify-between bg-black'>
                <div className='w-1/2'>
                  <div className='flex items-center gap-3'>
                    <FaApple className='text-white w-10 h-10' />
                    <span className='text-white text-sm'>{item.tagline}</span>
                  </div>
                  <h2 className='text-4xl font-semibold text-white my-3 leading-relaxed tracking-wide whitespace-pre-line'>
                    {item.heading}
                  </h2>
                  <div>
                    <Link href={item.url}>
                      <button className='flex items-center gap-3 border-b border-white/70 text-white cursor-pointer'>
                        Shop Now <FaArrowRight />
                      </button>
                    </Link>
                  </div>
                </div>
                <div className='relative w-1/2 h-[300px]'>
                  <Image
                    src={item.image}
                    alt={item.heading.split(" ").join("-")}
                    fill
                  />
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
