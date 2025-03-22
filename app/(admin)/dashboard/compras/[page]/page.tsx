import { ComprasResponse } from "@/interfaces/CompraInterface"
import { getServerSideProps } from "@/logic/getServerSideProps"
import CompraPagina from "../../../../../components/modal/compras/CompraPagina"

export default async function ComprasPage ({
  params
}: {
  params: Promise<{ page: string }>
}) {
  const { page } = await params
  
  const data: ComprasResponse = await getServerSideProps(`compras/10/${page}`)

  console.log(data)

  return (
    <>
      <CompraPagina comprasData={data} />
    </>
  )
}