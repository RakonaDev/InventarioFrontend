"use client";
import React from "react";
import ModalWrapper from "../../../../components/modal/ModalWrapper";
import { useAdmin } from "../../../../context/AdminContext";

export const ModalRender = () => {
  const { modalContent } = useAdmin();
  return (
    <>
      <ModalWrapper componente={modalContent} />
    </>
  );
};
