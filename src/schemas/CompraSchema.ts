import * as Yup from 'yup';

export const PostCompraSchema = Yup.object().shape({
  id_producto: Yup.string()
    .required("El código del producto es obligatorio")
    .min(2, "El código del producto debe tener al menos 2 caracteres")
    .max(50, "El código del producto no puede tener más de 50 caracteres"),
  cantidad: Yup.number()
    .required("La cantidad es obligatoria")
    .positive("La cantidad debe ser un número positivo")
    .integer("La cantidad debe ser un número entero"),
  fecha_creacion: Yup.date()
    .required("La fecha de creación es obligatoria")
    .transform(currentValue => {
      if (currentValue instanceof Date) return currentValue;
      return null;
    })
    .nullable()
    .typeError("Formato de fecha incorrecto. Use dd/mm/aaaa"),
  fecha_vencimiento: Yup.date()
    .required("La fecha de vencimiento es obligatoria")
    .transform(currentValue => {
      if (currentValue instanceof Date) return currentValue;
      return null;
    })
    .nullable()
    .typeError("Formato de fecha incorrecto. Use dd/mm/aaaa")
    .when("fecha_creacion", (fecha_creacion, schema) => {
      if (fecha_creacion) {
        return schema.min(fecha_creacion, "La fecha de vencimiento debe ser posterior a la fecha de creación");
      }
      return schema;
    }),
  comprobante: Yup.mixed()
    .nullable() // Comprobante es opcional, no requerimos validación aquí
});