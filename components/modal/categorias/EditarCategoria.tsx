import React, { useState } from 'react'
import { InputForm } from '../../form/InputForm';
import { useFormik } from 'formik';
import { CategoriaInterface } from '@/interfaces/CategoriaInterface';
import { Errors } from '../../form/Errors';
import { useCategoria } from '../../../hooks/useCategoria';
import { EditCategorySchema } from '@/schemas/CategoriaSchema';

export default function EditarCategoria({ categoria }: { categoria: CategoriaInterface }) {
  const [id] = useState(categoria.id);
  console.log(categoria)
  const { EditarCategoria } = useCategoria();
  const { handleBlur, handleChange, handleSubmit, errors, values, touched } =
    useFormik({
      initialValues: {
        name: categoria.nombre,
        descripcion: categoria.descripcion,
      },
      validationSchema: EditCategorySchema,
      onSubmit: async (values) => {
        EditarCategoria({
          id,
          nombre: values.name,
          descripcion: values.descripcion,
        });
      },
    });
  return (
    <form className="mx-auto p-6 " onSubmit={handleSubmit}>
      <h2 className="text-2xl font-semibold text-center mb-6">Editar Categoria</h2>
      <div className="w-full space-y-3">
        <div className="w-full">
          <InputForm
            id="nombres"
            label="Nombre del Rol"
            name="name"
            placeholder="Escribe el nuevo nombre del categoria"
            type="text"
            value={values.name}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          <Errors errors={errors.name} touched={touched.name} />
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
            value={values.descripcion}
          ></textarea>
          <Errors errors={errors.descripcion} touched={touched.descripcion} />
        </div>
      </div>
      <button
        type="submit"
        className="w-full flex justify-center rounded-main mt-5 bg-secundario-main text-white-main py-2 px-5 transition-all duration-200 ease-out hover:bg-secundario-500"
      >
        Editar Categoria
      </button>
    </form>
  );
}
