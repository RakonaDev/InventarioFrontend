'use client'
import React from 'react'
import { type TableTitle } from '../usuarios/page';
import { motion } from 'framer-motion';
import { ButtonOpenModal } from '../../../../components/buttons/ButtonOpenModal';
import { HeadTablePC } from '../../../../components/dashboard/table/HeadTablePC';
// import ListCategorias from '../../../../components/dashboard/table/categorias/ListCategorias';
import AgregarCategoria from '../../../../components/modal/categorias/AgregarCategoria';
import { Pagination, Stack } from '@mui/material';
import { useCategoria } from '../../../../hooks/useCategoria';
import { useCategoryStore } from '../../../../store/CategoryStore';

const ItemsTipoInsumoTable: TableTitle[] = [
  { nombre: "ID Categoría", className: "min-w-[100px] xl:col-span-2" },
  { nombre: "Nombre", className: "min-w-[150px] xl:col-span-2" },
  { nombre: "Fecha de Creación", className: "min-w-[200px] xl:col-span-2" },
  { nombre: "Fecha de Actualización", className: "min-w-[200px] xl:col-span-3" },
];

export default function CategoriasPage() {
  const { nextPage, totalPages, RenderListCategories } = useCategoria()
  const { currentPage } = useCategoryStore()
  return (
    <>
      <div className="w-full mt-10 flex items-center mb-6 justify-between">
        <div className="w-fit flex items-center gap-6">
          <motion.h2
            className="text-2xl font-medium"
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
          >
            Categorias
          </motion.h2>
        </div>
        <ButtonOpenModal modal={<AgregarCategoria />} text="Agregar Categoria" />
      </div>
      <div className="w-full min-h-[45dvh] bg-white-main p-5 overflow-x-auto">
        <HeadTablePC
          titlesTable={ItemsTipoInsumoTable}
          className="mb-6 flex gap-5 xl:grid-cols-12 text-gray-400 border-b pb-5"
        />

        <div className='w-full min-h-[45dvh] bg-white-main'>
          <RenderListCategories />
        </div>
        <div className='w-full flex justify-center pt-5'>
          <Stack spacing={2}>
            <Pagination count={totalPages} page={currentPage} onChange={nextPage} />
          </Stack>
        </div>
      </div>
    </>
  );
}
