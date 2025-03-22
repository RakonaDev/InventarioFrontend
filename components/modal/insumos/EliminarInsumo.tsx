import Image from 'next/image'
import React from 'react'
import { useAdmin } from '../../../context/AdminContext'
import DeletePerson from '../../../public/delete-person.webp'
import { apiAuth } from '../../../fonts/helper/global'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { AxiosError } from 'axios'

export default function EliminarInsumo({ id }: { id: number }) {
  const { closeModal } = useAdmin()
  const [loading, setLoading] = React.useState(false)
  
  const router = useRouter()

  const CancelAction = () => {
    closeModal()
  }

  const EditAction = async () => {
    if (loading) return
    setLoading(true)
    try {
      const response = await apiAuth.post(`/deleteInsumos/${id}`);
      if (response.status === 401) {
        router.push('/login');
        throw new Error("Unauthorized");
      }
      if (response.status !== 200) {
        throw new Error('error');
      }
      if (response.status === 200) {
        toast.success(response.data.message)
        closeModal()
        router.refresh()
      }
    } catch (error) {
      console.error(error);
      if (error instanceof AxiosError) {
        if (error.status === 401) {
          router.push('/login')
        }
      }
      toast.error('Hubo un error eliminando el producto');
      throw error;
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='w-full'>
      <h1 className='text-center font-bold text-xl mt-10'>Estas seguro de eliminar este Usuario?</h1>
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
