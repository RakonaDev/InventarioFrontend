"use client";
import React from "react";
import { EditAndDeleteButtons } from "../../../buttons/EditAndDeleteButtons";
import { useAdmin } from "../../../../context/AdminContext";
import { Insumo } from "@/interfaces/InsumosInterface";
import { EditarInsumo } from "../../../modal/insumos/EditarInsumo";
import { parseToLocalTime } from "../../../../logic/parseToLocalTime";
import EliminarInsumo from "../../../modal/insumos/EliminarInsumo";

export const ListInsumos = ({ insumos }: { insumos: Insumo[] }) => {
  const { setModalContent, openModal } = useAdmin();
  const handleEditarInsumo = (insumo: Insumo) => {
    setModalContent(<EditarInsumo insumo={insumo} />);
    openModal();
  };
  const handleEliminarInsumo = (id: number) => {
    setModalContent(<EliminarInsumo id={id} />);
    openModal();
  };
  return (
    <div className="w-full space-y-6">
      {insumos.map((insumo: Insumo) => (
        <div
          className="w-full flex gap-5 col-span-1 xl:grid xl:grid-cols-12 text-black-700"
          key={insumo.id}
        >
          <div className="w-full flex justify-center  items-center min-w-[100px]">
            <p className="line-clamp-1">{insumo.id}</p>
          </div>
          <div className="w-full min-w-[150px] lg:col-span-2 flex justify-center  items-center text-sm">
            <p>{insumo.nombre || ''}</p>
          </div>
          <div className="w-full flex items-center text-sm justify-center min-w-[100px] lg:col-span-1">
            <p>{insumo.cantidad || ''}</p>
          </div>
          <div className="w-full flex items-center text-sm justify-center min-w-[150px] lg:col-span-1">
            <p>{insumo.proveedor?.name || ''}</p>
          </div>
          <div className="w-full min-w-[150px] lg:col-span-1 flex items-center text-sm justify-center ">
            <p>{insumo.categorias?.nombre}</p>
          </div>
          <div className="w-full min-w-[150px] lg:col-span-2 flex items-center text-sm justify-center ">
            <p>{parseToLocalTime(insumo.created_at)}</p>
          </div>
          <div className="w-full min-w-[180px] lg:col-span-2 flex items-center text-sm justify-center ">
            <p>{parseToLocalTime(insumo.updated_at)}</p>
          </div>
          <EditAndDeleteButtons
            onEdit={() => handleEditarInsumo(insumo)}
            onDelete={() => handleEliminarInsumo(insumo.id || 0)}
          />
        </div>
      ))}
    </div>
  );
};
