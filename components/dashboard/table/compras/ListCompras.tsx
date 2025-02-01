import React from 'react'
import { EditAndDeleteButtons } from '../../../buttons/EditAndDeleteButtons';
import { useCompra } from '../../../../hooks/useCompra';
import EditarCompras from '../../../modal/compras/EditarCompras';
import EliminarCompras from '../../../modal/compras/EliminarCompras';
import { parseToLocalTime } from '../../../../logic/parseToLocalTime';
import { useAdmin } from '../../../../context/AdminContext';
import { CompraInterface } from '@/interfaces/CompraInterface';
import Link from 'next/link';

export default function ListCompras() {
  const { compras } = useCompra();
  const { setModalContent, openModal } = useAdmin();
  const handleEditarInsumo = (compra: CompraInterface) => {
    setModalContent(<EditarCompras compra={compra} />);
    openModal();
  };
  const handleEliminarInsumo = (id: number) => {
    setModalContent(<EliminarCompras id={id} />);
    openModal();
  };
  return (
    <div className="w-full space-y-6">
      {compras?.map((compra: CompraInterface) => (
        <div
          className="w-full grid grid-cols-12 text-black-700"
          key={compra.id}
        >
          <div className="w-full flex col-span-1 justify-center  items-center">
            <p className="line-clamp-1">{compra.id}</p>
          </div>
          <div className="w-full col-span-2 flex justify-center  items-center text-sm">
            <p>{compra.producto?.nombre || ''}</p>
          </div>
          <div className="w-full flex items-center text-sm justify-center col-span-1">
            <p>{compra.cantidad}</p>
          </div>
          <div className="w-full col-span-1 flex items-center text-sm justify-center ">
            {
              compra.comprobante
                ? <Link target='_blank' href={`${compra.comprobante}`} className='text-blue-500'>Ver Comprobante</Link>
                : <p>-</p>
            }
          </div>
          <div className="w-full col-span-2 flex items-center text-sm justify-center ">
            <p>{compra.vida_utiles_dias || '-'}</p>
          </div>
          <div className="w-full col-span-2 flex items-center text-sm justify-center ">
            <p>{parseToLocalTime(compra.fecha_ingreso)}</p>
          </div>
          <div className="w-full col-span-2 flex items-center text-sm justify-center ">
            <p>{parseToLocalTime(compra.fecha_vencimiento)}</p>
          </div>
          <EditAndDeleteButtons
            onEdit={() => handleEditarInsumo(compra)}
            onDelete={() => handleEliminarInsumo(compra.id || 0)}
          />
        </div>
      ))}
    </div>
  );
}
