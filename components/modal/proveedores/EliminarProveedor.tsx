'use client'
import React from "react";
import { useAdmin } from "../../../context/AdminContext";
import DeletePerson from '../../../public/delete-person.webp'
import Image from "next/image";
import { useProveedor } from "../../../hooks/useProveedor";

type EliminarProps = {
  id: number
}
export default function EliminarProveedor(props: EliminarProps) {
  const { closeModal } = useAdmin();
  const { DeleteProveedor } = useProveedor();

  const CancelAction = () => {
    closeModal();
  };

  const EditAction = () => {
    DeleteProveedor(props.id);
  };
  
  return (
    <div className='w-full'>
      <h1 className='text-center font-bold text-xl mt-10'>Estas seguro de eliminar este Proveedor?</h1>
      <Image src={DeletePerson} width={350} height={350} alt='Imagen' className='mx-auto'/>
      <section className='mt-16 flex justify-center gap-10'>
        <button 
          type="button"
          className='px-8 py-2 bg-green-500 rounded-lg hover:bg-green-700 duration-500 transition-colors'
          onClick={EditAction}
        >
          Aceptar
        </button>

        <button 
          type="button"
          className='px-8 py-2 bg-red-500 rounded-lg hover:bg-red-700 duration-500 transition-colors'
          onClick={CancelAction}
        >
          Cancelar
        </button>
      </section>
    </div>
  )
}
