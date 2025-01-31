'use client'
import Link from "next/link";
import { Header } from "../../components/estructura/Header";
import { FaUsers } from "react-icons/fa6";
import { BsAwardFill } from "react-icons/bs";
import { AdminProvider } from "../../context/AdminContext";
import { ModalRender } from "./dashboard/@components/ModalRender";
import { GiFruitBowl } from "react-icons/gi";
import { TbCategoryFilled } from "react-icons/tb";
import { AiFillBank } from "react-icons/ai";
import { MdSell } from "react-icons/md";
import { FaShoppingBag } from "react-icons/fa";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <AdminProvider>
      <Header />
      <section className="w-full flex justify-between h-[calc(100dvh-80px)] ">
        <div className="w-[280px] bg-gradient-to-t from-slate-500 to-slate-900 h-auto">
          <ul>
            <li>
              <Link
                href={"/dashboard/usuarios"}
                className="w-full flex items-center gap-3 px-12 py-4 hover:bg-gray-600 transition-colors duration-500 text-white-main"
              >
                <span className="text-2xl">
                  <FaUsers />
                </span>
                <p className="text-lg font-bold">Usuarios</p>
              </Link>
            </li>
            <li>
              <Link
                href={"/dashboard/insumos"}
                className="w-full flex items-center gap-3 px-12 py-4 hover:bg-gray-600 transition-colors duration-500 text-white-main"
              >
                <span className="text-2xl">
                  <GiFruitBowl />
                </span>
                <p className="text-lg font-bold">Productos</p>
              </Link>
            </li>
            <li>
              <Link
                href={"/dashboard/roles"}
                className="w-full flex items-center gap-3 px-12 py-4 hover:bg-gray-600 transition-colors duration-500 text-white-main"
              >
                <span className="text-2xl">
                  <BsAwardFill />
                </span>
                <p className="text-lg font-bold">Roles</p>
              </Link>
            </li>
            <li>
              <Link
                href={"/dashboard/categorias"}
                className="w-full flex items-center gap-3 px-12 py-4 hover:bg-gray-600 transition-colors duration-500 text-white-main"
              >
                <span className="text-2xl">
                  <TbCategoryFilled />
                </span>
                <p className="text-lg font-bold">Categorias</p>
              </Link>
            </li>
            <li>
              <Link
                href={"/dashboard/proveedores"}
                className="w-full flex items-center gap-3 px-12 py-4 hover:bg-gray-600 transition-colors duration-500 text-white-main"
              >
                <span className="text-2xl">
                  <AiFillBank />
                </span>
                <p className="text-lg font-bold">Proveedores</p>
              </Link>
            </li>
            <li>
              <Link
                href={"/dashboard/compras"}
                className="w-full flex items-center gap-3 px-12 py-4 hover:bg-gray-600 transition-colors duration-500 text-white-main"
              >
                <span className="text-2xl">
                  <FaShoppingBag />
                </span>
                <p className="text-lg font-bold">Compras</p>
              </Link>
            </li>
            <li>
              <Link
                href={"/dashboard/salidas"}
                className="w-full flex items-center gap-3 px-12 py-4 hover:bg-gray-600 transition-colors duration-500 text-white-main"
              >
                <span className="text-2xl">
                  <MdSell />
                </span>
                <p className="text-lg font-bold">Salidas</p>
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
