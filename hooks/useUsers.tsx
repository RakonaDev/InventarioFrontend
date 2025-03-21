/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { ListUserInterface, UserResponse, UsersResponse } from "@/interfaces/ListUserInterface";
import { apiAuth } from "../fonts/helper/global";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAdmin } from "../context/AdminContext";
import { toast } from "sonner";
import { useUserStore } from "../store/UserStore";
import { JSX } from "react";
import { EditarUsuario } from "../components/modal/usuarios/EditarUsuario";
import EliminarUsuario from "../components/modal/usuarios/EliminarUsuario";
import { VerUsuario } from "../components/modal/usuarios/VerUsuario";
import { EditAndDeleteButtons } from "../components/buttons/EditAndDeleteButtons";
import { AxiosError } from "axios";

// FETCH USERS
const fetchUsers = async (page: number): Promise<UsersResponse> => {
  try {

    const response = await apiAuth.post(`/user/10/${page}`)
    if (response.status === 401) {
      window.location.href = '/login'
    }

    return response.data;
  }
  catch (error) {
    if (error instanceof AxiosError) {
      if (error.status === 401) {
        window.location.href = '/login'
      }
    }
    console.log(error)
    throw new Error('Error al obtener usuarios')
  }
};

const postUser = async (newUser: ListUserInterface): Promise<UserResponse> => {
  try {

    const response = await apiAuth.post('register', newUser)
    if (response.status === 401) {
      console.log(response.status)
      window.location.href = '/login'
    }
    if (response.status !== 200 && response.status !== 401) {
      throw new Error('error')
    }
    return response.data
  }
  catch (error) {
    if (error instanceof AxiosError) {
      if (error.status === 401) {
        window.location.href = '/login'
      }
    }
    toast.error('Hubo un error agregando el nuevo usuario!')
    console.log(error)
    if (error instanceof AxiosError) {
      if (error.status === 401) {
        window.location.href = '/login'
      }
    }
    throw new Error('Error al crear el usuario')
  }
}

const patchUser = async (updatedUser: ListUserInterface): Promise<UserResponse> => {
  try {

    // const response = await apiAuth.patch('/user', updatedUser)
    const response = await apiAuth.post('/user', updatedUser)
    if (response.status === 401) {
      window.location.href = '/login'
    }
    if (response.status !== 200) {
      throw new Error('error')
    }

    return response.data
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.status === 401) {
        window.location.href = '/login'
      }
    }
    console.log(error)
    toast.error('Hubo un error actualizando el usuario')
    throw new Error('Error al actualizar el usuario')
  }
}

const deleteUser = async (id: number): Promise<UserResponse> => {
  try {
    // const response = await apiAuth.delete(`/user/${id}`)
    const response = await apiAuth.post(`/deleteUser/${id}`)
    if (response.status === 401) {
      window.location.href = '/login'
    }

    if (response.status !== 200) {
      throw new Error('error')
    }
    return response.data
  }
  catch (error) {
    if (error instanceof AxiosError) {
      if (error.status === 401) {
        window.location.href = '/login'
      }
    }
    console.log(error)
    toast.error('Hubo un error eliminando el usuario')
    throw new Error('Error al eliminar el usuario')
  }
}

