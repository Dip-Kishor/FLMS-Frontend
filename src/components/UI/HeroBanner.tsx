import React from 'react'
import PrimaryButton from './PrimaryButton'
import SecondaryButton from './SecondaryButton'
import Link from "next/link";
import { Montserrat } from "next/font/google";
const montserrat = Montserrat({ subsets: ["latin"] });


const HeroBanner = () => {
  return (
    <div className="grid lg:grid-cols-2 h-[95vh]">
      <div className="bg-[#dbe9e2] flex flex-col items-center justify-center relative w-full">
        <img
          src="/football-fire.png"
          alt="grain"
          width="300px"
          className="absolute top-[0px] right-[50px]"
        />
        <div className="w-[500px] ">
          <h1
            className={`text-[4rem] tracking-[-2.72px] leading-[4.5rem] font-[500] ${montserrat.className}`}
          >
            e-Football
            <br /> Tournament,
            <br /> Play with
            <br /> Passion
          </h1>
          <p className="py-3">
          {/* <img

          className=""
          src="Efootball-landscape.jpg"
        /> */}
            Transforming your capacity into the whole different level.
          </p>
          <div className="py-3 flex gap-4">
            <Link href="#about">
              <PrimaryButton name="Explore" />
            </Link>
            <Link href="/playerRegistration">
              <SecondaryButton name="Register for Tournament" />
            </Link>
          </div>
          
        </div>
      </div>
      <div className="relative">
        <img
            className="w-full object-cover h-full"
            src="/stadium1.jpg"
            alt="Stadium"
        />

  <div className="absolute top-50 left-30 bg-transparent p-4 rounded shadow-lg text-center">
    <img
      className="w-50 h-50 object-cover rounded"
      src="/Sujan-Photoroom.png"
      alt="Image 1"
    />
    <p className="text-2xl font-bold text-white">Sujan Dahal</p>
    <p className="text-lg font-bold text-white">Season 1 Winner</p>
  </div>

  <div className="absolute top-50 right-30 bg-transparent p-4 rounded shadow-lg text-center">
    <img
      className="w-50 h-50 object-cover rounded"
      src="/Dip-Photoroom.png"
      alt="Image 2"
    />
   <p className="text-2xl font-bold text-white">Dip Regmi</p>
   <p className="text-lg font-bold text-white">Season 2 Winner</p>
  </div>
</div>

    </div>
  )
}

export default HeroBanner