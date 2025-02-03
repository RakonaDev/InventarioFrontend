'use client'
import Link from "next/link";
import { Header } from "../../components/estructura/Header";
import { AdminProvider } from "../../context/AdminContext";
import { ModalRender } from "./dashboard/@components/ModalRender";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { LinkDinamic } from "../../logic/LinkDinamic";
import { useMe } from "../../hooks/useMe";
import { Pagina } from "@/interfaces/MyInfoInterface";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { me } = useMe()
  
  return (
    <AdminProvider>
      <Header />
      <section className="w-full flex justify-between h-[calc(100dvh-80px)] ">
        <div className="w-[280px] bg-gradient-to-t from-slate-500 to-slate-900 h-full lg:relative lg:top-0 fixed top-20 left-0">
          <ul>
            { 
              me?.roles.list_paginas?.map((pagina: Pagina) => { 
                return LinkDinamic(pagina.nombre || '')
              }) 
            }
            <li>
              <Link
                href={"/dashboard/movimientos"}
                className="w-full flex items-center gap-3 px-12 py-4 hover:bg-gray-600 transition-colors duration-500 text-white-main"
              >
                <span className="text-2xl">
                  <FaArrowRightArrowLeft />
                </span>
                <p className="text-lg font-bold">Movimientos</p>
              </Link>
            </li>
          </ul>
        </div>
        <div className="w-full flex-1 p-8 overflow-y-auto bg-gray-100">
          {children}
        </div>
      </section>
      <ModalRender />

    </AdminProvider>
  );
}
