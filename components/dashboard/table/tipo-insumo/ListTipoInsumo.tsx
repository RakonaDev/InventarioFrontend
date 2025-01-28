import React from "react";

import { parseToLocalTime } from "../../../../logic/parseToLocalTime";
import { EditAndDeleteButtons } from "../../../buttons/EditAndDeleteButtons";

type TipoInsumo = {
  id: number;
  nombre: string;
  created_at: string;
  updated_at: string;
};

const tipoInsumos: TipoInsumo[] = [
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
  // const { setModalContent, openModal } = useAdmin();

  const handleEditarRol = () => {};
  const handleEliminarRol = () => {};

  return (
    <div className="w-full space-y-6">
      {tipoInsumos?.map((rol: TipoInsumo) => (
        <div className="w-full grid grid-cols-12 text-black-700" key={rol.id}>
          <div className="w-full col-span-2 flex items-center text-sm">
            <p>{rol.id}</p>
          </div>
          <div className="w-full col-span-2 flex items-center text-sm">
            <p>{rol.nombre}</p>
          </div>
          <div className="w-full col-span-2 flex items-center text-sm">
            <p>{parseToLocalTime(new Date(rol.created_at))}</p>
          </div>
          <div className="w-full col-span-3 flex items-center text-sm">
            <p>{parseToLocalTime(new Date(rol.updated_at))}</p>
          </div>
          <EditAndDeleteButtons
            onEdit={() => handleEditarRol()}
            onDelete={() => handleEliminarRol()}
          />
        </div>
      ))}
    </div>
  );
}
