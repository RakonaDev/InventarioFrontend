"use client";
import React, { useEffect } from "react";
import { InputForm } from "../../form/InputForm";
import { useFormik } from "formik";
import { useCategoria } from "../../../hooks/useCategoria";
import { useProveedor } from "../../../hooks/useProveedor";
import { Errors } from "../../form/Errors";
import { useInsumos } from "../../../hooks/useInsumos";

export const AgregarInsumo = () => {
  const { categoriasData } = useCategoria();
  const { proveedores } = useProveedor()
  const { PostInsumo } = useInsumos()
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    errors,
    touched,
    values,
    isSubmitting,
    setFieldValue
  } = useFormik({
    initialValues: {
      nombre: "",
      descripcion: "",
      precio: 0,
      id_categoria: 0,
      id_proveedor: 0,
      cantidad: 0,
      fecha_creacion: '',
      fecha_vencimiento: '',
      comprobante: null
    },
    onSubmit: async (values) => {
      const newInsumo = new FormData();
      newInsumo.append("nombre", values.nombre);
      newInsumo.append("descripcion", values.descripcion);
      newInsumo.append("precio", values.precio.toString());
      newInsumo.append("id_categoria", values.id_categoria.toString());
      newInsumo.append("id_proveedor", values.id_proveedor.toString());
      console.log(values.comprobante)
      if (values.comprobante) {
        newInsumo.append('comprobante', values.comprobante as File); // Solo agregamos si imagen no es null
      }
      newInsumo.append("cantidad", values.cantidad.toString());
      if (values.fecha_creacion) {
        newInsumo.append("fecha_creacion",String(values.fecha_creacion));
      }
      if (values.fecha_vencimiento) {
        newInsumo.append("fecha_vencimiento", String(values.fecha_vencimiento));
      }
      PostInsumo(newInsumo)
    }
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
        Agregar Producto
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
        <div className="w-full lg:w-1/2">
          <label htmlFor="categoria" className="block text-sm text-black-900">
            Proveedor
          </label>
          <select
            id="categoria"
            name="id_proveedor"
            className="mt-1 block w-full px-4 py-2.5 border-2 rounded-main shadow-sm focus:outline-none focus:border-secundario-300"
            value={values.id_proveedor}
            onBlur={handleBlur}
            onChange={handleChange}
          >
            <option value={0} disabled>Elija el Proveedor</option>
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
              type="number"
              step={0.01}
              value={values.precio}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            <Errors errors={errors.precio} touched={touched.precio} />
          </div>
          <div className="w-full lg:w-1/2">
            <InputForm
              type="number"
              id="cantidad"
              name="cantidad"
              placeholder="365"
              label="Cantidad "
              value={values.cantidad}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            <Errors errors={errors.cantidad} touched={touched.cantidad} />
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col lg:flex-row gap-4">
        <div className="w-full lg:w-1/3">
          <label htmlFor="id_categoria" className="block text-sm text-black-900">
            Categoria
          </label>
          <select
            id="id_categoria"
            name="id_categoria"
            className="mt-1 block w-full px-4 py-2.5 border-2 rounded-main shadow-sm focus:outline-none focus:border-secundario-300"
            value={values.id_categoria}
            onBlur={handleBlur}
            onChange={handleChange}
          >
            <option value={0} disabled>Elija la Categoría</option>
            {categoriasData?.categorias?.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.nombre}
              </option>
            ))}
          </select>
          <Errors errors={errors.id_categoria} touched={touched.id_categoria} />
        </div>
        <div className="w-full lg:w-1/3">
          <InputForm
            type="date"
            id="fecha_creacion"
            name="fecha_creacion"
            label="Fecha de Creación (Opcional)"
            placeholder="Elige la fecha"
            value={values.fecha_creacion}
            onBlur={handleBlur}
            onChange={handleChange}
          />
        </div>
        <div className="w-full lg:w-1/3">
          <InputForm
            type="date"
            id="fecha_vencimiento"
            name="fecha_vencimiento"
            label="Fecha de vencimiento (Opcional)"
            placeholder="Elige la fecha"
            value={values.fecha_vencimiento}
            onBlur={handleBlur}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="w-full">
        <label htmlFor="comprobante">Comprobante de Compra: (Opcional)</label>
        <input
          type="file"
          id="comprobante"
          accept="application/pdf"
          name="comprobante"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const file = event.currentTarget.files?.[0] || null;
            setFieldValue("comprobante", file);
          }}
          className="mt-1 block w-full px-4 py-2 border-2 rounded-main shadow-sm focus:outline-none focus:border-secundario-300 "
        />
      </div>
      <div className="w-full flex flex-col lg:flex-row gap-4">
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
            value={values.descripcion}
            onBlur={handleBlur}
            onChange={handleChange}
          ></textarea>
          <Errors errors={errors.descripcion} touched={touched.descripcion} />
        </div>
      </div>

      <button
        type="submit"
        className="w-fit flex justify-center rounded-main mt-5 bg-secundario-main text-white-main py-2 px-8 mx-auto transition-all duration-200 ease-out hover:bg-secundario-500"
      >
        Agregar Producto
      </button>
    </form>
  );
};
