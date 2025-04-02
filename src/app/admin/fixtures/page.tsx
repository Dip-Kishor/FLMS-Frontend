"use client"
import React,{ useState, useEffect } from "react";
import axios from "axios";
import { port } from "@/constants/appl.constant";
import { usePopup } from "@/components/UI/Popup";
import { FaArrowUp } from "react-icons/fa6"; 



const Page = () => {
    const { showPopup } = usePopup();
    const [loading, setLoading] = useState(false);
    const [seasons, setSeasons]= useState<Season[]>([]);
    const [players,setPlayers] =useState<{id:number,name:string}[]>([]);
    const [selectedSeason, setSelectedSeason]=useState<number | "">("");
    const [noOfMatches,setNoOfMatches] = useState("");
    const [noOfGroups,setNoOfGroups] = useState("");
    const [selectedPlayers,setSelectedPlayers] = useState<number[]>([]);
    const [fixturesStatus, setFixturesStatus] = useState<number | null>(null);
    const [fixtures,setFixtures] = useState<Fixtures[]>([])
    const [playoffData, setPlayoffData] = useState<Fixtures>({
      id: 0, // Temporary ID
      seasonId: 0, // Example seasonId
      seasonName: "Season 1", // Example
      matchDate: "",
      matchTime: "",
      userId1: 0,
      userName1: "Name",
      user1Score: 0,
      user2Score: 0,
      userId2: 0,
      userName2: "Name",
      tiebrekerScoreUser1: 0,
      tiebrekerScoreUser2: 0,
      group: 1,
      isPostponed: false,
      isCompleted: false,
      playOffType: 1,
      isPlayoff: true,
      imageUrl1: "string",
      imageUrl2: "string",
    });
    const [isPlayoffModalOpen, setIsPlayoffModalOpen] = useState(false);
    
    const allSelected = players.length > 0 && selectedPlayers.length === players.length;

// Handle "Select All" toggle
const handleSelectAll = () => {
  if (allSelected) {
    setSelectedPlayers([]); // Unselect all players
  } else {
    setSelectedPlayers(players.map((player) => player.id)); // Select all players
  }
};
    interface Season {
        id: number;
        seasonName: string;
        isCurrentSeason: boolean;
      }
      enum Group {
        GroupA = 1,
        GroupB = 2,
        GroupC = 3,
        GroupD = 4
      }
      const getGroup = (gender: number): string => {
        switch (gender) {
          case Group.GroupA:
            return "GroupA";
          case Group.GroupB:
            return "GroupB";
          case Group.GroupC:
            return "GroupC";
          case Group.GroupD:
            return "GroupD";
          default:
            return "Unknown";
        }
      };
      enum PlayOffType {
        QuarterFinal = 1,
        SemiFinal = 2,
        Final = 3,
        Qualifier=4,
        Eliminator1=5, 
        Eliminator2=6,
      }
      const getplayoff = (playoff: number): string => {
        switch (playoff) {
          case PlayOffType.QuarterFinal:
            return "QuarterFinal";
          case PlayOffType.SemiFinal:
            return "SemiFinal";
          case PlayOffType.Final:
            return "Final";
          case PlayOffType.Qualifier:
            return "Qualifier";
          case PlayOffType.Eliminator1:
            return "Eliminator1";
          case PlayOffType.Eliminator2:
            return "Eliminator2";
          default:
            return "Unknown";
        }
      };
      
      interface Fixtures{
        id:number,
        seasonId: number,
        seasonName: string,
        matchDate:string,
        matchTime: string,
        userId1:number,
        userName1:string,
        user1Score: number,
        user2Score:number,
        userId2:number,
        userName2: string,
        tiebrekerScoreUser1:number,
        tiebrekerScoreUser2:number,
        group:number,
        isPostponed: boolean,
        isCompleted: boolean,
        playOffType : number,
        isPlayoff: boolean,
        imageUrl1: string,
        imageUrl2: string,
      }
      
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
                        setPlayoffData((prevData) => ({
                          ...prevData,
                          seasonId: currentSeason.id, // Corrected assignment
                        }));
              
                        fetchPlayers(currentSeason.id);
                        fetchFixtures(currentSeason.id)
                    }
                }
          } catch (error) {
            console.error("Error fetching seasons:", error);
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
            showPopup(data.message, "success");
          } else {
            showPopup(data.message, "warning");
          }
        } catch (error) {
          showPopup("An error occurred while fetching players.", "warning");
          console.error("Error:", error);
        } finally {
          setLoading(false);
        }
      };
const handleSeasonChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const seasonId = Number(event.target.value);
    setSelectedSeason(seasonId);
    if (seasonId) fetchPlayers(seasonId);
    if(seasonId) fetchFixtures(seasonId);
    setPlayoffData((prevData) => ({
      ...prevData,
      seasonId: seasonId, // Corrected assignment
    }));
  };


  const fetchFixtures = async (seasonId: number) => {
    try {
      const response = await axios.post(
        `${port}/fixturesAndResultsApi/GetFixtures?seasonId=${seasonId}`,
        { withCredentials: true }
      );
      const data = response.data;
      setFixturesStatus(data.status); 
      setFixtures(data.data ||[]);
    } catch (error) {
      console.error("Error fetching fixtures:", error);
    }
  };
  const handleSubmit = async () => {
    //  e.preventDefault();
    if (!selectedSeason || !noOfMatches || !noOfGroups || selectedPlayers.length === 0) {
      alert("Please fill in all fields!");
      return;
    }

    const payload = {
      seasonId: selectedSeason,
      noOfMatches: parseInt(noOfMatches),
      noOfGroups: parseInt(noOfGroups),
      groupPlayers: selectedPlayers.map((id) => ({ id }))
    };

    console.log(payload);
    try {
      const response = await axios.post(`${port}/fixturesAndResultsApi/createFixtures`, payload, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      console.log("Response:", response.data);
      alert("Fixtures created successfully!");
    } catch (error) {
      console.error("Error creating fixtures:", error);
    }
  };

  const handleInputChange = <K extends keyof Fixtures>(id: number, field: K, value: Fixtures[K]) => {
    setFixtures((prevFixtures) =>
      prevFixtures.map((fixture) =>
        fixture.id === id ? { ...fixture, [field]: value } : fixture
      )
    );
  };
  
  const updateFixture = async (fixture: Fixtures) => {
    try {
      const updateData = {
        id: fixture.id,
        seasonId: fixture.seasonId,
        matchDate: fixture.matchDate,
        matchTime: fixture.matchTime,
        userId1: fixture.userId1,
        user1Score: fixture.user1Score,
        user2Score: fixture.user2Score,
        userId2: fixture.userId2,
        group: fixture.group,
        isPostponed: fixture.isPostponed,
        isCompleted: fixture.isCompleted,
      };

      const response=await axios.post(`${port}/fixturesAndResultsApi/updateFixtures`, updateData, { withCredentials: true });
      const data= response.data;
      if(data.status===4){
      showPopup(data.message, "success");
      }
      else{
      showPopup(data.message, "warning");
      }
    } catch (error) {
      console.error(`Error updating fixture ${fixture.id}:`, error);
    }
  };
  const handlePlayoffInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPlayoffData((prevData) => ({
      ...prevData,
      [name]: name.includes("Score") || name === "group" ? Number(value) : value, // Convert numbers
    }));
  };
  const handlePlayoffSubmit = async(playoffFixture: Fixtures) =>{
    if (!playoffFixture.userId1 || !playoffFixture.userId2 ) {
      alert("Please fill all required fields");
      return;
    }
    const formattedFixture = {
      ...playoffFixture,
      userId1: Number(playoffFixture.userId1), // Convert to number
      userId2: Number(playoffFixture.userId2), // Convert to number
      playOffType: Number(playoffFixture.playOffType), // Ensure numeric type
    };
    console.log(formattedFixture)
    const response=await axios.post(`${port}/fixturesAndResultsApi/createPlayoffFixtures`, formattedFixture, { withCredentials: true });
      const data= response.data;
      if(data.status===4){
      showPopup(data.message, "success");
      }
  console.log(playoffFixture);
    // setPlayoffData([...playoffData, playoffData]);
    setIsPlayoffModalOpen(false);
  }
  return (
    <>{loading?(<div className="fixed inset-0 flex items-center justify-center bg-white">
        <div className="loader"></div>
      </div>):(
    <div className="pt-20 min-h-screen bg-[url('/grunge_bg.jpg')] bg-cover bg-center ">
      <div className="text-center mt-4">
              <button 
                onClick={() => setIsPlayoffModalOpen(true)}
                className="bg-[#4C6F35] text-white py-2 px-4 rounded-md hover:bg-[#A77523] ease-in duration-200"
              >
                View Playoff
              </button>
            </div>
    <form onSubmit={handleSubmit}>
    <div className="mb-4 mt-4 mr-2 text-right ">
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
      
      <h2
          className={`text-3xl mt-5 md:text-4xl tracking-tight leading-tight text-center font-medium`}
        >
          Group Stage Fixtures
        </h2>
      
      {fixturesStatus === 4 ?(
      <div className='text-center lg:flex justify-center py-5 px-10 overflow-x-auto'>
          <table className="border border-[#BFAF92] border-collapse bg-[#FFFDF6] text-[#5A4A3D] shadow-md text-center ">
            <thead>
              <tr className="border border-[#BFAF92] hover:bg-[#E8D9B8] transition">
                {/* <th>ID</th> */}
                <th className="sticky border border-[#BFAF92] p-3 font-semibold">Season</th>
                <th className="border border-[#BFAF92] p-3 font-semibold">Match Date</th>
                <th className="border border-[#BFAF92] p-3 font-semibold">Match Time</th>
                <th className="border border-[#BFAF92] p-3 font-semibold">Player 1</th>
                <th className="border border-[#BFAF92]  font-semibold">Score 1</th>
                <th className="border border-[#BFAF92]  font-semibold">Score 2</th>
                <th className="border border-[#BFAF92] p-3 font-semibold">Player 2</th>
                <th className="border border-[#BFAF92] p-3 font-semibold">Group</th>
                <th className="border border-[#BFAF92] p-3 font-semibold">Postponed</th>
                <th className="border border-[#BFAF92] p-3 font-semibold">Completed</th>
                <th className="border border-[#BFAF92] p-3 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {fixtures.map((fixture) => (
                <tr className="border border-[#BFAF92] hover:bg-[#E8D9B8] transition" key={fixture.id}>
                  {/* <td>{fixture.id}</td> */}
                  <td className="border border-[#BFAF92] p-3 font-semibold">{fixture.seasonId}</td>
                  <td className="border border-[#BFAF92] p-3 font-semibold">
                  <input
                      type="date"
                      value={fixture.matchDate}
                      onChange={(e) => handleInputChange(fixture.id, "matchDate", e.target.value)}
                    /></td>
                  <td className="border border-[#BFAF92] p-3 font-semibold">
                  <input
                      type="time"
                      value={fixture.matchTime}
                      onChange={(e) => handleInputChange(fixture.id, "matchTime", e.target.value)}
                    /></td>
                  <td className="border border-[#BFAF92] p-3 font-semibold">{fixture.userName1}</td>
                  <td className="border border-[#BFAF92]  font-semibold">
                    <input
                      type="number"
                      className="text-center"
                      value={fixture.user1Score}
                      onChange={(e) => handleInputChange(fixture.id, "user1Score", Number(e.target.value))}
                    />
                  </td>
                  <td className="border border-[#BFAF92]  text-right font-semibold">
                    <input
                      type="number"
                      className="text-center"
                      value={fixture.user2Score}
                      onChange={(e) => handleInputChange(fixture.id, "user2Score", Number(e.target.value))}
                    />
                  </td>
                  <td className="border border-[#BFAF92] p-3 font-semibold">{fixture.userName2}</td>
                  <td className="border border-[#BFAF92] p-3 font-semibold">{getGroup(fixture.group)}</td>
                  <td className="border border-[#BFAF92] p-3 font-semibold">
                    <input
                      type="checkbox"
                      checked={fixture.isPostponed}
                      onChange={(e) => handleInputChange(fixture.id, "isPostponed", e.target.checked)}
                    />
                  </td>
                  <td className="border border-[#BFAF92] p-3 font-semibold">
                    <input
                      type="checkbox"
                      checked={fixture.isCompleted}
                      onChange={(e) => handleInputChange(fixture.id, "isCompleted", e.target.checked)}
                    />
                  </td>
                  <td className="text-center p-2" onClick={() => updateFixture(fixture)}>
                    <FaArrowUp className="text-blue-500 inline-block cursor-pointer"/> Update
</td>

                </tr>
              ))}
            </tbody>
          </table>
      </div>):(
      <div className='flex justify-center  px-6 gap-5 lg:mx-40 '>
      <table className="border border-[#BFAF92] border-collapse bg-[#FFFDF6] text-[#5A4A3D] shadow-md text-center ">
        <thead>
            <tr className="border border-[#BFAF92] hover:bg-[#E8D9B8] transition">
                <th className="border border-[#BFAF92] p-3 font-semibold">No of Matches</th>
                <th className="border border-[#BFAF92] p-3 font-semibold">No of Groups</th>
            </tr>
            <tr className="border border-[#BFAF92] hover:bg-[#E8D9B8] transition">
                <td className="border border-[#BFAF92] p-3 font-semibold"><input
                    type="number"
                    className="w-full px-2 py-1 border border-black  text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={noOfMatches}
                    onChange={(e) => setNoOfMatches(e.target.value)}
                    required
                    min="1"
                /></td>
                <td className="border border-[#BFAF92] p-3 font-semibold"><input className="w-full px-2 py-1 border border-black  text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" type="number" value={noOfGroups} onChange={(e) => setNoOfGroups(e.target.value)} required min="1" /></td>
            </tr>
        </thead>
        <tbody>
            <tr className="border border-[#BFAF92] hover:bg-[#E8D9B8] transition">
                <td className="border border-[#BFAF92] hover:bg-[#E8D9B8] transition"> Players</td>
                <td className="py-2">Select:<input
                type="checkbox"
                className="w-5 h-4 accent-blue-500 cursor-pointer mx-4 py-2"
                checked={allSelected}
                onChange={handleSelectAll}
            /></td>
            </tr>
            <tr className="border border-[#BFAF92] hover:bg-[#E8D9B8] transition">
                <td colSpan={2} className="px-20 py-2">
                {players.map((player) => (
                    <div className="flex justify-between"  key={player.id}>
                        <div >
                        {player.name}
                        </div>
                        <input
                            type="checkbox"
                            className="m-4"
                            value={player.id}
                            checked={selectedPlayers.includes(player.id)}
                            onChange={(e) => {
                            const id = parseInt(e.target.value);
                            setSelectedPlayers((prev) =>
                                prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
                            );
                            }}
                        />
                    </div>
                ))}
                </td>
            </tr>
            <tr><td>
            <input
    type="button"
    className="cursor-pointer"
    value="Create Fixtures ✅"
    onClick={handleSubmit}
  /></td>
            </tr>
        </tbody>
            
      </table>
      </div>)}
    </form>

  </div>
)}
{isPlayoffModalOpen && (
        <>
        <div
          className="fixed inset-0  flex items-center justify-center mt-25 lg:m-1"
        >
          <div className="relative">
            <button
              onClick={() => setIsPlayoffModalOpen(false)}
              className="absolute top-2 right-2 text-3xl text-white hover:text-gray-900"
            >
              &times;
            </button>
            <div className="bg-[url('/GradientBG.jpg')] p-10 lg:p-6 rounded-lg shadow-lg w-full md:w-[600px] lg:w-[800px] lg:h-220">
              <label className="block text-white">Select Player 1:</label>
              <select
                className="w-full p-2 rounded"
                name="userId1"
                value={playoffData.userId1}
                onChange={(e) =>handlePlayoffInputChange(e)}
              >
                <option value="">Select a Player</option>
                {players.map((player) => (
                  <option key={player.id} value={player.id}>
                    {player.name}
                  </option>
                ))}
              </select>
  
              <label className="block text-white mt-4">Select Player 2:</label>
              <select
                className="w-full p-2 rounded"
                name="userId2"
                value={playoffData.userId2}
                onChange={(e)=>handlePlayoffInputChange(e)}
              >
                <option value="">Select a Player</option>
                {players.map((player) => (
                  <option key={player.id} value={player.id}>
                    {player.name}
                  </option>
                ))}
              </select>
  
              <label className="block text-white mt-4">Match Date:</label>
              <input
                type="date"
                className="w-full p-2 rounded"
                name="matchDate"
                value={playoffData.matchDate}
                onChange={(e)=>handlePlayoffInputChange(e)}
              />
  
              <label className="block text-white mt-4">Match Time:</label>
              <input
                type="time"
                className="w-full p-2 rounded"
                name="matchTime"
                value={playoffData.matchTime}
                onChange={(e)=>handlePlayoffInputChange(e)}
              />
  
              <label className="block text-white mt-4">Player 1 Score:</label>
              <input
                type="number"
                className="w-full p-2 rounded"
                name="user1Score"
                value={playoffData.user1Score}
                onChange={(e)=>handlePlayoffInputChange(e)}
              />
  
              <label className="block text-white mt-4">Player 2 Score:</label>
              <input
                type="number"
                className="w-full p-2 rounded"
                name="user2Score"
                value={playoffData.user2Score}
                onChange={(e)=>handlePlayoffInputChange(e)}
              />
  
              <label className="block text-white mt-4">Tie-Breaker Score (Player 1):</label>
              <input
                type="number"
                className="w-full p-2 rounded"
                name="tiebrekerScoreUser1"
                value={playoffData.tiebrekerScoreUser1}
                onChange={(e)=>handlePlayoffInputChange(e)}
              />
  
              <label className="block text-white mt-4">Tie-Breaker Score (Player 2):</label>
              <input
                type="number"
                className="w-full p-2 rounded"
                name="tiebrekerScoreUser2"
                value={playoffData.tiebrekerScoreUser2}
                onChange={(e)=>handlePlayoffInputChange(e)}
              />
  
              <label className="block text-white mt-4">Group:</label>
              <input
                type="number"
                className="w-full p-2 rounded"
                name="group"
                value={playoffData.group}
                onChange={(e)=>handlePlayoffInputChange(e)}
              />
              <label className="block text-white mt-4">PlayOffType:</label>

              <input
                type="number"
                className="w-full p-2 rounded"
                name="playOffType"
                value={playoffData.playOffType}
                onChange={(e)=>handlePlayoffInputChange(e)}
              />

              <button
                className="bg-blue-500 text-white mt-4 p-2 rounded w-full"
                onClick={(e)=>handlePlayoffSubmit(playoffData)}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </>
      )}
    </>
  )
}

export default Page