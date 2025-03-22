'use server'

import { RolesResponse } from "@/interfaces/RolInterface"
import { getServerSideProps } from "@/logic/getServerSideProps"
import RolesPagina from "../../../../../components/modal/roles/RolesPagina"

export default async function RolesPage ({ params }: {
  params: Promise<{ page: string }>
}) {
  const { page } = await params
  const data: RolesResponse = await getServerSideProps(`roles/10/${page}`)
  console.log(data)
  return (
    <>
      <RolesPagina rolesData={data} />
    </>
  )
}