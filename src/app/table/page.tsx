"use client"
import TableData from '@/components/UI/TableData'
import { port } from '@/constants/appl.constant';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
const Page = () => {
  interface Season {
    id: number;
    seasonName: string;
    isCurrentSeason: boolean;
  }
  
  
  const [table,setTable]=useState([]);
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
                    setTable([]);
                    fetchTable(currentSeason.id)
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
   if (seasonId) fetchTable(seasonId);
};
const fetchTable = async (seasonId: number) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${port}/fixturesAndResultsApi/GetTable?seasonId=${seasonId}`,
        { withCredentials: true }
      );
      const data = response.data;
      if (data.status === 4) {
        if (data.data) {
          setTable(data.data || []);
        } else {
          setTable([]); 
        }
      } else {
        setTable([]); 
      }
    } catch (error) {
      console.error("Error fetching fixtures:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {loading ? (
        <div className="fixed inset-0 flex items-center justify-center bg-white">
          <div className="loader"></div>
        </div>
      ) : (
        <div className="pt-20 min-h-screen  bg-cover bg-center">
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

          {table.length > 0 ? (
            <TableData table={table} />
          ) : (
            <p className="text-white">No fixtures found.</p>
          )}
        </div>
      )}
    </>
  )
}

export default Page