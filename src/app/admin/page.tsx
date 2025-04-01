"use client"
import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
interface PlayerData {
  name: string;
  value: number;
}
interface AmountData {
  name: string;
  value: number;
}

const Page = () => {
  const [playersData, setPlayersData] = useState<PlayerData[]>([]);
  const [amountData, setAmountData] = useState<AmountData[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const players = [
        { name: 'Season 1', value: 9 },
        { name: 'Season 2', value: 7 },
      ];
      const amount = [
        { name: 'Season 1', value: 900 },
        { name: 'Season 2', value: 700 },
      ];
      setPlayersData(players);
      setAmountData(amount);
    };
    fetchData();
  }, []);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="pt-40 min-h-screen p-4">
      <h1 className="text-xl font-bold mb-4">Admin Dashboard</h1>
    <div className='flex flex-wrap '>
      {/* Bar Chart */}
      <div className='w-1/2'>
        <h2 className="text-lg font-semibold mb-2">Players</h2>
        <ResponsiveContainer width="60%" height={300}>
          <BarChart data={playersData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className='w-1/2'>
        <h2 className="text-lg font-semibold mb-2">Amount Collected</h2>
        <ResponsiveContainer width="60%" height={300}>
          <BarChart data={amountData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
      {/* Pie Chart */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-2">Pie Chart</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={playersData} cx="50%" cy="50%" outerRadius={100} fill="#8884d8" dataKey="value">
              {playersData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      
    </div>
  );
};

export default Page;
