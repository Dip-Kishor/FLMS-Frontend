"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { port } from "@/constants/appl.constant";
import Players from "@/components/UI/Players";

const Page = () => {
  interface Season {
    id: number;
    seasonName: string;
    isCurrentSeason: boolean;
  }

  const [loading, setLoading] = useState(false);
  const [players, setPlayers] = useState([]);
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [selectedSeason, setSelectedSeason] = useState<number | "">("");

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
        `${port}/playerRegistrationApi/getAllPlayers?seasonId=${seasonId}`,
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

          {players.length > 0 ? (
            <Players players={players} />
          ) : (
            <p className="text-white">No players found.</p>
          )}
        </div>
      )}
    </>
  );
};

export default Page;
