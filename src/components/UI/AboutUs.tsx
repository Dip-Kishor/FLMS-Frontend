import { Montserrat } from "next/font/google";
import React from "react";
const montserrat = Montserrat({ subsets: ["latin"] });

const Aboutus = () => {
  return (
    <>
      <section
        className="pt-20 h-[100vh]   bg-[url('/grunge_bg.jpg')] bg-cover bg-center"
        id="about"
      >
        <div className="container mx-auto">
          <h2
            className={`text-[3rem] tracking-[-2.72px] leading-[4.5rem] text-center font-[500] ${montserrat.className}`}
          >
            About Us
          </h2>
          <div className="grid grid-cols-2 items-center py-10 ">
            <div className="relative px-20">
              <div className="relative">
                <img
                  src="/about-image-2.jpg"
                  alt="about-image"
                  width="400px"
                  className="relative"
                />
                <img
                  src="/EFootball1.png"
                  alt="about-image"
                  width="400px"
                  className="absolute top-[40%] left-[40%]"
                />
              </div>
            </div>
            <div> 
                <h3 className="text-2xl font-semibold mb-4 text-[#474747]">Our Mission</h3> 
                <p className="text-md mb-6 text-[#3b3f44]"> Our EFootball Tournament platform is dedicated to bringing gamers together in a competitive and engaging environment. We aim to provide a seamless and fair gaming experience, fostering a strong community of eSports enthusiasts while promoting skill development and sportsmanship. 
                </p> 
                <h3 className="text-2xl font-semibold mb-4 text-[#474747]">What We Offer</h3> 
                <ul className="list-disc pl-5 text-md text-[#3b3f44]"> 
                    <li className="mb-2">Exciting tournaments with competitive gameplay.</li> 
                    <li className="mb-2">A seamless registration and matchmaking system.</li> 
                    <li className="mb-2">Real-time leaderboards and performance tracking.</li> <li>Community engagement through events and rewards.</li> 
                </ul> 
                <h3 className="text-2xl font-semibold mb-4 mt-6 text-[#474747]">Why Choose Us?</h3> <p className="text-md text-[#3b3f44]"> We combine technology and passion for eSports to create the ultimate EFootball Tournament experience. With fair competition, intuitive features, and a commitment to enhancing the gaming community, our platform is the go-to choice for players looking to test their skills and rise to the top. </p> 
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Aboutus;
