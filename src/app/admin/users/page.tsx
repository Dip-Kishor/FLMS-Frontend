"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";
import { port } from "@/constants/appl.constant";
import { FaTrash } from "react-icons/fa6"; 


interface Users {
  userId: number;
  username: string;
  email: string;
}

const Page = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<Users[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${port}/userApi/getAllUsers`, {
          withCredentials: true,
        });
        const data = response.data;
        console.log(data);
        if (data.status === 4) {
          setUsers(data.data || []);
          console.log("Updated users state:", data.data);  // Debugging output
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);
  const deleteUser = async(userId : number) =>{
    try{
        setLoading(true);
        const response = await axios.post(`${port}/userApi/deleteUser?id=${userId}`,
            {
                withCredentials: true
            });
            const data =response.data;
            if(data.status=== 4){
                setUsers((prevUsers) => prevUsers.filter((user) => user.userId !== userId));
            }
    }
    catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
  }
  

  return (
    <>
      {loading ? (
        <div className="fixed inset-0 flex items-center justify-center bg-white">
          <div className="loader"></div>
        </div>
      ) : (
        <div className="pt-35 min-h-screen bg-[url('/grunge_bg.jpg')] bg-cover bg-center">
          <h2 className="text-3xl mt-5 md:text-4xl tracking-tight leading-tight text-center font-medium">
            User Management
          </h2>
          <div className="overflow-x-auto flex justify-center">
            <table className="w-full sm:w-auto lg:w-1/2 m-3 text-center bg-white shadow-md rounded-lg mt-10">
              <thead>
                <tr className="bg-gray-200">
                  <th className="py-2 px-4 border">S.N</th>
                  <th className="py-2 px-4 border">User Name</th>
                  <th className="py-2 px-4 border">Email</th>
                  <th className="py-2 px-4 border">Actions</th>
                </tr>
              </thead>
              <tbody>
  {users.length > 0 ? (
    users.map((user,index) => (
      <tr key={user.userId} className="text-center border-b">
        <td className="py-2 px-4 border">{index + 1}</td>
        <td className="py-2 px-4 border">{user.username}</td>
        <td className="py-2 px-4 border">{user.email}</td>
        <td className="py-2 px-4 border text-center" onClick={() => deleteUser(user.userId)}><FaTrash className="text-red-500 inline-block cursor-pointer"/></td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan={3} className="text-center py-4">No users found</td>
    </tr>
  )}
</tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
