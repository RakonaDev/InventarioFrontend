'use client'
import React from 'react'
import { TableTitle } from '../usuarios/page';
import { motion } from 'framer-motion';
import { ButtonOpenModal } from '../../../../components/buttons/ButtonOpenModal';
import { AgregarInsumo } from '../../../../components/modal/insumos/AgregarInsumo';
import { HeadTablePC } from '../../../../components/dashboard/table/HeadTablePC';
import ListTipoInsumo from '../../../../components/dashboard/table/tipo-insumo/ListTipoInsumo';

const ItemsTipoInsumoTable: TableTitle[] = [
  { nombre: "Código", className: "col-span-2" },
  { nombre: "Nombre", className: "col-span-2" },
  { nombre: "Fecha de Creación", className: "col-span-2" },
  { nombre: "Fecha de Actualización", className: "col-span-3" },
];

export default function TipoInsumoPage() {
  return (
    <>
      <div className="w-full  flex items-center mb-6 justify-between">
        <div className="w-fit flex items-center gap-6">
          <motion.h2 
            className="text-2xl font-medium"
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
          >
            Tipo de Insumos
          </motion.h2>
        </div>
        <ButtonOpenModal modal={<AgregarInsumo />} text="Agregar Tipo Insumo" />
      </div>
      <div className="w-full bg-white-main p-5">
        <HeadTablePC
          titlesTable={ItemsTipoInsumoTable}
          className="mb-6 grid-cols-12 text-gray-400 border-b pb-5"
        />
        <ListTipoInsumo />
      </div>
    </>
  );
}
