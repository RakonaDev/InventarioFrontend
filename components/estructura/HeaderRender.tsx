'use client'

import { useEffect, useState } from "react"
import { HiMenu } from "react-icons/hi"
import { Me } from "@/interfaces/MyInfoInterface"
import { Pagina } from "@/interfaces/MyInfoInterface";
import { LinkDinamic } from "../LinkDinamic";

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
      </ul>
    </div>
  )
}