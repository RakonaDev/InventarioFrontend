import * as Yup from 'yup'

export const EditarRolSchema = Yup.object().shape({
  name: Yup.string().required('El campo name es obligatorio'),
});