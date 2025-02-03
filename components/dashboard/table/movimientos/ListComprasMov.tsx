import React from 'react'
import { useCompra } from '../../../../hooks/useCompra'
import { CompraInterface } from '@/interfaces/CompraInterface';
import { parseToLocalTime } from '../../../../logic/parseToLocalTime';
import Link from 'next/link';

export default function ListComprasMov() {
  const { compras } = useCompra()
  return (
    <div className="w-full space-y-6">
      {compras?.map((compra: CompraInterface) => (
        <div
          className="w-full flex gap-5 xl:grid xl:grid-cols-12 text-black-700"
          key={compra.id}
        >
          <div className="w-full flex min-w-[150px] xl:col-span-2 justify-center  items-center">
            <p className="line-clamp-1">{compra.id}</p>
          </div>
          <div className="w-full min-w-[150px] lg:col-span-2 flex justify-center  items-center text-sm">
            <p>{compra.producto?.nombre || ''}</p>
          </div>
          <div className="w-full flex items-center text-sm justify-center min-w-[150px] lg:col-span-1">
            <p>{'S/. ' + compra.producto?.precio.toFixed(2) || ''}</p>
          </div>
          <div className="w-full min-w-[150px] lg:col-span-2 flex items-center text-sm justify-center ">
            <p>{compra.cantidad || '-'}</p>
          </div>
          <div className="w-full min-w-[150px] lg:col-span-1 flex items-center text-sm justify-center ">
            <p>{'S/. ' + compra.total?.toFixed(2) || '-'}</p>
          </div>
          <div className="w-full min-w-[150px] lg:col-span-2 flex items-center text-sm justify-center ">
            {
              compra.comprobante
                ? <Link target='_blank' href={`${compra.comprobante}`} className='text-blue-500'>Ver Comprobante</Link>
                : <p>-</p>
            }
          </div>
          <div className="w-full min-w-[150px] lg:col-span-2 flex items-center text-sm justify-center ">
            <p>{parseToLocalTime(compra.created_at)}</p>
          </div>
          {/*<EditAndDeleteButtons
            onEdit={() => handleEditarInsumo(compra)}
            onDelete={() => handleEliminarInsumo(compra.id || 0)}
          />*/}
        </div>
      ))}
    </div>
  );
}
