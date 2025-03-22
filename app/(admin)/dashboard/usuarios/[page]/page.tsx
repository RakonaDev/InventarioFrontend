'use server'

import { UsersResponse } from "@/interfaces/ListUserInterface"
import { getServerSideProps } from "@/logic/getServerSideProps"
import UsuariosPagina from "../../../../../components/modal/usuarios/UsuariosPagina"

export default async function UsuariosPage ({
  params,
}: {
  params: Promise<{ page: string }>
}) {
  const { page } = await params

  const data: UsersResponse = await getServerSideProps(`user/10/${page}`)

  return (
    <>
      <UsuariosPagina usuariosData={data} />
    </>
  )
}