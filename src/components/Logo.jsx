import React from "react";
import logo from "../assets/logo.jpeg";

const Logo = () => {
  return (
    <div className="flex items-center cursor-pointer select-none hover:opacity-80 transition-opacity duration-300 group">
      <div className="relative">
        <img 
          src={logo} 
          alt="Logo" 
          className="h-12 w-auto rounded-xl shadow-soft group-hover:shadow-medium transition-shadow duration-300" 
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <span className="ml-3 text-2xl font-bold bg-gradient-to-r from-primary-600 via-secondary-600 to-primary-600 bg-clip-text text-transparent tracking-wide drop-shadow-sm select-none hidden sm:inline font-display uppercase">
        DigiMart
      </span>
    </div>
  );
};

export default Logo;