import React, { useEffect, useState } from "react";
import { InputForm } from "../../form/InputForm";
import { ListUserInterface } from "@/interfaces/ListUserInterface";
import { useFormik } from "formik";
import { EditUserSchema } from "@/schemas/AuthSchemas";
import { Errors } from "../../form/Errors";
import { RolInterface } from "@/interfaces/RolInterface";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { apiAuth } from "../../../fonts/helper/global";
import { useAdmin } from "../../../context/AdminContext";

export const EditarUsuario = ({ usuario, setUsuarios }: { usuario: ListUserInterface, setUsuarios: React.Dispatch<React.SetStateAction<ListUserInterface[]>> }) => {
  const [id] = useState(usuario.id)
  const { closeModal } = useAdmin()
  const [roles, setRoles] = useState<RolInterface[]>([])

  const getRoles = async () => {
    try {
      const response = await apiAuth.get(`/roles`)

      if (response.status === 401) {
        window.location.href = '/login'
      }
      if (response.status !== 200) {
        throw new Error('Error al obtener los roles');
      }
      setRoles(response.data)
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.status === 401) {
          window.location.href = '/login'
        }
      }
      toast.error('Hubo un error al recibir los roles')
      console.log(error);
      throw new Error('Error al obtener los roles');
    }
  }

  const [loading, setLoading] = useState(false)
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
      celular: "",
      email: "",
      id_estado: 0,
      id_roles: 0,
      contrasena: "",
      edad: 0,
      dni: "",
    },
    validationSchema: EditUserSchema,
    onSubmit: async (values) => {
      if (loading) return
      setLoading(true)
      try {
        const updatedUser = {
          age: values.edad,
          dni: values.dni,
          email: values.email,
          id_estado: 1,
          id_roles: values.id_roles,
          last_names: values.apellidos,
          names: values.nombres,
          password: values.contrasena,
          tel: values.celular,
          id: id
        }
        // const response = await apiAuth.patch('/user', updatedUser)
        const response = await apiAuth.post('/user', updatedUser)
        if (response.status === 401) {
          window.location.href = '/login'
        }
        if (response.status !== 200) {
          throw new Error('error')
        }
        if (response.status === 200) {
          setLoading(false)
          toast.success('Usuario Actualizado Correctamente!')
          setUsuarios(prevState => prevState.map((user: ListUserInterface) =>
            user.id === updatedUser.id ? response.data.user : user
          ))
          closeModal()
        }

        return response.data
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.status === 401) {
            window.location.href = '/login'
          }
        }
        console.log(error)
        toast.error('Hubo un error actualizando el usuario')
        throw new Error('Error al actualizar el usuario')
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
      nombres: usuario.names,
      apellidos: usuario.last_names,
      celular: usuario.tel,
      email: usuario.email,
      id_estado: Number(usuario.id_estado),
      id_roles: Number(usuario.id_roles),
      dni: usuario.dni,
      edad: usuario.age,
      contrasena: ''
    });
  }, [setValues, usuario]);

  useEffect(() => {
    getRoles()
  }, [])

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
              type="text"
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
              name="contrasena"
              placeholder="Escribe la contraseña"
              type="password"
              value={values.contrasena}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            <Errors errors={errors.contrasena} touched={touched.contrasena} />
          </div>
        </div>

        <div className="w-full flex flex-col lg:flex-row gap-4">


          <div className="w-full lg:w-1/2">
            <div className="mb-4">
              <label htmlFor="rol" className="block text-sm text-black-900">
                Rol
              </label>
              <select
                id="rol"
                name="id_roles"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.id_roles}
                className="mt-1 block w-full px-4 py-2.5 border-2 rounded-main shadow-sm focus:outline-none focus:border-secundario-300"
              >
                {
                  roles?.map((rol: RolInterface) => {
                    return (
                      <option value={rol.id} key={rol.id} > {rol.name} </option>
                    )
                  })
                }
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
