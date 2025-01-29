import { TipoInsumoInterface } from '@/interfaces/TipoInsumoInterface'
import React, { useState } from 'react'
import { Errors } from '../../form/Errors';
import { InputForm } from '../../form/InputForm';
import { useFormik } from 'formik';
import { useTipoInsumo } from '../../../hooks/useTipoInsumo';

export default function EditarTipoInsumo({ tipo_insumo }: { tipo_insumo: TipoInsumoInterface }) {
  const [id] = useState(tipo_insumo.id);
  const { EditarTipoInsumo } = useTipoInsumo();
  const { handleBlur, handleChange, handleSubmit, errors, values, touched } =
    useFormik({
      initialValues: {
        nombre: tipo_insumo.nombre,
      },
      onSubmit: async (values) => {
        EditarTipoInsumo({
          id,
          nombre: values.nombre,
        });
      },
    });
  return (
    <form className="mx-auto p-6 " onSubmit={handleSubmit}>
      <h2 className="text-2xl font-semibold text-center mb-6">Editar Rol</h2>
      <div className="w-full space-y-3">
        <div className="w-full">
          <InputForm
            id="nombres"
            label="Nombre del Rol"
            name="nombre"
            placeholder="Escribe el nuevo nombre del rol"
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
        className="w-full flex justify-center rounded-main mt-5 bg-secundario-main text-white-main py-2 px-5 transition-all duration-200 ease-out hover:bg-secundario-500"
      >
        Editar Tipo Insumo
      </button>
    </form>
  );
}
