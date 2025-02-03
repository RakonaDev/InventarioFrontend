import { useFormik } from "formik"
import { InputForm } from "../../form/InputForm"
import { Errors } from "../../form/Errors"
import { useCompra } from "../../../hooks/useCompra"

export const AgregarCompra = () => {
  const { PostCompras } = useCompra()
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
      id_producto: 0,
      cantidad: 0,
      fecha_creacion: '',
      fecha_vencimiento: '',
      comprobante: null
    },
    onSubmit: (values) => {
      const newCompra = new FormData();
      newCompra.append("id_producto", Number(values.id_producto).toString());
      newCompra.append("cantidad", values.cantidad.toString());
      if (values.fecha_creacion) {
        newCompra.append("fecha_creacion", String(values.fecha_creacion));
      }
      if (values.fecha_vencimiento) {
        newCompra.append("fecha_vencimiento", String(values.fecha_vencimiento));
      }
      if (values.comprobante) {
        newCompra.append('comprobante', values.comprobante as File); // Solo agregamos si imagen no es null
      }
      PostCompras(newCompra)
    }
  })
  return (
    <form className="space-y-6 p-4" onSubmit={handleSubmit}>
      <h1 className="text-2xl font-semibold text-center mb-6">Agregar Compra</h1>
      <div className="w-full space-y-3">
        <section className="w-full flex flex-col lg:flex-row gap-4 ">
          <div className="w-full lg:w-1/2">
            <InputForm
              id="id_producto"
              label="Codigo del Producto"
              name="id_producto"
              placeholder="Escribe el codigo del producto"
              type="number"
              value={values.id_producto}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            <Errors errors={errors.id_producto} touched={touched.id_producto} />
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
              value={values.fecha_creacion}
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
              value={values.fecha_vencimiento}
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