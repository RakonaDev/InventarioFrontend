'use client'

import { Insumo } from "@/interfaces/InsumosInterface";
import { parseToLocalTime } from "../../../logic/parseToLocalTime";
import { EditAndDeleteButtons } from "../../buttons/EditAndDeleteButtons";
import { EditarInsumo } from "./EditarInsumo";
import EliminarInsumo from "./EliminarInsumo";
import { VerInsumo } from "./VerInsumo";
import { useAdmin } from "../../../context/AdminContext";

export default function ListInsumos ({ insumos, setInsumos }: { insumos: Insumo[], setInsumos: React.Dispatch<React.SetStateAction<Insumo[]>> }) {
  const { setModalContent, openModal } = useAdmin();
  const handleEditarInsumo = (insumo: Insumo) => {
    setModalContent(<EditarInsumo insumo={insumo} setInsumos={setInsumos} />);
    openModal();
  };
  const handleEliminarInsumo = (id: number) => {
    setModalContent(<EliminarInsumo id={id} />);
    openModal();
  };
  const handleVerInsumo = (insumo: Insumo) => {
    setModalContent(<VerInsumo insumo={insumo} />)
    openModal()
  }
  return (
    <div className="w-full space-y-6">
      {insumos?.map((insumo: Insumo) => (
        <div
          className="w-full flex gap-5 col-span-1 xl:grid xl:grid-cols-12 text-black-700"
          key={insumo.id}
        >
          <div className="w-full flex justify-center  items-center lg:col-span-1">
            <p className="line-clamp-1">{insumo.id}</p>
          </div>
          <div className="w-full line-clamp-1 lg:col-span-2 flex justify-center  items-center text-sm">
            <p className="line-clamp-1 text-ellipsis text-center">{insumo.nombre || ''}</p>
          </div>
          <div className="w-full flex items-center text-sm justify-center lg:col-span-1">
            <p className="line-clamp-1 text-ellipsis text-center">{insumo.cantidad || ''}</p>
          </div>
          <div className="w-full flex items-center text-sm justify-center lg:col-span-2">
            <p className="line-clamp-1 text-ellipsis text-center">{insumo.proveedor?.name || ''}</p>
          </div>
          <div className="w-full lg:col-span-2 flex items-center text-sm justify-center ">
            <p className="line-clamp-1 text-ellipsis text-center">{insumo.categorias?.nombre}</p>
          </div>
          <div className="w-full lg:col-span-2 flex items-center text-sm justify-center ">
            <p className="line-clamp-1 text-ellipsis text-center">{parseToLocalTime(insumo.created_at)}</p>
          </div>
          <EditAndDeleteButtons
            onView={() => handleVerInsumo(insumo)}
            onEdit={() => handleEditarInsumo(insumo)}
            onDelete={() => handleEliminarInsumo(insumo.id || 0)}
          />
        </div>
      ))}
    </div>
  );
}