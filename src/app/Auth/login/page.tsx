"use client";
// import { Suspense } from "react";
import React, { useState } from "react";
import axios from "axios";
import {port} from "@/constants/appl.constant";
import LoginButton from "@/components/UI/LoginButton";
import Link from "next/link";
import { usePopup } from "@/components/UI/Popup";
import { useFlmsPopup } from "@/components/UI/FLMS.Popup";
// import LoadingOverlay from "@/components/UI/LoadingSpinner";
import Loading from "@/components/UI/Loading";
import Cookies from "js-cookie";
// import { useSearchParams } from "next/navigation";


const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { showPopup } = usePopup();
  const { showFlmsPopup } = useFlmsPopup();
    const [loading, setLoading] = useState(false);
    // const searchParams = useSearchParams();
    // const message = searchParams.get("message");
    
  // useEffect(() => {
  //   if (message) {
  //     showPopup(message, "warning");
  //   }
  // }, []);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true); // Show loading indicator
    e.preventDefault();
    const payload = { email, password };

    try {
        const response = await axios.post(`${port}/userApi/login`, payload, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
  
  
        if (response.data.status === 4) {
            setLoading(false);
            const token = response.data.data.token;
            const userData = response.data.data;
            const expirationTime = Date.now() + 24 * 60 * 60 * 1000; 
            // Cookies.set("token", token, { expires: 1 / 8640 }); 
            Cookies.set("token_expiry", expirationTime.toString(), 
            { expires: 1 ,
              path:"/" 
            });
            Cookies.set("token", token, {
              expires: 1,
              path: "/",
            });
            Cookies.set(
              "userData",
              JSON.stringify({
                email: response.data.data.email,
                userName: response.data.data.userName,
                role: response.data.data.role,
              }),
              { expires: 1, path: "/" }
            );
            sessionStorage.setItem("token", token);
            sessionStorage.setItem("token_expiry", expirationTime.toString());
            sessionStorage.setItem("userData", JSON.stringify(userData));
          showFlmsPopup(response.data.message, "success","/");
          // window.location.href = "/";
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
    {loading ? <Loading /> : <></>}
    <div className="min-h-screen flex items-center justify-center bg-[#dbe9e2] bg-cover ">
      <div className="w-[1188px]  bg-no-repeat  h-[50vh]">
        <div className="w-[300px] md:w-[700px] mx-auto bg-white  rounded-md flex flex-col md:flex-row">
          <div className="hidden w-full md:w-1/2 h-[340px] bg-cover bg-[url('/Stadium2.jpg')] text-center text-white md:flex flex-col justify-end p-5">
            {/* <Logo /> */}
            <p className="text-3xl pb-2">FLMS</p>
            <p className="text-1xl">Login to explore more and register for up coming tournament.</p>
          </div>
          <div className="w-full md:w-1/2 px-6 pt-5 ">
          <p className="">Welcome Back!</p>
            <form onSubmit={handleSubmit}>
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
    </div>
    </>
  );
};

export default Page;
