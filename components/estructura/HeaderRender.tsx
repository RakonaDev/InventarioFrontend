'use client'

import { useEffect, useState } from "react"
import { LinkDinamic } from "../../logic/LinkDinamic"
import { HiMenu } from "react-icons/hi"
import { Me } from "@/interfaces/MyInfoInterface"
import Link from "next/link"
import { Pagina } from "@/interfaces/MyInfoInterface";
import { FaArrowRightArrowLeft } from "react-icons/fa6"

export function SectionsRender({ me }: { me: Me }) {
  const [openMenu, setOpenMenu] = useState(false)

  const handlerMenu = () => {
    setOpenMenu(!openMenu)
  }

  useEffect(() => {
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 1024) {
        if (openMenu == false) return
        setOpenMenu(false)
      }
    })
  })
  return (
    <div className={`w-[280px] bg-gradient-to-t from-slate-500 to-slate-900 h-full lg:relative lg:top-0 fixed top-20 ${openMenu ? '-left-[280px]' : 'left-0'} transition-all duration-600`}>
      <button
        title="Abrir menú"
        type="button"
        className="absolute p-1 bg-slate-900 z-50 top-0 -right-12 lg:hidden"
        onClick={handlerMenu}
      >
        <HiMenu size={40} color="white" />
      </button>
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
  )
}