'use client'
import React from 'react'
import { useAdmin } from '../../../context/AdminContext'
import DeletePerson from '../../../public/delete-person.webp'
import Image from 'next/image'
import { toast } from 'sonner'
import { AxiosError } from 'axios'
import { apiAuth } from '../../../fonts/helper/global'
import { useRouter } from 'next/navigation'

type EliminarUsuarioProps = {
  id: number
}

export default function EliminarUsuario(props: EliminarUsuarioProps) {
  const { closeModal } = useAdmin()
  const router = useRouter()
  const [loading, setLoading] = React.useState(false)

  const CancelAction = () => {
    closeModal()
  }

  const EditAction = async () => {
    if (loading) return
    setLoading(true)
    try {
      // const response = await apiAuth.delete(`/user/${id}`)
      const response = await apiAuth.post(`/deleteUser/${props.id}`)
      if (response.status === 401) {
        router.push('/login')
      }

      if (response.status !== 200) {
        throw new Error('error')
      }
      if (response.status === 200) {
        setLoading(false)
        toast.success('Usuario Eliminado Correctamente!')
        window.location.reload()
        closeModal()
      }
    }
    catch (error) {
      if (error instanceof AxiosError) {
        if (error.status === 401) {
          router.push('/login')
        }
      }
      console.log(error)
      toast.error('Hubo un error eliminando el usuario')
      throw new Error('Error al eliminar el usuario')
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
