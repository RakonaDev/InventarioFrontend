'use client'
import React from "react";
import { WrapperContent } from "./WrapperContent";
import { FaBell } from "react-icons/fa6";
import { CardHeaderUser } from "../user/CardHeaderUser";
import LogosPeru from "../../public/logo-peru.webp"
import Image from "next/image";
import { motion } from "framer-motion";

export const Header = () => {
  return (
    <motion.header 
      layout
      className="h-[80px] bg-gradient-to-b from-red-500 to-red-700"
    >
      <WrapperContent className="flex justify-between items-center py-6 h-full">
        <div className="w-fit flex items-center">
          <Image src={LogosPeru} width={80} height={80} alt="Logos-Peru"/>
        </div>
        <div className="w-fit flex items-center gap-8">
          <button type="button" className="relative text-xl text-white-main">
            <span className="block w-2 h-2 rounded-full bg-primario-main absolute -top-2 -right-1 animate-pulse"></span>
            <FaBell />
          </button>
          <CardHeaderUser />
        </div>
      </WrapperContent>
    </motion.header>
  );
};
