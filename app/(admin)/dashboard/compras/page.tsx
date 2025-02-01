"use client"
import React from 'react'
import { TableTitle } from '../usuarios/page';
import { motion } from "framer-motion";
import { AgregarCompra } from '../../../../components/modal/compras/AgregarCompra';
import { ButtonOpenModal } from '../../../../components/buttons/ButtonOpenModal';
import { HeadTablePC } from '../../../../components/dashboard/table/HeadTablePC';
import ListCompras from '../../../../components/dashboard/table/compras/ListCompras';

const ItemsInsumosTable: TableTitle[] = [
  { nombre: "Código", className: "col-span-1" },
  { nombre: "Producto", className: "col-span-2" },
  { nombre: "Cantidad", className: "col-span-1" },
  { nombre: "Comprobante", className: "col-span-1" },
  { nombre: "Dias Útiles", className: "col-span-2" },
  { nombre: "Fecha de Creación", className: "col-span-2" },
  { nombre: "Fecha de Vencimiento", className: "col-span-2" },
];

export default function ComprasPage() {
  return (
    <>
      <div className="w-full  flex items-center mb-6 justify-between">
        <div className="w-fit flex items-center gap-6">
          <motion.h2 
            className="text-2xl font-medium"
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
          >
            Compras
          </motion.h2>
        </div>
        <ButtonOpenModal modal={<AgregarCompra />} text="Agregar Compra" />
      </div>
      <div className="w-full bg-white-main p-5">
        <HeadTablePC
          titlesTable={ItemsInsumosTable}
          className="mb-6 grid-cols-12 text-gray-400 border-b pb-5"
        />
        <ListCompras />
      </div>
    </>
  );
}
