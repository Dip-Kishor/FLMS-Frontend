import React from 'react';
import { BASE_URL } from "@/constants/appl.constant";

interface Table {
  rank: number;
  playerId: number;
  playerName: string;
  imageUrl: string;
  matchesPlayed: number;
  wins: number;
  draws: number;
  losses: number;
  gf: string;
  ga: number;
  gd: number;
  points: number;
  group: number;
}

interface TableProps {
  table: Table[];
}

const TableData: React.FC<TableProps> = ({ table }) => {
  // Grouping data by 'group' and sorting each group by 'rank'
  const groupedData = table.reduce<{ [key: number]: Table[] }>((acc, item) => {
    if (!acc[item.group]) {
      acc[item.group] = [];
    }
    acc[item.group].push(item);
    return acc;
  }, {});

  return (
    <div className="p-4">
      {Object.keys(groupedData)
        .sort((a, b) => Number(a) - Number(b)) // Sort groups in ascending order
        .map((group) => (
          <div key={group} className="mb-6">
            <h2 className="text-lg font-bold mb-2">Group {group}</h2>
            <div className="overflow-x-auto">
              <div className="min-w-max w-full border border-gray-300 rounded-lg">
                <div className="grid grid-cols-12 bg-gray-200 font-semibold p-2 text-sm">
                  <div className="p-2">Rank</div>
                  <div className="p-2 col-span-2 text-center">Player Name</div>
                  <div className="p-2 text-center">Matches Played</div>
                  <div className="p-2 text-center">Wins</div> {/* Reduced width */}
                  <div className="p-2 text-center">Draws</div> {/* Reduced width */}
                  <div className="p-2 text-center">Losses</div> {/* Reduced width */}
                  <div className="p-2 text-center">GF</div> {/* Reduced width */}
                  <div className="p-2 text-center">GA</div> {/* Reduced width */}
                  <div className="p-2 text-center">GD</div> {/* Reduced width */}
                  <div className="p-2 text-center">Points</div>
                </div>
                {groupedData[Number(group)]
                  .sort((a, b) => a.rank - b.rank) // Sort by rank within the group
                  .map((player) => (
                    <div key={player.playerId} className="grid grid-cols-12 border-b border-gray-300 text-sm p-2">
                      <div className="p-2">{player.rank}</div>
                      <div className="p-2 flex justify-center">
                        <img
                          src={player.imageUrl ? `${BASE_URL}${player.imageUrl}` : "/default-avatar.png"}
                          alt=""
                          className="w-12 h-12 object-cover rounded-full"
                        />
                      </div>
                      <div className="p-2 text-center flex items-center">{player.playerName}</div>
                      <div className="p-2 text-center">{player.matchesPlayed}</div>
                      <div className="p-2 text-center">{player.wins}</div>  {/* Reduced width */}
                      <div className="p-2 text-center">{player.draws}</div>  {/* Reduced width */}
                      <div className="p-2 text-center">{player.losses}</div>  {/* Reduced width */}
                      <div className="p-2 text-center">{player.gf}</div>  {/* Reduced width */}
                      <div className="p-2 text-center">{player.ga}</div>  {/* Reduced width */}
                      <div className="p-2 text-center">{player.gd}</div>  {/* Reduced width */}
                      <div className="p-2 font-bold text-center">{player.points}</div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default TableData;
