/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiAuth } from "../helper/global";
import { useAdmin } from "../context/AdminContext";
import { CategoriaInterface, CategoriaResponse, CategoriasResponse } from "@/interfaces/CategoriaInterface";
import { toast } from "sonner";
import { JSX } from "react";
import { parseToLocalTime } from "../logic/parseToLocalTime";
import { EditAndDeleteButtons } from "../components/buttons/EditAndDeleteButtons";
import EliminarCategoria from "../components/modal/categorias/EliminarCategoria";
import { VerCategoria } from "../components/modal/categorias/VerCategoria";
import EditarCategoria from "../components/modal/categorias/EditarCategoria";
import { useCategoryStore } from "../store/CategoryStore";

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
  const { currentPage, setCategoryPaginate } = useCategoryStore()
  const { setModalContent, openModal } = useAdmin();
  const queryClient = useQueryClient();
  const { closeModal } = useAdmin();

  // useQuery con paginación
  const { data: categoriasData, isPending: CargandoCategorias, isError: ErrorCategoria, refetch: ActualizarCategorias } = useQuery<CategoriasResponse>({
    queryKey: ['categorias', currentPage], // Incluir pageCategorias en la queryKey
    queryFn: () => fetchCategorias(currentPage), // Función de fetch
    // staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    placeholderData: keepPreviousData
  });

  // useMutation para crear una categoría


  const { mutate: PostCategoria, isPending: LoadingPost } = useMutation<CategoriaResponse, any, CategoriaInterface>({
    mutationFn: postCategorias,
    onSuccess: async (newCategoria) => {
      queryClient.setQueryData<CategoriasResponse>(['categorias', currentPage], (oldCategorias) => {
        if (!oldCategorias) return { categorias: [newCategoria.categorias], currentPage: currentPage, totalPages: 1 };

        const updatedCategorias = { ...oldCategorias, currentPage: currentPage };

        if (currentPage === updatedCategorias.totalPages) {
          if (updatedCategorias.categorias.length >= 10) {
            updatedCategorias.totalPages++;
            if (currentPage + 1 === updatedCategorias.totalPages) {
              setCategoryPaginate(currentPage + 1)
            }
          }

          updatedCategorias.categorias.push(newCategoria.categorias);
        }
        /*
        else if (pageCategorias === 1) {
          updatedCategorias.categorias.push(newCategoria.categorias);
        }
          */
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
  const { mutate: EditarCategorias, isPending: LoadingEdit } = useMutation<CategoriaResponse, any, CategoriaInterface>({
    mutationFn: patchCategorias,
    onSuccess: async (updatedCategoria) => {
      queryClient.setQueryData<CategoriasResponse>(['categorias', currentPage], (oldCategorias) => {
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

      queryClient.setQueryData<CategoriasResponse>(['categorias', currentPage], (oldCategorias) => {
        if (!oldCategorias) return { categorias: [], currentPage: 1, totalPages: 1 };

        const updatedCategorias = { ...oldCategorias };
        if (currentPage === updatedCategorias.totalPages) {
          updatedCategorias.categorias = updatedCategorias.categorias.filter((categoria) => categoria.id !== categoriaDeleted.categorias.id);
          console.log(updatedCategorias.categorias)
          console.log(updatedCategorias.totalPages)
          if (updatedCategorias.totalPages > 1) {
            console.log("Aqui pagina")
            /*updatedCategorias.totalPages--;*/
            setCategoryPaginate(totalPages - 1);
            /*
            if (currentPage > 1) {
              setPageCategorias(currentPage - 1);
            }
            */
          }
        } else {
          updatedCategorias.categorias = updatedCategorias.categorias.filter((categoria) => categoria.id !== categoriaDeleted.categorias.id);
        }
        return updatedCategorias;
      });

      ActualizarCategorias()
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
    // setPageCategorias(value)
    setCategoryPaginate(value)
  }

  const RenderListCategories = (): JSX.Element => {
    const handeEditarCategoria = (categoria: CategoriaInterface) => {
      setModalContent(<EditarCategoria categoria={categoria} />);
      openModal();
    };
    const handleEliminarCategoria = (id: number) => {
      setModalContent(<EliminarCategoria id={id} />);
      openModal();
    };
    const handleVerCategoria = (categoria: CategoriaInterface) => {
      setModalContent(<VerCategoria categoria={categoria} />)
      openModal()
    }

    if (CargandoCategorias) return <div>Loading...</div>;

    return (
      <div className="w-full space-y-6 bg-white-main">
        {CargandoCategorias ? <h1>Cargando...</h1> : categoriasData?.categorias.map((categoria: CategoriaInterface) => (
          <div className="w-full flex gap-5 xl:grid xl:grid-cols-12 text-black-700" key={categoria.id}>
            <div className="w-full min-w-[100px] xl:col-span-2 flex justify-center  items-center text-sm">
              <p>{categoria.id}</p>
            </div>
            <div className="w-full min-w-[150px] xl:col-span-2 flex justify-center  items-center text-sm">
              <p>{categoria.nombre}</p>
            </div>
            <div className="w-full min-w-[200px] xl:col-span-2 flex justify-center  items-center text-sm">
              <p>{parseToLocalTime(new Date(categoria.created_at || 0))}</p>
            </div>
            <div className="w-full min-w-[200px] xl:col-span-3 flex justify-center  items-center text-sm">
              <p>{parseToLocalTime(new Date(categoria.updated_at || 0))}</p>
            </div>
            <EditAndDeleteButtons
              onView={() => handleVerCategoria(categoria)}
              onEdit={() => handeEditarCategoria(categoria)}
              onDelete={() => handleEliminarCategoria(categoria.id || 0)}
            />
          </div>
        ))}
      </div>
    );
  }

  /*
  const prevPage = () => {
    setPageCategorias(prevState => prevState = prevState - 1)
  }
  const nextPage = () => {
    setPageCategorias(prevState => prevState = prevState + 1)
  }
  */

  const totalPages = categoriasData?.totalPages || 1;
  return {
    RenderListCategories,
    categoriasData,
    nextPage,
    totalPages,
    ErrorCategoria,
    CargandoCategorias,
    PostCategoria,
    LoadingPost,
    EditarCategorias,
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
