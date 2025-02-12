/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { apiAuth } from "../helper/global";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Insumo } from "@/interfaces/InsumosInterface";
import { useAdmin } from "../context/AdminContext";
import { CompraInterface } from "@/interfaces/CompraInterface";
import { useCompra } from "./useCompra";
import { toast } from "sonner";

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
  const { closeModal } = useAdmin();
  const { ActualizarInformacionCompras } = useCompra()
  const query = useQueryClient()

  const { data: insumos,
    refetch: ActualizarInformacionInsumos,
    isLoading: CargandoInsumos,
    isError: ErrorInsumos,
  } = useQuery<Insumo[]>({
    queryKey: ['insumos'],
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

  return {
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
