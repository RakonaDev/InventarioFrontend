/* eslint-disable @typescript-eslint/no-explicit-any */
/*
"use client"
import { apiAuth } from "../helper/global";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Insumo } from "@/interfaces/InsumosInterface";
import { useAdmin } from "../context/AdminContext";
import { CompraInterface } from "@/interfaces/CompraInterface";
import { useCompra } from "./useCompra";
import { toast } from "sonner";
import { useState } from "react";


const fetchInsumos = async () => {

  const response = await apiAuth.get('/getInsumos')
  if (response.status === 401) {
    window.location.href = '/login'
  }

  return response.data;
};

const postInsumos = async (newInsumo: FormData) => {

  try {
    const response = await apiAuth.postForm('/insumos', newInsumo)

    if (response.status === 401) {
      window.location.href = '/login'
    }

    return response.data;
  } catch (error) {
    console.log(error)
    toast.error('Hubo un error añadiendo el producto')
  }
};

const editInsumos = async (editedInsumo: Insumo) => {

  try {
    //const response = await apiAuth.put(`/insumos/${editedInsumo.id}`, editedInsumo)
    const response = await apiAuth.post(`/editInsumos/${editedInsumo.id}`, editedInsumo)
    if (response.status === 401) {
      window.location.href = '/login'
    }

    return response.data;
  } catch (error) {
    console.log(error)
    toast.error('Hubo un error editando el producto')
  }
};

const deleteInsumo = async (id: number) => {

  try {
    // const response = await apiAuth.delete(`/insumos/${id}`)
    const response = await apiAuth.post(`/deleteInsumos/${id}`)
    if (response.status === 401) {
      window.location.href = '/login'
    }

    return response.data;
  } catch (error) {
    console.log(error)
    toast.error('Hubo un error eliminando el producto')
  }
};


export function useInsumos() {
  const [pageInsumos, setPageInsumos] = useState(1)
  const { closeModal } = useAdmin();
  const { ActualizarInformacionCompras } = useCompra()
  const query = useQueryClient()

  const { data: insumos , refetch: ActualizarInformacionInsumos, isLoading: CargandoInsumos, isError: ErrorInsumos } = useQuery<Insumo[]>({
    queryKey: ['insumos', pageInsumos],
    queryFn: fetchInsumos,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })
  const { mutate: PostInsumo, isPending: LoadingPost } = useMutation({
    mutationFn: postInsumos,
    onSuccess: async (newData: any) => {
      if (!newData.insumos || !newData.compras) {
        return;
      }
      const { insumos, compras } = newData;
      await query.setQueryData(['insumos'], (oldInsumo: Insumo[]) => {
        if (oldInsumo == null) return [insumos];
        return [...oldInsumo, insumos as Insumo];
      });
      await query.setQueryData(['compras'], (oldCompra: CompraInterface[]) => {
        if (oldCompra == null) return [compras as CompraInterface];
        return [...oldCompra, compras as CompraInterface];
      });
      toast.success('Producto Añadido Correctamente')
      closeModal();
    }
  })

  const { mutate: DeleteInsumo, isPending: LoadingDelete } = useMutation({
    mutationFn: deleteInsumo,
    onSuccess: async (newData: any) => {
      if (!newData) return
      const { insumos, compras } = newData;
      await query.setQueryData(['insumos'], (oldInsumo?: Insumo[]) => {
        if (oldInsumo == null) return [];
        return oldInsumo.filter((insumo: Insumo) => insumo.id !== insumos.id);
      });
      await query.setQueryData(['compras'], (oldCompra?: CompraInterface[]) => {
        if (oldCompra == null) return [];
        return oldCompra.filter((compra: CompraInterface) => compra.id !== compras.id);
      });
      toast.success('Producto Eliminado Correctamente!')
      closeModal();
    },
  })

  const { mutate: EditInsumo, isPending: LoadingEdit } = useMutation({
    mutationFn: editInsumos,
    onSuccess: async (newData: any) => {
      if (!newData) return
      const { insumos } = newData;
      await query.setQueryData(['insumos'], (oldInsumo?: Insumo[]) => {
        if (oldInsumo == null) return [];
        return oldInsumo.map((insumo: Insumo) => {
          if (insumo.id === insumos.id) {
            return insumos;
          }
          return insumo;
        });
      });
      toast.success('Producto Editado Correctamente')
      closeModal();
      ActualizarInformacionCompras()
    }
  })

  const nextPage = () => {
    setPageInsumos(pageInsumos + 1)
  }
  const previousPage = () => {
    if (pageInsumos === 1) return
    setPageInsumos(pageInsumos - 1)
  }

  return {
    nextPage,
    previousPage,
    insumos,
    PostInsumo,
    LoadingPost,
    DeleteInsumo,
    LoadingDelete,
    EditInsumo,
    LoadingEdit,
    ActualizarInformacionInsumos,
    CargandoInsumos,
    ErrorInsumos
  }
}
/*
type InsumoReturn = {
  insumos: any[];
  setInsumos: React.Dispatch<React.SetStateAction<any[]>>;
}

export const useGetInsumos = (): InsumoReturn => {
  const [insumos, setInsumos] = useState<any[]>([]);
  useEffect(() => {
    fetchInsumos().then((data) => setInsumos(data));
  }, []);
  return { insumos, setInsumos };
}
*/
"use client";
import { apiAuth } from "../helper/global";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Insumo } from "@/interfaces/InsumosInterface";
import { useAdmin } from "../context/AdminContext";
import { CompraInterface } from "@/interfaces/CompraInterface";
import { useCompra } from "./useCompra";
import { toast } from "sonner";
import { useState } from "react";

