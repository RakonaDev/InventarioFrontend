import { ComprasResponse } from "@/interfaces/CompraInterface"
import { getServerSideProps } from "@/logic/getServerSideProps"
import { notFound } from "next/navigation"
import ComprasMovPagina from "../../../../../../components/modal/movimientos/ComprasMovPagina"
import SalidasMovPagina from "../../../../../../components/modal/movimientos/SalidasMovPagina"
import { SalidasResponse } from "@/interfaces/SalidaInterface"

export default async function MovimientosPage ({
  params,
}: {
  params: Promise<{ modo: string, page: string }>
}) {
  const { modo, page } = await params
  if (modo === 'compras') {
    const data: ComprasResponse = await getServerSideProps(`compras/10/${page}`)

    return (
      <>
        <ComprasMovPagina comprasData={data} />
      </>
    )
  }
  else if (modo === 'salidas') {
    const data: SalidasResponse = await getServerSideProps(`salidas/10/${page}`)

    return (
      <>
        <SalidasMovPagina salidasData={data} />
      </>
    )
  } else {
    notFound()
  }
}