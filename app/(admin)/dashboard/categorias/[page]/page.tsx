'use server'

import { CategoriasResponse } from "@/interfaces/CategoriaInterface"
import { getServerSideProps } from "@/logic/getServerSideProps"

export default async function CategoriasPage ({
  params
}: {
  params: Promise<{ page: string }>
}) {
  const { page } = await params
  
  const data: CategoriasResponse = await getServerSideProps(`categorias/10/${page}`)

  console.log(data)

  return (
    <>
        
    </>
  )
}