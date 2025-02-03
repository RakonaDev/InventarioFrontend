'use client'
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiAuth, apiURL } from "../helper/global";
import { useAdmin } from "../context/AdminContext";
import { CategoriaInterface } from "@/interfaces/CategoriaInterface";
import { toast } from "sonner";

const fetchCategorias = async () => {
  try {
    /*
    const response = await fetch(`${apiURL}/categorias`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    */
    const response = await apiAuth.get('/categorias')
    
    if (response.status === 401) {
      window.location.href = '/login'
    }
    
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const postCategorias = async (newCategoria: CategoriaInterface) => {
  try {
    /*
    const response = await fetch(`${apiURL}/categorias`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(newCategoria),
    });
    const data = await response.json();
    */
    const response = await apiAuth.post('/categorias', newCategoria)
    if (response.status === 401) {
      window.location.href = '/login'
    }
    return response.data.categorias;
  } catch (error) {
    console.log(error);
  }
};

const patchCategorias = async (updatedCategorias: CategoriaInterface) => {
  try {
    /*
    const response = await fetch(`${apiURL}/categorias/${updatedCategorias.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: 'include',
      body: JSON.stringify(updatedCategorias)
    })
    */
    const response = await apiAuth.put(`/categorias/${updatedCategorias.id}`)
    if (response.status === 401) {
      window.location.href = '/login'
    }
    // const data = await response.json()
    return response.data.categorias
  } catch (error) {
    console.log(error)
  }
}

const deleteCategorias = async (id: number) => {
  try {
    /*
    const response = await fetch(`${apiURL}/categorias/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: 'include',
    })
    */
   const response = await apiAuth.delete(`/categorias/${id}`)
    if (response.status === 401) {
      window.location.href = '/login'
    }
    // const data = await response.json()
    return response.data.categorias
  }
  catch (error) {
    console.log(error)
  }
}

export function useCategoria () {
  const { closeModal } = useAdmin();
  const query = useQueryClient()
  const { data: categorias, isError: ErrorCategoria, isLoading: CargandoCategorias } = useQuery<CategoriaInterface[]>({
    queryKey: ['categorias'],
    queryFn: fetchCategorias,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  })

  const { mutate: PostCategoria } = useMutation({
    mutationFn: postCategorias,
    onSuccess: async (newCategoria: CategoriaInterface) => {
      closeModal();
      await query.setQueryData(['categorias'], (oldCategoria?: CategoriaInterface[]) => {
        if (oldCategoria == null) return [newCategoria];
        return [...oldCategoria, newCategoria];
      });
    },
  });

  const { mutate: EditarCategoria} = useMutation({
    mutationFn: patchCategorias,
    onSuccess: async (updatedCategoria: CategoriaInterface) => {
      closeModal()
      await query.setQueryData(['categorias'], (oldCategorias: CategoriaInterface[]) => {
        return oldCategorias.map((categoria: CategoriaInterface) =>
          categoria.id === updatedCategoria.id ? updatedCategoria : categoria
        );
      })
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })

  const { mutate: DeleteCategoria } = useMutation({
    mutationFn: deleteCategorias,
    onSuccess: async (categoriaDeleted: CategoriaInterface) => {
      closeModal()
      await query.setQueryData(['categorias'], (oldCategoria: CategoriaInterface[]) => {
        return oldCategoria.filter((categoria: CategoriaInterface) => categoria.id !== categoriaDeleted.id)
      })
    }
  })

  return {
    categorias,
    ErrorCategoria,
    CargandoCategorias,
    PostCategoria,
    EditarCategoria,
    DeleteCategoria
  }
} 