import Link from 'next/link'
import React from 'react'
import { FaSortDown, FaUser } from 'react-icons/fa6'

export const CardHeaderUser = () => {
  return (
    <div className="w-fit flex items-center gap-3 p-1">
    <Link
      href={""}
      className="flex bg-gray-500 p-3.5 rounded-main text-white-main text-xl"
    >
      <FaUser />
    </Link>
    <div className="flex flex-col gap-0.5">
      <p className="text-white-main ">Logos Perú</p>
      <span className="text-white-100 italic text-xs">
        {" "}
        Administrador
      </span>
    </div>
    <button type="button" className="text-xl text-white-main ml-2">
      <FaSortDown />
    </button>
  </div>
  )
}
