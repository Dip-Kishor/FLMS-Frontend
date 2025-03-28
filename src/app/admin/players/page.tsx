"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { port } from "@/constants/appl.constant";
import { BASE_URL } from "@/constants/appl.constant";
import { FaEye } from "react-icons/fa6"; 

const Page = () => {
  interface Season {
    id: number;
    seasonName: string;
    isCurrentSeason: boolean;
  }
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
 
  const [loading, setLoading] = useState(false);
  const [players, setPlayers] = useState<Player[]>([]);
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [selectedSeason, setSelectedSeason] = useState<number | "">("");
const [selectedTeamImage, setSelectedTeamImage] = useState<string | null>(null);
  useEffect(() => {
    const fetchSeasons = async () => {
      try {
        const response = await axios.post(`${port}/seasonApi/getAllSeasons`, {
          withCredentials: true,
        });

        const data = response.data;

        if (data.status === 4) {
          const fetchedSeasons = data.data.seasonVMs || [];
          setSeasons(fetchedSeasons);

          // Find the current season
          const currentSeason = fetchedSeasons.find((season: Season) => season.isCurrentSeason);
          
          if (currentSeason) {
            setSelectedSeason(currentSeason.id);
            fetchPlayers(currentSeason.id);
          }
        } else {
        console.error("Error:");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchSeasons();
  }, []);

  const fetchPlayers = async (seasonId: number) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${port}/playerRegistrationApi/GetPlayersForAdmin?seasonId=${seasonId}`,
        {}, // Empty body
        { withCredentials: true }
      );

      const data = response.data;
      if (data.status === 4) {
        setPlayers(data.data.playersList || []);
      } else {
      console.error("Error:");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSeasonChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const seasonId = Number(event.target.value);
    setSelectedSeason(seasonId);
    if (seasonId) fetchPlayers(seasonId);
  };
  const approvePlayer = async (playerId: number) => {
    try {
      const response = await axios.post(`${port}/playerRegistrationApi/ApprovePlayers?playerId=${playerId}`, { }, { withCredentials: true });
      if (response.data.status === 4) {
        setPlayers(players.map(player => (player.id === playerId ? { ...player, isApproved: true } : player)));
      }
    } catch (error) {
      console.error("Error approving player:", error);
    }
  };

  return (
    <>
      {loading ? (
        <div className="fixed inset-0 flex items-center justify-center bg-white">
          <div className="loader"></div>
        </div>
      ) : (
        <div className="pt-20 min-h-screen bg-[url('/grunge_bg.jpg')] bg-cover bg-center">
          <div className="mb-4 mt-4 mr-2 text-right">
            <label htmlFor="season-dropdown" className=" mr-2 ">Select Season:</label>
            <select
              id="season-dropdown"
              value={selectedSeason}
              onChange={handleSeasonChange}
              className="border bg-[#4C6F35] text-white py-2 px-4 border-[#4C6F35] hover:bg-[#A77523] hover:border-[#A77523] ease-in duration-200"
            >
              <option value="">Select a Season</option>
              {seasons.map((season) => (
                <option key={season.id} value={season.id}>
                  {season.seasonName}
                </option>
              ))}
            </select>
          </div>
<div className="container mx-auto px-6">
        {/* Title */}
        <h2 className={`text-[3rem] tracking-[-2.72px] leading-[4.5rem] text-center font-[500] pb-14 `}>
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
                  {!player.isApproved && (
                        <button className="mt-3 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700" onClick={() => approvePlayer(player.id)}>
                          Approve
                        </button>
                        
                      )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
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

          {/* {players.length > 0 ? (
            <Players players={players} />
          ) : (
            <p className="text-white">No players found.</p>
          )} */}
        </div>
        
      )}
    </>
  );
};

export default Page;
