import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiURL } from "../helper/global";
import { RolInterface } from "@/interfaces/RolInterface";
import { useAdmin } from "../context/AdminContext";
import { toast } from "sonner";
import { useUsers } from "./useUsers";
// import { ListUserInterface } from "@/interfaces/ListUserInterface";

const fetchRoles = async () => {
  try {
    const response = await fetch(`${apiURL}/getRoles`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (response.status === 401) {
      window.location.href = '/login'
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const postRol = async (newRol: RolInterface) => {
  try {
    const response = await fetch(`${apiURL}/roles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(newRol),
    });
    const data = await response.json();
    if (response.status === 401) {
      window.location.href = '/login'
    }
    return data.roles;
  } catch (error) {
    console.log(error);
  }
};

const patchRol = async (updatedRol: RolInterface) => {
  try {
    const response = await fetch(`${apiURL}/roles`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: 'include',
      body: JSON.stringify(updatedRol)
    })
    if (response.status === 401) {
      window.location.href = '/login'
    }
    const data = await response.json()
    return data.roles
  } catch (error) {
    console.log(error)
  }
}

const deleteRol = async (id: number) => {
  try {
    const response = await fetch(`${apiURL}/roles`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: 'include',
      body: JSON.stringify({
        id
      })
    })
    if (response.status === 401) {
      window.location.href = '/login'
    }
    const data = await response.json()
    return data.roles
  }
  catch (error) {
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

  const { mutate: PostRol } = useMutation({
    mutationFn: postRol,
    onSuccess: async (newRol: RolInterface) => {
      closeModal();
      await query.setQueryData(['roles'], (oldRoles?: RolInterface[]) => {
        if (oldRoles == null) return [newRol];
        return [...oldRoles, newRol];
      });
    },
  });

  const { mutate: EditarRol } = useMutation({
    mutationFn: patchRol,
    onSuccess: async (updatedRol: RolInterface) => {
      closeModal()
      await query.setQueryData(['roles'], (oldRoles: RolInterface[]) => {
        return oldRoles.map((rol: RolInterface) =>
          rol.id === updatedRol.id ? updatedRol : rol
        );
      })
      ActualizarInfoUsuarios()
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })

  const { mutate: DeleteRol } = useMutation({
    mutationFn: deleteRol,
    onSuccess: async (rolDeleted: RolInterface) => {
      
      closeModal()
      await query.setQueryData(['roles'], (oldRoles: RolInterface[]) => {
        return oldRoles.filter((rol: RolInterface) => rol.id !== rolDeleted.id)
      })
      ActualizarInfoUsuarios()
      /*
      await query.setQueryData(['users'], (oldCompra?: ListUserInterface[]) => {
        if (oldCompra == null) return [];
        return oldCompra.filter((compra: ListUserInterface) => compra.id !== compras.id);
      });
      */
    }
  })

  return {
    roles,
    ErrorRol,
    CargandoRol,
    PostRol,
    EditarRol,
    DeleteRol
  };
}
