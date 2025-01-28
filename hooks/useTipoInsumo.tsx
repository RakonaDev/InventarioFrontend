'use client'
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiURL } from "../helper/global";
import { useAdmin } from "../context/AdminContext";
import { TipoInsumoInterface } from "@/interfaces/TipoInsumoInterface";
import { toast } from "sonner";

const fetchTipoInsumo = async () => {
  try {
    const response = await fetch(`${apiURL}/getInsumos`, {
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

const postTipoInsumo = async (newTipoInsumo: TipoInsumoInterface) => {
  try {
    const response = await fetch(`${apiURL}/tipo_insumo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(newTipoInsumo),
    });
    const data = await response.json();
    if (response.status === 401) {
      window.location.href = '/login'
    }
    return data.tipo_insumo;
  } catch (error) {
    console.log(error);
  }
};

const patchTipoInsumo = async (updatedTipoInsumo: TipoInsumoInterface) => {
  try {
    const response = await fetch(`${apiURL}/tipo_insumo`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: 'include',
      body: JSON.stringify(updatedTipoInsumo)
    })
    if (response.status === 401) {
      window.location.href = '/login'
    }
    const data = await response.json()
    return data.tipo_insumo
  } catch (error) {
    console.log(error)
  }
}

const deleteTipoInsumo = async (id: number) => {
  try {
    const response = await fetch(`${apiURL}/tipo_insumo`, {
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
    return data.tipo_insumo
  }
  catch (error) {
    console.log(error)
  }
}

export function useTipoInsumo () {
  const { closeModal } = useAdmin();
  const query = useQueryClient()
  const { data: tipo_insumo } = useQuery<TipoInsumoInterface[]>({
    queryKey: ['tipo_insumo'],
    queryFn: fetchTipoInsumo
  })

  const { mutate: PostTipoInsumo } = useMutation({
    mutationFn: postTipoInsumo,
    onSuccess: async (newTipoInsumo: TipoInsumoInterface) => {
      closeModal();
      await query.setQueryData(['roles'], (oldTipoInsumo?: TipoInsumoInterface[]) => {
        if (oldTipoInsumo == null) return [newTipoInsumo];
        return [...oldTipoInsumo, newTipoInsumo];
      });
    },
  });

  const { mutate: EditarTipoInsumo} = useMutation({
    mutationFn: patchTipoInsumo,
    onSuccess: async (updatedTipoInsumo: TipoInsumoInterface) => {
      closeModal()
      await query.setQueryData(['roles'], (oldTipoInsumo: TipoInsumoInterface[]) => {
        return oldTipoInsumo.map((tipo_insumo: TipoInsumoInterface) =>
          tipo_insumo.id === updatedTipoInsumo.id ? updatedTipoInsumo : tipo_insumo
        );
      })
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })

  const { mutate: DeleteTipoInsumo } = useMutation({
    mutationFn: deleteTipoInsumo,
    onSuccess: async (tipoInsumoDeleted: TipoInsumoInterface) => {
      closeModal()
      await query.setQueryData(['roles'], (oldTipoInsumo: TipoInsumoInterface[]) => {
        return oldTipoInsumo.filter((tipo_insumo: TipoInsumoInterface) => tipo_insumo.id !== tipoInsumoDeleted.id)
      })
    }
  })

  return {
    tipo_insumo,
    PostTipoInsumo,
    EditarTipoInsumo,
    DeleteTipoInsumo
  }
} 