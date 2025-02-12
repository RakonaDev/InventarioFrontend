import * as Yup from 'yup';

export const PostCategorySchema = Yup.object().shape({
  nombre: Yup.string()
    .required("El nombre de la categoría es obligatorio")
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(255, "El nombre no puede tener más de 255 caracteres"),
  descripcion: Yup.string()
    .max(500, "La descripción no puede tener más de 500 caracteres")
    .required("La descripcion es obligatoria"), // Permite valores nulos para la descripción (opcional)
});

export const EditCategorySchema = Yup.object().shape({
  nombre: Yup.string()
    .required("El nombre de la categoría es obligatorio")
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(255, "El nombre no puede tener más de 255 caracteres"),
  descripcion: Yup.string()
    .max(500, "La descripción no puede tener más de 500 caracteres")
    .required("La descripcion es obligatoria"), // Permite valores nulos para la descripción (opcional)
});