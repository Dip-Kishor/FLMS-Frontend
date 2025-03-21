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
        <img
          src="/football-fire.png"
          alt="football"
          width="250px"
          className="absolute top-0 right-5 hidden md:block lg:right-[50px] lg:w-[300px]"
        />
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
            <Link href="#about">
              <PrimaryButton name="Explore" />
            </Link>
            <Link href="/playerRegistration">
              <SecondaryButton name="Register for Tournament" />
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
