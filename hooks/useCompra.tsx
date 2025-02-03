import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { apiURL } from "../helper/global";
import { CompraInterface } from "@/interfaces/CompraInterface";
import { Insumo } from "@/interfaces/InsumosInterface";
import { useAdmin } from "../context/AdminContext";

const fetchCompras = async () => {
  try{
    const response = await fetch(`${apiURL}/compras`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include'
    });
    if (response.status === 401) {
      window.location.href = '/login'
    }
    const data = await response.json();
    return data;
  }
  catch (error) {
    console.log(error)
  }
};

const PostCompra = async (newCompra: FormData) => {
  try {
    const response = await fetch(`${apiURL}/compras`, {
      method: "POST",
      credentials: 'include',
      body: newCompra
    });
    if (response.status === 401) {
      window.location.href = '/login'
    }
    const data = await response.json();
    return data.compras;
  } catch (error) {
    console.log(error)
  }
}

export function useCompra() {
  const { closeModal } = useAdmin()	
  const query = useQueryClient()
  const { data: compras, refetch: ActualizarInformacionCompras } = useQuery<CompraInterface[]>({
    queryKey: ['compras'],
    queryFn: fetchCompras,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false
  })

  const { mutate: PostCompras } = useMutation({
    mutationFn: PostCompra,
    onSuccess: async (newCompra: CompraInterface) => {
      await query.setQueryData(['compras'], (oldCompras?: CompraInterface[]) => {
        if (oldCompras == null) return [newCompra]
        return [...oldCompras, newCompra]
      })
      await query.setQueryData(['insumos'], (oldInsumos?: Insumo[]) => {
        if (oldInsumos == null) return
        return oldInsumos.map((insumo: Insumo) => {
          if (insumo.id === newCompra.producto?.id) {
            insumo.cantidad += newCompra.cantidad
            return insumo
          }
          return insumo;
        });
      })
      closeModal()
    }
  })

  return {
    compras,
    PostCompras,
    ActualizarInformacionCompras
  }
}