import React from "react";
import Logo from "../UI/Logo";
import Link from "next/link";
import { EMAIL, PHONENUMBER } from "@/constants/appl.constant";
import { CiMail } from "react-icons/ci";
import { MdOutlineCall } from "react-icons/md";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Fixtures", href: "/fixtures" },
  { name: "Results", href: "/results" },
  { name: "Table", href: "/table" },
  { name: "Players", href: "/players" },
];

const Footer = () => {
  return (
    <>
      <footer className="bg-[#345120] py-10 px-5">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10 text-center md:text-left">
          {/* Logo */}
          <div>
            <Logo />
          </div>

          {/* Navigation Links */}
          <ul className="flex flex-wrap justify-center gap-5 md:gap-7">
            {navLinks.map((navlink, index) => (
              <li key={index} className="text-white">
                <Link href={navlink.href}>{navlink.name}</Link>
              </li>
            ))}
          </ul>

          {/* Contact Info */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2 bg-[#ddeddd] rounded-md px-3 py-2 mb-3 w-fit">
              <CiMail className="text-[20px]" />
              <span className="pointer text-sm">{EMAIL}</span>
            </div>
            <div className="flex items-center gap-2 bg-[#ddeddd] rounded-md px-3 py-2 w-fit">
              <MdOutlineCall className="text-[20px]" />
              <span className="pointer text-sm">{PHONENUMBER}</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Copyright Section */}
      <div className="bg-[#A77523] py-5 text-white text-center text-sm">
        &copy; 2024 DB Pro League. All rights reserved.
      </div>
    </>
  );
};

export default Footer;
