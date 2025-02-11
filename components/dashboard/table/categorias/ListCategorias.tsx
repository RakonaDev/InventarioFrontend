import React from 'react'
import { EditAndDeleteButtons } from '../../../buttons/EditAndDeleteButtons';
import { parseToLocalTime } from '../../../../logic/parseToLocalTime';
import { useCategoria } from '../../../../hooks/useCategoria';
import { CategoriaInterface } from '@/interfaces/CategoriaInterface';
import { useAdmin } from '../../../../context/AdminContext';
import EliminarCategoria from '../../../modal/categorias/EliminarCategoria'
import EditarCategoria from '../../../modal/categorias/EditarCategoria';
import { VerCategoria } from '../../../modal/categorias/VerCategoria';

type Categoria = {
  id: number;
  nombre: string;
  created_at: string;
  updated_at: string;
};

export const categoriasI: Categoria[] = [
  { id: 1, nombre: "Materiales de Construcción", created_at: "2025-01-01T10:00:00Z", updated_at: "2025-01-01T10:00:00Z" },
  { id: 2, nombre: "Herramientas Eléctricas", created_at: "2025-01-02T11:00:00Z", updated_at: "2025-01-02T11:00:00Z" },
  { id: 3, nombre: "Equipos de Seguridad", created_at: "2025-01-03T12:00:00Z", updated_at: "2025-01-03T12:00:00Z" },
  { id: 4, nombre: "Pinturas y Revestimientos", created_at: "2025-01-04T13:00:00Z", updated_at: "2025-01-04T13:00:00Z" },
  { id: 5, nombre: "Materiales de Oficina", created_at: "2025-01-05T14:00:00Z", updated_at: "2025-01-05T14:00:00Z" },
  { id: 6, nombre: "Insumos Médicos", created_at: "2025-01-06T15:00:00Z", updated_at: "2025-01-06T15:00:00Z" },
  { id: 7, nombre: "Equipos de Limpieza", created_at: "2025-01-07T16:00:00Z", updated_at: "2025-01-07T16:00:00Z" },
  { id: 8, nombre: "Suministros de Fontanería", created_at: "2025-01-08T17:00:00Z", updated_at: "2025-01-08T17:00:00Z" },
  { id: 9, nombre: "Electrodomésticos", created_at: "2025-01-09T18:00:00Z", updated_at: "2025-01-09T18:00:00Z" },
  { id: 10, nombre: "Componentes Electrónicos", created_at: "2025-01-10T19:00:00Z", updated_at: "2025-01-10T19:00:00Z" },
  { id: 11, nombre: "Equipos de Jardinería", created_at: "2025-01-11T20:00:00Z", updated_at: "2025-01-11T20:00:00Z" },
  { id: 12, nombre: "Vehículos y Repuestos", created_at: "2025-01-12T21:00:00Z", updated_at: "2025-01-12T21:00:00Z" },
  { id: 13, nombre: "Mobiliario", created_at: "2025-01-13T22:00:00Z", updated_at: "2025-01-13T22:00:00Z" },
  { id: 14, nombre: "Materiales Educativos", created_at: "2025-01-14T23:00:00Z", updated_at: "2025-01-14T23:00:00Z" },
  { id: 15, nombre: "Ropa y Textiles", created_at: "2025-01-15T08:00:00Z", updated_at: "2025-01-15T08:00:00Z" },
  { id: 16, nombre: "Productos Alimenticios", created_at: "2025-01-16T09:00:00Z", updated_at: "2025-01-16T09:00:00Z" },
  { id: 17, nombre: "Accesorios Industriales", created_at: "2025-01-17T10:00:00Z", updated_at: "2025-01-17T10:00:00Z" },
  { id: 18, nombre: "Software y Licencias", created_at: "2025-01-18T11:00:00Z", updated_at: "2025-01-18T11:00:00Z" },
  { id: 19, nombre: "Material de Embalaje", created_at: "2025-01-19T12:00:00Z", updated_at: "2025-01-19T12:00:00Z" },
  { id: 20, nombre: "Lubricantes y Combustibles", created_at: "2025-01-20T13:00:00Z", updated_at: "2025-01-20T13:00:00Z" },
];

export default function ListCategorias() {
  const { setModalContent, openModal } = useAdmin();
  const { categorias } = useCategoria()
  const handeEditarCategoria = (categoria: CategoriaInterface) => {
    setModalContent(<EditarCategoria categoria={categoria} />);
    openModal();
  };
  const handleEliminarCategoria = (id: number) => {
    setModalContent(<EliminarCategoria id={id} />);
    openModal();
  };
  const handleVerCategoria = (categoria: CategoriaInterface) => {
    setModalContent(<VerCategoria categoria={categoria}/>)
    openModal()
  }

  if (categorias == null) return <div>Loading...</div>;

  return (
    <div className="w-full space-y-6">
      {categorias?.map((categoria: CategoriaInterface) => (
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
