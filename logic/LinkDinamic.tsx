'use client'

import Link from "next/link"
import { AiFillBank } from "react-icons/ai"
import { BsAwardFill } from "react-icons/bs"
import { FaShoppingBag } from "react-icons/fa"
import { FaArrowRightArrowLeft, FaUsers } from "react-icons/fa6"
import { GiFruitBowl } from "react-icons/gi"
import { MdSell } from "react-icons/md"
import { TbCategoryFilled } from "react-icons/tb"

export function LinkDinamic(name: string) {
  if (name === 'usuarios') {
    return (
      <li key={name}>
        <Link
          href={"/dashboard/usuarios"}
          className="w-full flex items-center gap-3 px-12 py-4 hover:bg-gray-600 hover:text-black-main transition-colors duration-500 text-white-main"
        >
          <span className="text-2xl">
            <FaUsers />
          </span>
          <p className="text-lg font-bold">Usuarios</p>
        </Link>
      </li>
    )
  }
  if (name === 'productos') {
    return (
      <li key={name}>
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
    )
  }
  if (name === 'roles') {
    return (
      <li key={name}>
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
    )
  }
  if (name === 'categorias') {
    return (
      <li key={name}>
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
    )
  }
  if (name === 'proveedores') {
    return (
      <li key={name}>
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
    )
  }
  if (name === 'compras') {
    return (
      <li key={name}>
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
    )
  }
  if (name === 'salidas') {
    return (
      <li key={name}>
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
    )
  }
  if (name === 'movimientos') {
    return (
      <li key={name}>
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
    )
  }
}