"use client";

import { useEffect, useState } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownClockProps {
  targetDate: string;
}
const Clock: React.FC<CountdownClockProps> = ({ targetDate }) => {
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
    <div className='flex items-center gap-x-3 font-sans'>
      <div className='flex flex-col items-center'>
        <span className='font-semibold text-xs'>Days</span>
        <h4 className='font-bold text-3xl'>
          {String(timeLeft.days).padStart(2, "0")}
        </h4>
      </div>
      <div className='text-2xl text-[#DB4444]'>:</div>
      <div className='flex flex-col items-center'>
        <span className='font-semibold text-xs'>Hours</span>
        <h4 className='font-bold text-3xl'>
          {String(timeLeft.hours).padStart(2, "0")}
        </h4>
      </div>
      <div className='text-2xl text-[#DB4444]'>:</div>
      <div className='flex flex-col items-center'>
        <span className='font-semibold text-xs'>Minutes</span>
        <h4 className='font-bold text-3xl'>
          {String(timeLeft.minutes).padStart(2, "0")}
        </h4>
      </div>
      <div className='text-2xl text-[#DB4444]'>:</div>
      <div className='flex flex-col items-center'>
        <span className='font-semibold text-xs'>Seconds</span>
        <h4 className='font-bold text-3xl'>
          {String(timeLeft.seconds).padStart(2, "0")}
        </h4>
      </div>
    </div>
  );
};

export default Clock;
