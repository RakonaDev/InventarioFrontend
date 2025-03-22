import React from 'react'
import { EliminarProps } from '../roles/EliminarRol'
import Image from 'next/image';
import DeletePerson from '../../../public/delete-person.webp'
import { useCategoria } from '../../../hooks/useCategoria';
import { useAdmin } from '../../../context/AdminContext';
import { apiAuth } from '../../../fonts/helper/global';
import { toast } from 'sonner';

export default function EliminarCategoria(props: EliminarProps) {
  const { closeModal } = useAdmin();
  const [loading, setLoading] = React.useState(false);


  const CancelAction = () => {
    closeModal();
  };

  const EditAction = async () => {
    if (loading) return;
    setLoading(true)
    try {
      const response = await apiAuth.post(`/deleteCategorias/${props.id}`);
      if (response.status === 401) {
        window.location.href = '/login';
        throw new Error("Unauthorized");
      }
      if (response.status !== 200) {
        throw new Error('error');
      }
      if (response.status === 200) {
        window.location.reload()
        toast.success(response.data.message)
      }

    } catch (error) {
      console.error(error);
      toast.error('Error al eliminar la categoria');
      throw error;
    } finally {
      setLoading(false)
      closeModal()
    }
  };

  return (
    <div className='w-full'>
      <h1 className='text-center font-bold text-xl mt-10'>Estas seguro de eliminar esta Categoria?</h1>
      <Image src={DeletePerson} width={350} height={350} alt='Imagen' className='mx-auto' />
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
