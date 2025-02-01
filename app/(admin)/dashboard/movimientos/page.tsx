'use client'
import React, { JSX } from 'react'
import { motion } from 'framer-motion';
import { HeadTablePC } from '../../../../components/dashboard/table/HeadTablePC';
import { TableTitle } from '../usuarios/page';
const ItemsRolesTable: TableTitle[] = [
  { nombre: "ID", className: "col-span-1" },
  { nombre: "Tipo de Movimiento", className: "col-span-2" },
  { nombre: "Producto", className: "col-span-2" },
  { nombre: "Cantidad", className: "col-span-2" },
  { nombre: "Total", className: "col-span-1" },
  { nombre: "Comprobante", className: "col-span-2" }
]

export default function page(): JSX.Element {
  return (
    <>
      <div className="w-full  flex items-center mb-6 justify-between">
        <div className="w-fit flex items-center gap-6">
          <motion.h2
            className="text-2xl font-medium"
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
          >
            Movimiento
          </motion.h2>
        </div>
        {/*<ButtonOpenModal modal={<AgregarRol />} text="Agregar Rol" />*/}
      </div>
      <div className="w-full bg-white-main p-5">
        <HeadTablePC
          titlesTable={ItemsRolesTable}
          className="mb-6 grid-cols-12 text-gray-400 border-b pb-5"
        />
        {/*<ListRoles />*/}
      </div>
    </>
  );
}
