'use client'
import React, { useEffect, useState } from 'react'
import { Errors } from '../../form/Errors';
import { InputForm } from '../../form/InputForm';
import { useFormik } from 'formik';
import { ProveedorInterface } from '@/interfaces/ProveedorInterface';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import { apiAuth } from '../../../fonts/helper/global';
import { useRouter } from 'next/navigation';
import { useAdmin } from '../../../context/AdminContext';

export default function EditarProveedor({ proveedor, setProveedores }: { proveedor: ProveedorInterface, setProveedores: React.Dispatch<React.SetStateAction<ProveedorInterface[]>> }) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { closeModal } = useAdmin()
    const {
      handleBlur,
      handleChange,
      handleSubmit,
      values,
      errors,
      touched,
      isSubmitting,
    } = useFormik({
      initialValues: {
        name: proveedor.name,
        phone: proveedor.phone,
        email: proveedor.email,
        ruc: proveedor.ruc,
        address: proveedor.address,
      },
      onSubmit: async (values) => {
        if (loading) return
        setLoading(true)
        const updatedProveedor = {
          id: proveedor.id,
          address: values.address,
          ruc: values.ruc,
          email: values.email,
          name: values.name,
          phone: values.phone
        }
        try {
          // const response = await apiAuth.put(`/proveedores/${updatedProveedor.id}`, updatedProveedor)
          const response = await apiAuth.post(`/proveedores/${updatedProveedor.id}`, updatedProveedor)
          if (response.status === 401) {
            router.push('/login')
          }
          if (response.status !== 200) {
            throw new Error('error')
          }
          if (response.status === 200) {
            toast.success('Proveedor Actualizado Correctamente')
            setProveedores(prevState => prevState.map((state) => state.id === response.data.proveedores.id ? response.data.proveedores : state))
            closeModal()
          }
          
        } catch (error) {
          if (error instanceof AxiosError) {
            if (error.status === 401) {
              router.push('/login')
            }
          }
          toast.error('Hubo un error actualizando el proveedor')
          console.log(error)
          throw new Error('Error al actualizar el proveedor');
        } finally {
          setLoading(false)
        }
      },
    });
  
    useEffect(() => {
      if (errors && isSubmitting) {
        const firstErrorKey = Object.keys(errors)[0];
        const firstErrorElement = document.getElementsByName(firstErrorKey)[0];
        if (firstErrorElement) {
          firstErrorElement.focus();
        }
      }
    }, [touched, errors, isSubmitting]);
  
    return (
      <>
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-semibold text-center mb-6">
            Editar Proveedor
          </h2>
          <div className="w-full space-y-3">
            <div className="w-full flex flex-wrap lg:flex-nowrap gap-4">
              <div className="w-full lg:w-1/2">
                <InputForm
                  id="nombre"
                  label="Nombre"
                  name="name"
                  placeholder="Escribe el nombre del proveedor"
                  type="text"
                  value={values.name}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <Errors errors={errors.name} touched={touched.name} />
              </div>
              <div className="w-full lg:w-1/2">
                <InputForm
                  id="phone"
                  label="Numero de Contacto"
                  name="phone"
                  placeholder="Escribe el numero del proveedor"
                  type="text"
                  value={values.phone}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <Errors errors={errors.phone} touched={touched.phone} />
              </div>
            </div>
            <div className="w-full flex flex-wrap lg:flex-nowrap gap-4">
              <div className="w-full lg:w-1/2">
                <InputForm
                  id="email"
                  label="Email del proveedor"
                  name="email"
                  placeholder="Escribe el email del proveedor"
                  type="text"
                  value={values.email}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <Errors errors={errors.email} touched={touched.email} />
              </div>
              <div className="w-full lg:w-1/2">
                <InputForm
                  id="ruc"
                  label="Departamento del Proveedor"
                  name="ruc"
                  placeholder="Escribe el ruc del proveedor"
                  type="text"
                  value={values.ruc}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <Errors
                  errors={errors.ruc}
                  touched={touched.ruc}
                />
              </div>
            </div>
            <div className="w-full">
              <InputForm
                id="address"
                label="Ubicación del Proveedor"
                name="address"
                placeholder="Escribe la ubicación del proveedor"
                type="text"
                value={values.address}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              <Errors errors={errors.address} touched={touched.address} />
            </div>
          </div>
          <button
            type="submit"
            className="w-fit mx-auto flex justify-center rounded-main mt-5 bg-secundario-main text-white-main py-2 px-5 transition-all duration-200 ease-out hover:bg-secundario-500"
          >
            Agregar Proveedor
          </button>
        </form>
      </>
    );
}
