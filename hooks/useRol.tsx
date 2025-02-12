import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiAuth } from "../helper/global";
import { RolInterface } from "@/interfaces/RolInterface";
import { useAdmin } from "../context/AdminContext";
import { toast } from "sonner";
import { useUsers } from "./useUsers";
// import { ListUserInterface } from "@/interfaces/ListUserInterface";

const fetchRoles = async () => {
  try {
    const response = await apiAuth.get('/getRoles')
    if (response.status === 401) {
      window.location.href = '/login'
    }
    // const data = await response.json();
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const postRol = async (newRol: RolInterface) => {
  try {

    const response = await apiAuth.post('/roles', newRol)

    if (response.status === 401) {
      window.location.href = '/login'
    }
    return response.data.roles;
  } catch (error) {
    toast.error('Hubo un error creando el rol')
    console.log(error);
  }
};

const patchRol = async (updatedRol: RolInterface) => {
  try {
    // const response = await apiAuth.patch('/roles', updatedRol)
    const response = await apiAuth.post('/roles', updatedRol)
    if (response.status === 401) {
      window.location.href = '/login'
    }
    return response.data.roles
  } catch (error) {
    toast.error('Hubo un error actualizando el rol')
    console.log(error)
  }
}

const deleteRol = async (id: number) => {
  try {

    //const response = await apiAuth.delete(`/roles/${id}`)
    const response = await apiAuth.post(`/deleteRoles/${id}`)
    if (response.status === 401) {
      window.location.href = '/login'
    }
    
    return response.data.roles
  }
  catch (error) {
    toast.error('Hubo un error eliminando el rol')
    console.log(error)
  }
}

export function useRol() {
  const query = useQueryClient();
  const { closeModal } = useAdmin();
  const { ActualizarInfoUsuarios } = useUsers();

  const { data: roles, isError: ErrorRol, isLoading: CargandoRol } = useQuery<RolInterface[]>({
    queryKey: ['roles'],
    queryFn: fetchRoles,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  const { mutate: PostRol, isPending: LoadingPost } = useMutation({
    mutationFn: postRol,
    onSuccess: async (newRol: RolInterface) => {
      if (!newRol) return
      await query.setQueryData(['roles'], (oldRoles?: RolInterface[]) => {
        if (oldRoles == null) return [newRol];
        return [...oldRoles, newRol];
      });
      toast.success('Rol Creado Correctamente!')
      closeModal();
    },
  });

  const { mutate: EditarRol, isPending: LoadingEdit } = useMutation({
    mutationFn: patchRol,
    onSuccess: async (updatedRol: RolInterface) => {
      if (!updatedRol) return
      await query.setQueryData(['roles'], (oldRoles: RolInterface[]) => {
        return oldRoles.map((rol: RolInterface) =>
          rol.id === updatedRol.id ? updatedRol : rol
        );
      })
      toast.success('Rol Actualizado Correctamente!')
      closeModal()
      ActualizarInfoUsuarios()
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })

  const { mutate: DeleteRol, isPending: LoadingDelete } = useMutation({
    mutationFn: deleteRol,
    onSuccess: async (rolDeleted: RolInterface) => {
      if (!rolDeleted) return
      await query.setQueryData(['roles'], (oldRoles: RolInterface[]) => {
        return oldRoles.filter((rol: RolInterface) => rol.id !== rolDeleted.id)
      })
      toast.success('Rol Eliminado Correctamente!')
      closeModal()
      ActualizarInfoUsuarios()
    }
  })

  return {
    roles,
    ErrorRol,
    CargandoRol,
    PostRol,
    LoadingPost,
    EditarRol,
    LoadingEdit,
    DeleteRol,
    LoadingDelete
  };
}
