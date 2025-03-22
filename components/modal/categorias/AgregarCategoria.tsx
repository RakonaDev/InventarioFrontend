'use client'
import React, { useEffect, useState } from 'react'
import { InputForm } from '../../form/InputForm';
import { Errors } from '../../form/Errors';
import { useFormik } from 'formik';
import { PostCategorySchema } from '@/schemas/CategoriaSchema';
import { apiAuth } from '../../../fonts/helper/global';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function AgregarCategoria() {
  const router = useRouter()
  const [LoadingPost, setLoadingPost] = useState(false)
  const {
    handleSubmit,
    handleBlur,
    handleChange,
    errors,
    values,
    touched,
    setValues,
    isSubmitting,
  } = useFormik({
    initialValues: {
      nombre: "",
      descripcion: "",
    },
    validationSchema: PostCategorySchema,
    onSubmit: async (values) => {
      if (LoadingPost) return
      setLoadingPost(true)
      try {
        const newCategoria = {
          nombre: values.nombre,
          descripcion: values.descripcion
        }
        const response = await apiAuth.post('/categorias', newCategoria);
        if (response.status === 401) {
          window.location.href = '/login';
          throw new Error("Unauthorized");
        }
        if (response.status !== 201) {
          throw new Error('Error');
        }
        if (response.status === 201) {
          toast.success(response.data.message)
          window.location.reload()
        } 
      } catch (error) {
        toast.error('Faltan Datos!');
        console.error(error);
        router.push('/login')
        throw error;
      } finally {
        setLoadingPost(false)
      }
      /*
      if (LoadingPost) return
      PostCategoria({
        nombre: values.nombre,
        descripcion: values.descripcion
      })
      */
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

  useEffect(() => {
    setValues({
      nombre: "",
      descripcion: ""
    });
  }, [setValues]);

  return (
    <form className="mx-auto p-6 " onSubmit={handleSubmit}>
      <h2 className="text-2xl font-semibold text-center mb-6">Agregar Nueva Categoria</h2>
      <div className="w-full space-y-3">
        <div className="w-full">
          <InputForm
            id="name"
            label="Nombres"
            name="nombre"
            placeholder="Escribe el nombre de la categoria"
            type="text"
            value={values.nombre}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          <Errors errors={errors.nombre} touched={touched.nombre} />
        </div>
        <div className="w-full">
          <label
            htmlFor="descripcion"
            className="block text-sm font-medium text-gray-700"
          >
            Descripción
          </label>
          <textarea
            id="descripcion"
            name="descripcion"
            rows={3}
            className="mt-1 h-[200px] max-h-[200px] block w-full px-4 py-2 border-2 rounded-main shadow-sm focus:outline-none focus:border-secundario-300 "
            onBlur={handleBlur}
            onChange={handleChange}
          ></textarea>
          <Errors errors={errors.descripcion} touched={touched.descripcion} />
        </div>
      </div>
      <button
        type="submit"
        className="w-fit mx-auto flex justify-center rounded-main mt-5 bg-secundario-main text-white-main py-2 px-5 transition-all duration-200 ease-out hover:bg-secundario-500"
      >
        {LoadingPost ? 'Ingresando Categoria...' : 'Agregar Categoria'}
      </button>
    </form>
  );
}
