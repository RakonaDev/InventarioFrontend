import { SalidaInterface } from "@/interfaces/SalidaInterface";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiAuth } from "../helper/global";
import { useAdmin } from "../context/AdminContext";
import { toast } from "sonner";

// FETCHS SALIDAS
const fetchSalidas = async () => {
  try{

    const response = await apiAuth.get('/salidas')
    if (response.status === 401) {
      window.location.href = '/login'
    }

    return response.data;
  }
  catch (error) {
    console.log(error)
  }
};

const postSalida = async (newSalida: SalidaInterface) => {
  try {

    const response = await apiAuth.post('/salidas', newSalida)
    if (response.status === 401) {
      window.location.href = '/login'
    }

    return response.data.salidas;
  } catch (error) {
    toast.error('Error creando la salida')
    console.log(error)
  }
}

// CUSTOM HOOK SALIDAS
export function useSalida() {
  const { closeModal } = useAdmin()
  const query = useQueryClient()
  const { data: salidas, refetch: ActualizarInformacionSalidas } = useQuery<SalidaInterface[]>({
    queryKey: ['salidas'],
    queryFn: fetchSalidas,
  })

  const { mutate: PostSalida, isPending: LoadingPost } = useMutation({
    mutationFn: postSalida,
    onSuccess: async (newSalida: SalidaInterface) => {
      if (!newSalida) return
      await query.setQueryData(['salidas'], (oldSalidas?: SalidaInterface[]) => {
        if (oldSalidas == null) return [newSalida]
        return [...oldSalidas, newSalida]
      })
      await query.setQueryData(['insumos'], (oldInsumos?: SalidaInterface[]) => {
        if (oldInsumos == null) return
        return oldInsumos.map((insumo: SalidaInterface) => {
          if (insumo.id === newSalida.producto?.id) {
            insumo.cantidad -= newSalida.cantidad
            return insumo
          }
          return insumo;
        });
      })
      toast.success('Salida Creada Correctamente!')
      closeModal()
    }
  })

  return {
    salidas,
    PostSalida,
    LoadingPost,
    ActualizarInformacionSalidas
  }
}