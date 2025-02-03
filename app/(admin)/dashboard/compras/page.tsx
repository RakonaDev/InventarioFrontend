"use client"
import React from 'react'
import { TableTitle } from '../usuarios/page';
import { motion } from "framer-motion";
import { AgregarCompra } from '../../../../components/modal/compras/AgregarCompra';
import { ButtonOpenModal } from '../../../../components/buttons/ButtonOpenModal';
import { HeadTablePC } from '../../../../components/dashboard/table/HeadTablePC';
import ListCompras from '../../../../components/dashboard/table/compras/ListCompras';

const ItemsInsumosTable: TableTitle[] = [
  { nombre: "Código", className: "min-w-[100px] xl:col-span-1" },
  { nombre: "Producto", className: "min-w-[180px] xl:col-span-2" },
  { nombre: "Cantidad", className: "min-w-[100px] xl:col-span-1" },
  { nombre: "Comprobante", className: "min-w-[150px] xl:col-span-2" },
  { nombre: "Dias Útiles", className: "min-w-[100px] xl:col-span-1" },
  { nombre: "Fecha de Creación", className: "min-w-[200px] xl:col-span-2" },
  { nombre: "Fecha de Vencimiento", className: "min-w-[200px] xl:col-span-2" },
];

export default function ComprasPage() {
  return (
    <>
      <div className="w-full mt-10 flex items-center mb-6 justify-between">
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
      <div className="w-full bg-white-main p-5 overflow-x-auto">
        <HeadTablePC
          titlesTable={ItemsInsumosTable}
          className="mb-6 flex gap-5 xl:grid-cols-12 text-gray-400 border-b pb-5"
          nededActions={false}
        />
        <ListCompras />
      </div>
    </>
  );
}
