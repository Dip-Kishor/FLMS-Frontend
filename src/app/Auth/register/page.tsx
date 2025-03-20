"use client";
import LoadingOverlay from "@/components/UI/LoadingSpinner";
import { port } from "@/constants/appl.constant";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import LoginButton from "@/components/UI/LoginButton";
import Logo from "@/components/UI/Logo";
import { usePopup } from "@/components/UI/Popup";



const Page = () => {
    const { showPopup } = usePopup();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    // e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
        showPopup("Password do not match.", "warning");

      return;
    }

    try {
      const response = await fetch(`${port}/userApi/createAccount`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

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
                User Name
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
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
                value={formData.email}
                onChange={handleChange}
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
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full p-2 rounded-md  border-2 border-gray-300 shadow-sm focus:outline-none focus:border-[#4C6F35] sm:text-sm"
                placeholder="••••••••"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="mt-1 block w-full p-2 rounded-md  border-2 border-gray-300 shadow-sm focus:outline-none focus:border-[#4C6F35] sm:text-sm"
                placeholder="••••••••"
                required
              />
            </div>

            <div className="w-full">
              <LoginButton name="Sign Up" />
            </div>
          </form>
         
        </div>
      </div>
      {/* {isLoading && <div className="loading-spinner"></div>} */}
    </div>
    </>
  );
};

export default Page;