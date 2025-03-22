'use client'

import { SalidasResponse } from '@/interfaces/SalidaInterface'
import { Pagination, Stack } from '@mui/material';
import { useRouter } from 'next/navigation';
import React from 'react'
import { HeadTablePC } from '../../dashboard/table/HeadTablePC';
import { motion } from 'framer-motion';
import { TableTitle } from '@/interfaces/TableTitle';
import ListaSalidasMov from './ListaSalidasMov';

const ItemsRolesTable: TableTitle[] = [
  { nombre: "ID_Movimiento", className: "xl:col-span-2 min-w-[100px]" },
  { nombre: "Producto", className: "xl:col-span-2 min-w-[150px]" },
  { nombre: "Precio", className: "xl:col-span-1 min-w-[130px]" },
  { nombre: "Cantidad", className: "xl:col-span-2 min-w-[130px]" },
  { nombre: "Total", className: "xl:col-span-1 min-w-[150px]" },
  { nombre: "Comprobante", className: "xl:col-span-2 min-w-[150px]" },
  { nombre: "Fecha de Creación", className: "xl:col-span-2 min-w-[200px]" },
]

export default function SalidasMovPagina({ salidasData }: { salidasData: SalidasResponse }) {
  const router = useRouter()
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    router.push(`/dashboard/movimientos/${event.target.value}/${1}`)
  };

  function nextPage(event: React.ChangeEvent<unknown>, value: number) {
    router.push(`/dashboard/movimientos/salidas/${value}`)
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
            Movimientos
          </motion.h2>
        </div>
        <div>
          <select
            name="opcion"
            id="opcion"
            className="px-8 py-2 border-2 shadow-sm shadow-black-900 rounded-xl border-black-900"
            title='opcion'
            onChange={handleChange}
            value="salidas"
          >
            <option value="compras">Compras</option>
            <option value="salidas" selected>Salidas</option>
          </select>
        </div>
        {/*<ButtonOpenModal modal={<AgregarRol />} text="Agregar Rol" />*/}
      </div>
      <div className="w-full bg-white-main p-5 overflow-x-auto">
        <HeadTablePC
          titlesTable={ItemsRolesTable}
          className="mb-6 gap-5 xl:grid-cols-12 flex text-gray-400 border-b pb-5"
          nededActions={false}
        />
        <div className='w-full min-h-[45dvh] bg-white-main'>
          <ListaSalidasMov salidas={salidasData?.salidas} />
        </div>
        <div className='w-full flex justify-center pt-5'>
          <Stack spacing={2}>
            <Pagination count={salidasData?.totalPages} page={salidasData.currentPage} onChange={nextPage} />
          </Stack>
        </div>

      </div>
    </>
  );
}
