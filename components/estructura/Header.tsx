import React from "react";
import { WrapperContent } from "./WrapperContent";
import { FaBell } from "react-icons/fa6";
import { CardHeaderUser } from "../user/CardHeaderUser";
export const Header = () => {
  return (
    <header className="bg-fondo-800 h-[80px]">
      <WrapperContent className="flex justify-between items-center py-6 h-full">
        <div className="w-fit flex items-center">
          <p className="text-2xl text-white-main font-bold">LOGO</p>
        </div>
        <div className="w-fit flex items-center gap-8">
          <button type="button" className="relative text-xl text-white-main">
            <span className="block w-2 h-2 rounded-full bg-primario-main absolute -top-2 -right-1 animate-pulse"></span>
            <FaBell />
          </button>
          <CardHeaderUser />
        </div>
      </WrapperContent>
    </header>
  );
};
