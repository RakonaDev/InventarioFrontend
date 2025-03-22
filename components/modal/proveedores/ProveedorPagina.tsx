'use client'

import { ProveedoresResponse, ProveedorInterface } from "@/interfaces/ProveedorInterface"
import { motion } from "framer-motion";
import { ButtonOpenModal } from "../../buttons/ButtonOpenModal";
import { HeadTablePC } from "../../dashboard/table/HeadTablePC";
import { Pagination, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import AgregarProveedor from "./AgregarProveedor";
import { useState } from "react";
import ListProveedores from "./ListProveedores";
import { TableTitle } from "@/interfaces/TableTitle";

const ItemsProveedorTable: TableTitle[] = [
  { nombre: "ID Proveedor", className: "min-w-[100px] xl:col-span-2" },
  { nombre: "Nombre", className: "min-w-[150px] xl:col-span-2" },
  { nombre: "Contacto", className: "min-w-[150px] xl:col-span-2" },
  { nombre: "Correo", className: "min-w-[150px] xl:col-span-2" },
  { nombre: "Ubicación", className: "min-w-[150px] xl:col-span-2" },
];

export default function ProveedorPagina({ proveedoresData }: { proveedoresData: ProveedoresResponse }) {
  const router = useRouter()
  const [proveedores, setProveedores] = useState<ProveedorInterface[]>(proveedoresData.proveedores)
  function nextPage(event: React.ChangeEvent<unknown>, value: number) {
    router.push(`/dashboard/proveedores/${value}`)
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
            Proveedores
          </motion.h2>
        </div>
        <ButtonOpenModal
          modal={<AgregarProveedor />}
          text="Agregar Proveedor"
        />
      </div>
      <div className="w-full bg-white-main p-5 overflow-x-auto">
        <HeadTablePC
          titlesTable={ItemsProveedorTable}
          className="mb-6 flex gap-5 xl:grid-cols-12 text-gray-400 border-b pb-5"
        />
        <div className='w-full min-h-[45dvh] bg-white-main'>
          <ListProveedores proveedores={proveedores} setProveedores={setProveedores} />
        </div>
        <div className='w-full flex justify-center pt-5'>
          <Stack spacing={2}>
            <Pagination count={proveedoresData?.totalPages} page={proveedoresData.currentPage} onChange={nextPage} />
          </Stack>
        </div>
      </div>
    </>
  );
}