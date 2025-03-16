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
      <footer className="bg-[#4C6F35] py-10">
        <div className="container mx-auto flex items-center justify-between">
          <div>
            <Logo />
          </div>

          <ul className="flex gap-7">
            {navLinks.map((navlinks, index) => {
              return (
                <li key={index} className="text-white">
                  <Link href={navlinks.href}>{navlinks.name}</Link>
                </li>
              );
            })}
          </ul>
          <div>
            <div className="flex p-2 items-center gap-2 bg-[#ddeddd] rounded-md mb-3">
              <span>
                <CiMail className="text-[20px]" />
              </span>
              <span className="pointer">{EMAIL}</span>
            </div>
            <div className="flex p-2 items-center gap-2 bg-[#ddeddd] rounded-md">
              <span>
                <MdOutlineCall className="text-[20px]" />
              </span>
              <span className="pointer">{PHONENUMBER}</span>
            </div>
          </div>
        </div>
      </footer>
      <div className="bg-[#A77523] py-5 text-white text-center">
        &copy; 2024 e-Football Homies Tournament. All rights reserved.
      </div>
    </>
  );
};

export default Footer;
