import React from "react";
import { BASE_URL } from "@/constants/appl.constant";
import { Montserrat } from "next/font/google";
const montserrat = Montserrat({ subsets: ["latin"] });


enum Gender {
    Male = 0,
    Female = 1,
    Other = 2,
  }

  const getGenderLabel = (gender: number): string => {
    switch (gender) {
      case Gender.Male:
        return "Male ♂️";
      case Gender.Female:
        return "Female ♀️";
      case Gender.Other:
        return "Other 🌈";
      default:
        return "Unknown";
    }
  };
  
interface Player {
  id: number;
  name: string;
  email: string;
  gender: string;
  eFootballId: string;
  inGameName: string;
  imageUrl?: string;
  isApproved: boolean;
}

interface PlayersProps {
  players: Player[];
}

const Players: React.FC<PlayersProps> = ({ players }) => {
  return (
    <section
  className="pt-20  min-h-screen bg-[url('/grunge_bg.jpg')] bg-cover bg-center"
  id="players"
>
  <div className="container mx-auto px-6">
    {/* Title */}
    <h2
            className={`text-[3rem] tracking-[-2.72px] leading-[4.5rem] text-center font-[500] pb-14 ${montserrat.className}`}
          >
            Players List
          </h2>

    {/* Players List */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-auto px-4">
      {players.length === 0 ? (
        <p className="text-center text-white text-lg">No players registered.</p>
      ) : (
        players.map((player) => (
          <div 
            key={player.id} 
            className="bg-white shadow-lg rounded-2xl p-4 transition-transform transform hover:scale-105"
          >
            {/* Player Image */}
            <div className="relative w-full h-48">
              <img
                src={player.imageUrl ? `${BASE_URL}${player.imageUrl}` : "/default-avatar.png"}
                alt={player.name}
                className="w-full h-full object-cover rounded-xl"
              />
            </div>

            {/* Player Info */}
            <div className="mt-4 text-center">
              <h4 className="text-xl font-bold text-gray-800">{player.name}</h4>
              <p className="text-sm text-gray-600 mt-2">Email: {player.email}</p>
              <p className="text-sm text-gray-600">
              <p className="text-sm text-gray-600">
                Gender: {getGenderLabel(Number(player.gender))}
              </p>

                  </p>
              {/* <p className="text-sm text-gray-600">EFootball ID: {player.eFootballId}</p> */}
              <p className="text-gray-500">In Game Name:{player.inGameName}</p>
              
              {/* Status */}
              <p className={`mt-3 font-semibold ${
                player.isApproved ? "text-green-600" : "text-yellow-500"
              }`}>
                {player.isApproved ? "Registered ✅" : "Pending ⏳"}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  </div>
</section>
 
  );
};


// Inline styles for simple styling
const styles: { [key: string]: React.CSSProperties } = {
    playerCard: {
      display: "flex",
      alignItems: "center",
      gap: "15px",
      border: "1px solid #ddd",
      padding: "10px",
      marginBottom: "10px",
      borderRadius: "5px",
      backgroundColor: "#f9f9f9",
    },
    image: {
      width: "50px",
      height: "50px",
      borderRadius: "50%",
      objectFit: "cover" as "cover", // Explicitly cast the value
    },
  };
  

export default Players;
