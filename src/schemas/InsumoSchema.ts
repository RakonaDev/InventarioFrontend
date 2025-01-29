/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Yup from "yup";
const FILE_SIZE = 300 * 1024; 
const SUPPORTED_FORMATS = [
  "image/jpg",
  "image/jpeg",
  "image/gif",
  "image/png",
  "image/webp",
];

export const insumoSchema = Yup.object().shape({
  id: Yup.number().integer().positive().optional(), // ID autoincremental, opcional en la validación
  nombre: Yup.string()
    .required("El nombre es obligatorio")
    .max(255, "Máximo 255 caracteres"),
  codigo: Yup.string()
    .required("El código es obligatorio")
    .max(50, "Máximo 50 caracteres"),
  precio: Yup.number()
    .typeError("El precio debe ser un número")
    .positive("El precio debe ser mayor a 0")
    .required("El precio es obligatorio"),
  vida_util: Yup.number()
    .integer()
    .positive()
    .required("La vida útil es obligatoria"),
  id_categoria: Yup.number()
    .integer()
    .positive()
    .required("La categoría es obligatoria"),
  id_tipo_consumo: Yup.number()
    .integer()
    .positive()
    .required("El tipo de insumo es obligatorio"),
  fecha_vencimiento: Yup.date()
    .nullable()
    .required("La fecha de vencimiento es obligatoria"),
  imagen: Yup.array()
    .of(
      Yup.mixed()
        .required("Se requiere una imagen")
        .test(
          "fileSize",
          "El archivo es demasiado grande, peso máximo: 300kb",
          (value: any) => {
            return value && value.size <= FILE_SIZE;
          }
        )
        .test("fileFormat", "Formato no soportado", (value: any) => {
          return value && SUPPORTED_FORMATS.includes(value?.type || "");
        })
    )
    .required("Se requieren imágenes")
    .min(1, "Debes subir al menos una imagen"),
  descripcion: Yup.string()
    .required("La descripción es obligatoria")
    .max(500, "Máximo 500 caracteres"),
});