// Definición de la interfaz para la respuesta de la API
interface InsumosResponse {
  insumos: Insumo[];
  currentPage: number;
  totalPages: number;
}

// Definición de tipos para las respuestas de las mutaciones
interface PostInsumoResponse {
  insumos: Insumo;
  compras: CompraInterface;
}

interface EditInsumoResponse {
  insumos: Insumo;
}

interface DeleteInsumoResponse {
  insumos: Insumo;
  compras: CompraInterface;
}

// Funciones para realizar las peticiones a la API (fetchs)
const fetchInsumos = async (page: number): Promise<InsumosResponse> => {
  const response = await apiAuth.get(`/insumos/10/${page}`);
  if (response.status === 401) {
    window.location.href = '/login';
    throw new Error("Unauthorized");
  }
  return response.data;
};

const postInsumos = async (newInsumo: FormData): Promise<PostInsumoResponse> => {
  try {
    const response = await apiAuth.postForm('/insumos', newInsumo);
    if (response.status === 401) {
      window.location.href = '/login';
      throw new Error("Unauthorized");
    }
    return response.data;
  } catch (error) {
    console.error(error);
    toast.error('Hubo un error añadiendo el producto');
    throw error;
  }
};

const editInsumos = async (editedInsumo: Insumo): Promise<EditInsumoResponse> => {
  try {
    const response = await apiAuth.post(`/editInsumos/${editedInsumo.id}`, editedInsumo);
    if (response.status === 401) {
      window.location.href = '/login';
      throw new Error("Unauthorized");
    }
    return response.data;
  } catch (error) {
    console.error(error);
    toast.error('Hubo un error editando el producto');
    throw error;
  }
};

const deleteInsumo = async (id: number): Promise<DeleteInsumoResponse> => {
  try {
    const response = await apiAuth.post(`/deleteInsumos/${id}`);
    if (response.status === 401) {
      window.location.href = '/login';
      throw new Error("Unauthorized");
    }
    return response.data;
  } catch (error) {
    console.error(error);
    toast.error('Hubo un error eliminando el producto');
    throw error;
  }
};

