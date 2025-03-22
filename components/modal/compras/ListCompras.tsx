'use client'

import { CompraInterface } from "@/interfaces/CompraInterface";
import Link from "next/link";
import { parseToLocalTime } from "../../../logic/parseToLocalTime";

export default function ListCompras({ compras }: { compras: CompraInterface[] }) {
  return (
    <div className="w-full space-y-6">
      {compras.map((compra: CompraInterface) => (
        <div
          className="w-full flex gap-5 xl:grid xl:grid-cols-12 text-black-700"
          key={compra.id}
        >
          <div className="w-full flex min-w-[100px] xl:col-span-1 justify-center  items-center">
            <p className="line-clamp-1">{compra.id}</p>
          </div>
          <div className="w-full min-w-[180px] xl:col-span-2 flex justify-center  items-center text-sm">
            <p>{compra.producto?.nombre || ''}</p>
          </div>
          <div className="w-full flex items-center text-sm justify-center min-w-[100px] xl:col-span-1">
            <p>{compra.cantidad}</p>
          </div>
          <div className="w-full min-w-[150px] xl:col-span-2 flex items-center text-sm justify-center ">
            {
              compra.comprobante
                ? <Link target='_blank' href={`${compra.comprobante}`} className='text-blue-500'>Ver Comprobante</Link>
                : <p>-</p>
            }
          </div>
          <div className="w-full min-w-[100px] xl:col-span-1 flex items-center text-sm justify-center ">
            <p>{compra.vida_utiles_dias || '-'}</p>
          </div>
          <div className="w-full min-w-[200px] xl:col-span-2 flex items-center text-sm justify-center ">
            <p>{parseToLocalTime(compra.fecha_ingreso)}</p>
          </div>
          <div className="w-full min-w-[200px] xl:col-span-2 flex items-center text-sm justify-center ">
            <p>{parseToLocalTime(compra.fecha_vencimiento)}</p>
          </div>
          {/*<EditAndDeleteButtons
          onEdit={() => handleEditarInsumo(compra)}
          onDelete={() => handleEliminarInsumo(compra.id || 0)}
        />*/}
        </div>
      ))}
    </div>
  )
}