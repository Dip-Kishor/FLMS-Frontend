import React from 'react';
import { BASE_URL } from "@/constants/appl.constant";


interface PlayOffFixture {
  id: number;
  seasonId: number;
  seasonName: string;
  matchDate: string;
  matchTime: string;
  imageUrl1: string;
  userId1: number;
  userName1: string;
  user1Score: number;
  user2Score: number;
  userId2: number;
  userName2: string;
  imageUrl2: string;
  tiebrekerScoreUser1: number;
  tiebrekerScoreUser2: number;
  group: number;
  isPostponed: boolean;
  isCompleted: boolean;
  isPlayOff: boolean;
  playOffType: number;
}

interface PlayoffFixturesProps {
  playoffData: PlayOffFixture[];
}

const PlayoffData: React.FC<PlayoffFixturesProps> = ({ playoffData }) => {
    ///For season 1
  const season1Matches = playoffData.filter((match) => match.seasonId === 1);
  const semifinals = season1Matches.filter((match) => match.playOffType === 2);
  const final = season1Matches.find((match) => match.playOffType === 3);
    ///For season 2
    const season2Matches = playoffData.filter((match)=>match.seasonId===2);
    const qualifier = season2Matches.find((match)=>match.playOffType===4);
    const eliminator1 = season2Matches.find((match)=>match.playOffType===5);
    const eliminator2 = season2Matches.find((match)=>match.playOffType===6);
    const finalSeason2 = season2Matches.find((match)=>match.playOffType===3);
  return (
    <>
        {season1Matches.length > 0 && (
          <div className=" bg-[url('/GradientBG.jpg')] p-10 lg:p-6 rounded-lg shadow-lg w-full md:w-[600px] lg:w-[800px] lg:h-120">
            <div className="season-1-container ">
                <h1 className="text-center text-white w-full text-2xl">Season 1 Playoffs</h1>
                <div className='flex flex-col lg:flex-row items-center justify-center gap-4'>
                    <div className="w-full flex flex-col lg:flex-row items-center justify-center">
                    {semifinals.length === 2 && (
                    <>
                    <div className='flex flex-col lg:flex-row w-full justify-between'>
                    <div className="w-full  lg:w-1/3 p-1">
                      <div className="match-card text-left text-white border border-yellow-600 p-3 rounded lg">
                        <h3 className='text-center'>Semi-Final</h3>
                        <div className='flex justify-between'>
                            <div className='flex items-center'>
                                <img
                                src={semifinals[0].imageUrl1 ? `${BASE_URL}${semifinals[0].imageUrl1}` : "/default-avatar.png"}
                                alt=""
                                className="p-2 w-14 h-14 object-cover rounded-full"
                                />
                                {semifinals[0].userName1} 
                            </div>
                            <div className='flex items-center'>
                                {semifinals[0].user1Score} ({semifinals[0].tiebrekerScoreUser1})
                            </div>
                        </div>
                        <div className='flex justify-between '>
                            <div className='flex items-center'>
                            <img
                                src={semifinals[0].imageUrl2 ? `${BASE_URL}${semifinals[0].imageUrl2}` : "/default-avatar.png"}
                                alt=""
                                className="p-2 w-14 h-14 object-cover rounded-full"
                                />
                                {semifinals[0].userName2}
                            </div>
                            <div className='flex items-center'>
                                {semifinals[0].user2Score} ({semifinals[0].tiebrekerScoreUser2})
                            </div>
                        </div>
                        <div className="absolute left-40 top-55 w-1 h-30 bg-yellow-600 lg:block hidden"></div>
                        <div className="absolute left-40 top-85 w-32 h-1 bg-yellow-600 lg:block hidden"></div>
                      </div>
                    </div>
                    <div className="w-full  lg:w-1/3 p-1 ">
                      <div className="match-card text-left text-white border border-yellow-600 p-3 rounded-lg">
                      <h3 className='text-center'>Semi-Final</h3>
                        <div className='flex justify-between'>
                        <div className='flex items-center'>
                            <img
                                src={semifinals[1].imageUrl1 ? `${BASE_URL}${semifinals[1].imageUrl1}` : "/default-avatar.png"}
                                alt=""
                                className="p-2 w-14 h-14 object-cover rounded-full"
                                />
                                {semifinals[1].userName1} 
                            </div>
                            <div className='flex items-center'>
                                {semifinals[1].user1Score}
                            </div>
                        </div>
                        <div className='flex justify-between '>
                        <div className='flex items-center'>
                            <img
                                src={semifinals[1].imageUrl2 ? `${BASE_URL}${semifinals[1].imageUrl2}` : "/default-avatar.png"}
                                alt=""
                                className="p-2 w-14 h-14 object-cover rounded-full"
                                />
                                {semifinals[1].userName2}
                            </div>
                            <div className='flex items-center'>
                                {semifinals[1].user2Score} 
                            </div>
                        </div>
                        <div className="absolute right-40 top-55 w-1 h-30 bg-yellow-600 lg:block hidden"></div>
                        <div className="absolute right-40 top-85 w-32 h-1 bg-yellow-600 lg:block hidden"></div>
                      </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
              </div>
              <div className='flex w-full justify-center mt-3 '>
              <div className="w-full lg:w-1/3 p-3 ">
                      {final && (
                        <div className="match-card text-left text-white border border-yellow-600 rounded-lg p-3">
                          <h3 className='text-center'>Final</h3>
                        <div className='flex justify-between'>
                        <div className='flex items-center'>
                            <img
                                src={final.imageUrl1 ? `${BASE_URL}${final.imageUrl1}` : "/default-avatar.png"}
                                alt=""
                                className="p-2 w-14 h-14 object-cover rounded-full"
                                />
                                {final.userName1} 
                            </div>
                            <div className='flex items-center'>
                                {final.user1Score}
                            </div>
                        </div>
                        <div className='flex justify-between '>
                        <div className='flex items-center'>
                            <img
                                src={final.imageUrl2 ? `${BASE_URL}${final.imageUrl2}` : "/default-avatar.png"}
                                alt=""
                                className="p-2 w-14 h-14 object-cover rounded-full"
                                />
                                {final.userName2}
                            </div>
                            <div className='flex items-center'>
                                {final.user2Score}  
                            </div>
                        </div>
                        </div>
                      )}
                    </div>
                    </div>
            </div>
        </div>
          )}
        {season2Matches.length>0 &&(
          <>
            <div className=" bg-[url('/GradientBG.jpg')] p-10 lg:p-10 rounded-lg shadow-lg w-full md:w-[800px] lg:w-[1200px] lg:h-150">
                <h1 className="text-center text-white text-2xl">Season 2 Playoffs</h1>
                <div className='flex flex-col gap-3 lg:flex-row justify-between'>
                  <div className='flex flex-col w-full lg:w-1/3 items-center justify-center gap-3 lg:gap-40'>
                    <div className="w-full flex flex-col lg:flex-row ">
                      {qualifier && (
                        <div className="match-card text-left text-white border border-yellow-600 rounded-lg p-3 lg:w-2/3">
                        <h3 className='text-center'>Qualifier</h3>
                      <div className='flex justify-between'>
                      <div className='flex items-center'>
                          <img
                              src={qualifier.imageUrl1 ? `${BASE_URL}${qualifier.imageUrl1}` : "/default-avatar.png"}
                              alt=""
                              className="p-2 w-14 h-14 object-cover rounded-full"
                              />
                              {qualifier.userName1} 
                          </div>
                          <div className='flex items-center'>
                              {qualifier.user1Score}
                          </div>
                      </div>

                      <div className='flex justify-between '>
                      <div className='flex items-center'>
                          <img
                              src={qualifier.imageUrl2 ? `${BASE_URL}${qualifier.imageUrl2}` : "/default-avatar.png"}
                              alt=""
                              className="p-2 w-14 h-14 object-cover rounded-full"
                              />
                              {qualifier.userName2}
                          </div>
                          <div className='flex items-center'>
                              {qualifier.user2Score}  
                          </div>
                      </div>
                      <div className="absolute left-40 top-58.5 w-1 h-20 bg-red-500 lg:block hidden"></div>
                      <div className="absolute left-40 top-78 w-78.5 h-1 bg-red-500 lg:block hidden"><div className='absolute left-30 top-2'>Loser</div></div>
                      <div className="absolute left-72.5 top-40 w-185 h-1 bg-green-500 lg:block hidden"><div className='absolute left-90 -top-6'>Winner</div></div>
                      <div className="absolute left-257.5 top-40 w-1 h-18 bg-green-500 lg:block hidden"></div>

                      </div>
                      )}
                    </div>
                    <div className="w-full flex flex-col   ">
                      {eliminator1 && (
                        <div className="match-card text-left text-white border border-yellow-600 rounded-lg p-3 lg:w-2/3">
                        <h3 className='text-center'>Eliminator 1</h3>
                      <div className='flex justify-between'>
                      <div className='flex items-center'>
                          <img
                              src={eliminator1.imageUrl1 ? `${BASE_URL}${eliminator1.imageUrl1}` : "/default-avatar.png"}
                              alt=""
                              className="p-2 w-14 h-14 object-cover rounded-full"
                              />
                              {eliminator1.userName1} 
                          </div>
                          <div className='flex items-center'>
                              {eliminator1.user1Score}
                          </div>
                      </div>
                      <div className='flex justify-between '>
                      <div className='flex items-center'>
                          <img
                              src={eliminator1.imageUrl2 ? `${BASE_URL}${eliminator1.imageUrl2}` : "/default-avatar.png"}
                              alt=""
                              className="p-2 w-14 h-14 object-cover rounded-full"
                              />
                              {eliminator1.userName2}
                          </div>
                          <div className='flex items-center'>
                              {eliminator1.user2Score}  
                          </div>
                      </div>
                      <div className="absolute left-72.5 top-120 w-75 h-1 bg-green-500 lg:block hidden"><div className='absolute left-30 -top-6'>Winner</div></div>
                      <div className="absolute left-147 top-99 w-1 h-22 bg-green-500 lg:block hidden"></div>
                      </div>
                      )}
                    </div>
                  </div>
                  <div className='flex w-full lg:w-1/3 items-center justify-center '>
                    <div className="w-full flex lg:justify-center">
                      {eliminator2 && (
                        <div className="match-card text-left text-white border border-yellow-600 rounded-lg p-3 w-full lg:w-2/3">
                        <h3 className='text-center'>Eliminator 2</h3>
                      <div className='flex justify-between'>
                      <div className='flex items-center'>
                          <img
                              src={eliminator2.imageUrl1 ? `${BASE_URL}${eliminator2.imageUrl1}` : "/default-avatar.png"}
                              alt=""
                              className="p-2 w-14 h-14 object-cover rounded-full"
                              />
                              {eliminator2.userName1} 
                          </div>
                          <div className='flex items-center'>
                              {eliminator2.user1Score}
                          </div>
                      </div>
                      <div className='flex justify-between '>
                      <div className='flex items-center'>
                          <img
                              src={eliminator2.imageUrl2 ? `${BASE_URL}${eliminator2.imageUrl2}` : "/default-avatar.png"}
                              alt=""
                              className="p-2 w-14 h-14 object-cover rounded-full"
                              />
                              {eliminator2.userName2}
                          </div>
                          <div className='flex items-center'>
                              {eliminator2.user2Score}  
                          </div>
                      </div>
                      <div className="absolute left-181.5 top-78 w-46 h-1 bg-green-500 lg:block hidden"><div className='absolute left-17 -top-6'>Winner</div></div>
                      </div>
                      )}
                    </div>
                  </div>
                  <div className='flex w-full lg:w-1/3 items-center justify-center '>
                    <div className="w-full flex  lg:justify-end">
                      {finalSeason2 && (
                        <div className="match-card text-left text-white border border-yellow-600 rounded-lg p-3 w-full lg:w-2/3">
                        <h3 className='text-center'>Final</h3>
                      <div className='flex justify-between'>
                      <div className='flex items-center'>
                          <img
                              src={finalSeason2.imageUrl1 ? `${BASE_URL}${finalSeason2.imageUrl1}` : "/default-avatar.png"}
                              alt=""
                              className="p-2 w-14 h-14 object-cover rounded-full"
                              />
                              {finalSeason2.userName1} 
                          </div>
                          <div className='flex items-center'>
                              {finalSeason2.user1Score}
                          </div>
                      </div>
                      <div className='flex justify-between '>
                      <div className='flex items-center'>
                          <img
                              src={finalSeason2.imageUrl2 ? `${BASE_URL}${finalSeason2.imageUrl2}` : "/default-avatar.png"}
                              alt=""
                              className="p-2 w-14 h-14 object-cover rounded-full"
                              />
                              {finalSeason2.userName2}
                          </div>
                          <div className='flex items-center'>
                              {finalSeason2.user2Score}  
                          </div>
                      </div>
                      </div>
                      )}
                    </div>
                  </div>
                </div>
            </div>
          </>
        )}
    </>
  );
};

export default PlayoffData;
