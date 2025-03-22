'use client'

import { SalidasResponse } from "@/interfaces/SalidaInterface"
import { motion } from "framer-motion"
import { ButtonOpenModal } from "../../buttons/ButtonOpenModal"
import { HeadTablePC } from "../../dashboard/table/HeadTablePC"
import { Pagination, Stack } from "@mui/material"
import { useRouter } from "next/navigation"
import { AgregarSalida } from "./AgregarSalida"
import ListaSalidas from "./ListaSalidas"
import { TableTitle } from "@/interfaces/TableTitle"

const ItemsInsumosTable: TableTitle[] = [
  { nombre: "ID Salida", className: "min-w-[100px] xl:col-span-2" },
  { nombre: "Producto", className: "min-w-[150px] xl:col-span-2" },
  { nombre: "Cantidad", className: "min-w-[100px] xl:col-span-2" },
  { nombre: "Fecha de Salida", className: "min-w-[200px] xl:col-span-3" }
];

export default function SalidasPagina({ salidasData }: { salidasData: SalidasResponse }) {
  const router = useRouter()

  function nextPage(event: React.ChangeEvent<unknown>, value: number) {
    router.push(`/dashboard/salidas/${value}`)
  }

  return (
    <>
      <div className="w-full mt-10  flex items-center mb-6 justify-between">
        <div className="w-fit flex items-center gap-6">
          <motion.h2
            className="text-2xl font-medium"
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
          >
            Salidas
          </motion.h2>
        </div>
        <ButtonOpenModal modal={<AgregarSalida />} text="Agregar Salida" />
      </div>
      <div className="w-full bg-white-main p-5 overflow-x-auto">
        <HeadTablePC
          titlesTable={ItemsInsumosTable}
          className="mb-6 flex gap-5 xl:grid-cols-12 text-gray-400 border-b pb-5"
          nededActions={false}
        />
        <div className='w-full min-h-[45dvh] bg-white-main'>
          <ListaSalidas salidas={salidasData.salidas} />
        </div>
        <div className='w-full flex justify-center pt-5'>
          <Stack spacing={2}>
            <Pagination count={salidasData?.totalPages} page={salidasData.currentPage} onChange={nextPage} />
          </Stack>
        </div>
      </div>
    </>
  )
}