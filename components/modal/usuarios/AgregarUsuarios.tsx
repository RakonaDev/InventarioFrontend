import React from "react";
import { InputForm } from "../../form/InputForm";

export const AgregarUsuarios = () => {
  return (
    <form className="mx-auto p-6 ">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Agregar usuario
      </h2>

      <div className="w-full flex flex-col lg:flex-row gap-4">
        <div className="w-full lg:w-1/2">
          <InputForm
            id="nombres"
            label="Nombres"
            name="nombres"
            placeholder="Escribe los nombres"
            type="text"
          />
        </div>
        <div className="w-full lg:w-1/2">
          <InputForm
            id="apellidos"
            label="Apellidos"
            name="Apellidos"
            placeholder="Escribe los apellidos"
            type="text"
          />
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
          />
        </div>
        <div className="w-full lg:w-1/2 flex flex-col lg:flex-row gap-4">
          <div className="w-full lg:w-1/2">
            <InputForm
              id="edad"
              label="Edad"
              name="edad"
              placeholder="Escribe la edad"
              type="number"
            />
          </div>

          <div className="w-full lg:w-1/2">
            <InputForm
              id="dni"
              label="DNI"
              name="dni"
              placeholder="Escribe el dni"
              type="number"
              className="appearance-none"
            />
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
          />
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
              className="mt-1 block w-full px-4 py-2.5 border-2 rounded-main shadow-sm focus:outline-none focus:border-secundario-300"
            >
              <option value="activo">Activo</option>
              <option value="inactivo">Inactivo</option>
            </select>
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
              className="mt-1 block w-full px-4 py-2.5 border-2 rounded-main shadow-sm focus:outline-none focus:border-secundario-300"
            >
              <option value="administrador">Administrador</option>
              <option value="colaborador">Colaborador</option>
            </select>
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full flex justify-center rounded-main mt-5 bg-secundario-main text-white-main py-2 px-5 transition-all duration-200 ease-out hover:bg-secundario-500"
      >
        Agregar usuario
      </button>
    </form>
  );
};
