import { useFormik } from "formik"
import { InputForm } from "../../form/InputForm"
import { Errors } from "../../form/Errors"
import { PostCompraSchema } from "@/schemas/CompraSchema"
import { formatearFechaParaInputDate } from "../../../logic/parseDateToInput"
import { useEffect, useState } from "react"
import { apiAuth } from "../../../fonts/helper/global"
import { Insumo } from "@/interfaces/InsumosInterface"
import { toast } from "sonner"


export const AgregarCompra = () => {
  const [loading, setLoading] = useState(false)
  const [productos, setProductos] = useState<Insumo[]>([])
  const [productoSeleccionado, setProductoSeleccionado] = useState<number>(0)

  const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value, name } = e.target
    if (name === 'id_producto') {
      setProductoSeleccionado(Number(value))
    }
  }

  async function getProductos() {
    const response = await apiAuth.get('/insumos')

    setProductos(response.data)
  }

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    setFieldValue,
    errors,
    touched,
    values,
  } = useFormik({
    initialValues: {
      cantidad: '',
      fecha_creacion: formatearFechaParaInputDate(new Date().toISOString()),
      fecha_vencimiento: formatearFechaParaInputDate(new Date().toISOString()),
      comprobante: null
    },
    validationSchema: PostCompraSchema,
    onSubmit: async (values) => {
      if (loading) return
      setLoading(true)
      const newCompra = new FormData();
      newCompra.append("id_producto", Number(productoSeleccionado).toString());
      newCompra.append("cantidad", values.cantidad ? values.cantidad : '');
      if (values.fecha_creacion) {
        newCompra.append("fecha_creacion", String(values.fecha_creacion));
      }
      if (values.fecha_vencimiento) {
        newCompra.append("fecha_vencimiento", String(values.fecha_vencimiento));
      }
      if (values.comprobante) {
        newCompra.append('comprobante', values.comprobante as File); // Solo agregamos si imagen no es null
      }
      try {
        const response = await apiAuth.post('/compras', newCompra)
        if (response.status === 401) {
          window.location.href = '/login'
          throw new Error("Unauthorized");
        }
        if (response.status !== 200) {
          throw new Error('Error');
        }
        if (response.status === 200) {
          toast.success('Compra Creada Correctamente!')
          window.location.reload()
        }
      } catch (error) {
        toast.error('Hubo un error añadiendo la compra')
        console.log(error)
        throw new Error('Error al crear la compra')
      } finally {
        setLoading(false)
      }
      // PostCompras(newCompra)
    }
  })

  useEffect(() => {
    getProductos()
  }, [])

  return (
    <form className="space-y-6 p-4" onSubmit={handleSubmit}>
      <h1 className="text-2xl font-semibold text-center mb-6">Agregar Compra</h1>
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
              value={productoSeleccionado}
              onChange={handleChangeSelect}
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
        <section className="w-full flex flex-col lg:flex-row gap-4">
          <div className="w-full lg:w-1/2">
            <InputForm
              type="date"
              id="fecha_creacion"
              name="fecha_creacion"
              label="Fecha de Creación"
              placeholder="Elige la fecha"
              value={formatearFechaParaInputDate(values.fecha_creacion)}
              onBlur={handleBlur}
              onChange={handleChange}
            />
          </div>
          <div className="w-full lg:w-1/2">
            <InputForm
              type="date"
              id="fecha_vencimiento"
              name="fecha_vencimiento"
              label="Fecha de vencimiento"
              placeholder="Elige la fecha"
              value={formatearFechaParaInputDate(values.fecha_vencimiento)}
              onBlur={handleBlur}
              onChange={handleChange}
            />
          </div>
        </section>
        <section>
          <div className="w-full">
            <label htmlFor="comprobante">Comprobante de Compra: (Opcional)</label>
            <input
              type="file"
              id="comprobante"
              accept="application/pdf"
              name="comprobante"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const file = event.currentTarget.files?.[0] || null;
                setFieldValue("comprobante", file);
              }}
              className="mt-1 block w-full px-4 py-2 border-2 rounded-main shadow-sm focus:outline-none focus:border-secundario-300 "
            />
          </div>
        </section>
      </div>
      <button
        type="submit"
        className="w-fit flex justify-center rounded-main mt-5 bg-secundario-main text-white-main py-2 px-8 mx-auto transition-all duration-200 ease-out hover:bg-secundario-500"
      >
        Agregar Compra
      </button>
    </form>
  )
}