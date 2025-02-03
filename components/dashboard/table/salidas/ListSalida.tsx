import React from 'react'
import { useSalida } from '../../../../hooks/useSalida'
import { parseToLocalTime } from '../../../../logic/parseToLocalTime'
import { SalidaInterface } from '@/interfaces/SalidaInterface'

export default function ListSalida() {
  const { salidas } = useSalida()
  return (
    <div className="w-full space-y-6">
      {salidas?.map((salida: SalidaInterface) => (
        <div
          className="w-full flex gap-5 xl:grid xl:grid-cols-12 text-black-700"
          key={salida.id}
        >
          <div className="w-full flex min-w-[100px] xl:col-span-2 justify-center  items-center">
            <p className="line-clamp-1">{salida.id}</p>
          </div>
          <div className="w-full min-w-[150px] xl:col-span-2 flex justify-center  items-center text-sm">
            <p>{salida.producto?.nombre || ''}</p>
          </div>
          <div className="w-full flex items-center text-sm justify-center min-w-[100px] xl:col-span-2">
            <p>{salida.cantidad}</p>
          </div>
          <div className="w-full min-w-[200px] xl:col-span-3 flex items-center text-sm justify-center ">
            <p>{parseToLocalTime(salida.created_at)}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
