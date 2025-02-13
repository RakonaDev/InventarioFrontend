/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiAuth } from "../helper/global";
import { useAdmin } from "../context/AdminContext";
import { CategoriaInterface } from "@/interfaces/CategoriaInterface";
import { toast } from "sonner";
import { useState } from "react";

// Interfaces para tipar las respuestas de la API
interface CategoriasResponse {
  categorias: CategoriaInterface[];
  currentPage: number;
  totalPages: number;
}

interface CategoriaResponse {
  categorias: CategoriaInterface;
}

// Funciones fetch tipadas
const fetchCategorias = async (page: number): Promise<CategoriasResponse> => {
  try {
    const response = await apiAuth.get(`/categorias/10/${page}`); // Incluir el parámetro page
    if (response.status === 401) {
      window.location.href = '/login';
      throw new Error("Unauthorized");
    }
    return response.data;
  } catch (error) {
    console.error(error);
    throw error; // Re-lanzar el error para que lo capture useQuery
  }
};

const postCategorias = async (newCategoria: CategoriaInterface): Promise<CategoriaResponse> => {
  try {
    const response = await apiAuth.post('/categorias', newCategoria);
    if (response.status === 401) {
      window.location.href = '/login';
      throw new Error("Unauthorized");
    }
    if (response.status !== 201) {
      throw new Error('Error');
    }
    return response.data;
  } catch (error) {
    toast.error('Faltan Datos!');
    console.error(error);
    throw error;
  }
};

const patchCategorias = async (updatedCategorias: CategoriaInterface): Promise<CategoriaResponse> => {
  try {
    const response = await apiAuth.post(`/categorias/${updatedCategorias.id}`, updatedCategorias);
    if (response.status === 401) {
      window.location.href = '/login';
      throw new Error("Unauthorized");
    }
    if (response.status !== 200) {
      throw new Error('error');
    }
    return response.data;
  } catch (error) {
    console.error(error);
    toast.error('Error al actualizar la categoria');
    throw error;
  }
};

const deleteCategorias = async (id: number): Promise<CategoriaResponse> => {
  try {
    const response = await apiAuth.post(`/deleteCategorias/${id}`);
    if (response.status === 401) {
      window.location.href = '/login';
      throw new Error("Unauthorized");
    }
    if (response.status !== 200) {
      throw new Error('error');
    }
    return response.data;
  } catch (error) {
    console.error(error);
    toast.error('Error al eliminar la categoria');
    throw error;
  }
};

export function useCategoria() {
  const [pageCategorias, setPageCategorias] = useState(1); // Estado para la página actual
  const { closeModal } = useAdmin();
  const queryClient = useQueryClient();

  // useQuery con paginación
  const { data: categoriasData, isLoading: CargandoCategorias, isError: ErrorCategoria, refetch: ActualizarCategorias } = useQuery<CategoriasResponse>({
    queryKey: ['categorias', pageCategorias], // Incluir pageCategorias en la queryKey
    queryFn: () => fetchCategorias(pageCategorias),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const categorias = categoriasData?.categorias || []; // Acceder a las categorías tipadas
  const totalPages = categoriasData?.totalPages || 1;

  // useMutation para crear una categoría
  const { mutate: PostCategoria, isPending: LoadingPost } = useMutation<CategoriaResponse, any, CategoriaInterface>({
    mutationFn: postCategorias,
    onSuccess: async (newCategoria) => {
      queryClient.setQueryData<CategoriasResponse>(['categorias', pageCategorias], (oldCategorias) => {
        if (!oldCategorias) return { categorias: [newCategoria.categorias], currentPage: 1, totalPages: 1 };

        const updatedCategorias = { ...oldCategorias };
        if (pageCategorias === updatedCategorias.totalPages) {
          if (updatedCategorias.categorias.length > 10) {
            updatedCategorias.totalPages++;
          }
          else {
            updatedCategorias.categorias.push(newCategoria.categorias);
          }
        } else if (pageCategorias === 1) {
          updatedCategorias.categorias.push(newCategoria.categorias);
        }
        return updatedCategorias;
      });
      toast.success('Categoria Creada Correctamente!');
      closeModal();
    },
    onError: (error) => {
      console.error("Error en la mutación PostCategoria:", error);
      toast.error('Error al crear la categoría. Por favor, inténtalo de nuevo.');
    },
  });

  // useMutation para editar una categoría
  const { mutate: EditarCategoria, isPending: LoadingEdit } = useMutation<CategoriaResponse, any, CategoriaInterface>({
    mutationFn: patchCategorias,
    onSuccess: async (updatedCategoria) => {
      queryClient.setQueryData<CategoriasResponse>(['categorias', pageCategorias], (oldCategorias) => {
        if (!oldCategorias) return { categorias: [updatedCategoria.categorias], currentPage: 1, totalPages: 1 };

        const updatedCategorias = {
          ...oldCategorias,
          categorias: oldCategorias.categorias.map((categoria) =>
            categoria.id === updatedCategoria.categorias.id ? updatedCategoria.categorias : categoria
          ),
        };
        return updatedCategorias;
      });
      toast.success('Categoria Actualizada Correctamente!');
      closeModal();
    },
    onError: (error) => {
      console.error("Error en la mutación EditarCategoria:", error);
      toast.error('Error al actualizar la categoría. Por favor, inténtalo de nuevo.');
    },
  });

  // useMutation para eliminar una categoría
  const { mutateAsync: DeleteCategoria, isPending: LoadingDelete } = useMutation<CategoriaResponse, any, number>({
    mutationFn: deleteCategorias,
    onSuccess: async (categoriaDeleted) => {

      queryClient.setQueryData<CategoriasResponse>(['categorias', pageCategorias], (oldCategorias) => {
        if (!oldCategorias) return { categorias: [], currentPage: 1, totalPages: 1 };

        const updatedCategorias = { ...oldCategorias };
        if (pageCategorias === updatedCategorias.totalPages) {
          updatedCategorias.categorias = updatedCategorias.categorias.filter((categoria) => categoria.id !== categoriaDeleted.categorias.id);
          if (updatedCategorias.categorias.length === 0 && updatedCategorias.totalPages > 1) {
            updatedCategorias.totalPages--;
            if (pageCategorias > 1) {
              setPageCategorias(prev => prev - 1);
            }
          }
        } else {
          updatedCategorias.categorias = updatedCategorias.categorias.filter((categoria) => categoria.id !== categoriaDeleted.categorias.id);
        }
        return updatedCategorias;
      });

      toast.success('Categoria Eliminada Correctamente!');
      closeModal();
    },
    onError: (error) => {
      console.error("Error en la mutación DeleteCategoria:", error);
      toast.error('Error al eliminar la categoría. Por favor, inténtalo de nuevo.');
    },
  });

  const nextPage = (event: React.ChangeEvent<unknown>, value: number) => {
    console.log(value)
    setPageCategorias(value)
  }

  return {
    nextPage,
    totalPages,
    pageCategorias,
    categorias,
    ErrorCategoria,
    CargandoCategorias,
    PostCategoria,
    LoadingPost,
    EditarCategoria,
    LoadingEdit,
    DeleteCategoria,
    LoadingDelete,
    ActualizarCategorias
  };
}
/*
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
*/