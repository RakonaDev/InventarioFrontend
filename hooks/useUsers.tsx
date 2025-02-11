'use client'
import { ListUserInterface } from "@/interfaces/ListUserInterface";
import { apiAuth, apiURL } from "../helper/global";
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
    // const data = await response.json()
    return response.data.user
  }
  catch (error) {
    toast.error('Error Agregando el Nuevo Usuario!')
    console.log(error)
  }
}

const patchUser = async (updatedUser: ListUserInterface) => {
  try {

    const response = await apiAuth.patch('/user', updatedUser)
    if (response.status === 401) {
      window.location.href = '/login'
    }
    if (response.status !== 200) {
      throw new Error('error')
    }
    // const data = await response.json()
    return response.data.user
  } catch (error) {
    console.log(error)
    toast.error('Error Actualizando el Usuario')
  }
}

const deleteUser = async (id: number) => {
  try {
    const response = await apiAuth.delete(`/user/${id}`)
    if (response.status === 401) {
      window.location.href = '/login'
    }
    // const data = await response.json()
    if (response.status !== 200) {
      throw new Error('error')
    }
    return response.data.user
  }
  catch (error) {
    console.log(error)
    toast.error('Error Actualizando el Usuario')
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
      closeModal()
      await query.setQueryData(['users'], (oldUsers?: ListUserInterface[]) => {
        if (oldUsers == null) return [newUser]
        toast.success('Usuario Creado Correctamente!')
        return [...oldUsers, newUser]
      })
    }
  })

  const { mutate: EditarUser, isPending: LoadingEdit } = useMutation({
    mutationFn: patchUser,
    onSuccess: async (updatedUser: ListUserInterface) => {
      if (!updatedUser) return
      setModalContent(null)
      closeModal()
      await query.setQueryData(['users'], (oldUsers: ListUserInterface[]) => {
        toast.success('Usuario Editado Correctamente!')
        return oldUsers.map((user: ListUserInterface) =>
          user.id === updatedUser.id ? updatedUser : user
        );
      })
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
      closeModal()
      await query.setQueryData(['users'], (oldUsers: ListUserInterface[]) => {
        toast.success('Usuario Eliminado Correctamente!')
        return oldUsers.filter((user: ListUserInterface) => user.id !== userDeleted.id)
      })
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
