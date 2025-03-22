"use client"
import React from 'react'
import { Montserrat } from "next/font/google";
import Link from "next/link";
import { useState } from "react";
import { ArrowUp } from "lucide-react";


const montserrat = Montserrat({ subsets: ["latin"] });
const PreviousRecord = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen" >
      {/* Left Side */}
      {/* Season 1 */}
      <div>
      <div className="bg-[#F2ECDB] flex flex-col w-full pt-20 lg:p-6">
       <h1 className='pt-8 lg:pt-30 text-1xl lg:text-3xl font-bold self-center bg-red-300 p-2 rounded-b-lg shadow-lg text-white'>Season Records</h1>
       <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="border bg-[#4C6F35] text-white py-2 px-4 border-[#4C6F35] hover:bg-[#A77523] hover:border-[#A77523] ease-in duration-200"
      >
        Select Season
      </button>
      {isOpen && (
        <div className="absolute mt-2 w-40 bg-white border rounded shadow-lg">
          <ul className="py-2">
            <li>
              <a
                href="#season1"
                className="block px-4 py-2 hover:bg-gray-200"
                onClick={() => setIsOpen(false)}
              >
                Season 1
              </a>
            </li>
            <li>
              <a
                href="#season2"
                className="block px-4 py-2 hover:bg-gray-200"
                onClick={() => setIsOpen(false)}
              >
                Season 2
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
       {/* Season 1 Record*/ }
       <div>
        <h2 className='w-full bg-[#345120] text-center mt-5 rounded-lg text-white ' id='#season1'>Season 1</h2>
        <div className='flex flex-col md:flex-row justify-between px-6'>
        <table className="border border-[#BFAF92] border-collapse bg-[#FFFDF6] text-[#5A4A3D] shadow-md text-center ">
          <caption className="text-lg font-semibold text-[#5A4A3D] my-2">
            🏆 DB Pro League
          </caption>
          <thead>
          <tr className="border border-[#BFAF92] hover:bg-[#E8D9B8] transition">
          <th className="border border-[#BFAF92] p-3 font-semibold">Rank</th>
          <th className="border border-[#BFAF92] p-3  font-semibold" colSpan={2}>Name</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border border-[#BFAF92] hover:bg-[#E8D9B8] transition">
              <td className="border border-[#BFAF92] p-3 font-semibold">Winner</td>
              <td className=" p-3">
                <img src="/Sujan.jpg" className="w-[50px] rounded-full shadow-sm" />
              </td>
              <td className=" p-3">Sujan Dahal</td>
            </tr>
            <tr className="border border-[#BFAF92] bg-[#EAE7DC] hover:bg-[#D7D2C3] transition">
              <td className="border border-[#BFAF92] p-3 font-semibold">Runner Up</td>
              <td className=" p-3">
                <img src="/Samrat.jpg" className="w-[50px] rounded-full shadow-sm" />
              </td>
              <td className="p-3">Samrat Subedi</td>
            </tr>
          </tbody>
        </table> 
        <table className="border border-[#BFAF92] border-collapse bg-[#FFFDF6] text-[#5A4A3D] shadow-md text-center">
          <caption className="text-lg font-semibold text-[#5A4A3D] my-2">
          ⚽ Top Scorer
          </caption>
          <thead>
          <tr className="border border-[#BFAF92] hover:bg-[#E8D9B8] transition">
          <th className="border border-[#BFAF92] p-1 py-3 font-semibold">Rank</th>
          <th className="border border-[#BFAF92] p-1 py-3 font-semibold" colSpan={2}>Name</th>
          <th className="border border-[#BFAF92] p-1 py-3 font-semibold">Matches</th>
          <th className="border border-[#BFAF92] p-1 py-3 font-semibold" >Goals</th>
            </tr>
          </thead>
          <tbody>
          <tr className="border border-[#BFAF92]  hover:bg-[#E8D9B8] transition">
              <td className="border border-[#BFAF92] p-3 font-semibold">1</td>
              <td className=" p-1">
                <img src="/Dip.jpg" className="w-[50px] rounded-full shadow-sm" />
              </td>
              <td className=" p-3">Dip Regmi</td>
              <td className="border border-[#BFAF92] p-3 font-semibold">4</td>
              <td className="border border-[#BFAF92] p-3 font-semibold">18</td>
            </tr>
          <tr className="border border-[#BFAF92] bg-[#EAE7DC] hover:bg-[#D7D2C3] transition">
              <td className="border border-[#BFAF92] p-3 font-semibold">2</td>
              <td className=" p-1">
                <img src="/Sujan.jpg" className="w-[50px] rounded-full shadow-sm" />
              </td>
              <td className="p-3">Sujan Dahal</td>
              <td className="border border-[#BFAF92] p-3 font-semibold">6</td>
              <td className="border border-[#BFAF92] p-3 font-semibold">18</td>

            </tr>
           
            
            <tr className="border border-[#BFAF92] hover:bg-[#D7D2C3] transition">
              <td className="border border-[#BFAF92] p-3 font-semibold">3</td>
              <td className=" p-1">
                <img src="/Samrat.jpg" className="w-[50px] rounded-full shadow-sm" />
              </td>
              <td className="p-3">Samrat Subedi</td>
              <td className="border border-[#BFAF92] p-3 font-semibold">6</td>
              <td className="border border-[#BFAF92] p-3 font-semibold">14</td>

            </tr>
          </tbody>
        </table> 
        </div>
        <div className='flex flex-col md:flex-row px-6 justify-between'>
        
        <table className="border border-[#BFAF92] border-collapse bg-[#FFFDF6] text-[#5A4A3D] shadow-md text-center">
          <caption className="text-lg font-semibold text-[#5A4A3D] my-2">
          🌟 Top Performance
          </caption>
          <thead>
          <tr className="border border-[#BFAF92] hover:bg-[#E8D9B8] transition">
          <th className="border border-[#BFAF92] p-3 font-semibold">Rank</th>
          <th className="border border-[#BFAF92] p-3  font-semibold" colSpan={2}>Name</th>
          <th className="border border-[#BFAF92] p-3  font-semibold" >Score</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border border-[#BFAF92] hover:bg-[#E8D9B8] transition">
              <td className="border border-[#BFAF92] p-3 font-semibold">1</td>
              <td className=" p-3">
                <img src="/Dip.jpg" className="w-[50px] rounded-full shadow-sm" />
              </td>
              <td className=" p-3">Dip Regmi</td>
              <td className="border border-[#BFAF92] p-3 font-semibold">9 - 1</td>
            </tr>
            <tr className="border border-[#BFAF92] bg-[#EAE7DC] hover:bg-[#D7D2C3] transition">
              <td className="border border-[#BFAF92] p-3 font-semibold">2</td>
              <td className=" p-3">
                <img src="/Ishor.jpg" className="w-[50px] rounded-full shadow-sm" />
              </td>
              <td className="p-3">Ishor Kattel</td>
              <td className="border border-[#BFAF92] p-3 font-semibold">6 - 1</td>

            </tr>
            <tr className="border border-[#BFAF92] hover:bg-[#D7D2C3] transition">
              <td className="border border-[#BFAF92] p-3 font-semibold">3</td>
              <td className=" p-3">
                <img src="/Sudip.jpg" className="w-[50px] rounded-full shadow-sm" />
              </td>
              <td className="p-3">Sudip Dahal</td>
              <td className="border border-[#BFAF92] p-3 font-semibold">4 - 1</td>

            </tr>
          </tbody>
        </table> 
        </div>
        


       </div>
       
      </div>
      {/* Season 2 */}
      <div className="bg-[#F2ECDB] flex flex-col w-full pt-20 lg:p-6">
       {/* Season 2 Record*/ }
       <div>
        <h2 className='w-full bg-[#345120] text-center mt-5 rounded-lg text-white'>Season 2</h2>
        <div className='flex flex-col md:flex-row justify-between px-6'>
        <table className="border border-[#BFAF92] border-collapse bg-[#FFFDF6] text-[#5A4A3D] shadow-md text-center">
          <caption className="text-lg font-semibold text-[#5A4A3D] my-2">
            🏆 DB Pro League
          </caption>
          <thead>
          <tr className="border border-[#BFAF92] hover:bg-[#E8D9B8] transition">
          <th className="border border-[#BFAF92] p-3 font-semibold">Rank</th>
          <th className="border border-[#BFAF92] p-3  font-semibold" colSpan={2}>Name</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border border-[#BFAF92] hover:bg-[#E8D9B8] transition">
              <td className="border border-[#BFAF92] p-3 font-semibold">Winner</td>
              <td className=" p-3">
                <img src="/Dip.jpg" className="w-[50px] rounded-full shadow-sm" />
              </td>
              <td className=" p-3">Dip Regmi</td>
            </tr>
            <tr className="border border-[#BFAF92] bg-[#EAE7DC] hover:bg-[#D7D2C3] transition">
              <td className="border border-[#BFAF92] p-3 font-semibold">Runner Up</td>
              <td className=" p-3">
                <img src="/Sujan.jpg" className="w-[50px] rounded-full shadow-sm" />
              </td>
              <td className="p-3">Sujan Dahal</td>
            </tr>
          </tbody>
        </table> 
        <table className="border border-[#BFAF92] border-collapse bg-[#FFFDF6] text-[#5A4A3D] shadow-md text-center">
          <caption className="text-lg font-semibold text-[#5A4A3D] my-2">
          ⚽ Top Scorer
          </caption>
          <thead>
          <tr className="border border-[#BFAF92] hover:bg-[#E8D9B8] transition">
          <th className="border border-[#BFAF92] p-1 py-3  font-semibold">Rank</th>
          <th className="border border-[#BFAF92] p-1 py-3   font-semibold" colSpan={2}>Name</th>
          <th className="border border-[#BFAF92] p-1 py-3   font-semibold">Matches</th>
          <th className="border border-[#BFAF92] p-1 py-3   font-semibold" >Goals</th>
            </tr>
          </thead>
          <tbody>
          <tr className="border border-[#BFAF92]  hover:bg-[#E8D9B8] transition">
              <td className="border border-[#BFAF92] p-3 font-semibold">1</td>
              <td className=" p-3">
                <img src="/Dip.jpg" className="w-[50px] rounded-full shadow-sm" />
              </td>
              <td className=" p-3">Dip Regmi</td>
              <td className="border border-[#BFAF92] p-3 font-semibold">15</td>
              <td className="border border-[#BFAF92] p-3 font-semibold">49</td>
            </tr>
          <tr className="border border-[#BFAF92] bg-[#EAE7DC] hover:bg-[#D7D2C3] transition">
              <td className="border border-[#BFAF92] p-3 font-semibold">2</td>
              <td className=" p-3">
                <img src="/Sujan.jpg" className="w-[50px] rounded-full shadow-sm" />
              </td>
              <td className="p-3">Sujan Dahal</td>
              <td className="border border-[#BFAF92] p-3 font-semibold">14</td>
              <td className="border border-[#BFAF92] p-3 font-semibold">38</td>

            </tr>
           
            
            <tr className="border border-[#BFAF92] hover:bg-[#D7D2C3] transition">
              <td className="border border-[#BFAF92] p-3 font-semibold">3</td>
              <td className=" p-3">
                <img src="/Bijay.jpg" className="w-[50px] rounded-full shadow-sm" />
              </td>
              <td className="p-3">Bijay Subedi</td>
              <td className="border border-[#BFAF92] p-3 font-semibold">14</td>
              <td className="border border-[#BFAF92] p-3 font-semibold">31</td>

            </tr>
          </tbody>
        </table> 
        </div>
        <div className='flex flex-col md:flex-row justify-between px-6'>
        
        <table className="border border-[#BFAF92] border-collapse bg-[#FFFDF6] text-[#5A4A3D] shadow-md text-center">
          <caption className="text-lg font-semibold text-[#5A4A3D] my-2">
          🌟 Top Performance
          </caption>
          <thead>
          <tr className="border border-[#BFAF92] hover:bg-[#E8D9B8] transition">
          <th className="border border-[#BFAF92] p-3 font-semibold">Rank</th>
          <th className="border border-[#BFAF92] p-3  font-semibold" colSpan={2}>Name</th>
          <th className="border border-[#BFAF92] p-3  font-semibold" >Score</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border border-[#BFAF92] hover:bg-[#E8D9B8] transition">
              <td className="border border-[#BFAF92] p-3 font-semibold">1</td>
              <td className=" p-3">
                <img src="/Dip.jpg" className="w-[50px] rounded-full shadow-sm" />
              </td>
              <td className=" p-3">Dip Regmi</td>
              <td className="border border-[#BFAF92] p-3 font-semibold">7 - 1</td>
            </tr>
            <tr className="border border-[#BFAF92] bg-[#EAE7DC] hover:bg-[#D7D2C3] transition">
              <td className="border border-[#BFAF92] p-3 font-semibold">2</td>
              <td className=" p-3">
                <img src="/Dip.jpg" className="w-[50px] rounded-full shadow-sm" />
              </td>
              <td className="p-3">Dip Regmi</td>
              <td className="border border-[#BFAF92] p-3 font-semibold">6 - 1</td>

            </tr>
            <tr className="border border-[#BFAF92] hover:bg-[#D7D2C3] transition">
              <td className="border border-[#BFAF92] p-3 font-semibold">3</td>
              <td className=" p-3">
                <img src="/Bijay.jpg" className="w-[50px] rounded-full shadow-sm" />
              </td>
              <td className="p-3">Bijay Subedi</td>
              <td className="border border-[#BFAF92] p-3 font-semibold">6 - 1</td>

            </tr>
          </tbody>
        </table> 
        </div>
       </div>
        <div className='flex justify-center'>
        <Link href="#season1" className=" mt-30 cursor-pointer">
          <button className="text-center  gap-2">
          <ArrowUp className="w-10 h-10 shadow-lg cursor-pointer" />
            </button>
        </Link>
        </div>
      </div>
      </div>
      {/* Right Side */}
      <div className="bg-[#FFFFFF] flex flex-col items-center  w-full lg:pt-20 lg:p-6">
       <h1 className='pt-8 lg:pt-20 text-1xl lg:text-3xl font-bold self-center text-white bg-red-300 p-2 rounded-b-lg shadow-lg'>All time records</h1>
       <div>
         
        <div className='flex flex-col md:flex-row  justify-between px-6'>
        
        <table className="border border-[#BFAF92] border-collapse bg-[#FFFDF6] text-[#5A4A3D] shadow-md text-center mb-3">
          <caption className="text-lg font-semibold text-[#5A4A3D] my-2">
          </caption>
          <thead>
          <tr className="border border-[#BFAF92] hover:bg-[#E8D9B8] transition">
          <th className="border border-[#BFAF92] p-1 py-3  font-semibold w-[10%]">S.N</th>
          <th className="border border-[#BFAF92] p-1 py-3   font-semibold w-[20%]" >Title</th>
          <th className="border border-[#BFAF92] p-1 py-3   font-semibold w-[50%]" colSpan={2} >Players</th>
          <th className="border border-[#BFAF92] p-3  font-semibold w-[20%]" >Record</th>
            </tr>
          </thead>
          <tbody>
          <tr className="border border-[#BFAF92]  hover:bg-[#E8D9B8] transition">
              <td className="border border-[#BFAF92] p-3 font-semibold" rowSpan={2}>1</td>
              <td className="border border-[#BFAF92] p-3 font-semibold" rowSpan={2}>Most Trophy</td>
              <td className=" p-1">
                <img src="/Dip.jpg" className="w-[50px] rounded-full shadow-sm" />
              </td>
              <td className=" p-3">Dip Regmi</td>
              <td className="border border-[#BFAF92] p-3 font-semibold">1</td>
            </tr>
          <tr className="border border-[#BFAF92] bg-[#EAE7DC] hover:bg-[#D7D2C3] transition">
              <td className="p-1">
                <img src="/Sujan.jpg" className="w-[50px] rounded-full shadow-sm" />
              </td>
              <td className="p-3">Sujan Dahal</td>
              <td className="border border-[#BFAF92] p-3 font-semibold">1</td>

            </tr>
            <tr className="border border-[#BFAF92] hover:bg-[#D7D2C3] transition">
              <td className="border border-[#BFAF92] p-3 font-semibold">2</td>
              <td className="border border-[#BFAF92] p-3 font-semibold">Most Matches</td>
              <td className=" p-1">
                <img src="/Sujan.jpg" className="w-[50px] rounded-full shadow-sm" />
              </td>
              <td className="p-3">Sujan Dahal</td>
              <td className="border border-[#BFAF92] p-3 font-semibold">20</td>

            </tr>
            
            <tr className="border border-[#BFAF92] hover:bg-[#D7D2C3] transition">
              <td className="border border-[#BFAF92] p-3 font-semibold">3</td>
              <td className="border border-[#BFAF92] p-3 font-semibold">Most Wins</td>
              <td className=" p-1">
                <img src="/Sujan.jpg" className="w-[50px] rounded-full shadow-sm" />
              </td>
              <td className="p-3">Sujan Dahal</td>
              <td className="border border-[#BFAF92] p-3 font-semibold">16</td>

            </tr>
            <tr className="border border-[#BFAF92] hover:bg-[#D7D2C3] transition">
              <td className="border border-[#BFAF92] p-3 font-semibold">4</td>
              <td className="border border-[#BFAF92] p-3 font-semibold">Most Goals</td>
              <td className=" p-1">
                <img src="/Dip.jpg" className="w-[50px] rounded-full shadow-sm" />
              </td>
              <td className="p-3">Dip Regmi</td>
              <td className="border border-[#BFAF92] p-3 font-semibold">67</td>

            </tr>
            <tr className="border border-[#BFAF92] hover:bg-[#D7D2C3] transition">
              <td className="border border-[#BFAF92] p-3 font-semibold">5</td>
              <td className="border border-[#BFAF92] p-3 font-semibold">Most Goals In a Match</td>
              <td className=" p-1">
                <img src="/Dip.jpg" className="w-[50px] rounded-full shadow-sm" />
              </td>
              <td className="p-3">Dip Regmi</td>
              <td className="border border-[#BFAF92] p-3 font-semibold">9</td>

            </tr>
          </tbody>
        </table> 
        </div>
       
       </div>
      </div>
    </div>
    
    </>
  )
}

export default PreviousRecord