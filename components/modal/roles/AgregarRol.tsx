"use client";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Errors } from "../../form/Errors";
import { InputForm } from "../../form/InputForm";
import { usePaginas } from "../../../hooks/usePaginas";
import { PaginasInterface } from "@/interfaces/PaginasInterface";
import { toTitleCase } from "../../../logic/parseToTitle";
import { AxiosError } from "axios";
import { apiAuth } from "../../../fonts/helper/global";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function AgregarRol() {
  const { paginas } = usePaginas()
  // logica para guardar los permisos
  const [selectedValues, setSelectedValues] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter()

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
      if (loading) return
      setLoading(true)
      const newRol = {
        name: values.nombre,
        paginas: selectedValues
      }
      try {

        const response = await apiAuth.post('/roles', newRol, {
          headers: {
            'Content-Type': 'application/json'
          }
        })

        if (response.status === 401) {
          router.push('/login')
        }
        if (response.status !== 200) {
          throw new Error('error')
        }
        if (response.status === 200) {
          toast.success('Rol Creado Correctamente')
          window.location.reload()
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.status === 401) {
            router.push('/login')
          }
        }
        toast.error('Hubo un error creando el rol')
        console.log(error);
        throw new Error('Error al crear el rol');
      } finally {
        setLoading(false)
      }
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
        className="w-fit mx-auto flex justify-center rounded-main mt-5 bg-secundario-main text-white-main py-2 px-5 transition-all duration-200 ease-out hover:bg-secundario-500"
      >
        Ingresar Nuevo Rol
      </button>
    </form>
  );
}
