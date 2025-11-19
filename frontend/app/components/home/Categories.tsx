import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

const Categories = () => {
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
                        <div className='w-[290px] h-[230px] border border-gray-300 hover:bg-[#DB4444] hover:text-white transition duration-300 cursor-pointer flex items-center justify-center'>
                          <div className='flex flex-col gap-y-3'>
                            <Image
                              src={"/static/computer.png"}
                              alt='category'
                              width={100}
                              height={100}
                              className='size-auto'
                            />
                            <h3>Phones</h3>
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
