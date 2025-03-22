'use client'
import React from "react";
import { useAdmin } from "../../../context/AdminContext";
import { useRol } from "../../../hooks/useRol";
import DeletePerson from '../../../public/delete-person.webp'
import Image from "next/image";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { apiAuth } from "../../../fonts/helper/global";
import { useRouter } from "next/navigation";

export type EliminarProps = {
  id: number
}

export default function EliminarRol(props: EliminarProps) {
  const { closeModal } = useAdmin();
  const { DeleteRol } = useRol();
  const [loading, setLoading] = React.useState(false);
  const router = useRouter()

  const CancelAction = () => {
    closeModal();
  };

  const EditAction = async () => {
    DeleteRol(props.id);
    if (loading) return
    setLoading(true)
    try {
      //const response = await apiAuth.delete(`/roles/${id}`)
      const response = await apiAuth.post(`/deleteRoles/${props.id}`)
      if (response.status === 401) {
        router.push('/login')
      }
      if (response.status !== 200) {
        throw new Error('error')
      }
      if (response.status === 200) {
        toast.success('Rol Eliminado Correctamente')
        window.location.reload()
      }
    }
    catch (error) {
      if (error instanceof AxiosError) {
        if (error.status === 401) {
          router.push('/login')
        }
      }
      toast.error('Hubo un error eliminando el rol')
      console.log(error)
      throw new Error('Error al eliminar el rol');
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className='w-full'>
      <h1 className='text-center font-bold text-xl mt-10'>Estas seguro de eliminar este Rol?</h1>
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
