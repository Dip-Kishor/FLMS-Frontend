import React from 'react';

interface Table {
  rank: number;
  playerId: number;
  playerName: string;
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
                <div className="grid grid-cols-10 bg-gray-200 font-semibold p-2 text-sm">
                  <div className="p-2">Rank</div>
                  <div className="p-2">Player Name</div>
                  <div className="p-2">Matches Played</div>
                  <div className="p-2">Wins</div>
                  <div className="p-2">Draws</div>
                  <div className="p-2">Losses</div>
                  <div className="p-2">GF</div>
                  <div className="p-2">GA</div>
                  <div className="p-2">GD</div>
                  <div className="p-2">Points</div>
                </div>
                {groupedData[Number(group)]
                  .sort((a, b) => a.rank - b.rank) // Sort by rank within the group
                  .map((player) => (
                    <div key={player.playerId} className="grid grid-cols-10 border-b border-gray-300 text-sm p-2">
                      <div className="p-2">{player.rank}</div>
                      <div className="p-2">{player.playerName}</div>
                      <div className="p-2">{player.matchesPlayed}</div>
                      <div className="p-2">{player.wins}</div>
                      <div className="p-2">{player.draws}</div>
                      <div className="p-2">{player.losses}</div>
                      <div className="p-2">{player.gf}</div>
                      <div className="p-2">{player.ga}</div>
                      <div className="p-2">{player.gd}</div>
                      <div className="p-2 font-bold">{player.points}</div>
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