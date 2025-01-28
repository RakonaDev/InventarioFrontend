"use client";
import React, { useEffect } from "react";
import { InputForm } from "../../form/InputForm";
import ImageUpload from "../../images/ImagesUpload";
import { useFormik } from "formik";
import { SchemaLogin } from "@/schemas/AuthSchemas";

export const AgregarInsumo = () => {
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    errors,
    touched,
    values,
    isSubmitting,
    setFieldValue,
  } = useFormik({
    initialValues: {
      nombre: "",
      imagen: null,
    },
    validationSchema: SchemaLogin,
    onSubmit: async () => {}
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
    <form className="space-y-6 p-4" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-semibold text-center mb-6">
        Agregar insumo
      </h2>
      <div className="w-full flex flex-col lg:flex-row gap-4 ">
        <div className="w-full lg:w-1/2">
          <InputForm
            id="nombre"
            label="Nombre"
            name="nombre"
            placeholder="Escribe el nombre"
            type="text"
            value={values.nombre}
            onBlur={handleBlur}
            onChange={handleChange}
          />
        </div>
        <div className="w-full lg:w-1/2 flex flex-col lg:flex-row gap-4">
          <div className="w-full lg:w-1/2">
            <InputForm
              id="codigo"
              label="Código"
              name="codigo"
              placeholder="Escribe el código"
              type="text"
              onBlur={handleBlur}
              onChange={handleChange}
            />
          </div>
          <div className="w-full lg:w-1/2">
            <InputForm
              type="number"
              id="vida_util_dias"
              name="vida_util_dias"
              placeholder="365"
              label="Vida útil "
              onBlur={handleBlur}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col lg:flex-row gap-4">
        <div className="w-full lg:w-1/3">
          <label htmlFor="categoria" className="block text-sm text-black-900">
            Categoría
          </label>
          <select
            id="categoria"
            name="categoria"
            className="mt-1 block w-fll px-4 py-2.5 border-2 rounded-main shadow-sm focus:outline-none focus:border-secundario-300"
            onBlur={handleBlur}
            onChange={handleChange}
          >
            <option value="materia_prima">Materia Prima</option>
            <option value="producto_elaborado">Producto Elaborado</option>
          </select>
        </div>
        <div className="w-full lg:w-1/3">
          <label htmlFor="tipo_insumo" className="block text-sm text-black-900">
            Tipo de Insumo
          </label>
          <select
            id="tipo_insumo"
            name="tipo_insumo"
            className="mt-1 block w-full px-4 py-2.5 border-2 rounded-main shadow-sm focus:outline-none focus:border-secundario-300"
            onBlur={handleBlur}
            onChange={handleChange}
          >
            <option value="producto_alimenticio">Producto alimenticio</option>
            <option value="insumo2">Insumo 2</option>
          </select>
        </div>
        <div className="w-full lg:w-1/3">
          <InputForm
            type="date"
            id="fecha_vencimiento"
            name="fecha_vencimiento"
            label="Fecha de vencimiento"
            placeholder="Elige la fecha"
            onBlur={handleBlur}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="w-full flex flex-col lg:flex-row gap-4">
        <div className="w-full lg:w-1/2">
          <ImageUpload
            fieldName="imagen"
            maxNumber={1}
            title="Imagen"
            setFieldValue={setFieldValue}
          />
        </div>

        <div className="w-full lg:w-1/2">
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
        </div>
      </div>

      <button
        type="submit"
        className="w-full flex justify-center rounded-main mt-5 bg-secundario-main text-white-main py-2 px-5 transition-all duration-200 ease-out hover:bg-secundario-500"
      >
        Agregar insumo
      </button>
    </form>
  );
};
