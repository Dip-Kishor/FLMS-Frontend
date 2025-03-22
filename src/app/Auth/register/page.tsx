"use client";
// import LoadingOverlay from "@/components/UI/LoadingSpinner";
import Loading from "@/components/UI/Loading";
import { port } from "@/constants/appl.constant";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import LoginButton from "@/components/UI/LoginButton";
import { usePopup } from "@/components/UI/Popup";
import axios from "axios";
import Link from "next/link";

const Page = () => {
    const { showPopup } = usePopup();

    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
 
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    const payload ={userName,email,password}
    try {
      const response = await axios.post(`${port}/userApi/createAccount`,payload, {
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.data;

      if (data.status == 4) {
        setLoading(false);
        showPopup(data.message, "success");
        router.push("/Auth/login");
      } else {
        setLoading(false);
        showPopup(data.message, "warning");

      }
    } catch (error) {
      setLoading(false);
      console.error(error);
      showPopup("Error during login", "warning");
    }
  };

  

  return (
    <>
      {loading ? <Loading /> : <></>}
      <div className="min-h-screen flex items-center justify-center bg-[#dbe9e2] bg-cover ">
      <div className="w-[1188px] bg-no-repeat  h-[50vh]">
        <div className="w-[300px] md:w-[700px] mx-auto bg-white  rounded-md flex flex-col md:flex-row">
        
          <div className="md:w-1/2 px-6  pt-5">
          <form onSubmit={handleSubmit}>
          <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                User Name
              </label>
              <input
                type="text"
                name="username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="mt-1 block w-full p-2 rounded-md  border-2 border-gray-300 shadow-sm focus:outline-none focus:border-[#4C6F35] sm:text-sm"
                placeholder="user"
                required
              />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full p-2 rounded-md  border-2 border-gray-300 shadow-sm focus:outline-none focus:border-[#4C6F35] sm:text-sm"
                  placeholder="user@example.com"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full p-2 rounded-md  border-2 border-gray-300 shadow-sm focus:outline-none focus:border-[#4C6F35] sm:text-sm"
                  placeholder="••••••••"
                  required
                />
              </div>
            <div className="w-full">
              <LoginButton name="Sign Up" />
            </div>
          </form>
          <div className="link text-center pt-1">
              <Link href="/Auth/login" className="text-center underline text-[#4C6F35]">Login!</Link>
            </div>
         </div>
         <div className=" w-1/2 h-[340px] bg-cover bg-[url('/Stadium2.jpg')] text-center text-white hidden md:flex flex-col justify-end p-5">
            {/* <Logo /> */}
            <p className="text-3xl pb-2">FLMS</p>
            <p className="text-1xl">Register if you are new here.</p>
        </div>
        </div>
      </div>
      {/* {isLoading && <div className="loading-spinner"></div>} */}
    </div>
    </>
  );
};

export default Page;