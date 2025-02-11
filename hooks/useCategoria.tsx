'use client'
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiAuth, apiURL } from "../helper/global";
import { useAdmin } from "../context/AdminContext";
import { CategoriaInterface } from "@/interfaces/CategoriaInterface";
import { toast } from "sonner";

const fetchCategorias = async () => {
  try {
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
    if (response.status !== 201) {
      throw new Error('Error');
    }
    return response.data.categorias;
  } catch (error) {
    toast.error('Faltan Datos!')
    console.log(error);
  }
};

const patchCategorias = async (updatedCategorias: CategoriaInterface) => {
  try {
    const response = await apiAuth.put(`/categorias/${updatedCategorias.id}`, updatedCategorias)
    if (response.status === 401) {
      window.location.href = '/login'
    }
    if (response.status !== 200) {
      throw new Error('error')
    }
    // const data = await response.json()
    return response.data.categorias
  } catch (error) {
    console.log(error)
    toast.error('Error al actualizar la categoria')
  }
}

const deleteCategorias = async (id: number) => {
  try {
   const response = await apiAuth.delete(`/categorias/${id}`)
    if (response.status === 401) {
      window.location.href = '/login'
    }
    if (response.status !== 200) {
      throw new Error('error');

    }
    // const data = await response.json()
    return response.data.categorias
  }
  catch (error) {
    console.log(error)
    toast.error('Error al eliminar la categoria')
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

  const { mutate: PostCategoria, isPending: LoadingPost } = useMutation({
    mutationFn: postCategorias,
    onSuccess: async (newCategoria: CategoriaInterface) => {
      if (!newCategoria) return
      console.log('renderizando esto...')
      closeModal();
      await query.setQueryData(['categorias'], (oldCategoria?: CategoriaInterface[]) => {
        if (oldCategoria == null) return [newCategoria];
        toast.success('Agregado Correctamente!')
        return [...oldCategoria, newCategoria];
      });
    },
    onError: async () => {
      toast.error('Faltan Datos!')
    }
  });

  const { mutate: EditarCategoria, isPending: LoadingEdit } = useMutation({
    mutationFn: patchCategorias,
    onSuccess: async (updatedCategoria: CategoriaInterface) => {
      if (!updatedCategoria) return
      closeModal()
      await query.setQueryData(['categorias'], (oldCategorias: CategoriaInterface[]) => {
        toast.success('Actualizado Correctamente!')
        return oldCategorias.map((categoria: CategoriaInterface) =>
          categoria.id === updatedCategoria.id ? updatedCategoria : categoria
        );
      })
    }
  })

  const { mutate: DeleteCategoria, isPending: LoadingDelete } = useMutation({
    mutationFn: deleteCategorias,
    onSuccess: async (categoriaDeleted: CategoriaInterface) => {
      closeModal()
      await query.setQueryData(['categorias'], (oldCategoria: CategoriaInterface[]) => {
        toast.success('Eliminado Correctamente')
        return oldCategoria.filter((categoria: CategoriaInterface) => categoria.id !== categoriaDeleted.id)
      })
    },
    onError: async () => {
      toast.error('Error al eliminar el producto')
    }
  })

  return {
    categorias,
    ErrorCategoria,
    CargandoCategorias,
    PostCategoria,
    LoadingPost,
    EditarCategoria,
    LoadingEdit,
    DeleteCategoria,
    LoadingDelete
  }
}
