"use client";

import React, { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Link from "next/link";
import PrimaryButton from "../UI/PrimaryButton";
import { usePathname, useRouter } from "next/navigation";
import { usePopup } from "@/components/UI/Popup";
import axios from "axios";
import {port} from "@/constants/appl.constant";



const Navbar: React.FC = () => {
  const { showPopup } = usePopup();
  const [isLoading, setIsLoading] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // const [token, setToken] = useState<null | string>(null);
  const [userData, setUserData] = useState<{
    userName?: string;
    email?: string;
    role: string;
  } | null>(null);
  const router = useRouter();

  const pathname = usePathname();
  const isAdminPage = pathname === "/admin" || pathname === "/admin/user";
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const handleScroll = () => {
    const offset = window.scrollY;
    setScrolled(offset > 100);
  };
  useEffect(() => {
    sessionStorage.getItem("token");
    // const storedToken = sessionStorage.getItem("token");
    // setToken(sessionStorage.getItem("token"));
    window.addEventListener("scroll", handleScroll);
    const storedUserData = sessionStorage.getItem("userData");
    if (storedUserData) {
      try {
        setUserData(JSON.parse(storedUserData));
      } catch {
        setUserData(null);
      }
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Fixtures", href: "/fixtures" },
    { name: "Results", href: "/results" },
    { name: "Table", href: "/table" },
    { name: "Players", href: "/players" },
  ];

  const handleLogout = async (e) => {
    e.preventDefault();

    
    
    try {
      setIsLoading(true); // Show loading indicator
      const response = await axios.get(`${port}/userApi/logout`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      console.log(response.data);

      if (response.data.status === 4) {
        localStorage.removeItem("token");
        localStorage.removeItem("userData");
        sessionStorage.clear()
        clearCookies();
        showPopup(response.data.message, "success");
        router.replace("/");
        window.location.href = "/";
      } else {
        showPopup(response.data.message, "warning");
      }
    } catch (error) {
      setIsLoading(false); 
      console.error("Error during login:", error);
      showPopup("Network error occurred.", "warning");
    } finally {
      setIsLoading(false); // Hide loading indicator
    }
    function clearCookies() {
      // Get all cookies
      const cookies = document.cookie.split(";");
    
      // Loop through cookies and set expiry to the past to remove them
      cookies.forEach((cookie) => {
        const cookieName = cookie.split("=")[0].trim();
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname};`;
      });
    }
  };

  return (
    <div
      className={`w-full bg-[#f4f3f0] border-b-[1px] border-[#4C6F35] z-50 fixed top-0 left-0 right-0 transition-transform duration-300 ease-in-out ${
        scrolled ? "shadow-md" : ""
      }`}
    >
      <div className="container mx-auto flex items-center justify-between h-[80px] max-md:px-2 relative">
        <div>
          <Link href="/">
            <img
              src="/DBProLeague.png"
              alt="logo"
              className={`absolute top-0 max-lg:w-[100px] w-[200px] bg-transparent transition-all duration-300 ease-in-out ${
                scrolled ? "top-[-60px]" : "top-0"
              }`}
            />
          </Link>
        </div>
        <div className="max-lg:hidden">
        {isAdminPage ? (
            userData?.role !== "Admin" ? (
              <Link href="/admin/user">Users</Link>
            ) : (
              <ul className="flex gap-7">
                {navLinks.map((navLink, index) => (
                  <li key={index}>
                    <Link href={navLink.href}>{navLink.name}</Link>
                  </li>
                ))}
              </ul>
            )
          ) : <ul className="flex gap-7">
          {navLinks.map((navLink, index) => (
            <li key={index}>
              <Link href={navLink.href}>{navLink.name}</Link>
            </li>
          ))}
        </ul>}
        </div>
        <div className="max-lg:hidden">
          {userData === null ? (
            <Link href="/Auth/login">
              <PrimaryButton name="Login" />
            </Link>
          ) : (
            <div className="relative group inline-block">
              <img
                src="/man.png"
                className="cursor-pointer w-10 h-10 rounded-full"
                alt="User Icon"
              />
              <div className="absolute w-[300px] right-0 top-12 opacity-0 invisible bg-white p-3 rounded shadow-lg transition-all duration-300 group-hover:opacity-100 group-hover:visible">
                <div
                    className="truncate max-w-[140px] text-center"
                    title={userData?.role || "Guest"}
                  >
                    {userData?.role || "Guest"}
                  </div>
                <div className="flex gap-2">
                  <div className="font-semibold">Name:</div>
                  <div
                    className="truncate max-w-[140px]"
                    title={userData?.userName || "Guest"}
                  >
                    {userData?.userName || "Guest"}
                  </div>
                </div>
                <div className="flex gap-2 mt-2">
                  <div className="font-semibold">Email:</div>
                  <div
                    className="truncate max-w-[240px]"
                    title={userData?.email || "N/A"}
                  >
                    {userData?.email || "N/A"}
                  </div>
                </div>
                <button
  className="bg-red-500 mt-3 w-full text-white px-5 py-2 rounded-md font-semibold transition-all duration-300 hover:bg-red-600 disabled:opacity-50"
  onClick={handleLogout}
  disabled={isLoading} // Disable button while loading
>
  {isLoading ? "Logging Out..." : "Log Out"}
</button>

              </div>
            </div>
          )}
        </div>
        <button
          className="lg:hidden"
          onClick={toggleNavbar}
          aria-label="Toggle Menu"
          type="button"
        >
          <FaBars className="text-[30px]" />
        </button>
      </div>
      <div
        className={`fixed inset-0 bg-white shadow-lg z-50 transition-transform duration-300 ease-in-out px-3 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } lg:hidden`}
      >
        <div className="flex items-center justify-between border-b py-3">
          <button onClick={toggleNavbar} aria-label="Close Menu" type="button">
            <FaTimes className="text-2xl text-[#414347]" />
          </button>
        </div>
        <ul className="flex flex-col gap-7">
          {navLinks.map((navLink, index) => (
            <li key={index} className="text-center">
              <Link href={navLink.href}>{navLink.name}</Link>
            </li>
          ))}
        </ul>
        <div className="py-4 text-center">
          <PrimaryButton name="Login" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
