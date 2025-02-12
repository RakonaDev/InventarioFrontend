import { CategoriaInterface } from "@/interfaces/CategoriaInterface";
import { parseToLocalTime } from "../../../logic/parseToLocalTime";

export function VerCategoria({ categoria }: { categoria: CategoriaInterface }) {
  return (
    <div className="w-full p-4 space-y-5">
      <h1 className="text-center font-bold text-xl lg:text-3xl">Información de la Categoria</h1>
      <section className="w-full flex gap-5 max-md:flex-wrap">
        <div className="max-md:w-full md:w-1/2 min-w-[20rem]">
          <p className="font-bold text-lg">Codigo de la Categoria:</p>
          <p>{categoria.id}</p>
        </div>
        <div className="max-md:w-full md:w-1/2 min-w-[20rem]">
          <p className="font-bold text-lg">Nombre de la Categoria:</p>
          <p>{categoria.nombre}</p>
        </div>
      </section>
      <section className="w-full flex gap-5 max-md:flex-wrap">
        <div className="max-md:w-full md:w-1/2 min-w-[20rem]">
          <p className="font-bold text-lg">Descripcion:</p>
          <p>{categoria.descripcion}</p>
        </div>
      </section>
      <section className="w-full flex gap-5 max-md:flex-wrap">
        <div className="max-md:w-full md:w-1/2 min-w-[20rem]">
          <p className="font-bold text-lg">Fecha de Creacion:</p>
          <p>{parseToLocalTime(categoria.created_at)}</p>
        </div>
        <div className="max-md:w-full md:w-1/2 min-w-[20rem]">
          <p className="font-bold text-lg">Fecha de Actualizacion:</p>
          <p>{parseToLocalTime(categoria.updated_at)}</p>
        </div>
      </section>
    </div>
  )
}