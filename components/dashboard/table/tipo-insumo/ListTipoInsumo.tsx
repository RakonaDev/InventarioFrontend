import React from "react";

import { parseToLocalTime } from "../../../../logic/parseToLocalTime";
import { EditAndDeleteButtons } from "../../../buttons/EditAndDeleteButtons";
import { useTipoInsumo } from "../../../../hooks/useTipoInsumo";
import { TipoInsumoInterface } from "@/interfaces/TipoInsumoInterface";
import { useAdmin } from "../../../../context/AdminContext";
import EditarTipoInsumo from "../../../modal/tipo-insumo/EditarTipoInsumo";
import EliminarTipoInsumo from "../../../modal/tipo-insumo/EliminarTipoInsumo";

type TipoInsumo = {
  id: number;
  nombre: string;
  created_at: string;
  updated_at: string;
};

export const tipoInsumos: TipoInsumo[] = [
  {
    id: 1,
    nombre: "Acero Inoxidable",
    created_at: "2025-01-01T10:00:00Z",
    updated_at: "2025-01-01T10:00:00Z",
  },
  {
    id: 2,
    nombre: "Madera Contrachapada",
    created_at: "2025-01-02T11:00:00Z",
    updated_at: "2025-01-02T11:00:00Z",
  },
  {
    id: 3,
    nombre: "Plástico Reciclado",
    created_at: "2025-01-03T12:00:00Z",
    updated_at: "2025-01-03T12:00:00Z",
  },
  {
    id: 4,
    nombre: "Aluminio",
    created_at: "2025-01-04T13:00:00Z",
    updated_at: "2025-01-04T13:00:00Z",
  },
  {
    id: 5,
    nombre: "Caucho Natural",
    created_at: "2025-01-05T14:00:00Z",
    updated_at: "2025-01-05T14:00:00Z",
  },
  {
    id: 6,
    nombre: "Fibras de Vidrio",
    created_at: "2025-01-06T15:00:00Z",
    updated_at: "2025-01-06T15:00:00Z",
  },
  {
    id: 7,
    nombre: "Papel Kraft",
    created_at: "2025-01-07T16:00:00Z",
    updated_at: "2025-01-07T16:00:00Z",
  },
  {
    id: 8,
    nombre: "Cuero Sintético",
    created_at: "2025-01-08T17:00:00Z",
    updated_at: "2025-01-08T17:00:00Z",
  },
  {
    id: 9,
    nombre: "Policarbonato",
    created_at: "2025-01-09T18:00:00Z",
    updated_at: "2025-01-09T18:00:00Z",
  },
  {
    id: 10,
    nombre: "Lana Mineral",
    created_at: "2025-01-10T19:00:00Z",
    updated_at: "2025-01-10T19:00:00Z",
  },
];

export default function ListTipoInsumo() {
  const { setModalContent, openModal } = useAdmin();
  const { tipo_insumo } = useTipoInsumo()
    const handleEditarTipoInsumo = (tipo_insumo: TipoInsumoInterface) => {
      setModalContent(<EditarTipoInsumo tipo_insumo={tipo_insumo} />);
      openModal();
    };
    const handleEliminarTipoInsumo = (id: number) => {
      setModalContent(<EliminarTipoInsumo id={id} />);
      openModal();
    };

  return (
    <div className="w-full space-y-6">
      {tipo_insumo?.map((tipo_insumo: TipoInsumoInterface) => (
        <div className="w-full grid grid-cols-12 text-black-700" key={tipo_insumo.id}>
          <div className="w-full col-span-2 flex justify-center items-center text-sm">
            <p className="text-center">{tipo_insumo.id}</p>
          </div>
          <div className="w-full col-span-2 flex justify-center items-center text-sm text-center">
            <p className="text-center">{tipo_insumo.nombre}</p>
          </div>
          <div className="w-full col-span-2 flex items-center justify-center text-sm text-center">
            <p className="text-center">{parseToLocalTime(new Date(tipo_insumo.created_at || 0))}</p>
          </div>
          <div className="w-full col-span-3 flex items-center justify-center text-sm text-center">
            <p className="text-center">{parseToLocalTime(new Date(tipo_insumo.updated_at || 0))}</p>
          </div>
          <EditAndDeleteButtons
            onEdit={() => handleEditarTipoInsumo(tipo_insumo)}
            onDelete={() => handleEliminarTipoInsumo(tipo_insumo.id || 0)}
          />
        </div>
      ))}
    </div>
  );
}
