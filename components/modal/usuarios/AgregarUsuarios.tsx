import React, { useEffect, useState } from "react";
import { InputForm } from "../../form/InputForm";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { apiAuth } from "../../../fonts/helper/global";
import { useAdmin } from "../../../context/AdminContext";
import { RolInterface } from "@/interfaces/RolInterface";

export const AgregarUsuarios = () => {
  const [tel, setCelular] = useState<string>('')
  const [dni, setDni] = useState<string>('')
  const [age, setEdad] = useState<number>(0)
  const [email, setEmail] = useState<string>('')
  const [id_estado, setIdEstado] = useState<number>(1)
  const [id_roles, setIdRol] = useState<number>(0)
  const [names, setNames] = useState<string>('')
  const [last_names, setLastNames] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [roles, setRoles] = useState<RolInterface[]>([])

  const { closeModal } = useAdmin()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target
    if (name === 'nombres') {
      setNames(value)
    }
    else if (name === 'apellidos') {
      setLastNames(value)
    }
    else if (name === 'tel') {
      setCelular(value)
    }
    else if (name === 'age') {
      setEdad(Number(value))
    }
    else if (name === 'dni') {
      setDni(value)
    }
    else if (name === 'email') {
      setEmail(value)
    }
    else if (name === 'password') {
      setPassword(value)
    }
  }

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value, name } = e.target

    if (name === 'estado') {
      setIdEstado(Number(value))
    }
    else if (name === 'rol') {
      setIdRol(Number(value))
    }
  }

  const submitCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (loading) return
    setLoading(true)
    console.log("Datos enviados")
    const newUser = {
      tel,
      dni,
      age,
      email,
      id_estado,
      last_names,
      names,
      id_roles,
      password
    }
    try {
      const response = await apiAuth.post('register', newUser)
      if (response.status === 401) {
        console.log(response.status)
        window.location.href = '/login'
      }
      if (response.status !== 200) {
        throw new Error('error')
      }
      if (response.status === 200) {
        setLoading(false)
        toast.success('Usuario Creado Correctamente!')
        window.location.reload()
        closeModal()
      }
      return response.data
    }
    catch (error) {
      if (error instanceof AxiosError) {
        if (error.status === 401) {
          window.location.href = '/login'
        }
      }
      toast.error('Hubo un error agregando el nuevo usuario!')
      console.log(error)
      if (error instanceof AxiosError) {
        if (error.status === 401) {
          window.location.href = '/login'
        }
      }
      throw new Error('Error al crear el usuario')
    } finally {
      setLoading(false)
    }
  }

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

  useEffect(() => {
    getRoles()
  }, [])

  return (
    <form className="mx-auto p-6" onSubmit={submitCreate}>
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
            value={names}
            onChange={handleInputChange}
          />
        </div>
        <div className="w-full lg:w-1/2">
          <InputForm
            id="apellidos"
            label="Apellidos"
            name="apellidos"
            placeholder="Escribe los apellidos"
            type="text"
            value={last_names}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="w-full flex flex-col lg:flex-row gap-4">
        <div className="w-full lg:w-1/2">
          <InputForm
            id="tel"
            label="Celular"
            name="tel"
            placeholder="Escribe el tel"
            type="number"
            value={tel}
            onChange={handleInputChange}
          />
        </div>
        <div className="w-full lg:w-1/2 flex flex-col lg:flex-row gap-4">
          <div className="w-full lg:w-1/2">
            <InputForm
              id="age"
              label="Edad"
              name="age"
              placeholder="Escribe la age"
              type="number"
              onBlur={() => setEdad(0)}
              onChange={handleInputChange}
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
              onChange={handleInputChange}
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
            value={email}
            onChange={handleInputChange}
          />
        </div>
        <div className="w-full lg:w-1/2">
          <InputForm
            id="password"
            label="Contraseña"
            name="password"
            placeholder="Escribe la contraseña"
            type="password"
            value={password}
            onChange={handleInputChange}
          />
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
              name="rol"
              className="mt-1 block w-full px-4 py-2.5 border-2 rounded-main shadow-sm focus:outline-none focus:border-secundario-300"
              value={id_roles}
              onChange={handleSelectChange}
            >
              <option value={0} disabled>Seleccioné el Rol</option>
              {
                roles?.map((item) => (
                  <option value={item.id} key={item.id}>{item.name}</option>
                ))
              }
            </select>
          </div>
        </div>
      </div>

      <input
        type="submit"
        className="w-full flex justify-center rounded-main mt-5 bg-secundario-main text-white-main py-2 px-5 transition-all duration-200 ease-out hover:bg-secundario-500"
        value="Agregar Usuario"
      />
    </form>
  );
};
