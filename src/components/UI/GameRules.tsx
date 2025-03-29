import { Montserrat } from "next/font/google";
import React from "react";

const montserrat = Montserrat({ subsets: ["latin"] });

const Aboutus = () => {
  return (
    <section
      className="pt-20 min-h-screen bg-[url('/grunge_bg.jpg')] bg-cover bg-center px-5"
      id="rules"
    >
      <div className="container mx-auto">
        {/* Title */}
        <h2
          className={`text-3xl md:text-4xl tracking-tight leading-tight text-center font-medium ${montserrat.className}`}
        >
          Rules And Regulations
        </h2>
        <div className="flex gap-12 py-10 flex-wrap justify-around">
        <div className="relative w-[300px] ">
            <div className="bg-gray-200 shadow-lg w-full h-[30vh] rounded-2xl py-5 px-5 relative overflow-visible">
                <img 
                src="/Discord.png" 
                className="absolute w-[20%] -top-5 -left-5"
                />
                <div className="text-center">
                    <h1 className="py-1  font-bold text-green-800 text-3xl">Rule No.1</h1>
                    <h3 className="py-1  font-bold text-red-800">Tournament Discord Server</h3>
                    <p className="text-justify py-3 px-3">
                        Player must join the tournament Discord server. Failure to do so will result in disqualification.
                    </p>
                </div>
            </div>
        </div>
        <div className="relative w-[300px]">
            <div className="bg-gray-200 shadow-lg w-full h-[30vh] rounded-2xl py-5 px-5 relative overflow-visible">
                <img 
                src="/Camera.png" 
                className="absolute w-[20%] -top-5 -left-5"
                />
                <div className="text-center">
                    <h1 className="py-1  font-bold text-green-800 text-3xl">Rule No.2</h1>
                    <h3 className="py-1  font-bold text-red-800">Face Camera</h3>
                    <p className="text-justify py-3 px-3">
                        Players must have access to a face camera. Face cameras must remain on during the game.
                    </p>
                </div>
            </div>
        </div>
        <div className="relative w-[300px]">
            <div className="bg-gray-200 shadow-lg w-full h-[30vh] rounded-2xl py-5 px-5 relative overflow-visible">
                <img 
                src="/ScreenSharing.png" 
                className="absolute w-[20%] -top-5 -left-5"
                />
                <div className="text-center">
                    <h1 className="py-1  font-bold text-green-800 text-3xl">Rule No.3</h1>
                    <h3 className="py-1  font-bold text-red-800">Screen Sharing (Optional)</h3>
                    <p className="text-justify py-3 px-3">
                        One of the players is required to share their screen in Discord during gameplay.
                    </p>
                </div>
            </div>
        </div>
        <div className="relative w-[300px]">
            <div className="bg-gray-200 shadow-lg w-full h-[30vh] rounded-2xl py-5 px-5 relative overflow-visible">
                <img 
                src="/ConnectionFailure.png" 
                className="absolute w-[20%] -top-5 -left-5"
                />
                <div className="text-center">
                    <h1 className="py-1  font-bold text-green-800 text-3xl">Rule No.4</h1>
                    <h3 className="py-1  font-bold text-red-800">Connection Failure</h3>
                    <p className="text-justify py-3 px-3">
                        Connection failures caused by call interruptions, messages, notifications, etc., will not be considered.
                    </p>
                </div>
            </div>
        </div>
        <div className="relative w-[300px]">
            <div className="bg-gray-200 shadow-lg w-full h-[30vh] rounded-2xl py-5 px-5 relative overflow-visible">
                <img 
                src="/Punctuality.png" 
                className="absolute w-[20%] -top-5 -left-5"
                />
                <div className="text-center">
                    <h1 className="py-1  font-bold text-green-800 text-3xl">Rule No.5</h1>
                    <h3 className="py-1  font-bold text-red-800">Punctuality</h3>
                    <p className="text-justify py-3 px-3">
                        The tournament schedule is fixed. Players must be available at the specified time; otherwise, their opponent will win.
                    </p>
                </div>
            </div>
        </div>
        <div className="relative w-[300px]">
            <div className="bg-gray-200 shadow-lg w-full h-[30vh] rounded-2xl py-5 px-5 relative overflow-visible">
                <img 
                src="/Unavailability.png" 
                className="absolute w-[20%] -top-5 -left-5"
                />
                <div className="text-center">
                    <h1 className="py-1  font-bold text-green-800 text-3xl">Rule No.6</h1>
                    <h3 className="py-1  font-bold text-red-800">Unavailability</h3>
                    <p className="text-justify py-3 px-3">
                        If both players are unavailable during the scheduled match without prior information, each receive zero points.
                    </p>
                </div>
            </div>
        </div>
        <div className="relative w-[300px]">
            <div className="bg-gray-200 shadow-lg w-full h-[30vh] rounded-2xl py-5 px-5 relative overflow-visible">
                <img 
                src="/Payment.png" 
                className="absolute w-[20%] -top-5 -left-5"
                />
                <div className="text-center">
                    <h1 className="py-1  font-bold text-green-800 text-3xl">Rule No.7</h1>
                    <h3 className="py-1  font-bold text-red-800">Payment</h3>
                    <p className="text-justify py-3 px-3">
                        Players will only be registered for the tournament after completing the payment process.
                    </p>
                </div>
            </div>
        </div>
        <div className="relative w-[300px]">
            <div className="bg-gray-200 shadow-lg w-full h-[30vh] rounded-2xl py-5 px-5 relative overflow-visible">
                <img 
                src="/MatchDuration.png" 
                className="absolute w-[20%] -top-5 -left-5"
                />
                <div className="text-center">
                    <h1 className="py-1  font-bold text-green-800 text-3xl">Rule No.8</h1>
                    <h3 className="py-1  font-bold text-red-800">Match Time</h3>
                    <p className=" text-center py-3 px-3">
                        Group Stage - 8 Mins<br/>
                        Semi Final  - 8 Mins<br/>
                        Final - 10 Mins
                    </p>
                </div>
            </div>
        </div>
        </div>


        {/* <div className="grid grid-cols-1 md:grid-cols-2 items-center py-10 gap-10">
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
        </div> */}
      </div>
    </section>
  );
};

export default Aboutus;
