import { Montserrat } from "next/font/google";
import React from "react";

const montserrat = Montserrat({ subsets: ["latin"] });

const Aboutus = () => {
  return (
    <section
      className="pt-30 min-h-screen bg-[url('/grunge_bg.jpg')] bg-cover bg-center px-5"
      id="about"
    >
      <div className="container mx-auto">
        {/* Title */}
        <h2
          className={`text-3xl md:text-4xl tracking-tight leading-tight text-center font-medium ${montserrat.className}`}
        >
          About Us
        </h2>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 items-center py-10 gap-10">
          {/* Images */}
          <div className="relative flex justify-center">
            <div className="relative w-full max-w-xs sm:max-w-md md:max-w-lg grid grid-cols-2 md:grid-cols-1 gap-2">
              <img
                src="/about-image-2.jpg"
                alt="about-image"
                className="relative rounded-lg shadow-md w-full md:w-3/4"
              />
              <img
                src="/EFootball1.png"
                alt="overlay-image"
                className="md:absolute top-[40%] left-[50%] w-full md:w-3/4 rounded-lg shadow-lg"
              />
            </div>
          </div>

          {/* Text Content */}
          <div className="px-8 md:text-left">
            <h3 className="text-xl md:text-2xl font-semibold mb-4 text-[#474747]">
              Our Mission
            </h3>
            <p className="text-sm text-justify md:text-md mb-6 text-[#3b3f44]">
              Our EFootball Tournament platform is dedicated to bringing gamers together in a competitive and engaging environment. We aim to provide a seamless and fair gaming experience, fostering a strong community of eSports enthusiasts while promoting skill development and sportsmanship.
            </p>

            <h3 className="text-xl md:text-2xl font-semibold mb-4 text-[#474747]">
              What We Offer
            </h3>
            <ul className="list-disc pl-5 text-sm md:text-md text-[#3b3f44] text-justify">
              <li className="mb-2">Exciting tournaments with competitive gameplay.</li>
              <li className="mb-2">A seamless registration and matchmaking system.</li>
              <li className="mb-2">Real-time leaderboards and performance tracking.</li>
              <li>Community engagement through events and rewards.</li>
            </ul>

            <h3 className="text-xl md:text-2xl font-semibold mb-4 mt-6 text-[#474747] text-justify">
              Why Choose Us?
            </h3>
            <p className="text-sm md:text-md text-[#3b3f44]">
              We combine technology and passion for eSports to create the ultimate EFootball Tournament experience. With fair competition, intuitive features, and a commitment to enhancing the gaming community, our platform is the go-to choice for players looking to test their skills and rise to the top.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Aboutus;
