'use client'

import { motion } from "framer-motion"
import { ButtonOpenModal } from "../../buttons/ButtonOpenModal"
import { HeadTablePC } from "../../dashboard/table/HeadTablePC"
import { Pagination, Stack } from "@mui/material"
import { Insumo, InsumosResponse } from "@/interfaces/InsumosInterface"
import { TableTitle } from "../../../app/(admin)/dashboard/usuarios/page"
import { useRouter } from "next/navigation"
import { AgregarInsumo } from "./AgregarInsumo"
import { useState } from "react"
import ListInsumos from "./ListInsumos"

const ItemsInsumosTable: TableTitle[] = [
  { nombre: "Código", className: "lg:col-span-1" },
  { nombre: "Nombre", className: "lg:col-span-2" },
  { nombre: "Cantidad", className: "lg:col-span-1" },
  { nombre: "Proveedor", className: "lg:col-span-2" },
  { nombre: "Categoría", className: "lg:col-span-2" },
  { nombre: "Fecha de Registro", className: "lg:col-span-2 " },
];

export default function InsumosPagina({ insumosData }: { insumosData: InsumosResponse }) {
  const router = useRouter()
  const [insumos, setInsumos] = useState<Insumo[]>(insumosData.insumos)

  function nextPage(event: React.ChangeEvent<unknown>, value: number) {
    router.push(`/dashboard/insumos/${value}`)
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
        <div className='w-full min-h-[45dvh] bg-white-main'>
          <ListInsumos insumos={insumos} setInsumos={setInsumos} />
        </div>
        <div className="w-full flex justify-center pt-5">
          <Stack spacing={2}>
            <Pagination count={insumosData?.totalPages} page={insumosData.currentPage} onChange={nextPage} />
          </Stack>
        </div>
      </div>
    </>
  )
}