import React from "react";
import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";
import Link from "next/link";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"] });

const HeroBanner = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 h-[95vh]">
      {/* Left Side */}
      <div className="bg-[#F2ECDB] flex flex-col items-center justify-center relative w-full pt-20 lg:p-6">
        {/* <img
          src="/football-fire.png"
          alt="football"
          width="150px"
          className="absolute top-15 hidden lg:block lg:right-[5px] lg:w-[200px]"
        /> */}
        <div className="max-w-[90%] md:max-w-[500px] text-center md:text-left">
          <h1
            className={`text-3xl md:text-5xl lg:text-[4rem] tracking-tight leading-tight font-medium ${montserrat.className}`}
          >
            e-Football
            <br /> Tournament,
            <br /> Play with
            <br /> Passion
          </h1>
          <p className="py-3 text-sm md:text-base">
            Transforming your capacity into a whole different level.
          </p>
          <div className="py-3 flex flex-col md:flex-row gap-4">
            <Link href="#rules">
              <PrimaryButton name="Rules" />
            </Link>
            <Link href="/previousRecords">
              <SecondaryButton name="Previous Records" />
            </Link>
          </div>
          <div className="py-3 flex flex-col">
            <Link href="/playerRegistration">
              <button  className="border bg-[#4C6F35] text-[#fff] py-2 px-17 border-[#4C6F35] hover:bg-[#A77523] hover:text-white hover:border-[#A77523] ease-in duration-200" >Register For Tournament</button>
            </Link>
            </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="relative w-full">
        <img
          className="w-full object-cover h-full"
          src="/stadium1.jpg"
          alt="Stadium"
        />
          <div className="space-y-6 w-full lg:w-[300px] absolute lg:right-0 top-5 lg:top-55 z-10 flex justify-between lg:block">
          <div className="relative bg-[#F2ECDB] w-[170px] lg:w-[300px] text-center   p-2 lg:px-5 lg:py-2 shadow-2xl border border-gray-300 hover:scale-105 transform transition duration-300">
          <div className="absolute hidden lg:block left-0 top-1/2 -translate-y-1/2 -translate-x-full w-0 h-0 border-t-[70px] border-b-[69px] border-r-[70px] border-t-transparent border-b-transparent border-r-[#F2ECDB]"></div>
          {/* Top moving light */}
          <div className="absolute top-0 left-0 w-full h-2  bg-gradient-to-r from-green-500 via-blue-400 to-red-500 animate-gradient"></div>
          {/* Bottom moving light */}
          {/* <div className="absolute bottom-0 left-0 w-full h-2  bg-gradient-to-r from-red-500 via-green-400 to-blue-500 animate-gradient"></div> */}
            <h3 className="text-xl text-center font-bold text-gray-800 mb-2">Season 1</h3>
            <div className="flex justify-evenly w-[100%]">
              <div className="flex flex-col items-center">
                <img
                  className="w-10 h-10 lg:w-15 rounded-2xl lg:h-15"
                  src="/Sujan.jpg"
                  alt="Stadium"
                />
                <p className="text-gray-600">Winner</p>
              </div>
              <div className="flex flex-col items-center">
                <img
                  className="w-10 h-10 text-center lg:w-15 rounded-2xl lg:h-15  "
                  src="/Samrat.jpg"
                  alt="Stadium"
                />
                <p className="text-gray-600">Runner Up</p>
              </div>
            </div>
          </div>

          <div className="bg-[#F2ECDB]  p-2 lg:px-5 lg:py-2 w-[170px] lg:w-[300px]  shadow-2xl border border-gray-300 hover:scale-105 transform transition duration-300">
          {/* Glowing animated triangle */}
          <div className="absolute hidden lg:block left-0 top-1/2 -translate-y-1/2 -translate-x-full w-0 h-0 border-t-[70px] border-b-[69px] border-r-[70px] border-t-transparent border-b-transparent border-r-[#F2ECDB]"></div>
          {/* Top moving light */}
          <div className="absolute top-0 left-0 w-full h-2  bg-gradient-to-r from-green-500 via-blue-400 to-red-500 animate-gradient"></div>
          {/* Bottom moving light */}
          {/* <div className="absolute bottom-0 left-0 w-full h-2  bg-gradient-to-r from-red-500 via-green-400 to-blue-500 animate-gradient"></div> */}
            <h3 className="text-xl text-center font-bold text-gray-800 mb-2">Season 2</h3>
            <div className="flex justify-evenly w-[100%]">
              <div className="flex flex-col items-center">
                <img
                  className="w-10 h-10 lg:w-15 rounded-2xl lg:h-15"
                  src="/Dip.jpg"
                  alt="Stadium"
                />
                <p className="text-gray-600">Winner</p>
              </div>
              <div className="flex flex-col items-center">
                <img
                  className="w-10 h-10 lg:w-15 rounded-2xl lg:h-15"
                  src="/Sujan.jpg"
                  alt="Stadium"
                />
                <p className="text-gray-600">Runner Up</p>
              </div>
            </div>
          </div>

          <div className="bg-[#F2ECDB] hidden lg:block  lg:p-9 w-[170px] lg:w-[300px]  shadow-2xl border border-gray-300 hover:scale-105 transform transition duration-300">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full w-0 h-0 border-t-[68px] border-b-[67px] border-r-[70px] border-t-transparent border-b-transparent border-r-[#F2ECDB]"></div>
           {/* Top moving light */}
          <div className="absolute top-0 left-0 w-full h-2  bg-gradient-to-r from-green-500 via-blue-400 to-red-500 animate-gradient"></div>
          {/* Bottom moving light */}
          {/* <div className="absolute bottom-0 left-0 w-full h-2  bg-gradient-to-r from-red-500 via-green-400 to-blue-500 animate-gradient"></div> */}
            <h3 className="text-xl font-bold text-gray-800 mb-2">Season 3</h3>
            <p className="text-gray-600">Comming Soon...</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HeroBanner;
