"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";

interface AdminContextType {
  modalContent: ReactNode | null;
  setModalContent: Dispatch<SetStateAction<ReactNode>>;
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const useAdmin = () => {
  const context = useContext(AdminContext);

  if (!context) {
    throw new Error("useAdminContext debe usarse dentro de AdminProvider");
  }

  return context;
};

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<React.ReactNode | null>(null);
  const openModal = () => {
    setIsModalOpen(true);
  };


  useEffect(() => {
    console.log(isModalOpen)    
  }, [isModalOpen]);
  const closeModal = () => {
    setModalContent(null)
    setIsModalOpen(false);
  };



  return (
    <AdminContext.Provider
      value={{ openModal, closeModal, isModalOpen, modalContent, setModalContent }}
    >
      {children}
    </AdminContext.Provider>
  );
};
