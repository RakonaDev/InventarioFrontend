import Image from 'next/image';
import React from 'react'
import { useTipoInsumo } from '../../../hooks/useTipoInsumo';
import { useAdmin } from '../../../context/AdminContext';
import { EliminarProps } from '../roles/EliminarRol';
import DeletePerson from '../../../public/delete-person.webp'

export default function EliminarTipoInsumo(props: EliminarProps) {
  const { closeModal } = useAdmin();
  const { DeleteTipoInsumo } = useTipoInsumo();

  const CancelAction = () => {
    closeModal();
  };

  const EditAction = () => {
    DeleteTipoInsumo(props.id);
  };
  
  return (
    <div className='w-full'>
      <h1 className='text-center font-bold text-xl mt-10'>Estas seguro de eliminar este Rol?</h1>
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
