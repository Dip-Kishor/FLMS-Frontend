import React from 'react';

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
  userId1: number;
  userName1: string;
  user1Score: number;
  user2Score: number;
  userId2: number;
  userName2: string;
  tiebrekerScoreUser1: number;
  tiebrekerScoreUser2: number;
  group: number;
  isPostponed: boolean;
  isCompleted: boolean;
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
    <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto lg:mx-20 px-4 py-5">
      {Object.entries(groupedFixtures).map(([date, matches]) => (
        <div key={date} className="relative bg-[#F2ECDB] shadow-lg rounded-2xl p-10 m-5 transition-transform transform hover:scale-105">
          <h2 className="text-black text-xl font-bold mb-2">{date}</h2>
          {matches
          .sort((a, b) => a.matchTime.localeCompare(b.matchTime)).map((match) => (
            <div key={match.id} className="bg-[#4c6f35] p-3 rounded-md mb-2">
                <table className='text-white text center mx-5'>
                    <tbody>
                        <tr className='text-center'>
                            <td colSpan={5}>{getGroup(match.group)}</td>
                        </tr>
                        <tr className='text-center'>
                            <td className='p-3 w-[30%]'>{match.userName1}</td>
                            <td className='p-3 w-[15%]'>{match.user1Score}</td>
                            <td className='p-3 w-[10%]'>-</td>
                            <td className='p-3 w-[15%]'>{match.user2Score}</td>
                            <td className='p-3 w-[30%]'>{match.userName2}</td>
                        </tr>
                        <tr className='text-center'>
                            <td colSpan={5}>Time: {match.matchTime}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Fixtures;
