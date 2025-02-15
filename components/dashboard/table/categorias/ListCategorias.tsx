'use client'
import React, { useEffect } from 'react'
import { EditAndDeleteButtons } from '../../../buttons/EditAndDeleteButtons';
import { parseToLocalTime } from '../../../../logic/parseToLocalTime';
import { useCategoria } from '../../../../hooks/useCategoria';
import { CategoriaInterface } from '@/interfaces/CategoriaInterface';
import { useAdmin } from '../../../../context/AdminContext';
import EliminarCategoria from '../../../modal/categorias/EliminarCategoria'
import EditarCategoria from '../../../modal/categorias/EditarCategoria';
import { VerCategoria } from '../../../modal/categorias/VerCategoria';

export default function ListCategorias() {
  const { setModalContent, openModal } = useAdmin();
  const { categoriasData, CargandoCategorias } = useCategoria()

  // Dentro del JSX, justo antes del map de categorias:
  const handeEditarCategoria = (categoria: CategoriaInterface) => {
    setModalContent(<EditarCategoria categoria={categoria} />);
    openModal();
  };
  const handleEliminarCategoria = (id: number) => {
    setModalContent(<EliminarCategoria id={id} />);
    openModal();
  };
  const handleVerCategoria = (categoria: CategoriaInterface) => {
    setModalContent(<VerCategoria categoria={categoria} />)
    openModal()
  }

  useEffect(() => {
    console.log(categoriasData)
  }, [categoriasData])

  if (CargandoCategorias) return <div>Loading...</div>;

  return (
    <div className="w-full space-y-6">
      {CargandoCategorias ? <h1>Cargando...</h1> : categoriasData?.categorias.map((categoria: CategoriaInterface) => (
        <div className="w-full flex gap-5 xl:grid xl:grid-cols-12 text-black-700" key={categoria.id}>
          <div className="w-full min-w-[100px] xl:col-span-2 flex justify-center  items-center text-sm">
            <p>{categoria.id}</p>
          </div>
          <div className="w-full min-w-[150px] xl:col-span-2 flex justify-center  items-center text-sm">
            <p>{categoria.nombre}</p>
          </div>
          <div className="w-full min-w-[200px] xl:col-span-2 flex justify-center  items-center text-sm">
            <p>{parseToLocalTime(new Date(categoria.created_at || 0))}</p>
          </div>
          <div className="w-full min-w-[200px] xl:col-span-3 flex justify-center  items-center text-sm">
            <p>{parseToLocalTime(new Date(categoria.updated_at || 0))}</p>
          </div>
          <EditAndDeleteButtons
            onView={() => handleVerCategoria(categoria)}
            onEdit={() => handeEditarCategoria(categoria)}
            onDelete={() => handleEliminarCategoria(categoria.id || 0)}
          />
        </div>
      ))}
    </div>
  );
}
