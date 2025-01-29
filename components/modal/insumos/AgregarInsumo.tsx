"use client";
import React, { useEffect } from "react";
import { InputForm } from "../../form/InputForm";
import ImageUpload from "../../images/ImagesUpload";
import { useFormik } from "formik";
import { useCategoria } from "../../../hooks/useCategoria";
import { useProveedor } from "../../../hooks/useProveedor";
import { useTipoInsumo } from "../../../hooks/useTipoInsumo";
import { Errors } from "../../form/Errors";
import { useInsumos } from "../../../hooks/useInsumos";

export const AgregarInsumo = () => {
  const { categorias } = useCategoria();
  const { proveedores } = useProveedor()
  const { tipo_insumo } = useTipoInsumo()
  const { PostInsumo } = useInsumos()
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
      descripcion: "",
      precio: 0,
      id_tipo_insumo: 0,
      id_categoria: 0,
      id_proveedor: 0,
      vida_util_dias: 0,
      fecha_vencimiento: new Date(),
      imagen: null
    },
    onSubmit: async (values) => {
      const newInsumo = new FormData();
      newInsumo.append("nombre", values.nombre);
      newInsumo.append("descripcion", values.descripcion);
      newInsumo.append("precio", values.precio.toString());
      newInsumo.append("id_tipo_insumo", values.id_tipo_insumo.toString());
      newInsumo.append("id_categoria", values.id_categoria.toString());
      newInsumo.append("id_proveedor", values.id_proveedor.toString());
      if (values.imagen) {
        newInsumo.append('imagen', values.imagen[0] as File); // Solo agregamos si imagen no es null
      }
      newInsumo.append("vida_util_dias", values.vida_util_dias.toString());
      newInsumo.append("fecha_vencimiento", String(values.fecha_vencimiento));
      PostInsumo(newInsumo)
    }
  });
  console.log(values.imagen)
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
      <div className="w-full">
        <InputForm
          id="nombre"
          label="Nombre del Insumo"
          name="nombre"
          placeholder="Escribe el nombre"
          type="text"
          value={values.nombre}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        <Errors errors={errors.nombre} touched={touched.nombre} />
      </div>
      <div className="w-full flex flex-col lg:flex-row gap-4 ">
        <div className="w-1/2">
          <label htmlFor="categoria" className="block text-sm text-black-900">
            Categoría
          </label>
          <select
            id="categoria"
            name="id_proveedor"
            className="mt-1 block w-full px-4 py-2.5 border-2 rounded-main shadow-sm focus:outline-none focus:border-secundario-300"
            onBlur={handleBlur}
            onChange={handleChange}
          >
            <option value={0} disabled selected>Elija el Proveedor</option>
            {proveedores?.map((proveedor) => (
              <option key={proveedor.id} value={proveedor.id}>
                {proveedor.name}
              </option>
            ))}
          </select>
          <Errors errors={errors.id_proveedor} touched={touched.id_proveedor} />
        </div>
        <div className="w-full lg:w-1/2 flex flex-col lg:flex-row gap-4">
          <div className="w-full lg:w-1/2">
            <InputForm
              id="codigo"
              label="Precio"
              name="precio"
              placeholder="Ingrese el precio"
              type="text"
              onBlur={handleBlur}
              onChange={handleChange}
            />
            <Errors errors={errors.precio} touched={touched.precio} />
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
            <Errors errors={errors.vida_util_dias} touched={touched.vida_util_dias} />
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
            name="id_categoria"
            className="mt-1 block w-full px-4 py-2.5 border-2 rounded-main shadow-sm focus:outline-none focus:border-secundario-300"
            onBlur={handleBlur}
            onChange={handleChange}
          >
            <option value={0} disabled selected>Elija la categoría</option>
            {categorias?.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.nombre}
              </option>
            ))}
          </select>
          <Errors errors={errors.id_categoria} touched={touched.id_categoria} />
        </div>
        <div className="w-full lg:w-1/3">
          <label htmlFor="tipo_insumo" className="block text-sm text-black-900">
            Tipo de Insumo
          </label>
          <select
            id="tipo_insumo"
            name="id_tipo_insumo"
            className="mt-1 block w-full px-4 py-2.5 border-2 rounded-main shadow-sm focus:outline-none focus:border-secundario-300"
            onBlur={handleBlur}
            onChange={handleChange}
          >
            <option value={0} disabled selected>Elija el Tipo de Insumo</option>
            {tipo_insumo?.map((tipo_insumo) => (
              <option key={tipo_insumo.id} value={tipo_insumo.id}>
                {tipo_insumo.nombre}
              </option>
            ))}
          </select>
          <Errors errors={errors.id_tipo_insumo} touched={touched.id_tipo_insumo} />
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
          <Errors errors={errors.imagen} touched={touched.imagen} />
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
          <Errors errors={errors.descripcion} touched={touched.descripcion} />
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
