"use client";
import { ListUserInterface } from "@/interfaces/ListUserInterface";
import React from "react";
import { EditAndDeleteButtons } from "../../../buttons/EditAndDeleteButtons";
import { EditarUsuario } from "../../../modal/usuarios/EditarUsuario";
import { useAdmin } from "../../../../context/AdminContext";
import EliminarUsuario from "../../../modal/usuarios/EliminarUsuario";

export const ListUsers = ({ usuarios }: { usuarios?: ListUserInterface[] }) => {
  const { setModalContent, openModal } = useAdmin();
  const handleEditarUsuario = (usuario: ListUserInterface) => {
    setModalContent(<EditarUsuario usuario={usuario} />);
    openModal();
  };
  const handleEliminarUsuario = (id: number) => {
    setModalContent(<EliminarUsuario id={id} />);
    openModal()
  }
  console.log(usuarios)
  return (
    <div className="w-full space-y-6">
      {usuarios?.map((usuario: ListUserInterface) => (
        <div
          
          className="w-full grid grid-cols-12 text-black-700"
          key={usuario.id}
        >
          <div className="w-full col-span-2 flex items-center">
            <p className="line-clamp-1">{`${usuario.names} ${
              usuario.last_names
            }`}</p>
          </div>
          <div className="w-full col-span-2 flex items-center text-sm">
            <p>{usuario.tel}</p>
          </div>
          <div className="w-full col-span-3 flex items-center text-sm">
            <p>{usuario.email}</p>
          </div>
          <div className="w-full col-span-2 flex items-center text-sm">
            {usuario.estado?.nombre === "Activo" ? (
              <p className="block rounded-full w-[102px] bg-green-100 px-5 py-1  font-medium text-center text-green-500">
                Activo
              </p>
            ) : (
              <p className="block rounded-full w-[102px] bg-red-100 px-5 py-1  font-medium text-center text-red-500">
                Inactivo
              </p>
            )}
          </div>
          <div className="w-full col-span-2 flex items-center text-sm">
            <p>{usuario.roles?.name}</p>
          </div>
          <EditAndDeleteButtons
            onEdit={() => handleEditarUsuario(usuario)}
            onDelete={() => handleEliminarUsuario(usuario.id || 0)}
          />
        </div>
      ))}
    </div>
  );
};
