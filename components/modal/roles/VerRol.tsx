import { RolInterface } from "@/interfaces/RolInterface";
import { parseToLocalTime } from "../../../logic/parseToLocalTime";

export function VerRol({ rol }: { rol: RolInterface }) {
  return (
    <div className="w-full p-4 space-y-5">
      <h1 className="text-center font-bold text-xl lg:text-3xl">Información del Rol</h1>
      <section className="w-full flex gap-5 max-md:flex-wrap">
        <div className="max-md:w-full md:w-1/2 min-w-[20rem]">
          <p className="font-bold text-lg">ID del Rol:</p>
          <p>{rol.id}</p>
        </div>
        <div className="max-md:w-full md:w-1/2 min-w-[20rem]">
          <p className="font-bold text-lg">Nombre del Rol:</p>
          <p>{rol.name}</p>
        </div>
      </section>
      <section className="w-full flex gap-5 max-md:flex-wrap">
        <div className="w-full min-w-[20rem] spcae-y-2">
          <p className="font-bold text-lg">Paginas:</p>
          <div className="flex gap-3 flex-wrap justify-evenly">
            {
              rol.list_paginas?.map((pagina) => {
                return (
                  <div className="w-fit" key={pagina.id}>
                    <p className="font-medium">{pagina.id} - {pagina.nombre?.toLocaleUpperCase()}</p>
                  </div>
                )
              })
            }
          </div>
        </div>
      </section>
      <section className="w-full flex gap-5 max-md:flex-wrap">
        <div className="max-md:w-full md:w-1/2 min-w-[20rem]">
          <p className="font-bold text-lg">Fecha de Creacion:</p>
          <p>{parseToLocalTime(rol.created_at)}</p>
        </div>
        <div className="max-md:w-full md:w-1/2 min-w-[20rem]">
          <p className="font-bold text-lg">Fecha de Actualizacion:</p>
          <p>{parseToLocalTime(rol.updated_at)}</p>
        </div>
      </section>
    </div>
  )
}
