"use client";
import { Insumo } from "@/interfaces/InsumosInterface";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { InputForm } from "../../form/InputForm";
import { CategoriaInterface } from "@/interfaces/CategoriaInterface";
import { ProveedorInterface } from "@/interfaces/ProveedorInterface";
import { apiAuth } from "../../../fonts/helper/global";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useAdmin } from "../../../context/AdminContext";

export const EditarInsumo = ({ insumo, setInsumos }: { insumo: Insumo, setInsumos: React.Dispatch<React.SetStateAction<Insumo[]>> }) => {
  const router = useRouter()
  const [proveedores, setProveedores] = useState<ProveedorInterface[]>([])
  const [categorias, setCategorias] = useState<CategoriaInterface[]>([])
  const [loading, setLoading] = useState(false)
  const { closeModal } = useAdmin()
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    errors,
    touched,
    setValues,
    values,
    isSubmitting,

  } = useFormik({
    initialValues: {
      nombre: insumo.nombre,
      precio: insumo.precio,
      cantidad: insumo.cantidad,
      descripcion: insumo.descripcion,
      id_categoria: insumo.id_categoria,
      id_proveedor: insumo.id_proveedor,
    },
    onSubmit: async (values) => {
      if (loading) return
      setLoading(true)
      const editedInsumo = {
        id: insumo.id || 0,
        nombre: values.nombre,
        precio: values.precio,
        cantidad: values.cantidad,
        descripcion: values.descripcion,
        id_categoria: values.id_categoria,
        id_proveedor: values.id_proveedor,
      }
      try {
        const response = await apiAuth.post(`/insumos/${editedInsumo.id}`, editedInsumo);
        if (response.status === 401) {
          router.push('/login');
          throw new Error("Unauthorized");
        }
        if (response.status !== 200) {
          throw new Error('error');
        }
        if (response.status === 200) {
          toast.success('Producto Editado Correctamente')
          setInsumos(prevState => prevState.map((state) => state.id === response.data.insumos.id ? response.data.insumos : state))
          closeModal()
        }
      } catch (error) {
        console.error(error);
        if (error instanceof AxiosError) {
          if (error.status === 401) {
            router.push('/login')
          }
        }
        toast.error('Hubo un error editando el producto');
        throw error;
      } finally {
        setLoading(false)
      }
    },
  });

  async function getProveedores() {
    try {
      const response = await apiAuth.get(`/proveedores`)

      if (response.status === 401) {
        router.push('/login')
      }
      if (response.status !== 200) {
        throw new Error('Error al obtener los proveedores');
      }
      setProveedores(response.data)
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.status === 401) {
          router.push('/login')
        }
      }
      toast.error('Hubo un error al recibir los datos')
      console.log(error);
      throw new Error('Error al obtener los proveedores');
    }
  }

  async function getCategorias() {
    try {
      const response = await apiAuth.get(`/categorias`)

      if (response.status === 401) {
        router.push('/login')
      }
      if (response.status !== 200) {
        throw new Error('Error al obtener las categorias');
      }
      setCategorias(response.data)
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.status === 401) {
          router.push('/login')
        }
      }
      toast.error('Hubo un error al recibir las categorias')
      console.log(error);
      throw new Error('Error al obtener las categorias');
    }
  }

  useEffect(() => {
    getProveedores()
    getCategorias()
  }, [])

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
      nombre: insumo.nombre,
      precio: insumo.precio,
      descripcion: insumo.descripcion,
      id_categoria: insumo.id_categoria,
      id_proveedor: insumo.id_proveedor,
      cantidad: insumo.cantidad,
    });
  }, [setValues, insumo]);
  return (
    <form className="space-y-6 p-4" onSubmit={handleSubmit} id="editInsumo">
      <h2 className="text-2xl font-semibold text-center mb-6">Editar Producto</h2>
      <div className="w-full flex flex-col lg:flex-row gap-4 ">
        <div className="w-full lg:w-1/2">
          <InputForm
            id="nombre"
            label="Nombre"
            name="nombre"
            placeholder="Escribe el nombre"
            type="text"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.nombre}
          />
        </div>
        <div className="w-full lg:w-1/2 flex flex-col lg:flex-row gap-4">
          <div className="w-full">
            <InputForm
              id="precio"
              label="Precio"
              name="precio"
              placeholder="Edite el precio"
              type="number"
              step={0.01}
              value={values.precio}
              onChange={handleChange}
            />
          </div>

        </div>
      </div>
      <div className="w-full flex flex-col lg:flex-row gap-4">
        <div className="w-full lg:w-1/2">
          <label htmlFor="id_categoria" className="block text-sm text-black-900">
            Categoría
          </label>
          <select
            id="id_categoria"
            name="id_categoria"
            value={values.id_categoria}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2.5 border-2 rounded-main shadow-sm focus:outline-none focus:border-secundario-300"
          >
            {
              categorias?.map((categoria: CategoriaInterface) => {
                return (
                  <option value={categoria.id} key={categoria.id}>{categoria.nombre}</option>
                )
              })
            }
          </select>
        </div>
        <div className="w-full lg:w-1/2">
          <label htmlFor="categoria" className="block text-sm text-black-900">
            Categoría
          </label>
          <select
            title="id_proveedor"
            id="id_proveedor"
            name="id_proveedor"
            value={values.id_proveedor}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2.5 border-2 rounded-main shadow-sm focus:outline-none focus:border-secundario-300"
          >
            {
              proveedores?.map((proveedor: ProveedorInterface) => {
                return (
                  <option value={proveedor.id} key={proveedor.id}>{proveedor.name}</option>
                )
              })
            }
          </select>
        </div>
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
            value={values.descripcion}
            onChange={handleChange}
            className="mt-1 h-[200px] max-h-[200px] block w-full px-4 py-2 border-2 rounded-main shadow-sm focus:outline-none focus:border-secundario-300 "
          ></textarea>
        </div>
      </div>

      <button
        type="submit"
        className="w-full flex justify-center rounded-main mt-5 bg-secundario-main text-white-main py-2 px-5 transition-all duration-200 ease-out hover:bg-secundario-500"
      >
        Editar Producto
      </button>
    </form>
  );
};
