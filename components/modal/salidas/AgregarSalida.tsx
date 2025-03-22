import { useFormik } from "formik"
import { InputForm } from "../../form/InputForm"
import { Errors } from "../../form/Errors"
import { apiAuth } from "../../../fonts/helper/global"
import { AxiosError } from "axios"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Insumo } from "@/interfaces/InsumosInterface"

export const AgregarSalida = () => {
  const router = useRouter()

  const [productos, setProductos] = useState<Insumo[]>([])

  async function getProductos() {
    const response = await apiAuth.get('/insumos')

    setProductos(response.data)
  }

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    errors,
    touched,
    values,
  } = useFormik({
    initialValues: {
      id_producto: 0,
      cantidad: 0,
    },
    onSubmit: async (values) => {
      const newSalida = {
        id_producto: values.id_producto,
        cantidad: values.cantidad
      }
      try {

        const response = await apiAuth.post('/salidas', newSalida)
        if (response.status === 401) {
          router.push('/login')
        }
        if (response.status !== 200) {
          throw new Error('error')
        }
        if (response.status === 200) {
          toast.success('Salida Creada Correctamente!')
          window.location.reload()
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.status === 401) {
            router.push('/login')
          }
        }
        toast.error('Error creando la salida')
        console.log(error)
      }
    }
  })
  useEffect(() => {
    getProductos()
  }, [])

  return (
    <form className="space-y-6 p-4" onSubmit={handleSubmit}>
      <h1 className="text-2xl font-semibold text-center mb-6">Agregar Salida</h1>
      <div className="w-full space-y-3">
        <section className="w-full flex flex-col lg:flex-row gap-4 ">
          <div className="w-full lg:w-1/2">
            <label htmlFor="id_producto" className="block text-sm text-black-900">
              Insumo
            </label>
            <select
              id="id_producto"
              name="id_producto"
              className="mt-1 block w-full px-4 py-2.5 border-2 rounded-main shadow-sm focus:outline-none focus:border-secundario-300"
              value={values.id_producto}
              onChange={handleChange}
            >
              <option value={0} disabled>Seleccione el Insumo</option>
              {
                productos?.map((item) => (
                  <option value={item.id} key={item.id}>{item.nombre}</option>
                ))
              }
            </select>
          </div>
          <div className="w-full lg:w-1/2">
            <InputForm
              id="cantidad"
              label="Cantidad"
              name="cantidad"
              placeholder="Ingrese la cantidad"
              type="number"
              value={values.cantidad}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            <Errors errors={errors.cantidad} touched={touched.cantidad} />
          </div>
        </section>
      </div>
      <button
        type="submit"
        className="w-fit flex justify-center rounded-main mt-5 bg-secundario-main text-white-main py-2 px-8 mx-auto transition-all duration-200 ease-out hover:bg-secundario-500"
      >
        Agregar Salida
      </button>
    </form>
  )
}