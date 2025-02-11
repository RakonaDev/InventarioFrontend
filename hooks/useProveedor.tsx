'use client'
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiAuth, apiURL } from "../helper/global";
import { useAdmin } from "../context/AdminContext";
import { ProveedorInterface } from "@/interfaces/ProveedorInterface";
import { toast } from "sonner";
import { useInsumos } from "./useInsumos";

const fetchProveedor = async () => {
  try {
    /*
    const response = await fetch(`${apiURL}/proveedores`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    */
    const response = await apiAuth.get('/proveedores')

    if (response.status === 401) {
      window.location.href = '/login'
    }
    // const data = await response.json();
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const postProveedores = async (newProveedor: ProveedorInterface) => {
  try {
    /*
    const response = await fetch(`${apiURL}/proveedores`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(newProveedor),
    });
    */
    const response = await apiAuth.post('/proveedores', newProveedor)
    // const data = await response.json();
    if (response.status === 401) {
      window.location.href = '/login'
    }
    return response.data.proveedores;
  } catch (error) {
    console.log(error);
  }
};

const patchProveedor = async (updatedProveedor: ProveedorInterface) => {
  try {
    /*
    const response = await fetch(`${apiURL}/proveedores/${updatedProveedor.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: 'include',
      body: JSON.stringify(updatedProveedor)
    })
      */
    const response = await apiAuth.put(`/proveedores/${updatedProveedor.id}`, updatedProveedor)
    if (response.status === 401) {
      window.location.href = '/login'
    }
    // const data = await response.json()

    return response.data.proveedores
  } catch (error) {
    console.log(error)
  }
}

const deleteProveedor = async (id: number) => {
  try {
    /*
    const response = await fetch(`${apiURL}/proveedores/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: 'include',
      body: JSON.stringify({
        id
      })
    })
    */
    const response = await apiAuth.delete(`/proveedores/${id}`)
    if (response.status === 401) {
      window.location.href = '/login'
    }
    // const data = await response.json()
    return response.data.proveedores
  }
  catch (error) {
    console.log(error)
  }
}

export function useProveedor () {
  const { closeModal } = useAdmin();
  const { ActualizarInformacionInsumos } = useInsumos()
  const query = useQueryClient()
  const { data: proveedores, isError: ErrorProveedor, isLoading: CargandoProveedor } = useQuery<ProveedorInterface[]>({
    queryKey: ['proveedores'],
    queryFn: fetchProveedor,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  })

  const { mutate: PostProveedor, isPending: LoadingPost } = useMutation({
    mutationFn: postProveedores,
    onSuccess: async (newProveedor: ProveedorInterface) => {
      closeModal();
      await query.setQueryData(['proveedores'], (oldProveedor?: ProveedorInterface[]) => {
        if (oldProveedor == null) return [newProveedor];
        return [...oldProveedor, newProveedor];
      });
    },
  });

  const { mutate: EditarProveedor, isPending: LoadingEdit} = useMutation({
    mutationFn: patchProveedor,
    onSuccess: async (updatedProveedor: ProveedorInterface) => {
      closeModal()
      await query.setQueryData(['proveedores'], (oldProveedor: ProveedorInterface[]) => {
        return oldProveedor.map((proveedor: ProveedorInterface) =>
          proveedor.id === updatedProveedor.id ? updatedProveedor : proveedor
        );
      })
      ActualizarInformacionInsumos()
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })

  const { mutate: DeleteProveedor, isPending: LoadingDelete } = useMutation({
    mutationFn: deleteProveedor,
    onSuccess: async (proveedorDeleted: ProveedorInterface) => {
      closeModal()
      await query.setQueryData(['proveedores'], (oldProveedor: ProveedorInterface[]) => {
        return oldProveedor.filter((proveedor: ProveedorInterface) => proveedor.id !== proveedorDeleted.id)
      })
    }
  })

  return {
    proveedores,
    ErrorProveedor,
    CargandoProveedor,
    PostProveedor,
    LoadingPost,
    EditarProveedor,
    LoadingEdit,
    DeleteProveedor,
    LoadingDelete
  }
} 