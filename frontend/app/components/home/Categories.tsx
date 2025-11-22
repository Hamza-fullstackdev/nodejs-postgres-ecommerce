"use client";
import useSWR from "swr";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Spinner } from "@/components/ui/spinner";
interface Categories {
  name: string;
  slug: string;
  image: string;
}
const Categories = () => {
  const {
    data: categories,
    error,
    isLoading,
  } = useSWR<Categories[]>(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/category/get-all`
  );
  return (
    <section className='my-22'>
      <div>
        <div className='border-l-12 border-[#DB4444]'>
          <p className='text-[#DB4444] ml-3 font-semibold'>Categories</p>
        </div>
        <div className='my-3 flex items-center gap-5 justify-between'>
          <h3 className='text-3xl font-semibold'>Browse By Categories</h3>
        </div>
      </div>
      <div>
        {isLoading && (
          <div className='flex items-center justify-center'>
            <Spinner className='size-8' />{" "}
          </div>
        )}
        <Carousel className='w-full h-[300px]'>
          <CarouselContent className='-ml-1'>
            {categories?.map((item, index) => (
              <CarouselItem
                key={index}
                className='relative pl-1 md:basis-1/2 lg:basis-1/3 xl:basis-1/4'
              >
                <div className='p-1'>
                  <div>
                    <div className='flex items-center justify-center p-6'>
                      <div>
                        <div
                          className='w-[290px] h-[230px] bg-cover object-cover cursor-pointer flex items-center justify-center'
                          style={{ backgroundImage: `url(${item.image})` }}
                        >
                          <div className='flex flex-col gap-y-3'>
                            <h3 className='text-white'>{item.name}</h3>
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
    </section>
  );
};

export default Categories;
