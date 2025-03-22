'use server'

import { ProveedoresResponse } from "@/interfaces/ProveedorInterface"
import { getServerSideProps } from "@/logic/getServerSideProps"
import ProveedorPagina from "../../../../../components/modal/proveedores/ProveedorPagina"

export default async function ProveedoresPage ({
  params
}: {
  params: Promise<{ page: string }>
}) {
  const { page } = await params
  
  const data: ProveedoresResponse = await getServerSideProps(`proveedores/10/${page}`)

  return (
    <>
      <ProveedorPagina proveedoresData={data} />
    </>
  )
}