// HOOK USERS
export const useUsers = () => {
  const query = useQueryClient()
  const { currentPage, setUsersPaginate } = useUserStore()
  const { closeModal, setModalContent, openModal } = useAdmin()

  const { data: usersData, refetch: ActualizarInfoUsuarios } = useQuery<UsersResponse>({
    queryKey: ['users', currentPage],
    queryFn: () => fetchUsers(currentPage),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false
  })

  const { mutate, isPending: LoadingPost } = useMutation<UserResponse, any, ListUserInterface>({
    mutationFn: postUser,
    onSuccess: async (newUser) => {
      if (!newUser) return
      setModalContent(null)
      // Actualiza la lista de usuarios agregando el nuevo usuario
      query.setQueryData<UsersResponse>(['users', currentPage], (oldUsers) => {
        if (oldUsers == null) return {
          insumos: [newUser.user],
          currentPage: currentPage,
          totalPages: 1
        }
        const updatedUsers = { ...oldUsers, currentPage: currentPage }

        if (currentPage === updatedUsers.totalPages) {
          if (updatedUsers.insumos.length >= 10) {
            updatedUsers.totalPages++
            if (currentPage + 1 === updatedUsers.totalPages) {
              setUsersPaginate(currentPage + 1)
            }
          }

          updatedUsers.insumos.push(newUser.user)
        }

        toast.success('Usuario Creado Correctamente!')
      })
      toast.success('Usuario Creado Correctamente!')
      closeModal()
    }
  })

  const { mutate: EditarUser, isPending: LoadingEdit } = useMutation<UserResponse, any, ListUserInterface>({
    mutationFn: patchUser,
    onSuccess: async (updatedUser) => {
      if (!updatedUser) return
      setModalContent(null)
      // Actualiza la lista de usuarios actualizando el usuario editado
      query.setQueryData<UsersResponse>(['users', currentPage], (oldUsers) => {
        if (!oldUsers) return { insumos: [updatedUser.user], currentPage: 1, totalPages: 1 }
        const updatedUsers: UsersResponse = {
          ...oldUsers,
          insumos: oldUsers.insumos.map((user: ListUserInterface) =>
            user.id === updatedUser.user.id ? updatedUser.user : user
          ),
        };
        return updatedUsers
      })
      toast.success('Usuario Actualizado Correctamente!')
      closeModal()
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })

  const { mutate: DeleteUser, isPending: LoadingDelete } = useMutation<UserResponse, any, number>({
    mutationFn: deleteUser,
    onSuccess: async (userDeleted) => {
      if (!userDeleted) return
      setModalContent(null)
      // Actualiza la lista de usuarios quitando el usuario eliminado
      query.setQueryData<UsersResponse>(['users', currentPage], (oldUsers) => {
        if (!oldUsers) return { insumos: [], currentPage: 1, totalPages: 1 };

        const updatedUsers = { ...oldUsers };
        if (currentPage === updatedUsers.totalPages) {
          updatedUsers.insumos = updatedUsers.insumos.filter((user) => user.id !== userDeleted.user.id);

          if (updatedUsers.totalPages > 1) {

            console.log("Aqui pagina")
            /*updatedUsers.totalPages--;*/
            updatedUsers.totalPages = totalPages - 1;
            setUsersPaginate(totalPages - 1);
          }
        } else {
          updatedUsers.insumos = updatedUsers.insumos.filter((user) => user.id !== userDeleted.user.id);
        }
        ActualizarInfoUsuarios()
        return updatedUsers;
      })
      toast.success('Usuario Eliminado Correctamente!')
      closeModal()
    }
  })

  function RenderListUsers(): JSX.Element {
    const handleEditarUsuario = (usuario: ListUserInterface) => {
      setModalContent(<EditarUsuario usuario={usuario} />);
      openModal();
    };
    const handleEliminarUsuario = (id: number) => {
      setModalContent(<EliminarUsuario id={id} />);
      openModal()
    }
    const handleViewUsuario = (usuario: ListUserInterface) => {
      setModalContent(<VerUsuario usuario={usuario} />)
      openModal()
    }


    return (
      <div className="w-full space-y-6">
        {usersData?.insumos?.map((usuario: ListUserInterface) => (
          <div
            className="w-full flex gap-5 xl:grid xl:grid-cols-12 text-black-700"
            key={usuario.id}
          >
            <div className="w-full lg:col-span-2 flex items-center justify-center">
              <p className="line-clamp-1 text-ellipsis text-center text-sm">{`${usuario.names} ${usuario.last_names
                }`}</p>
            </div>
            <div className="w-full lg:col-span-2 flex items-center text-sm justify-center ">
              <p className="line-clamp-1 text-ellipsis text-center">{usuario.tel}</p>
            </div>
            <div className="w-full lg:col-span-2 flex items-center text-sm justify-center ">
              <p className="line-clamp-1 text-ellipsis text-center">{usuario.email}</p>
            </div>
            <div className="w-full lg:col-span-2 flex items-center text-sm justify-center ">
              {usuario.estado?.nombre === "Activo" ? (
                <p className="block rounded-full w-[102px] bg-green-100 px-5 py-1  font-medium text-center text-green-500">
                  Activo
                </p>
              ) : (
                <p className="block rounded-full w-[102px] bg-red-100 px-5 py-1  font-medium text-center text-red-500">
                  Inactivo
                </p>
              )}
            </div>
            <div className="w-full lg:col-span-2 flex items-center text-sm justify-center ">
              <p className="line-clamp-1 text-ellipsis text-center">{usuario.roles?.name}</p>
            </div>
            <EditAndDeleteButtons
              onView={() => handleViewUsuario(usuario)}
              onEdit={() => handleEditarUsuario(usuario)}
              onDelete={() => handleEliminarUsuario(usuario.id || 0)}
            />
          </div>
        ))}
      </div>
    )
  }

  function nextPage(e: React.ChangeEvent<unknown>, value: number) {
    setUsersPaginate(value)
  }

  const totalPages = usersData?.totalPages || 1

  return {
    usersData,
    mutate,
    LoadingPost,
    EditarUser,
    LoadingEdit,
    DeleteUser,
    LoadingDelete,
    nextPage,
    totalPages,
    ActualizarInfoUsuarios,
    RenderListUsers
  }
}