export function useInsumos() {
  const [pageInsumos, setPageInsumos] = useState(1);
  const { closeModal } = useAdmin();
  const { ActualizarInformacionCompras } = useCompra();
  const queryClient = useQueryClient();

  // useQuery para obtener los insumos
  const { data: insumosData, refetch: ActualizarInformacionInsumos, isLoading: CargandoInsumos, isError: ErrorInsumos } = useQuery<InsumosResponse>({
    queryKey: ['insumos', pageInsumos],
    queryFn: () => fetchInsumos(pageInsumos),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
  const totalPages = insumosData?.totalPages || 1;
  const insumos = insumosData?.insumos || [];

  // useMutation para crear un insumo
  const { mutate: PostInsumo, isPending: LoadingPost } = useMutation<PostInsumoResponse, any, FormData>({
    mutationFn: postInsumos,
    onSuccess: async (newData) => {
      // Actualización optimista de la caché
      queryClient.setQueryData(['insumos', pageInsumos], (oldInsumos: InsumosResponse) => {
        if (!oldInsumos) return { insumos: [newData.insumos], totalPages: 1 };

        const newInsumos = { ...oldInsumos };

        if (pageInsumos === oldInsumos.totalPages) {
          if (oldInsumos.insumos.length < 10) {
            newInsumos.insumos.push(newData.insumos);
          } else {
            newInsumos.insumos.push(newData.insumos);
            newInsumos.totalPages++;
          }
        } else if (pageInsumos === 1) {
          newInsumos.insumos.push(newData.insumos);
        }
        toast.success('Producto Añadido Correctamente');
        closeModal();
        return newInsumos;
      });
    },
    onError: (error) => {
      console.error("Mutation error:", error);
      toast.error('Error adding product. Please try again.');
    },
  });

  // useMutation para eliminar un insumo
  const { mutate: DeleteInsumo, isPending: LoadingDelete } = useMutation<DeleteInsumoResponse, any, number>({
    mutationFn: deleteInsumo,
    onSuccess: async (newData) => {
      // Actualización optimista de la caché
      queryClient.setQueryData<InsumosResponse>(['insumos', pageInsumos], (oldInsumos) => {
        if (!oldInsumos) return { insumos: [], currentPage: 1, totalPages: 1 };

        const newInsumos = { ...oldInsumos };

        // Lógica para eliminar el insumo y actualizar totalPages
        if (pageInsumos === oldInsumos.totalPages) { // Si estamos en la última página
          newInsumos.insumos = oldInsumos.insumos.filter((insumo) => insumo.id !== newData.insumos.id);
          if (newInsumos.insumos.length === 0 && oldInsumos.totalPages > 1) { // Si la página queda vacía y no es la primera
            newInsumos.totalPages--; // Decrementamos el número de páginas
            if (pageInsumos > 1) {
              setPageInsumos(prev => prev - 1); // Redirigimos a la página anterior
            }
          }
        } else { // Si no estamos en la última página, eliminamos normalmente
          newInsumos.insumos = oldInsumos.insumos.filter((insumo) => insumo.id !== newData.insumos.id);
        }
        toast.success('Producto Eliminado Correctamente!');
        closeModal()
        return newInsumos;
      });
    },
    onError: (error) => {
      console.error("Mutation error:", error);
      toast.error('Error deleting product. Please try again.');
    },
  });

  // useMutation para editar un insumo
  const { mutate: EditInsumo, isPending: LoadingEdit } = useMutation<EditInsumoResponse, any, Insumo>({
    mutationFn: editInsumos,
    onSuccess: async (newData) => {
      // Actualización optimista de la caché
      queryClient.setQueryData<InsumosResponse>(['insumos', pageInsumos], (oldInsumos) => {
        if (!oldInsumos) return { insumos: [newData.insumos], currentPage: 1, totalPages: 1 };
        const newInsumos = {
          insumos: oldInsumos.insumos.map((insumo) =>
            insumo.id === newData.insumos.id ? newData.insumos : insumo
          ),
          currentPage: oldInsumos.currentPage, // Mantén la página actual
          totalPages: oldInsumos.totalPages, // Mantén el total de páginas
        };
        return newInsumos;
      });
      toast.success('Producto Editado Correctamente');
      closeModal();
      ActualizarInformacionCompras();
    },
    onError: (error) => {
      console.error("Mutation error:", error);
      toast.error('Error editing product. Please try again.');
    },
  });
  /*
  const nextPage = () => setPageInsumos((prev) => prev + 1);
  const previousPage = () => setPageInsumos((prev) => Math.max(1, prev - 1));
  */
  const nextPage = (event: React.ChangeEvent<unknown>, value: number) => {
    console.log(value)
    setPageInsumos(value)
  }

  return {
    totalPages,
    pageInsumos,
    nextPage,
    insumos,
    PostInsumo,
    LoadingPost,
    DeleteInsumo,
    LoadingDelete,
    EditInsumo,
    LoadingEdit,
    ActualizarInformacionInsumos,
    CargandoInsumos,
    ErrorInsumos,
  };
}