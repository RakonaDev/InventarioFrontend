import React, { useEffect } from 'react'
import { Errors } from '../../form/Errors';
import { InputForm } from '../../form/InputForm';
import { useFormik } from 'formik';
import { useProveedor } from '../../../hooks/useProveedor';
import { ProveedorInterface } from '@/interfaces/ProveedorInterface';

export default function EditarProveedor({ proveedor }: { proveedor: ProveedorInterface }) {
  const { EditarProveedor } = useProveedor()
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
        departament: proveedor.departament,
        address: proveedor.address,
      },
      onSubmit: (values) => {
        EditarProveedor({
          id: proveedor.id,
          address: values.address,
          departament: values.departament,
          email: values.email,
          name: values.name,
          phone: values.phone
        })
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
            Agregar Proveedor
          </h2>
          <div className="w-full space-y-3">
            <div className="w-full flex flex-wrap lg:flex-nowrap gap-4">
              <div className="w-full lg:w-1/2">
                <InputForm
                  id="nombre"
                  label="Nombre"
                  name="name"
                  placeholder="Escribe el nombre del nuevo proveedor"
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
                  placeholder="Escribe el numero del nuevo proveedor"
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
                  placeholder="Escribe el email del nuevo proveedor"
                  type="text"
                  value={values.email}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <Errors errors={errors.email} touched={touched.email} />
              </div>
              <div className="w-full lg:w-1/2">
                <InputForm
                  id="departament"
                  label="Departamento del Proveedor"
                  name="departament"
                  placeholder="Escribe el departamento del nuevo proveedor"
                  type="text"
                  value={values.departament}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <Errors
                  errors={errors.departament}
                  touched={touched.departament}
                />
              </div>
            </div>
            <div className="w-full">
              <InputForm
                id="address"
                label="Ubicación del Proveedor"
                name="address"
                placeholder="Escribe la ubicación del nuevo proveedor"
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
