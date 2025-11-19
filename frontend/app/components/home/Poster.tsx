"use client";
import Image from "next/image";

import { useEffect, useState } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const targetDate = "2025-11-22T23:59:59";
const Poster = () => {
  const calculateTimeLeft = (): TimeLeft => {
    const difference = new Date(targetDate).getTime() - new Date().getTime();

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);
  return (
    <div className='w-full h-[500px] px-4 md:px-16 flex items-center justify-between bg-black'>
      <div className='w-1/2'>
        <div className='flex items-center gap-3'>
          <span className='text-green-500 font-semibold text-sm'>
            Categories
          </span>
        </div>
        <h2 className='text-4xl font-semibold text-white my-3 leading-relaxed tracking-wide whitespace-pre-line'>
          Enhance Your{`\n`}Music Experience
        </h2>
        <div className='my-5 flex items-center gap-x-3 font-sans'>
          <div className='flex flex-col items-center bg-white rounded-full px-5 py-3'>
            <span className='font-semibold text-xs'>Days</span>
            <h4 className='font-bold text-3xl'>
              {String(timeLeft.days).padStart(2, "0")}
            </h4>
          </div>
          <div className='flex flex-col items-center bg-white rounded-full px-5 py-3'>
            <span className='font-semibold text-xs'>Hours</span>
            <h4 className='font-bold text-3xl'>
              {String(timeLeft.hours).padStart(2, "0")}
            </h4>
          </div>
          <div className='flex flex-col items-center bg-white rounded-full px-5 py-3'>
            <span className='font-semibold text-xs'>Minutes</span>
            <h4 className='font-bold text-3xl'>
              {String(timeLeft.minutes).padStart(2, "0")}
            </h4>
          </div>
          <div className='flex flex-col items-center bg-white rounded-full px-5 py-3'>
            <span className='font-semibold text-xs'>Seconds</span>
            <h4 className='font-bold text-3xl'>
              {String(timeLeft.seconds).padStart(2, "0")}
            </h4>
          </div>
        </div>
        <div className='mt-8'>
          <button className='px-8 py-3 flex items-center gap-3 bg-green-500 text-white rounded cursor-pointer'>
            Buy Now
          </button>
        </div>
      </div>
      <div className='relative w-1/2 h-[300px]'>
        <Image src={"/static/speaker.png"} alt='banner-img' fill />
      </div>
    </div>
  );
};

export default Poster;
