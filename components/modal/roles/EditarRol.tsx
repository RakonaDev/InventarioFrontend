"use client";
import { RolInterface } from "@/interfaces/RolInterface";
import React, { useState } from "react";
import { useRol } from "../../../hooks/useRol";
import { useFormik } from "formik";
import { Errors } from "../../form/Errors";
import { InputForm } from "../../form/InputForm";
import { EditarRolSchema } from "@/schemas/RolSchemas";
import { usePaginas } from "../../../hooks/usePaginas";
import { PaginasInterface } from "@/interfaces/PaginasInterface";
import { toTitleCase } from "../../../logic/parseToTitle";

export default function EditarRoles({ rol }: { rol: RolInterface }) {
  const { paginas } = usePaginas()
  const [id] = useState(rol.id);
  const Id_arrays: number[] = []
  rol.list_paginas?.map((item) => {
    Id_arrays.push(item.id)
  })
  const [selectedValues, setSelectedValues] = useState<number[]>(Id_arrays);
  const { EditarRoles } = useRol();
  const { handleBlur, handleChange, handleSubmit, errors, values, touched } =
    useFormik({
      initialValues: {
        name: rol.name,
      },
      validationSchema: EditarRolSchema,
      onSubmit: async (values) => {
        EditarRoles({
          id,
          name: values.name,
          paginas: selectedValues
        });
      },
    });

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value); // Convertir a número
    const isChecked = event.target.checked;

    setSelectedValues((prev) =>
      isChecked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  };
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
        <div className="">
          <h1 className="text-sm">Elija a que secciones pertenece: </h1>
          <section className="mt-3 flex flex-wrap gap-10 justify-evenly py-5">
            {
              paginas?.map((pagina: PaginasInterface, index: number) => {
                return (
                  <div className="flex flex-wrap gap-2" key={index}>
                    <input type="checkbox" name="seccion" id={pagina.nombre} value={pagina.id} checked={selectedValues.includes(pagina.id)} onChange={handleCheckboxChange} className="w-6" />
                    <label htmlFor={pagina.nombre}>{toTitleCase(pagina.nombre)}</label>
                  </div>
                )
              })
            }
          </section>
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
