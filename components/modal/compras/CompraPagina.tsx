'use client'
import { ComprasResponse } from "@/interfaces/CompraInterface";
import { Pagination, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { HeadTablePC } from "../../dashboard/table/HeadTablePC";
import { ButtonOpenModal } from "../../buttons/ButtonOpenModal";
import { AgregarCompra } from "./AgregarCompra";
import ListCompras from "./ListCompras";
import { TableTitle } from "@/interfaces/TableTitle";

const ItemsInsumosTable: TableTitle[] = [
  { nombre: "ID Compra", className: "min-w-[100px] xl:col-span-1" },
  { nombre: "Producto", className: "min-w-[180px] xl:col-span-2" },
  { nombre: "Cantidad", className: "min-w-[100px] xl:col-span-1" },
  { nombre: "Comprobante", className: "min-w-[150px] xl:col-span-2" },
  { nombre: "Dias Útiles", className: "min-w-[100px] xl:col-span-1" },
  { nombre: "Fecha de Creación", className: "min-w-[200px] xl:col-span-2" },
  { nombre: "Fecha de Vencimiento", className: "min-w-[200px] xl:col-span-2" },
];

export default function CompraPagina({ comprasData }: { comprasData: ComprasResponse }) {
  const router = useRouter()
  function nextPage(event: React.ChangeEvent<unknown>, value: number) {
    router.push(`/dashboard/compras/${value}`)
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
        <div className='w-full min-h-[45dvh] bg-white-main'>
          <ListCompras compras={comprasData?.compras} />
        </div>
        <div className='w-full flex justify-center pt-5'>
          <Stack spacing={2}>
            <Pagination count={comprasData?.totalPages} page={comprasData.currentPage} onChange={nextPage} />
          </Stack>
        </div>
      </div>
    </>
  );
}