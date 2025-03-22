/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiAuth } from "../fonts/helper/global";
import { RolCrearInterface, RolesResponse, RolInterface, RolResponse } from "@/interfaces/RolInterface";
import { useAdmin } from "../context/AdminContext";
import { toast } from "sonner";
import { useUsers } from "./useUsers";
import { AxiosError } from "axios";
import { useRolesStore } from "../store/RolesStore";
import EliminarRol from "../components/modal/roles/EliminarRol";
import { VerRol } from "../components/modal/roles/VerRol";
import { parseToLocalTime } from "../logic/parseToLocalTime";
import { EditAndDeleteButtons } from "../components/buttons/EditAndDeleteButtons";
import EditarRol from "../components/modal/roles/EditarRol";
// import { ListUserInterface } from "@/interfaces/ListUserInterface";

const fetchRoles = async (page: number): Promise<RolesResponse> => {
  try {
    const response = await apiAuth.get(`/roles/10/${page}`)
    if (response.status === 401) {
      window.location.href = '/login'
    }
    // const data = await response.json();
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.status === 401) {
        window.location.href = '/login'
      }
    }
    console.log(error);
    throw new Error('Error al obtener los roles');
  }
};

const postRol = async (newRol: RolInterface): Promise<RolResponse> => {
  try {

    const response = await apiAuth.post('/roles', newRol, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (response.status === 401) {
      window.location.href = '/login'
    }
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.status === 401) {
        window.location.href = '/login'
      }
    }
    toast.error('Hubo un error creando el rol')
    console.log(error);
    throw new Error('Error al crear el rol');
  }
};

const patchRol = async (updatedRol: RolInterface): Promise<RolResponse> => {
  try {
    // const response = await apiAuth.patch('/roles', updatedRol)
    const response = await apiAuth.post('/roles', updatedRol)
    if (response.status === 401) {
      window.location.href = '/login'
    }
    return response.data
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.status === 401) {
        window.location.href = '/login'
      }
    }
    toast.error('Hubo un error actualizando el rol')
    console.log(error)
    throw new Error('Error al actualizar el rol');
  }
}

const deleteRol = async (id: number): Promise<RolResponse> => {
  try {

    //const response = await apiAuth.delete(`/roles/${id}`)
    const response = await apiAuth.post(`/deleteRoles/${id}`)
    if (response.status === 401) {
      window.location.href = '/login'
    }

    return response.data
  }
  catch (error) {
    if (error instanceof AxiosError) {
      if (error.status === 401) {
        window.location.href = '/login'
      }
    }
    toast.error('Hubo un error eliminando el rol')
    console.log(error)
    throw new Error('Error al eliminar el rol');
  }
}

export function useRol() {
  const query = useQueryClient();
  const { closeModal } = useAdmin();
  const { currentPage, setRolesPaginate } = useRolesStore()
  const { ActualizarInfoUsuarios } = useUsers();

  const { data: rolesData, isError: ErrorRol, isLoading: CargandoRol } = useQuery<RolesResponse>({
    queryKey: ['roles', currentPage],
    queryFn: () => fetchRoles(currentPage),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const { mutate: PostRol, isPending: LoadingPost } = useMutation<RolResponse, any, RolInterface>({
    mutationFn: postRol,
    onSuccess: async (newRol) => {
      if (!newRol) return
      query.setQueryData<RolesResponse>(['roles', currentPage], (oldRoles) => {
        if (oldRoles == null) return {
          roles: [newRol.roles],
          currentPage: currentPage,
          totalPages: 1
        }
        const newRoles = {
          ...oldRoles
        }

        if (currentPage === oldRoles.totalPages) {
          if (oldRoles.roles.length < 10) {
            newRoles.roles.push(newRol.roles)
            if (currentPage + 1 === newRoles.totalPages) {
              setRolesPaginate(currentPage + 1)
            }
          } else {
            newRoles.roles.push(newRol.roles)
            newRoles.totalPages++
          }
        } else if (currentPage === 1) {
          newRoles.roles.push(newRol.roles)
        }
        console.log(newRoles)
        return newRoles
      });
      toast.success('Rol Creado Correctamente!')
      closeModal();
    },
  });

  const { mutate: EditarRoles, isPending: LoadingEdit } = useMutation<RolResponse, any, RolInterface>({
    mutationFn: patchRol,
    onSuccess: async (updatedRol) => {
      if (!updatedRol) return
      await query.setQueryData<RolesResponse>(['roles', currentPage], (oldRoles) => {
        if (!oldRoles) return {
          roles: [updatedRol.roles],
          currentPage: currentPage,
          totalPages: 1
        }

        const updatedRoles = {
          ...oldRoles,
          roles: oldRoles.roles.map((rol: RolInterface) =>
            rol.id === updatedRol.roles.id ? updatedRol.roles : rol
          ),
        }
        return updatedRoles
      })
      toast.success('Rol Actualizado Correctamente!')
      closeModal()
      ActualizarInfoUsuarios()
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })

  const { mutate: DeleteRol, isPending: LoadingDelete } = useMutation<RolResponse, any, number>({
    mutationFn: deleteRol,
    onSuccess: async (rolDeleted) => {
      if (!rolDeleted) return
      query.invalidateQueries({
        queryKey: ['roles', currentPage]
      })
      closeModal()
      toast.success('Se logró eliminar correctamente')
      ActualizarInfoUsuarios()
    }
  })

  function nextPage(event: React.ChangeEvent<unknown>, value: number) {
    setRolesPaginate(value)
  }

  function RenderListRoles() {
    const { setModalContent, openModal } = useAdmin();
    const handleEditarRol = (rol: RolInterface) => {
      setModalContent(<EditarRol rol={rol} />)
      openModal()
    };
    const handleEliminarRol = (id: number) => {
      setModalContent(<EliminarRol id={id} />)
      openModal()
    };
    const handleVerRol = (rol: RolInterface) => {
      setModalContent(<VerRol rol={rol} />)
      openModal()
    }

    return (
      <div className="w-full space-y-6">
        {rolesData?.roles?.map((rol: RolInterface) => (
          <div className="w-full flex gap-5 xl:grid xl:grid-cols-12 text-black-700" key={rol.id}>
            <div className="w-full min-w-[100px] xl:col-span-2 flex items-center text-sm justify-center ">
              <p>{rol.id}</p>
            </div>
            <div className="w-full min-w-[200px] xl:col-span-2 flex items-center text-sm justify-center ">
              <p>{rol.name}</p>
            </div>
            <div className="w-full min-w-[200px] xl:col-span-2 flex items-center text-sm justify-center ">
              <p>{parseToLocalTime(rol.created_at)}</p>
            </div>
            <div className="w-full min-w-[200px] xl:col-span-3 flex items-center text-sm justify-center ">
              <p>{parseToLocalTime(rol.updated_at)}</p>
            </div>
            <EditAndDeleteButtons
              onView={() => handleVerRol(rol)}
              onEdit={() => handleEditarRol(rol)}
              onDelete={() => handleEliminarRol(rol.id || 0)}
            />
          </div>
        ))}
      </div>
    );
  }

  return {
    rolesData,
    ErrorRol,
    CargandoRol,
    PostRol,
    LoadingPost,
    EditarRoles,
    LoadingEdit,
    DeleteRol,
    LoadingDelete,
    nextPage,
    RenderListRoles
  };
}
