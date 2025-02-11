'use client'
import React from "react";
import { WrapperContent } from "./WrapperContent";
import { FaBell } from "react-icons/fa6";
import { CardHeaderUser } from "../user/CardHeaderUser";
import { motion } from "framer-motion";

export const Header = () => {

  return (
    <motion.header
      layout
      className="h-[80px] bg-gradient-to-b from-red-500 to-red-700 z-20"
    >
      <WrapperContent className="flex justify-between items-center py-6 h-full">
        <div className="w-fit flex items-center">
          <h1 className='font-bold text-2xl text-white-main'>Sistema de Inventario</h1>
        </div>
        <div className="w-fit flex items-center gap-8">
          <button title="notificaciones" type="button" className="relative text-xl text-white-main" onClick={() => console.log("Me diste click")}>
            <span className="block w-2 h-2 rounded-full bg-primario-main absolute -top-2 -right-1 animate-pulse"></span>
            <FaBell />
          </button>
          <CardHeaderUser />
        </div>
      </WrapperContent>
    </motion.header>
  );
};
