'use server'

import { SalidasResponse } from "@/interfaces/SalidaInterface"
import { getServerSideProps } from "@/logic/getServerSideProps"
import SalidasPagina from "../../../../../components/modal/salidas/SalidasPagina"


export default async function SalidasPage({
  params
}: {
  params: Promise<{ page: string }>
}) {
  const { page } = await params

  const data: SalidasResponse = await getServerSideProps(`salidas/10/${page}`)

  return (
    <SalidasPagina salidasData={data} />
  )
}