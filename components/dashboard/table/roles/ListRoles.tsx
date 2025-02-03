'use client'
import React from "react";
import { useRol } from "../../../../hooks/useRol";
import { RolInterface } from "@/interfaces/RolInterface";
import { EditAndDeleteButtons } from "../../../buttons/EditAndDeleteButtons";
import { parseToLocalTime } from "../../../../logic/parseToLocalTime";
import EliminarRol from "../../../modal/roles/EliminarRol";
import EditarRol from "../../../modal/roles/EditarRol";
import { useAdmin } from "../../../../context/AdminContext";

export default function ListRoles() {
  const { setModalContent, openModal } = useAdmin();
  const { roles } = useRol();
  const handleEditarRol = (rol: RolInterface) => {
    setModalContent(<EditarRol rol={rol}/>)
    openModal()
  };
  const handleEliminarRol = (id: number) => {
    setModalContent(<EliminarRol id={id}/>)
    openModal()
  };

  return (
    <div className="w-full space-y-6">
      {roles?.map((rol: RolInterface) => (
        <div className="w-full flex gap-5 xl:grid xl:grid-cols-12 text-black-700" key={rol.id}>
          <div className="w-full min-w-[100px] xl:col-span-2 flex items-center text-sm justify-center ">
            <p>{rol.id}</p>
          </div>
          <div className="w-full min-w-[200px] xl:col-span-2 flex items-center text-sm justify-center ">
            <p>{rol.name}</p>
          </div>
          <div className="w-full min-w-[200px] xl:col-span-2 flex items-center text-sm justify-center ">
            <p>{parseToLocalTime(rol.created_at)}</p>
          </div>
          <div className="w-full min-w-[200px] xl:col-span-3 flex items-center text-sm justify-center ">
            <p>{parseToLocalTime(rol.updated_at)}</p>
          </div>
          <EditAndDeleteButtons
            onEdit={() => handleEditarRol(rol)}
            onDelete={() => handleEliminarRol(rol.id || 0)}
          />
        </div>
      ))}
    </div>
  );
}
