
import { parseToLocalTime } from "../../../logic/parseToLocalTime";
import { Insumo } from "@/interfaces/InsumosInterface";

export function VerInsumo({ insumo }: { insumo: Insumo }) {
  return (
    <div className="w-full p-4 space-y-5">
      <h1 className="text-center font-bold text-xl lg:text-3xl">Información del Producto</h1>
      <section className="w-full flex gap-5 max-md:flex-wrap">
        <div className="max-md:w-full md:w-1/2 min-w-[20rem]">
          <p className="font-bold text-lg">Codigo del Producto:</p>
          <p>{insumo.id}</p>
        </div>
        <div className="max-md:w-full md:w-1/2 min-w-[20rem]">
          <p className="font-bold text-lg">Nombre del Producto:</p>
          <p>{insumo.nombre}</p>
        </div>
      </section>
      <section className="w-full flex gap-5 max-md:flex-wrap">
        <div className="max-md:w-full md:w-1/2 min-w-[20rem]">
          <p className="font-bold text-lg">Stock del Producto:</p>
          <p>{insumo.cantidad}</p>
        </div>
        <div className="max-md:w-full md:w-1/2 min-w-[20rem]">
          <p className="font-bold text-lg">Categoria del Producto:</p>
          <p>{insumo.categorias?.nombre}</p>
        </div>
      </section>
      <section className="w-full flex gap-5 max-md:flex-wrap">
        <div className="max-md:w-full md:w-1/2 min-w-[20rem]">
          <p className="font-bold text-lg">Proveedor del Producto:</p>
          <p>{insumo.proveedor?.name}</p>
        </div>
        <div className="max-md:w-full md:w-1/2 min-w-[20rem]">
          <p className="font-bold text-lg">Email del Proveedor:</p>
          <p>{insumo.proveedor?.email}</p>
        </div>
      </section>
      <section className="w-full flex gap-5 max-md:flex-wrap">
        <div className="w-full min-w-[20rem]">
          <p className="font-bold text-lg">Descripcion del Producto:</p>
          <p>{insumo.descripcion}</p>
        </div>
      </section>
      <section className="w-full flex gap-5 max-md:flex-wrap">
        <div className="max-md:w-full md:w-1/2 min-w-[20rem]">
          <p className="font-bold text-lg">Fecha de Registro:</p>
          <p>{parseToLocalTime(insumo.created_at)}</p>
        </div>
        <div className="max-md:w-full md:w-1/2 min-w-[20rem]">
          <p className="font-bold text-lg">Fecha de Actualizacion:</p>
          <p>{parseToLocalTime(insumo.updated_at)}</p>
        </div>
      </section>
    </div>
  )
}