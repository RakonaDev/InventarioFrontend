"use client";
import React, { ReactNode } from "react";
import { useAdmin } from "../../context/AdminContext";
import { motion } from "framer-motion";

export const ButtonOpenModal = ({
  className,
  modal,
  text
}: {
  className?: string;
  modal: ReactNode;
  text: string
}) => {
  const { openModal, setModalContent } = useAdmin();
  return (
    <motion.button
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileTap={{ scale: 1.5 }}
      type="button"
      onClick={() => {
        openModal();
        setModalContent(modal);
      }}
      className={`flex rounded-main bg-black-main text-white-main py-2 px-5 transition-all duration-200 ease-out hover:bg-black-900 ${
        className ?? ""
      }`}
    >
      {text}
    </motion.button>
  );
};
