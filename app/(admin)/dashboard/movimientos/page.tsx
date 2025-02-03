'use client'
import React, { JSX, useState } from 'react'
import { motion } from 'framer-motion';
import { HeadTablePC } from '../../../../components/dashboard/table/HeadTablePC';
import { TableTitle } from '../usuarios/page';
import ListComprasMov from '../../../../components/dashboard/table/movimientos/ListComprasMov';
import ListSalidasMov from '../../../../components/dashboard/table/movimientos/ListSalidasMov';
const ItemsRolesTable: TableTitle[] = [
  { nombre: "ID_Compra", className: "col-span-1" },
  { nombre: "Producto", className: "col-span-2" },
  { nombre: "Precio", className: "col-span-2" },
  { nombre: "Cantidad", className: "col-span-2" },
  { nombre: "Total", className: "col-span-1" },
  { nombre: "Comprobante", className: "col-span-2" },
  { nombre: "Fecha de Creación", className: "col-span-2" },
]

export default function MovimientoPage(): JSX.Element {
  const [selectedMovimiento, setSelectedMovimiento] = useState<number>(1);
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMovimiento(Number(event.target.value));
  };

  return (
    <>
      <div className="w-full  flex items-center mb-6 justify-between">
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
            className="px-8 py-2" 
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
      <div className="w-full bg-white-main p-5">
        <HeadTablePC
          titlesTable={ItemsRolesTable}
          className="mb-6 grid-cols-12 text-gray-400 border-b pb-5"
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
