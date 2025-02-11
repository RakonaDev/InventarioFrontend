import { ProveedorInterface } from "@/interfaces/ProveedorInterface";
import { parseToLocalTime } from "../../../logic/parseToLocalTime";

export function VerProveedor({ proveedor }: { proveedor: ProveedorInterface }) {
  return (
    <div className="w-full p-4 space-y-5">
      <h1 className="text-center font-bold text-xl lg:text-3xl">Informaciôn del Proveedor</h1>
      <section className="w-full flex gap-5 max-md:flex-wrap">
        <div className="max-md:w-full md:w-1/2 min-w-[20rem]">
          <p className="font-bold text-lg">Codigo del Proveedor:</p>
          <p>{proveedor.id}</p>
        </div>
        <div className="max-md:w-full md:w-1/2 min-w-[20rem]">
          <p className="font-bold text-lg">Nombre del Proveedor:</p>
          <p>{proveedor.name}</p>
        </div>
      </section>
      <section className="w-full flex gap-5 max-md:flex-wrap">
        <div className="max-md:w-full md:w-1/2 min-w-[20rem]">
          <p className="font-bold text-lg">Fecha de Creacion:</p>
          <p>{parseToLocalTime(proveedor.created_at)}</p>
        </div>
        <div className="max-md:w-full md:w-1/2 min-w-[20rem]">
          <p className="font-bold text-lg">Fecha de Actualizacion:</p>
          <p>{parseToLocalTime(proveedor.updated_at)}</p>
        </div>
      </section>
    </div>
  )
}
