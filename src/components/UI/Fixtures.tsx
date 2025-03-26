import React from 'react';
import { BASE_URL } from "@/constants/appl.constant";


enum Group {
    GroupA = 1,
    GroupB = 2,
    GroupC = 3,
    GroupD = 4
  }
  const getGroup = (gender: number): string => {
    switch (gender) {
      case Group.GroupA:
        return "Group A";
      case Group.GroupB:
        return "Group B";
      case Group.GroupC:
        return "Group C";
      case Group.GroupD:
        return "Group D";
      default:
        return "Unknown";
    }
  };
interface Fixture {
  id: number;
  seasonId: number;
  seasonName: string;
  matchDate: string;
  matchTime: string;
  imageUrl1 : string;
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
  isPlayOff :boolean;

}

interface FixturesProps {
  fixtures: Fixture[];
}

const Fixtures: React.FC<FixturesProps> = ({ fixtures }) => {
  // Group fixtures by matchDate
  const groupedFixtures = fixtures.reduce((acc: Record<string, Fixture[]>, fixture) => {
    if (!acc[fixture.matchDate]) {
      acc[fixture.matchDate] = [];
    }
    acc[fixture.matchDate].push(fixture);
    return acc;
  }, {});

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mx-20 lg:mx-20 lg:px-4 py-5">
    {Object.entries(groupedFixtures)
      .sort(([dateA]: [string, Fixture[]], [dateB]: [string, Fixture[]]) => {
        // Ensure that dateA and dateB are strings, and convert them to Date objects
        return new Date(dateA).getTime() - new Date(dateB).getTime(); // Use getTime() for a numerical comparison
      })
      .map(([date, matches]) => (
        <div key={date}>
          <h2 className="text-black text-xl font-bold text-center mb-2">{date}</h2>
          <hr />
          {matches
            .sort((a, b) => a.matchTime.localeCompare(b.matchTime)) // Sort by match time
            .map((match) => (
              <div key={match.id}>
                <div className="text-center text-black font-bold mb-3">
                  {getGroup(match.group)}
                </div>
                <div className="flex items-center justify-between text-black">
                  <div className="flex items-center justify-end w-1/4">
                    <span className="p-1">{match.userName1}</span>
                    <img
                      src={match.imageUrl1 ? `${BASE_URL}${match.imageUrl1}` : "/default-avatar.png"}
                      alt=""
                      className="p-1 w-14 h-14 object-cover rounded-full"
                    />
                  </div>
                  <div className="text-lg font-semibold w-1/6 text-center">
                    {match.user1Score}
                  </div>
                  <div className="text-lg font-semibold w-1/12 text-center">-</div>
                  <div className="text-lg font-semibold w-1/6 text-center">
                    {match.user2Score}
                  </div>
                  <div className="flex items-center w-1/4">
                    <img
                      src={match.imageUrl2 ? `${BASE_URL}${match.imageUrl2}` : "/default-avatar.png"}
                      alt=""
                      className="p-1 w-14 h-14 object-cover rounded-full"
                    />
                    <span className="p-1">{match.userName2}</span>
                  </div>
                </div>
                <div className="text-center text-black mt-3">Time: {match.matchTime}</div>
                <hr />
              </div>
            ))}
        </div>
      ))}
  </div>
  );
};

export default Fixtures;
