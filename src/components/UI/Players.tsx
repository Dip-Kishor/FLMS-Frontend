import React, { useState } from "react";
import { BASE_URL } from "@/constants/appl.constant";
import { Montserrat } from "next/font/google";
import { FaEye } from "react-icons/fa6"; // Import FontAwesome Eye Icon

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
  teamImageUrl?: string; // Added teamImageUrl field
  isApproved: boolean;
}

interface PlayersProps {
  players: Player[];
}

const Players: React.FC<PlayersProps> = ({ players }) => {
  const [selectedTeamImage, setSelectedTeamImage] = useState<string | null>(null);

  return (
    <section className="min-h-screen bg-[url('/grunge_bg.jpg')] bg-cover bg-center" id="players">
      <div className="container mx-auto px-6">
        {/* Title */}
        <h2 className={`text-[3rem] tracking-[-2.72px] leading-[4.5rem] text-center font-[500] pb-14 ${montserrat.className}`}>
          Players List
        </h2>

        {/* Players List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-auto lg:mx-20 px-4 py-5">
          {players.length === 0 ? (
            <p className="text-center text-white text-lg">No players registered.</p>
          ) : (
            players.map((player) => (
              <div key={player.id} className="relative bg-[#F2ECDB] shadow-lg rounded-2xl p-10 transition-transform transform hover:scale-105">
                {/* Eye Icon for Team Image Modal */}
                {player.teamImageUrl && (
                  <button
                    className="absolute top-1 right-1 text-gray-700 bg-white p-2 rounded-full shadow-[0px_4px_12px_rgba(0,0,0,0.3)] hover:bg-gray-200 transition"
                    onClick={() => setSelectedTeamImage(`${BASE_URL}${player.teamImageUrl}`)}
                  >
                    <FaEye className="w-5 h-5" />
                  </button>
                )}

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
                  <p className="text-sm text-gray-600">Gender: {getGenderLabel(Number(player.gender))}</p>
                  <p className="text-gray-500">In Game Name: {player.inGameName}</p>

                  {/* Status */}
                  <p className={`mt-3 font-semibold ${player.isApproved ? "text-green-600" : "text-yellow-500"}`}>
                    {player.isApproved ? "Registered ✅" : "Pending ⏳"}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal for Team Image */}
      {selectedTeamImage && (
  <div className="fixed inset-0 flex items-center justify-center">
    <div className="bg-white p-8 rounded-xl shadow-lg w-full md:w-[600px] lg:w-[800px] relative">
      <button
        className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
        onClick={() => setSelectedTeamImage(null)}
      >
        ✖
      </button>
      <img
        src={selectedTeamImage}
        alt="Team Image"
        className="w-full h-auto rounded-lg md:w-[600px] lg:w-[800px]"  // Added responsive sizes here
      />
    </div>
  </div>
)}

    </section>
  );
};

export default Players;
