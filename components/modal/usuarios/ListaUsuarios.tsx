'use client'

import React from 'react'
import { EditAndDeleteButtons } from '../../buttons/EditAndDeleteButtons';
import { useAdmin } from '../../../context/AdminContext';
import { ListUserInterface } from '@/interfaces/ListUserInterface';
import EliminarUsuario from './EliminarUsuario';
import { EditarUsuario } from './EditarUsuario';
import { VerUsuario } from './VerUsuario';

export default function ListaUsuarios({ usuarios, setUsuarios }: { usuarios: ListUserInterface[], setUsuarios: React.Dispatch<React.SetStateAction<ListUserInterface[]>> }) {
  const { setModalContent, openModal } = useAdmin()

  const handleEditarUsuario = (usuario: ListUserInterface) => {
    setModalContent(<EditarUsuario usuario={usuario} setUsuarios={setUsuarios} />);
    openModal();
  };
  const handleEliminarUsuario = (id: number) => {
    setModalContent(<EliminarUsuario id={id} />);
    openModal()
  }
  const handleViewUsuario = (usuario: ListUserInterface) => {
    setModalContent(<VerUsuario usuario={usuario} />)
    openModal()
  }


  return (
    <div className="w-full space-y-6">
      {usuarios?.map((usuario: ListUserInterface) => (
        <div
          className="w-full flex gap-5 xl:grid xl:grid-cols-12 text-black-700"
          key={usuario.id}
        >
          <div className="w-full lg:col-span-2 flex items-center justify-center">
            <p className="line-clamp-1 text-ellipsis text-center text-sm">{`${usuario.names} ${usuario.last_names
              }`}</p>
          </div>
          <div className="w-full lg:col-span-2 flex items-center text-sm justify-center ">
            <p className="line-clamp-1 text-ellipsis text-center">{usuario.tel}</p>
          </div>
          <div className="w-full lg:col-span-2 flex items-center text-sm justify-center ">
            <p className="line-clamp-1 text-ellipsis text-center">{usuario.email}</p>
          </div>
          <div className="w-full lg:col-span-2 flex items-center text-sm justify-center ">
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
          <div className="w-full lg:col-span-2 flex items-center text-sm justify-center ">
            <p className="line-clamp-1 text-ellipsis text-center">{usuario.roles?.name}</p>
          </div>
          <EditAndDeleteButtons
            onView={() => handleViewUsuario(usuario)}
            onEdit={() => handleEditarUsuario(usuario)}
            onDelete={() => handleEliminarUsuario(usuario.id || 0)}
          />
        </div>
      ))}
    </div>
  )
}
