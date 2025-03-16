"use client";
import React, { useState } from "react";
import axios from "axios";
import {port} from "@/constants/appl.constant";
import Logo from "@/components/UI/Logo";
import LoginButton from "@/components/UI/LoginButton";
import { useRouter } from "next/navigation";
// import Cookies from "js-cookie";
import Link from "next/link";
import { usePopup } from "@/components/UI/Popup";
import LoadingOverlay from "@/components/UI/LoadingSpinner";


type userData = {
  email: string;
  name: string;
  role: string;
};
const page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { showPopup } = usePopup();
    const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (e: any) => {
    setLoading(true); // Show loading indicator
    e.preventDefault();
    const payload = { email, password };

    try {
        const response = await axios.post(`${port}/userApi/login`, payload, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
  
        console.log(response.data);
  
        if (response.data.status === 4) {
            setLoading(false);
          localStorage.setItem("token", response.data.data.token);
          localStorage.setItem("userData", JSON.stringify(response.data.data));
          showPopup(response.data.message, "success");
          window.location.href = "/";
        } else {
            setLoading(false);
          showPopup(response.data.message, "warning");
        }
      } catch (error) {
        setLoading(false);
        console.error("Error during login:", error);
        showPopup("An error occurred during login.", "warning");
      } finally {
        setLoading(false); // Hide loading indicator
      }
  };

  return (
    <>
    {loading ? <LoadingOverlay /> : <></>}
    <div className="min-h-screen flex items-center justify-center bg-[#dbe9e2] bg-cover ">
      <div className="w-[1188px] bg-[url('/image4.png')] bg-no-repeat  h-[50vh]">
        <div className="w-[400px] mx-auto bg-white p-10 rounded-md">
          <div className="flex items-center justify-center">
            <Logo />
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
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
              <LoginButton name="Login" />
            </div>
          </form>
          <div className="link text-center py-5">
            <p>Not have an account yet?</p>
            <Link href="/Auth/register" className="text-center underline text-[#4C6F35]">Register here!</Link>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default page;
