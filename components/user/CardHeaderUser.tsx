'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { FaSortDown, FaUser } from 'react-icons/fa6'
import { AnimatePresence, motion } from 'framer-motion'
import { MdLogout } from "react-icons/md";
import { useRouter } from 'next/navigation'
import { apiURL } from '../../fonts/helper/global'
import { Me } from '@/interfaces/MyInfoInterface'

export const CardHeaderUser = ({ me }: { me: Me }) => {
  const router = useRouter()
  const [userMenu, setUserMenu] = useState(false)
  const menuHandler = () => {
    setUserMenu(!userMenu)
  }
  const logout = () => {
    fetch(`${apiURL}/logout`, {
      method: 'POST',
      headers: {
        'Autorization': `Bearer ${localStorage.getItem('token')}`
      },
      credentials: 'include' 
    })
    router.push('/login')
  }

  return (
    <div className="w-fit flex items-center gap-3 p-1 relative">
      <Link
        href={""}
        className="flex bg-gray-500 p-3.5 rounded-main text-white-main text-xl"
      >
        <FaUser />
      </Link>
      <div className="flex flex-col gap-0.5">
        <p className="text-white-main ">{`${me?.names || 'Nombres'} ${me?.last_names || ''}`}</p>
        <span className="text-white-100 italic text-xs">
          {me?.roles.name || 'Rol'}
        </span>
      </div>
      <button title='boton' type="button" className="text-xl text-white-main ml-2" onClick={menuHandler}>
        <FaSortDown />
      </button>
      <AnimatePresence>
        {
          userMenu && (
            <motion.div
              exit={{ opacity: 0, x: 200 }}
              initial={{ opacity: 0, x: 200 }}
              animate={{ opacity: 1, x: 0 }}
              key={'wewcd,fmelde'}
              className='z-50 absolute right-0 border-2 border-black-main rounded-lg shadow-md shadow-black-main top-20 bg-white-main p-5 w-[270px] flex flex-col gap-3'
            >
              <h1 className='font-bold border-b-2 border-b-black-main pb-4'>Opciones del Usuario</h1>
              <button 
                onClick={logout}
                type='button' 
                className='w-full flex gap-2 items-center hover:translate-x-1 transition-all duration-300'>
                <MdLogout size={25}/>
                <span>Cerrar Sesion</span>
              </button>
            </motion.div>
          )
        }
      </AnimatePresence>
    </div>
  )
}


