'use client'
import React, { JSX, useState } from 'react'
import { motion } from 'framer-motion';
import { HeadTablePC } from '../../../../components/dashboard/table/HeadTablePC';
import { TableTitle } from '../usuarios/page';
import ListComprasMov from '../../../../components/dashboard/table/movimientos/ListComprasMov';
import ListSalidasMov from '../../../../components/dashboard/table/movimientos/ListSalidasMov';
const ItemsRolesTable: TableTitle[] = [
  { nombre: "ID_Compra", className: "xl:col-span-2 min-w-[100px]" },
  { nombre: "Producto", className: "xl:col-span-2 min-w-[150px]" },
  { nombre: "Precio", className: "xl:col-span-1 min-w-[130px]" },
  { nombre: "Cantidad", className: "xl:col-span-2 min-w-[130px]" },
  { nombre: "Total", className: "xl:col-span-1 min-w-[150px]" },
  { nombre: "Comprobante", className: "xl:col-span-2 min-w-[150px]" },
  { nombre: "Fecha de Creación", className: "xl:col-span-2 min-w-[200px]" },
]

export default function MovimientoPage(): JSX.Element {
  const [selectedMovimiento, setSelectedMovimiento] = useState<number>(1);
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMovimiento(Number(event.target.value));
  };

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
            value={selectedMovimiento}
          >
            <option value={1}>Compras</option>
            <option value={2}>Salidas</option>
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
        {
          selectedMovimiento === 1 ? <ListComprasMov /> : <ListSalidasMov />
        }
        {/*<ListRoles />*/}
      </div>
    </>
  );
}
