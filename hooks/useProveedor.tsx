'use client'
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiURL } from "../helper/global";
import { useAdmin } from "../context/AdminContext";
import { ProveedorInterface } from "@/interfaces/ProveedorInterface";
import { toast } from "sonner";

const fetchProveedor = async () => {
  try {
    const response = await fetch(`${apiURL}/proveedores`, {
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

const postProveedores = async (newProveedor: ProveedorInterface) => {
  try {
    const response = await fetch(`${apiURL}/proveedores`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(newProveedor),
    });
    const data = await response.json();
    if (response.status === 401) {
      window.location.href = '/login'
    }
    return data.proveedores;
  } catch (error) {
    console.log(error);
  }
};

const patchProveedor = async (updatedProveedor: ProveedorInterface) => {
  try {
    const response = await fetch(`${apiURL}/proveedores/${updatedProveedor.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: 'include',
      body: JSON.stringify(updatedProveedor)
    })
    if (response.status === 401) {
      window.location.href = '/login'
    }
    const data = await response.json()
    return data.proveedores
  } catch (error) {
    console.log(error)
  }
}

const deleteProveedor = async (id: number) => {
  try {
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
    if (response.status === 401) {
      window.location.href = '/login'
    }
    const data = await response.json()
    return data.proveedores
  }
  catch (error) {
    console.log(error)
  }
}

export function useProveedor () {
  const { closeModal } = useAdmin();
  const query = useQueryClient()
  const { data: proveedores } = useQuery<ProveedorInterface[]>({
    queryKey: ['proveedores'],
    queryFn: fetchProveedor
  })

  const { mutate: PostProveedor } = useMutation({
    mutationFn: postProveedores,
    onSuccess: async (newProveedor: ProveedorInterface) => {
      closeModal();
      await query.setQueryData(['proveedores'], (oldProveedor?: ProveedorInterface[]) => {
        if (oldProveedor == null) return [newProveedor];
        return [...oldProveedor, newProveedor];
      });
    },
  });

  const { mutate: EditarProveedor} = useMutation({
    mutationFn: patchProveedor,
    onSuccess: async (updatedProveedor: ProveedorInterface) => {
      closeModal()
      await query.setQueryData(['proveedores'], (oldProveedor: ProveedorInterface[]) => {
        return oldProveedor.map((proveedor: ProveedorInterface) =>
          proveedor.id === updatedProveedor.id ? updatedProveedor : proveedor
        );
      })
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })

  const { mutate: DeleteProveedor } = useMutation({
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
    PostProveedor,
    EditarProveedor,
    DeleteProveedor
  }
} 