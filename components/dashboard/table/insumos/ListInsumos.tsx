/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { EditAndDeleteButtons } from "../../../buttons/EditAndDeleteButtons";
import { useAdmin } from "../../../../context/AdminContext";
import { Insumo } from "@/interfaces/InsumosInterface";
import { EditarInsumo } from "../../../modal/insumos/EditarInsumo";
import EliminarTipoInsumo from "../../../modal/tipo-insumo/EliminarTipoInsumo";
import { parseToLocalTime } from "../../../../logic/parseToLocalTime";

export const ListInsumos = ({ insumos }: { insumos: Insumo[] }) => {
  const { setModalContent, openModal } = useAdmin();
  const handleEditarInsumo = (insumo: Insumo) => {
    setModalContent(<EditarInsumo insumo={insumo} />);
    openModal();
  };
  const handleEliminarInsumo = (id: number) => {
    setModalContent(<EliminarTipoInsumo id={id} />);
    openModal();
  };
  return (
    <div className="w-full space-y-6">
      {insumos.map((insumo: Insumo) => (
        <div
          className="w-full grid grid-cols-12 text-black-700"
          key={insumo.nombre}
        >
          <div className="w-full flex justify-center  items-center">
            <p className="line-clamp-1">{insumo.id}</p>
          </div>
          <div className="w-full col-span-2 flex justify-center  items-center text-sm">
            <p>{insumo.nombre}</p>
          </div>
          <div className="w-full flex items-center text-sm justify-center ">
            <img src={insumo.imagenes} alt="" width={50} height={50} />
          </div>
          <div className="w-full col-span-2 flex items-center text-sm justify-center ">
            <p>{insumo.id_categoria}</p>
          </div>
          <div className="w-full col-span-2 flex items-center text-sm justify-center ">
            <p>{insumo.id_tipo_insumo}</p>
          </div>
          <div className="w-full col-span-2 flex items-center text-sm justify-center ">
            <p>{parseToLocalTime(insumo.fecha_vencimiento)}</p>
          </div>
          <div className="w-full  flex items-center text-sm justify-center ">
            <p>{insumo.vida_util_dias} días</p>
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
