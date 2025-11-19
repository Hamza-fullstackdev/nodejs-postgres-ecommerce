import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";

const AllProducts = () => {
  return (
    <section className='my-22'>
      <div>
        <div className='border-l-12 border-[#DB4444]'>
          <p className='text-[#DB4444] ml-3 font-semibold'>Our Products</p>
        </div>
        <div className='my-3 flex items-center gap-5 justify-between'>
          <h3 className='text-3xl font-semibold'>Explore Our Products</h3>
        </div>
      </div>
      <div>
        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5'>
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className='relative'>
              <div>
                <div className='w-full h-[230px] bg-gray-50 flex items-center justify-center'>
                  <Image
                    src={"/static/product.png"}
                    alt='flash-sale'
                    width={100}
                    height={100}
                    className='object-cover size-auto'
                  />
                </div>
                <span className='absolute top-3 left-3 bg-[#DB4444] text-white text-sm px-3 py-1 rounded'>
                  -40%
                </span>
                <div className='absolute top-5 right-3 flex flex-col gap-3'>
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
                  <div className='mt-1 flex gap-x-1'>
                    <span className='text-[#DB4444] text-sm mr-2'>$ 100</span>
                    {Array.from({ length: 5 }).map((_, index) => (
                      <FaStar key={index} className='text-yellow-400 w-4 h-4' />
                    ))}
                    <span className='ml-2 text-sm'>(99)</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='mt-6 flex items-center justify-center'>
        <button className='bg-[#DB4444] text-white px-8 cursor-pointer py-3 text-sm rounded'>
          View All
        </button>
      </div>
    </section>
  );
};

export default AllProducts;
