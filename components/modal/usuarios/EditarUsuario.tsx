import React, { useEffect } from "react";
import { InputForm } from "../../form/InputForm";
import { ListUserInterface } from "@/interfaces/ListUserInterface";
import { useFormik } from "formik";
import { SchemaLogin } from "@/schemas/AuthSchemas";
import { Errors } from "../../form/Errors";

export const EditarUsuario = ({ usuario }: { usuario: ListUserInterface }) => {
  const {
    handleSubmit,
    handleChange,
    errors,
    values,
    setValues,
    touched,
    handleBlur,
    isSubmitting,
  } = useFormik({
    initialValues: {
      nombres: "",
      apellidos: "",
      celular: 0,
      email: "",
      id_estado: 0,
      id_roles: 0,
      edad: 0,
      dni: "",
    },
    validationSchema: SchemaLogin,
    onSubmit: () => {},
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
      nombres: usuario.names,
      apellidos: usuario.last_names,
      celular: Number(usuario.tel),
      email: usuario.email,
      id_estado: Number(usuario.id_estado),
      id_roles: Number(usuario.id_roles),
      dni: usuario.dni,
      edad: usuario.age,
    });
  }, [setValues, usuario]);
  return (
    <form className="mx-auto p-6 " onSubmit={handleSubmit}>
      <h2 className="text-2xl font-semibold text-center mb-6">
        Editar usuario
      </h2>

      <div className="w-full space-y-3">
        <div className="w-full flex flex-col lg:flex-row gap-4">
          <div className="w-full lg:w-1/2">
            <InputForm
              id="nombres"
              label="Nombres"
              name="nombres"
              placeholder="Escribe los nombres"
              type="text"
              value={values.nombres}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            <Errors errors={errors.nombres} touched={touched.nombres} />
          </div>
          <div className="w-full lg:w-1/2">
            <InputForm
              id="apellidos"
              label="Apellidos"
              name="Apellidos"
              placeholder="Escribe los apellidos"
              type="text"
              value={values.apellidos}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            <Errors errors={errors.apellidos} touched={touched.apellidos} />
          </div>
        </div>
        <div className="w-full flex flex-col lg:flex-row gap-4">
          <div className="w-full lg:w-1/2">
            <InputForm
              id="celular"
              label="Celular"
              name="celular"
              placeholder="Escribe el celular"
              type="number"
              value={values.celular}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            <Errors errors={errors.celular} touched={touched.celular} />
          </div>
          <div className="w-full lg:w-1/2 flex flex-col lg:flex-row gap-4">
            <div className="w-full lg:w-1/2">
              <InputForm
                id="edad"
                label="Edad"
                name="edad"
                placeholder="Escribe la edad"
                type="number"
                value={values.edad}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              <Errors errors={errors.edad} touched={touched.edad} />
            </div>

            <div className="w-full lg:w-1/2">
              <InputForm
                id="dni"
                label="DNI"
                name="dni"
                placeholder="Escribe el dni"
                type="number"
                className="appearance-none"
                value={values.dni}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              <Errors errors={errors.dni} touched={touched.dni} />
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col lg:flex-row gap-4">
          <div className="w-full lg:w-1/2">
            <InputForm
              id="email"
              label="Email"
              name="email"
              placeholder="Escribe el email"
              type="email"
              value={values.email}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            <Errors errors={errors.email} touched={touched.email} />
          </div>
          <div className="w-full lg:w-1/2">
            <InputForm
              id="password"
              label="Contraseña"
              name="password"
              placeholder="Escribe la contraseña"
              type="password"
            />
          </div>
        </div>

        <div className="w-full flex flex-col lg:flex-row gap-4">
          <div className="w-full lg:w-1/2">
            <div className="mb-4">
              <label htmlFor="estado" className="block text-sm text-black-900">
                Estado
              </label>
              <select
                id="estado"
                name="estado"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.id_estado}
                className="mt-1 block w-full px-4 py-2.5 border-2 rounded-main shadow-sm focus:outline-none focus:border-secundario-300"
              >
                <option value="activo">Activo</option>
                <option value="inactivo">Inactivo</option>
              </select>
              <Errors errors={errors.id_estado} touched={touched.id_estado} />
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <div className="mb-4">
              <label htmlFor="rol" className="block text-sm text-black-900">
                Rol
              </label>
              <select
                id="rol"
                name="rol"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.id_roles}
                className="mt-1 block w-full px-4 py-2.5 border-2 rounded-main shadow-sm focus:outline-none focus:border-secundario-300"
              >
                <option value="administrador">Administrador</option>
                <option value="moderador">Moderador</option>
              </select>
              <Errors errors={errors.id_roles} touched={touched.id_roles} />
            </div>
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full flex justify-center rounded-main mt-5 bg-secundario-main text-white-main py-2 px-5 transition-all duration-200 ease-out hover:bg-secundario-500"
      >
        Editar usuario
      </button>
    </form>
  );
};
