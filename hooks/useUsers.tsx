'use client'
import { ListUserInterface } from "@/interfaces/ListUserInterface";
import { apiAuth } from "../helper/global";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAdmin } from "../context/AdminContext";
import { toast } from "sonner";

// FETCH USERS
const fetchUsers = async () => {
  try{

   const response = await apiAuth.get('/getUsers')
    if (response.status === 401) {
      window.location.href = '/login'
    }

    return response.data;
  }
  catch (error) {
    console.log(error)
  }
};

const postUser = async (newUser: ListUserInterface) => {
  try {

    const response = await apiAuth.post('register', newUser)
    if (response.status === 401) {
      window.location.href = '/login'
    }
    if (response.status !== 200) {
      throw new Error('error')
    }
    return response.data.user
  }
  catch (error) {
    toast.error('Hubo un error agregando el nuevo usuario!')
    console.log(error)
  }
}

const patchUser = async (updatedUser: ListUserInterface) => {
  try {

    // const response = await apiAuth.patch('/user', updatedUser)
    const response = await apiAuth.post('/user', updatedUser)
    if (response.status === 401) {
      window.location.href = '/login'
    }
    if (response.status !== 200) {
      throw new Error('error')
    }

    return response.data.user
  } catch (error) {
    console.log(error)
    toast.error('Hubo un error actualizando el usuario')
  }
}

const deleteUser = async (id: number) => {
  try {
    // const response = await apiAuth.delete(`/user/${id}`)
    const response = await apiAuth.post(`/deleteUser/${id}`)
    if (response.status === 401) {
      window.location.href = '/login'
    }
  
    if (response.status !== 200) {
      throw new Error('error')
    }
    return response.data.user
  }
  catch (error) {
    console.log(error)
    toast.error('Hubo un error eliminando el usuario')
  }
}

// HOOK USERS
export const useUsers = () => {
  const query = useQueryClient()
  const { closeModal, setModalContent } = useAdmin()

  const { data: users, refetch: ActualizarInfoUsuarios } = useQuery<ListUserInterface[]>({
    queryKey: ['users'],
    queryFn: fetchUsers,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false
  })

  const { mutate, isPending: LoadingPost } = useMutation({
    mutationFn: postUser,
    onSuccess: async (newUser: ListUserInterface) => {
      if (!newUser) return
      setModalContent(null)
      // Actualiza la lista de usuarios agregando el nuevo usuario
      await query.setQueryData(['users'], (oldUsers?: ListUserInterface[]) => {
        if (oldUsers == null) return [newUser]
        toast.success('Usuario Creado Correctamente!')
        return [...oldUsers, newUser]
      })
      toast.success('Usuario Creado Correctamente!')
      closeModal()
    }
  })

  const { mutate: EditarUser, isPending: LoadingEdit } = useMutation({
    mutationFn: patchUser,
    onSuccess: async (updatedUser: ListUserInterface) => {
      if (!updatedUser) return
      setModalContent(null)
      // Actualiza la lista de usuarios actualizando el usuario editado
      await query.setQueryData(['users'], (oldUsers: ListUserInterface[]) => {
        toast.success('Usuario Editado Correctamente!')
        return oldUsers.map((user: ListUserInterface) =>
          user.id === updatedUser.id ? updatedUser : user
        );
      })
      toast.success('Usuario Actualizado Correctamente!')
      closeModal()
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })

  const { mutate: DeleteUser, isPending: LoadingDelete } = useMutation({
    mutationFn: deleteUser,
    onSuccess: async (userDeleted: ListUserInterface) => {
      if (!userDeleted) return
      setModalContent(null)
      // Actualiza la lista de usuarios quitando el usuario eliminado
      await query.setQueryData(['users'], (oldUsers: ListUserInterface[]) => {
        toast.success('Usuario Eliminado Correctamente!')
        return oldUsers.filter((user: ListUserInterface) => user.id !== userDeleted.id)
      })
      toast.success('Usuario Eliminado Correctamente!')
      closeModal()
    }
  })

  return {
    users,
    mutate,
    LoadingPost,
    EditarUser,
    LoadingEdit,
    DeleteUser,
    LoadingDelete,
    ActualizarInfoUsuarios
  }
}
