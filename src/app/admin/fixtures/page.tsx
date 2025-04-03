"use client"
import { port } from '@/constants/appl.constant';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { usePopup } from "@/components/UI/Popup";
import { FaPen } from "react-icons/fa6"; 
import Modal from "@/components/UI/Modal";


interface Season {
  id: number;
  seasonName: string;
  isCurrentSeason: boolean;
}

const Page = () => {
  //common
  const [loading, setLoading] = useState(false);
  const { showPopup } = usePopup();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modeOfButton, setModeOfButton] = useState("Create");
  //#region Season Section
  const [seasons,setSeasons] = useState<Season[]>([])
  const [selectedSeason, setSelectedSeason] = useState<number | "">("")
  useEffect(()=>{
    const fetchSeasons = async()=>{
      try{
        const response = await axios.post(`${port}/seasonApi/getAllSeasons`,{
          withCredentials:true
        });
        const data = response.data;
        if(data.status === 4){
          const fetchedSeasons = data.data.seasonVMs || [];
          setSeasons(fetchedSeasons);
          const currentSeason = fetchedSeasons.find((season:Season)=>season.isCurrentSeason);
          if(currentSeason){
            setSelectedSeason(currentSeason.id)
            fetchPlayers(currentSeason.id);
            fetchFixtures(currentSeason.id);
          }
        }
      }
      catch(error){
        console.error(error);
      }
    };
    fetchSeasons();
  },[])
  const handleSeasonChange =(event:React.ChangeEvent<HTMLSelectElement>)=>{
    const seasonId = Number(event.target.value);
    setSelectedSeason(seasonId)
    if(seasonId) fetchPlayers(seasonId);
    if(seasonId) fetchFixtures(seasonId);
  }
  //#endregion
  //#region  Players Section
  const [players,setPlayers] = useState<{id:number,name:string}[]>([]);
  const fetchPlayers = async(seasonId:number) =>{
     setLoading(true);
    try{
      const response = await axios.post(`${port}/playerRegistrationApi/getAllPlayers?seasonId=${seasonId}`,{
        withCredentials:true
      });
      const data = response.data;
      if(data.status===4){
        setPlayers(data.data.playersList || []);
      }
    }
    catch(error){
      console.error(error);
    }
    finally{
      setLoading(false);
    }
  }
  //#endregion
  //#region Fixtures Section
    //#region Fixture declaration
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

    const getYesNo = (yesno:boolean):string =>(yesno?"Yes":"No");

    enum PlayOffType {
      QuarterFinal = 1,
      SemiFinal = 2,
      Final = 3,
      Qualifier=4,
      Eliminator1=5, 
      Eliminator2=6,
    }
    const playOffTypes = Object.keys(PlayOffType)
      .filter((key) => isNaN(Number(key))) 
      .map((key) => ({
      id: PlayOffType[key as keyof typeof PlayOffType],
      name: key.replace(/([A-Z])/g, ' $1').trim(),
    }));

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
    //#endregion
  // Fixture creation
  const [noOfGroups,setNoOfGroups] = useState("");
  const [noOfMatches, setNoOfMatches] = useState("");
  const [selectedPlayers, setSelectedPlayers] = useState<number[]>([]);
  const allSelected = players.length>0 && selectedPlayers.length === players.length;
  const handleSelectAll = ()=>{
    if(allSelected)
    {
      setSelectedPlayers([]);
    }else{
      setSelectedPlayers(players.map((player)=>player.id));
    }
  }
  const handleCreateFixture = async() =>{
    console.log(selectedSeason);
    console.log(noOfMatches);
    console.log(noOfGroups);
    console.log(selectedPlayers);
    if (!selectedSeason || !noOfMatches || !noOfGroups || selectedPlayers.length === 0) {
      showPopup("Please fill in all fields!","warning");
      return;
    }
    const payload = {
      seasonId: selectedSeason,
      noOfMatches: parseInt(noOfMatches),
      noOfGroups: parseInt(noOfGroups),
      groupPlayers: selectedPlayers.map((id) => ({ id }))
    };
    try{
      setLoading(true);
      const response = await axios.post(`${port}/fixturesAndResultsApi/createFixtures`, payload, {
        withCredentials: true,
      });
      const data = response.data;
      if(data.status=== 4){
        showPopup(data.message,"success");
        window.location.href = "/admin/fixtures";
      } 
    }
    catch(error){
      console.error(error);
      showPopup("Error occurred","warning");
    }finally{
      setLoading(false);
    }
  }

  //Fixture view and update
  //View
  const [fixtures,setFixtures]= useState<Fixtures[]>([]);
  const [selectedFixture, setSelectedFixture] = useState<Fixtures | null>(null);

  const fetchFixtures = async(seasonId:number)=>{
    try{
    const response = await axios.post(`${port}/fixturesAndResultsApi/GetFixturesForAdmin?seasonId=${seasonId}`,{
      withCredentials:true
    });
    const data = response.data;
    if(data.status===4){
      setFixtures(data.data|| []);
    }
    else{
      setFixtures([]);
    }
    }catch(error){
      console.error(error);
    }
  }
  //Edit/Update
  const handleEditClick = (fixture : Fixtures) => {
    setModeOfButton("Update");
    setSelectedFixture(fixture);
    console.log(fixture);
    setIsModalOpen(true);
  };
  const handleFixtureInputChange = (key: keyof Fixtures,value:any)=> {
    if (key === "user1Score" || key === "user2Score") {
      value = parseInt(value);
    }
    if(selectedFixture){
      setSelectedFixture({...selectedFixture,[key]:value})
    }
  };
  //Playoff creation
  const [playoffData, setPlayoffData] = useState<Fixtures>({
    id: 0, 
    seasonId: 0, 
    seasonName: "",
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
    group: 0,
    isPostponed: false,
    isCompleted: false,
    playOffType: 0,
    isPlayoff: true,
    imageUrl1: "string",
    imageUrl2: "string",
  });
  const handlePlayoffFixtureChange =(key: keyof Fixtures, value:any)=>{
    if (key === "userId1" || key === "userId2" || key==="playOffType") {
      value = parseInt(value);
    }
    setPlayoffData((prevData) => ({
      ...prevData,        
      [key]: value,
    }));
  }
  const handleCreateUpdate = async()=>{
    if(modeOfButton=="Update"){
      const updatedFixture = selectedFixture;
      console.log(updatedFixture)
      try{
        const response = await axios.post(`${port}/fixturesAndResultsApi/updateFixtures`, updatedFixture, { withCredentials: true })
        const data = response.data;
        if(data.status===4){
          if(updatedFixture){
            setFixtures((prevFixtures) => {
              return prevFixtures.map((fixture) =>
                fixture.id === updatedFixture.id ? { ...fixture, ...updatedFixture } : fixture
              );
            });
          }
          setIsModalOpen(false);
          showPopup(data.message,"success");
        }else{
          setIsModalOpen(false);
          showPopup(data.message,"warning")
        }
      }catch{
        showPopup("Error occurred","warning")
      }
    }else{
      const newFixture = {...playoffData,seasonId:selectedSeason};
      try{
        const response = await axios.post(`${port}/fixturesAndResultsApi/createPlayoffFixtures`, newFixture, { withCredentials: true })
        const data = response.data;
        if(data.status===4){
          setIsModalOpen(false);
          showPopup(data.message,"success");
          window.location.href="/admin/fixtures"
        };
      }catch{
        showPopup("Error occurred","warning")
      }
    }
  }
  //#endregion
  return (
    <>
    {loading?(
      <div>
        <div className="fixed inset-0 flex items-center justify-center bg-white">
          <div className="loader"></div>
        </div>
      </div>
    ):(
      <div className="pt-20 min-h-screen bg-[url('/grunge_bg.jpg')] bg-cover bg-center ">
        {/* Season Section Start */}
        <div className='mb-4 mt-4 mr-2 text-right'>
          <label htmlFor="season-dropdown" className='mr-2'>Select Season:</label>
          <select
          id='season-dropdown'
          value={selectedSeason}
          onChange={handleSeasonChange}
          className="border bg-[#4C6F35] text-white py-2 px-4 border-[#4C6F35] hover:bg-[#4C6F35] hover:border-[#4da723] ease-in duration-200"
          >
            {seasons.map((season)=>(
              <option key={season.id} value={season.id}>
                {season.seasonName}
              </option>
            ))}
          </select>
        </div>
        {/* Season Section Close */}
        {fixtures.length>0?(
          <>
          <div className='text-center mt-4'>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 bg-[#4C6F35] text-white rounded-md">
                Create Playoff
            </button>
          </div>
          <h2 className="text-3xl mt-5 md:text-4xl tracking-tight leading-tight text-center font-medium">
            Fixtures
          </h2>
          {/* Fixture Table Start */}
          <div className='text-center lg:flex justify-center py-5 px-10 overflow-x-auto'>
          <table className="border border-[#BFAF92] border-collapse  text-[#5A4A3D] shadow-md text-center ">
            <thead>
              <tr className="border border-[#BFAF92] bg-[#E9ECEF] hover:bg-[#E9ECEF] transition">
                {/* <th>ID</th> */}
                <th className="border border-[#BFAF92] p-3 font-semibold">Season</th>
                <th className="border border-[#BFAF92] p-3 font-semibold">Match Date</th>
                <th className="border border-[#BFAF92] p-3 font-semibold">Match Time</th>
                <th className="border border-[#BFAF92] p-3 font-semibold">Player 1</th>
                <th className="border border-[#BFAF92] p-3 font-semibold">Score 1</th>
                <th className="border border-[#BFAF92] p-3 font-semibold">Score 2</th>
                <th className="border border-[#BFAF92] p-3 font-semibold">Player 2</th>
                <th className="border border-[#BFAF92] p-3 font-semibold">Group</th>
                <th className="border border-[#BFAF92] p-3 font-semibold">Postponed</th>
                <th className="border border-[#BFAF92] p-3 font-semibold">Completed</th>
                <th className="border border-[#BFAF92] p-3 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {fixtures.map((fixture) => (
                <tr className="border border-[#BFAF92] bg-[#FFFFFF] hover:bg-[#E8D9B8] transition" key={fixture.id}>
                  <td className="border border-[#BFAF92] p-3 ">{fixture.seasonId}</td>
                  <td className="border border-[#BFAF92] p-3 ">{fixture.matchDate}</td>
                  <td className="border border-[#BFAF92] p-3 ">{fixture.matchTime}</td>
                  <td className="border border-[#BFAF92] p-3 ">{fixture.userName1}</td>
                  <td className="border border-[#BFAF92] p-3 ">{fixture.user1Score}</td>
                  <td className="border border-[#BFAF92] p-3 ">{fixture.user2Score}</td>
                  <td className="border border-[#BFAF92] p-3 ">{fixture.userName2}</td>
                  <td className="border border-[#BFAF92] p-3 ">{getGroup(fixture.group)}</td>
                  <td className="border border-[#BFAF92] p-3 ">{getYesNo(fixture.isPostponed)}</td>
                  <td className="border border-[#BFAF92] p-3 ">{getYesNo(fixture.isCompleted)}</td>
                  <td className="text-center p-2">
                    <div className="flex flex-col justify-center items-center space-x-2">
                      <FaPen
                        className="text-blue-500 cursor-pointer"
                        onClick={() => handleEditClick(fixture)}
                      />
                      {fixture.isPlayoff && getplayoff(fixture.playOffType)}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
          {/* Fixture Table Close */}
          </>
        ):(
          // Player List Section Start
          <div className='flex justify-center  px-6 gap-5 lg:mx-50 '>
              <table className="border border-[#BFAF92] border-collapse bg-[#FFFDF6] text-[#5A4A3D] shadow-md text-center lg:w-[45%]">
                <thead>
                  <tr className="border border-[#BFAF92] hover:bg-[#E8D9B8] w-[80%]">
                    <th className="border border-[#BFAF92] p-3 font-semibold w-[40%]"> 
                      <div className='flex flex-wrap gap-3 items-center'>
                          <h4>No of Matches:</h4>
                          <input
                            type='number'
                            className="w-[50%] px-2 py-1 border border-black  text-black rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                            value={noOfMatches || 0}
                            onChange={(e)=>setNoOfMatches(e.target.value)}
                            required min="1"
                          />
                      </div>
                    </th>
                    <th className="border border-[#BFAF92] p-3 font-semibold w-[40%]">
                    <div className='flex flex-wrap gap-3 items-center'>
                          <h4>No of Groups:</h4>
                          <input
                            type='number'
                            className="w-[50%] px-2 py-1 border border-black  text-black rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                            value={noOfGroups || 0}
                            onChange={(e)=>setNoOfGroups(e.target.value)}
                            required min="1"
                          />
                        </div>
                    </th>
                  </tr>
                  <tr>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border border-[#BFAF92] hover:bg-[#E8D9B8] transition">
                    <td className="border border-[#BFAF92] hover:bg-[#E8D9B8] transition">Players</td>
                    <td className='py-2'>
                      Select All
                      <input
                      type='checkbox'
                      className="w-5 h-4 accent-blue-500 cursor-pointer mx-4 py-2"
                      checked={allSelected}
                      onChange={handleSelectAll}
                      />
                    </td>
                  </tr>
                  <tr className="border border-[#BFAF92] hover:bg-[#E8D9B8] transition">
                    <td colSpan={2} className="px-20 py-2">
                      {players.map((player)=>(
                        <div className='flex justify-between' key={player.id}>
                          <div>{player.name}</div>
                          <input
                          type='checkbox'
                          className='m-4'
                          value={player.id}
                          checked={selectedPlayers.includes(player.id)}
                          onChange={(e)=>{
                            const id = parseInt(e.target.value);
                            setSelectedPlayers((prev)=>
                              prev.includes(id)?prev.filter((p)=>p!== id):[...prev,id]
                            );
                          }}
                          />
                        </div>
                      ))}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2} className='text-center p-2'>
                    <input
                      type="button"
                      className="cursor-pointer bg-blue-500 p-2 rounded-xl text-white"
                      value="Create Fixtures ✅"
                      onClick={handleCreateFixture}
                    />
                    </td>
                  </tr>
                </tbody>
              </table>
          </div>
          // Player List Section Close
          )}
        
      </div>
      
    )}
    <Modal isOpen={isModalOpen} onClose={() => {setIsModalOpen(false); setModeOfButton("Create")}} title="Fixture Modal" size="lg"
      footerButtons={[
        { label: modeOfButton, onClick: handleCreateUpdate, className: "bg-[#4C6F35] text-white hover:bg-green-600" },
        { label: "Close", onClick: () => {setIsModalOpen(false); setModeOfButton("Create")}, className: "bg-gray-400 text-white hover:bg-gray-300" }
      ]}>
      {modeOfButton =="Create"?(
        <>
        <div className='flex w-full gap-4 p-4'>
          <div className='flex items-center w-1/2'>
            <label className=" text-black w-1/2">Player 1 :</label>
            <select
              className="p-2 rounded bg-[#E9ECEF] w-1/2"
              name="userId1"
              value={playoffData.userId1}
              onChange={(e) =>handlePlayoffFixtureChange("userId1",e.target.value)}
              >
              <option value="">Select a Player</option>
              {players.map((player) => (
                <option key={player.id} value={player.id}>
                  {player.name}
                </option>
              ))}
            </select>
          </div>
          <div className='flex items-center w-1/2'>
            <label className=" text-black w-1/2">Player 2 : </label>
            <select
              className="p-2 rounded bg-[#E9ECEF] w-1/2"
              name="userId1"
              value={playoffData.userId2}
              onChange={(e) =>handlePlayoffFixtureChange("userId2",e.target.value)}
              >
              <option value="">Select a Player</option>
              {players.map((player) => (
                <option key={player.id} value={player.id}>
                  {player.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className='flex w-full gap-4 p-4'>
          <div className='flex items-center w-1/2'>
            <label className=" text-black w-1/2">Playoff Type: </label>
            <select
              className="p-2 rounded bg-[#E9ECEF] w-1/2"
              name="userId1"
              value={playoffData.playOffType}
              onChange={(e) =>handlePlayoffFixtureChange("playOffType",e.target.value)}
            >
              {playOffTypes.map((playOff) => (
                <option key={playOff.id} value={playOff.id}>
                  {playOff.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        </>
      ):(
        <div>
          {selectedFixture &&(
            <div className="p-4 flex flex-wrap gap-4">
              <div className='flex w-full'>
                <div className='w-1/2 flex items-center'>
                  <label className="block mb-2 w-1/3">
                  Match Date &nbsp;:&nbsp;&nbsp;
                  </label>
                  <input
                    type='date'
                    className='bg-[#E9ECEF] p-2 rounded-lg w-1/2'
                    value={selectedFixture.matchDate}
                    onChange={(e)=>handleFixtureInputChange("matchDate",e.target.value)}
                  />
                </div>
                <div className='w-1/2 flex items-center'>
                  <label className="block mb-2 w-1/3">
                  Match Time&nbsp;:&nbsp;&nbsp;
                  </label>
                  <input
                    type='time'
                    className='bg-[#E9ECEF] p-2 rounded-lg w-1/2'
                    value={selectedFixture.matchTime}
                    onChange={(e)=>handleFixtureInputChange("matchTime",e.target.value)}
                  />
                </div>
              </div>
              <div className='flex w-full'>
                <div className='w-1/2 flex items-center'>
                  <label className="block mb-2 w-1/3">
                  Player 1&nbsp;:&nbsp;&nbsp;
                  </label>
                  <input
                    type='text'
                    className='bg-[#E9ECEF] p-2 rounded-lg cursor-not-allowed w-1/2'
                    value={selectedFixture.userName1}
                    readOnly
                  />
                </div>
                <div className='w-1/2 flex items-center'>
                  <label className="block mb-2 w-1/3">
                  Score 1&nbsp;:&nbsp;&nbsp;
                  </label>
                  <input
                    type='number'
                    className='bg-[#E9ECEF] p-2 rounded-lg w-1/2'
                    value={selectedFixture.user1Score || 0}
                    onChange={(e)=>handleFixtureInputChange("user1Score",e.target.value)}
                    min ="0"
                  />
                </div>
                
              </div>
              <div className='flex w-full'>
                <div className='w-1/2 flex items-center'>
                  <label className="block mb-2 w-1/3">
                  Player 2&nbsp;:&nbsp;&nbsp;
                  </label>
                  <input
                    type='text'
                    className='bg-[#E9ECEF] p-2 rounded-lg cursor-not-allowed w-1/2'
                    value={selectedFixture.userName2}
                    readOnly
                  />
                </div>
                <div className='w-1/2 flex items-center'>
                  <label className="block mb-2 w-1/3">
                  Score 2&nbsp;:&nbsp;&nbsp;
                  </label>
                  <input
                    type='number'
                    className='bg-[#E9ECEF] p-2 rounded-lg w-1/2'
                    value={selectedFixture.user2Score || 0}
                    onChange={(e)=>handleFixtureInputChange("user2Score",e.target.value)}
                    min="0"
                  />
                </div>
              </div>
              <div className='flex w-full gap-4'>
                <div className='flex items-center'>
                  <label className="">
                  IsPostnoned&nbsp;:&nbsp;&nbsp;
                  </label>
                  <input
                    type='checkbox'
                    className='bg-[#E9ECEF] p-2 rounded-lg'
                    checked={selectedFixture.isPostponed}
                    onChange={(e)=>handleFixtureInputChange("isPostponed",e.target.checked)}
                  />
                </div>
                <div className='flex items-center'>
                  <label className="">
                  IsCompleted&nbsp;:&nbsp;&nbsp;
                  </label>
                  <input
                    type='checkbox'
                    className='bg-[#E9ECEF] p-2 rounded-lg'
                    checked={selectedFixture.isCompleted}
                    onChange={(e)=>handleFixtureInputChange("isCompleted",e.target.checked)}
                  />
                </div>
                <div className='flex gap-4'>
                  <div className='flex items-center'>
                    <label className="">
                    IsPlayOff&nbsp;:&nbsp;&nbsp;
                    </label>
                    <input
                      type='checkbox'
                      className='bg-[#E9ECEF] p-2 rounded-lg'
                      checked={selectedFixture.isPlayoff}
                      onChange={(e)=>handleFixtureInputChange("isPlayoff",e.target.checked)}
                    />
                  </div>
                  <div className='flex items-center'>
                    {selectedFixture.isPlayoff && (
                      <>
                        <label className="text-black">Select Playoff Type: </label>
                        <select
                        className='bg-[#E9ECEF] p-2 rounded-lg'
                          value={selectedFixture.playOffType}
                          onChange={(e) => handlePlayoffFixtureChange("playOffType", Number(e.target.value))}
                        >
                          {playOffTypes.map((playOff) => (
                            <option key={playOff.id} value={playOff.id}>
                              {playOff.name}
                            </option>
                          ))}
                        </select>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      
    </Modal>
    </>
  )
}

export default Page