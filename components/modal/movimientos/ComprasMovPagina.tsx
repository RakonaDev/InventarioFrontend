'use client'

import { ComprasResponse } from '@/interfaces/CompraInterface'
import { Pagination, Stack } from '@mui/material';
import React from 'react'
import { motion } from 'framer-motion';
import { HeadTablePC } from '../../dashboard/table/HeadTablePC';
import { TableTitle } from '@/interfaces/TableTitle';
import { useRouter } from 'next/navigation';
import ListaComprasMov from './ListaComprasMov';

const ItemsRolesTable: TableTitle[] = [
  { nombre: "ID_Movimiento", className: "xl:col-span-2 min-w-[100px]" },
  { nombre: "Producto", className: "xl:col-span-2 min-w-[150px]" },
  { nombre: "Precio", className: "xl:col-span-1 min-w-[130px]" },
  { nombre: "Cantidad", className: "xl:col-span-2 min-w-[130px]" },
  { nombre: "Total", className: "xl:col-span-1 min-w-[150px]" },
  { nombre: "Comprobante", className: "xl:col-span-2 min-w-[150px]" },
  { nombre: "Fecha de Creación", className: "xl:col-span-2 min-w-[200px]" },
]

export default function ComprasMovPagina({ comprasData }: { comprasData: ComprasResponse }) {
  const router = useRouter()
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    router.push(`/dashboard/movimientos/${event.target.value}/${1}`)
  };

  function nextPage(event: React.ChangeEvent<unknown>, value: number) {
    router.push(`/dashboard/movimientos/compras/${value}`)
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
            value="compras"
          >
            <option value="compras" selected>Compras</option>
            <option value="salidas">Salidas</option>
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
          <ListaComprasMov compras={comprasData?.compras} />
        </div>
        <div className='w-full flex justify-center pt-5'>
          <Stack spacing={2}>
            <Pagination count={comprasData?.totalPages} page={comprasData.currentPage} onChange={nextPage} />
          </Stack>
        </div>

      </div>
    </>
  );
}
