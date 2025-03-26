"use client"
import { port } from '@/constants/appl.constant';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
  import { usePopup } from "@/components/UI/Popup";
import Fixtures from '@/components/UI/Fixtures';


const Page = () => {
  interface Season {
    id: number;
    seasonName: string;
    isCurrentSeason: boolean;
  }
  
  
  const { showPopup } = usePopup();
  const [fixtures,setFixtures]=useState([]);
  const [seasons,setSeasons] = useState<Season[]>([]);
    const [selectedSeason, setSelectedSeason] = useState<number | "">("");
      const [loading, setLoading] = useState(false);
    
  
      useEffect(() => {
        const fetchSeasons = async () => {
          try {
            const response = await axios.post(`${port}/seasonApi/getAllSeasons`,{
                withCredentials: true,
              });
              const data = response.data;
              if (data.status === 4) 
                {
                    const fetchedSeasons = data.data.seasonVMs || [];
                    setSeasons(fetchedSeasons);
                    const currentSeason = fetchedSeasons.find((season: Season) => season.isCurrentSeason);
                    if(currentSeason){
                        setSelectedSeason(currentSeason.id)
                        // fetchPlayers(currentSeason.id);
                        fetchFixtures(currentSeason.id)
                    }
                }
          } catch (error) {
            console.error("Error fetching seasons:", error);
          }
        };
        fetchSeasons();
      }, []);
 
  const handleSeasonChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const seasonId = Number(event.target.value);
      setSelectedSeason(seasonId);
       if (seasonId) fetchFixtures(seasonId);
    };
    const fetchFixtures = async (seasonId: number) => {
      try {
        const response = await axios.post(
          `${port}/fixturesAndResultsApi/GetFixtures?seasonId=${seasonId}`,
          { withCredentials: true }
        );
        const data = response.data;
        // setFixturesStatus(data.status); 
        setFixtures(data.data ||[]);
      } catch (error) {
        console.error("Error fetching fixtures:", error);
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

          {fixtures.length > 0 ? (
            <Fixtures fixtures={fixtures} />
          ) : (
            <p className="text-white">No players found.</p>
          )}
        </div>
      )}
    </>
  )
}   

export default Page