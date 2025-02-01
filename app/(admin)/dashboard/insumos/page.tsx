"use client"
/* eslint-disable react-hooks/rules-of-hooks */
import { ButtonOpenModal } from "../../../../components/buttons/ButtonOpenModal";
import { HeadTablePC } from "../../../../components/dashboard/table/HeadTablePC";
import { AgregarInsumo } from "../../../../components/modal/insumos/AgregarInsumo";
import { TableTitle } from "../usuarios/page";
import { ListInsumos } from "../../../../components/dashboard/table/insumos/ListInsumos";
import { motion } from "framer-motion";
import { useInsumos } from "../../../../hooks/useInsumos";

const ItemsInsumosTable: TableTitle[] = [
  { nombre: "Código", className: "col-span-1" },
  { nombre: "Nombre", className: "col-span-2" },
  { nombre: "Cantidad", className: "col-span-1" },
  { nombre: "Proveedor", className: "col-span-1" },
  { nombre: "Categoría", className: "col-span-1" },
  { nombre: "Fecha de Registro", className: "col-span-2" },
  { nombre: "Fecha de Actualización", className: "col-span-2" },
];

export default function page() {
  const { insumos } = useInsumos();
  if (insumos == null) return <div>Loading...</div>;
  return (
    <>
      <div className="w-full  flex items-center mb-6 justify-between">
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
      <div className="w-full bg-white-main p-5">
        <HeadTablePC
          titlesTable={ItemsInsumosTable}
          className="mb-6 grid-cols-12 text-gray-400 border-b pb-5"
        />
        <ListInsumos insumos={insumos} />
      </div>
    </>
  );
}
