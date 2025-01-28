"use client";
import { RolInterface } from "@/interfaces/RolInterface";
import React, { useState } from "react";
import { useRol } from "../../../hooks/useRol";
import { useFormik } from "formik";
import { Errors } from "../../form/Errors";
import { InputForm } from "../../form/InputForm";
import { EditarRolSchema } from "@/schemas/RolSchemas";

export default function EditarRol({ rol }: { rol: RolInterface }) {
  const [id] = useState(rol.id);
  const { EditarRol } = useRol();
  const { handleBlur, handleChange, handleSubmit, errors, values, touched } =
    useFormik({
      initialValues: {
        name: rol.name,
      },
      validationSchema: EditarRolSchema,
      onSubmit: async (values) => {
        EditarRol({
          id,
          name: values.name,
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
            name="name"
            placeholder="Escribe el nuevo nombre del rol"
            type="text"
            value={values.name}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          <Errors errors={errors.name} touched={touched.name} />
        </div>
      </div>
      <button
        type="submit"
        className="w-full flex justify-center rounded-main mt-5 bg-secundario-main text-white-main py-2 px-5 transition-all duration-200 ease-out hover:bg-secundario-500"
      >
        Editar Rol
      </button>
    </form>
  );
}
