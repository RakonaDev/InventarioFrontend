"use client"
/* eslint-disable react-hooks/rules-of-hooks */
import { ButtonOpenModal } from "../../../../components/buttons/ButtonOpenModal";
import { HeadTablePC } from "../../../../components/dashboard/table/HeadTablePC";
import { AgregarInsumo } from "../../../../components/modal/insumos/AgregarInsumo";
import { TableTitle } from "../usuarios/page";
import { ListInsumos } from "../../../../components/dashboard/table/insumos/ListInsumos";
import { motion } from "framer-motion";
import { useInsumos } from "../../../../hooks/useInsumos";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const ItemsInsumosTable: TableTitle[] = [
  { nombre: "Código", className: "lg:col-span-1" },
  { nombre: "Nombre", className: "lg:col-span-2" },
  { nombre: "Cantidad", className: "lg:col-span-1" },
  { nombre: "Proveedor", className: "lg:col-span-2" },
  { nombre: "Categoría", className: "lg:col-span-2" },
  { nombre: "Fecha de Registro", className: "lg:col-span-2 " },
];

export default function page() {
  const { totalPages, nextPage, pageInsumos, insumosData } = useInsumos();
  console.log(insumosData)
  if (insumosData?.insumos == undefined) return <div>Loading...</div>;
  return (
    <>
      <div className="w-full mt-10 flex items-center mb-6 justify-between">
        <div className="w-fit flex items-center gap-6">
          <motion.h2
            className="text-2xl font-medium"
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
          >
            Productos
          </motion.h2>
        </div>
        <ButtonOpenModal modal={<AgregarInsumo />} text="Agregar Producto" />
      </div>
      <div className="w-full bg-white-main p-5 overflow-x-auto">
        <HeadTablePC
          titlesTable={ItemsInsumosTable}
          className="mb-6 flex gap-5 xl:grid-cols-12 text-gray-400 border-b pb-5"
        />
        <ListInsumos insumos={insumosData?.insumos} />
        <div className="w-full flex justify-center pt-5">
          <Stack spacing={2}>
            <Pagination count={totalPages} page={pageInsumos} onChange={nextPage} />
          </Stack>
        </div>
      </div>
    </>
  );
}
