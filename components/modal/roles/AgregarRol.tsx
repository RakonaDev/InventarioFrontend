"use client";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Errors } from "../../form/Errors";
import { InputForm } from "../../form/InputForm";
import { useRol } from "../../../hooks/useRol";
import { usePaginas } from "../../../hooks/usePaginas";
import { PaginasInterface } from "@/interfaces/PaginasInterface";
import { toTitleCase } from "../../../logic/parseToTitle";

export default function AgregarRol() {
  const { PostRol } = useRol()
  const { paginas } = usePaginas()
  // logica para guardar los permisos
  const [selectedValues, setSelectedValues] = useState<number[]>([]);
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value); // Convertir a número
    const isChecked = event.target.checked;
    
    setSelectedValues((prev) =>
      isChecked ? [...prev, value] : prev.filter((item) => item !== value)
    );
    console.log(selectedValues)
  };
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
      PostRol({
        name: values.nombre,
        paginas: selectedValues
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
      <h2 className="text-2xl font-semibold text-center mb-6">Agregar Nuevo Rol</h2>
      <div className="w-full space-y-3">
        <div className="w-full">
          <InputForm
            id="name"
            label="Nombres"
            name="nombre"
            placeholder="Escribe el nombre del rol"
            type="text"
            value={values.nombre}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          <Errors errors={errors.nombre} touched={touched.nombre} />
        </div>
        <div className="">
          <h1 className="text-sm">Elija a que secciones pertenece: </h1>
          <section className="mt-3 flex flex-wrap gap-10 justify-evenly py-5">
            {
              paginas?.map((pagina: PaginasInterface, index: number) => {
                return (
                  <div className="flex flex-wrap gap-2" key={index}>
                    <input type="checkbox" name="seccion" id={pagina.nombre} value={pagina.id} checked={selectedValues.includes(pagina.id)} onChange={handleCheckboxChange} className="w-6"/>
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
        className="w-fit mx-auto flex justify-center rounded-main mt-5 bg-secundario-main text-white-main py-2 px-5 transition-all duration-200 ease-out hover:bg-secundario-500"
      >
        Ingresar Nuevo Rol
      </button>
    </form>
  );
}
