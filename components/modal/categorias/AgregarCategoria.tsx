import React, { useEffect } from 'react'
import { InputForm } from '../../form/InputForm';
import { Errors } from '../../form/Errors';
import { useFormik } from 'formik';
import { useCategoria } from '../../../hooks/useCategoria';

export default function AgregarCategoria() {
  const { PostCategoria } = useCategoria()
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
      },
      onSubmit: async (values) => {
        PostCategoria({
          nombre: values.nombre
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
  
    useEffect(() => {
      setValues({
        nombre: "",
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
        </div>
        <button
          type="submit"
          className="w-fit mx-auto flex justify-center rounded-main mt-5 bg-secundario-main text-white-main py-2 px-5 transition-all duration-200 ease-out hover:bg-secundario-500"
        >
          Agregar Categoria
        </button>
      </form>
    );
}
