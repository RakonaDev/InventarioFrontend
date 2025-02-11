/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { apiAuth, apiURL } from "../helper/global";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Insumo } from "@/interfaces/InsumosInterface";
import { useAdmin } from "../context/AdminContext";
import { CompraInterface } from "@/interfaces/CompraInterface";
import { useCompra } from "./useCompra";

const fetchInsumos = async () => {
  /*
  const response = await fetch(`${apiURL}/getInsumos`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: 'include'

  });
  */
  const response = await apiAuth.get('/getInsumos')
  if (response.status === 401) {
    window.location.href = '/login'
  }
  // const data = await response.json();
  return response.data;
};

const postInsumos = async (newInsumo: FormData) => {
  /*
  const response = await fetch(`${apiURL}/insumos`, {
    method: "POST",
    credentials: 'include',
    body: newInsumo
  });
  */
  const response = await apiAuth.postForm('/insumos', newInsumo)

  if (response.status === 401) {
    window.location.href = '/login'
  }
  // const data = await response.json();
  return response.data;
};

const editInsumos = async (editedInsumo: Insumo) => {
  /*
  const response = await fetch(`${apiURL}/insumos/${editedInsumo.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: 'include',
    body: JSON.stringify(editedInsumo)
  });
  */
  const response = await apiAuth.put(`/insumos/${editedInsumo.id}`, editedInsumo)
  if (response.status === 401) {
    window.location.href = '/login'
  }
  // const data = await response.json();
  return response.data;
};

const deleteInsumo = async (id: number) => {
  /*
  const response = await fetch(`${apiURL}/insumos/${id}`, {
    method: "DELETE",
    credentials: 'include'
  });
  */
  const response = await apiAuth.delete(`/insumos/${id}`)
  if (response.status === 401) {
    window.location.href = '/login'
  }
  // const data = await response.json();
  return response.data;
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
    refetchOnReconnect: false
  })

  const { mutate: PostInsumo, isPending: LoadingPost } = useMutation({
    mutationFn: postInsumos,
    onSuccess: async (newData: any) => {
      if (!newData.insumos || !newData.compras) {
        console.error("Respuesta de la API inválida:", newData);
        return;
      }
      const { insumos, compras } = newData;
      closeModal();
      await query.setQueryData(['insumos'], (oldInsumo: Insumo[]) => {
        if (oldInsumo == null) return [insumos];
        return [...oldInsumo, insumos as Insumo];
      });
      await query.setQueryData(['compras'], (oldCompra: CompraInterface[]) => {
        if (oldCompra == null) return [compras as CompraInterface];
        return [...oldCompra, compras as CompraInterface];
      });
    },
    onError: (error) => {
      console.error("Error al agregar insumo:", error);
      alert("Hubo un error al agregar el insumo. Intenta de nuevo.");
    },
  })

  const { mutate: DeleteInsumo, isPending: LoadingDelete } = useMutation({
    mutationFn: deleteInsumo,
    onSuccess: async (newData: any) => {
      closeModal();
      const { insumos, compras } = newData;
      await query.setQueryData(['insumos'], (oldInsumo?: Insumo[]) => {
        if (oldInsumo == null) return [];
        return oldInsumo.filter((insumo: Insumo) => insumo.id !== insumos.id);
      });
      await query.setQueryData(['compras'], (oldCompra?: CompraInterface[]) => {
        if (oldCompra == null) return [];
        return oldCompra.filter((compra: CompraInterface) => compra.id !== compras.id);
      });
    },
  })

  const { mutate: EditInsumo, isPending: LoadingEdit } = useMutation({
    mutationFn: editInsumos,
    onSuccess: async (newData: any) => {
      closeModal();
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
