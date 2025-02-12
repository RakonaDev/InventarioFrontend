import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { apiAuth } from "../helper/global";
import { CompraInterface } from "@/interfaces/CompraInterface";
import { Insumo } from "@/interfaces/InsumosInterface";
import { useAdmin } from "../context/AdminContext";
import { toast } from "sonner";

const fetchCompras = async () => {
  try{
    const response = await apiAuth.get('/compras')
    if (response.status === 401) {
      window.location.href = '/login'
    }

    return response.data;
  }
  catch (error) {
    console.log(error)
  }
};

const PostCompra = async (newCompra: FormData) => {
  try {

    const response = await apiAuth.post('/compras', newCompra)
    if (response.status === 401) {
      window.location.href = '/login'
    }
    
    return response.data.compras;
  } catch (error) {
    toast.error('Hubo un error añadiendo la compra')
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

  const { mutate: PostCompras, isPending: LoadingPost } = useMutation({
    mutationFn: PostCompra,
    onSuccess: async (newCompra: CompraInterface) => {
      if (!newCompra) return
      await query.setQueryData(['compras'], (oldCompras?: CompraInterface[]) => {
        if (oldCompras == null) return [newCompra]
        return [...oldCompras, newCompra]
      })
      await query.setQueryData(['insumos'], (oldInsumos?: Insumo[]) => {
        if (oldInsumos == null) return
        return oldInsumos.map((insumo: Insumo) => {
          if (insumo.id === newCompra.producto?.id) {
            insumo.cantidad = Number(insumo.cantidad) + Number(newCompra.cantidad)
            return insumo
          }
          return insumo;
        });
      })
      toast.success('Compra Creada Correctamente!')
      closeModal()
    }
  })

  return {
    compras,
    PostCompras,
    LoadingPost,
    ActualizarInformacionCompras
  }
}
