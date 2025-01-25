"use client";
import React, { ReactNode } from "react";
import { useAdmin } from "../../context/AdminContext";

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
    <button
      type="button"
      onClick={() => {
        openModal();
        setModalContent(modal);
      }}
      className={`flex rounded-main bg-secundario-main text-white-main py-2 px-5 transition-all duration-200 ease-out hover:bg-secundario-500 ${
        className ?? ""
      }`}
    >
      {text}
    </button>
  );
};
