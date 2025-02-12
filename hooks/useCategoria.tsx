'use client'
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiAuth } from "../helper/global";
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
    // const response = await apiAuth.put(`/categorias/${updatedCategorias.id}`, updatedCategorias)
    const response = await apiAuth.post(`/categorias/${updatedCategorias.id}`, updatedCategorias)
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
   // const response = await apiAuth.delete(`/categorias/${id}`)
   const response = await apiAuth.post(`/deleteCategorias/${id}`)
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
      
      await query.setQueryData(['categorias'], (oldCategoria?: CategoriaInterface[]) => {
        if (oldCategoria == null) return [newCategoria];
        toast.success('Agregado Correctamente!')
        return [...oldCategoria, newCategoria];
      });
      toast.success('Categoria Creada Correctamente!')
      closeModal();
    },
    onError: async () => {
      toast.error('Faltan Datos!')
    }
  });

  const { mutate: EditarCategoria, isPending: LoadingEdit } = useMutation({
    mutationFn: patchCategorias,
    onSuccess: async (updatedCategoria: CategoriaInterface) => {
      if (!updatedCategoria) return
      await query.setQueryData(['categorias'], (oldCategorias: CategoriaInterface[]) => {
        return oldCategorias.map((categoria: CategoriaInterface) =>
          categoria.id === updatedCategoria.id ? updatedCategoria : categoria
        );
      })
      toast.success('Actualizado Correctamente!')
      closeModal()
    }
  })

  const { mutateAsync: DeleteCategoria, isPending: LoadingDelete } = useMutation({
    mutationFn: deleteCategorias,
    onSuccess: async (categoriaDeleted: CategoriaInterface) => {
      await query.setQueryData(['categorias'], (oldCategoria: CategoriaInterface[]) => {
        toast.success('Eliminado Correctamente')
        return oldCategoria.filter((categoria: CategoriaInterface) => categoria.id !== categoriaDeleted.id)
      })
      toast.success('Eliminado Correctamente')
      closeModal()
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
