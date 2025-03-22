import { InsumosResponse } from "@/interfaces/InsumosInterface"
import { getServerSideProps } from "@/logic/getServerSideProps"
import InsumosPagina from "../../../../../components/modal/insumos/InsumosPagina"


export default async function InsumosPage ({
  params
}: {
  params: Promise<{ page: string }>
}) {
  const { page } = await params

  const data: InsumosResponse = await getServerSideProps(`insumos/10/${page}`)
  console.log(data)

  return (
    <>
      <InsumosPagina insumosData={data} />
    </>
  )
}