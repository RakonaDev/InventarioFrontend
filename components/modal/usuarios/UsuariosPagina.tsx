'use client'

import { ListUserInterface, UsersResponse } from '@/interfaces/ListUserInterface'
import { Pagination, Stack } from '@mui/material';
import React, { useState } from 'react'
import { HeadTablePC } from '../../dashboard/table/HeadTablePC';
import { ButtonOpenModal } from '../../buttons/ButtonOpenModal';
import { motion } from 'framer-motion';
import { AgregarUsuarios } from './AgregarUsuarios';
import { useRouter } from 'next/navigation';
import ListaUsuarios from './ListaUsuarios';
import { TableTitle } from '@/interfaces/TableTitle';

const ItemsUsuariosTable: TableTitle[] = [
  { nombre: "Nombre Completo", className: "lg:col-span-2" },
  { nombre: "Celular", className: "lg:col-span-2" },
  { nombre: "Email", className: "lg:col-span-2 " },
  { nombre: "Estado", className: "lg:col-span-2 " },
  { nombre: "Rol", className: "lg:col-span-2 " },
];

export default function UsuariosPagina({ usuariosData }: { usuariosData: UsersResponse }) {
  const router = useRouter()
  const [usuarios, setUsuarios] = useState<ListUserInterface[]>(usuariosData.users)
  function nextPage(e: React.ChangeEvent<unknown>, value: number) {
    router.push(`/dashboard/usuarios/${value}`)
  }

  return (
    <>
      <div className="w-full mt-10 flex items-center mb-6 justify-between">
        <div className="w-fit flex items-center gap-6">
          <motion.h2
            className="text-2xl font-medium"
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
          >
            Usuarios
          </motion.h2>
        </div>
        <ButtonOpenModal modal={<AgregarUsuarios />} text="Agregar usuario" />
      </div>
      <div className="w-full bg-white-main p-5 overflow-x-auto">
        <HeadTablePC
          titlesTable={ItemsUsuariosTable}
          className="mb-6 flex gap-5 xl:grid-cols-12 text-gray-400 border-b pb-5"
        />
        <div className='w-full min-h-[45dvh] bg-white-main'>
          <ListaUsuarios usuarios={usuarios} setUsuarios={setUsuarios} />
        </div>
      </div>
      <div className='w-full flex justify-center pt-5'>
        <Stack spacing={2}>
          <Pagination count={usuariosData.totalPages} page={usuariosData.currentPage} onChange={nextPage} />
        </Stack>
      </div>
    </>
  );
}
