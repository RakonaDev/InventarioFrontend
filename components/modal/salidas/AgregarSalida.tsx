import { useFormik } from "formik"
import { useSalida } from "../../../hooks/useSalida"
import { InputForm } from "../../form/InputForm"
import { Errors } from "../../form/Errors"

export const AgregarSalida = () => {
  const { PostSalida } = useSalida()
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
    onSubmit: (values) => {
      PostSalida({
        id_producto: values.id_producto,
        cantidad: values.cantidad
      })
    }
  })
  return (
    <form className="space-y-6 p-4" onSubmit={handleSubmit}>
      <h1 className="text-2xl font-semibold text-center mb-6">Agregar Salida</h1>
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