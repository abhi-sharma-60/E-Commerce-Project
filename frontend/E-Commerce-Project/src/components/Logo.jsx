import React from "react";
import logo from "../assets/logo.jpeg";

const Logo = () => {
  return (
    <div className="flex items-center cursor-pointer select-none hover:opacity-80 transition-opacity duration-300">
      <img src={logo} alt="Logo" className="h-12 w-auto rounded-md shadow-sm" />
      <span
        className="
  ml-3
  text-2xl
  font-extrabold
  bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600
  bg-clip-text
  text-transparent
  tracking-wide
  drop-shadow-md
  select-none
  hidden sm:inline
  font-sans
  uppercase
  "
      >
        DigiMart
      </span>
    </div>
  );
};

export default Logo;
