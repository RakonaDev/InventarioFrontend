import * as Yup from 'yup'

export const SchemaLogin = Yup.object().shape({
  email: Yup.string()
    .email('Email invalido')
    .required('Este campo es requerido'),
  password: Yup.string().required('Este campo es requerido').min(1)
})

export const EditUserSchema = Yup.object().shape({
  nombres: Yup.string()
    .required('El nombre es obligatorio')
    .max(255, 'El nombre no puede exceder 255 caracteres'),
  apellidos: Yup.string()
    .required('Los apellidos son obligatorios')
    .max(255, 'Los apellidos no pueden exceder 255 caracteres'),
  celular: Yup.string()
    .matches(/^\d{10}$/, 'El celular debe tener exactamente 10 dígitos')
    .required('El celular es obligatorio'),
  email: Yup.string()
    .email('El correo electrónico no es válido')
    .required('El correo electrónico es obligatorio'),
  id_estado: Yup.number()
    .required('El estado es obligatorio')
    .integer('El estado debe ser un número entero')
    .min(1, 'El estado debe ser mayor o igual a 1'),
  id_roles: Yup.number()
    .required('El rol es obligatorio')
    .integer('El rol debe ser un número entero')
    .min(1, 'El rol debe ser mayor o igual a 1'),
  contrasena: Yup.string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .max(15, 'La contraseña no puede exceder 15 caracteres'),
  edad: Yup.number()
    .required('La edad es obligatoria')
    .integer('La edad debe ser un número entero')
    .min(0, 'La edad no puede ser negativa'),
  dni: Yup.string()
    .required('El DNI es obligatorio')
    .max(255, 'El DNI no puede exceder 255 caracteres'),
});
