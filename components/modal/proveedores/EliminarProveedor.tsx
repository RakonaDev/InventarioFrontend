'use client'
import React from "react";
import { useAdmin } from "../../../context/AdminContext";
import DeletePerson from '../../../public/delete-person.webp'
import Image from "next/image";
import { apiAuth } from "../../../fonts/helper/global";
import { AxiosError } from "axios";
import { toast } from "sonner";

type EliminarProps = {
  id: number
}
export default function EliminarProveedor(props: EliminarProps) {
  const { closeModal } = useAdmin();
  const [loading, setLoading] = React.useState(false);

  const CancelAction = () => {
    closeModal();
  };

  const EditAction = async () => {
    if (loading) return;
    setLoading(true)
    try {
      // const response = await apiAuth.delete(`/proveedores/${id}`)
      const response = await apiAuth.post(`/deleteProveedores/${props.id}`)
      if (response.status === 401) {
        window.location.href = '/login'
      }
      if (response.status !== 200) {
        throw new Error('error')
      }
      if (response.status === 200) {
        toast.success(response.data.message)
        closeModal()
        window.location.reload()
      }
    }
    catch (error) {
      if (error instanceof AxiosError) {
        if (error.status === 401) {
          window.location.href = '/login'
        }
      }
      toast.error('Hubo un error eliminando el proveedor')
      console.log(error)
      throw new Error('Error al eliminar el proveedor');
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className='w-full'>
      <h1 className='text-center font-bold text-xl mt-10'>Estas seguro de eliminar este Proveedor?</h1>
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
