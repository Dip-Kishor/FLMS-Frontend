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
            <Link href="/playerRegistration">
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
      </div>
    </div>
  );
};

export default HeroBanner;
