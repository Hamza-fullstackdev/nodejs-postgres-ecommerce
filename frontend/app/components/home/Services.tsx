import React from "react";
import { BiSupport } from "react-icons/bi";
import { SiAdguard } from "react-icons/si";
import { TbTruckDelivery } from "react-icons/tb";

const Services = () => {
  return (
    <section className='my-22'>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
        <div>
          <div className='w-fit mx-auto bg-black border-8 border-gray-400 p-2 rounded-full'>
            <TbTruckDelivery className='w-6 h-6 text-white' />
          </div>
          <div className='mt-5 text-center'>
            <h4 className='uppercase font-semibold'>Free and fast delivery</h4>
            <p className='my-1'>Free Delivery for all orders above $100</p>
          </div>
        </div>
        <div>
          <div className='w-fit mx-auto bg-black border-8 border-gray-400 p-2 rounded-full'>
            <BiSupport className='w-6 h-6 text-white' />
          </div>
          <div className='mt-5 text-center'>
            <h4 className='uppercase font-semibold'>24/7 CUSTOMER SERVICE</h4>
            <p className='my-1'>Friendly 24/7 customer support</p>
          </div>
        </div>
        <div>
          <div className='w-fit mx-auto bg-black border-8 border-gray-400 p-2 rounded-full'>
            <SiAdguard className='w-6 h-6 text-white' />
          </div>
          <div className='mt-5 text-center'>
            <h4 className='uppercase font-semibold'>MONEY BACK GUARANTEE</h4>
            <p className='my-1'>We reurn money within 30 days</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
