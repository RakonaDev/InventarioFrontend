import { SalidaInterface } from "@/interfaces/SalidaInterface";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiAuth, apiURL } from "../helper/global";
import { useAdmin } from "../context/AdminContext";

// FETCHS SALIDAS
const fetchSalidas = async () => {
  try{
    /*
    const response = await fetch(`${apiURL}/salidas`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include'
    });
    */
    const response = await apiAuth.get('/salidas')
    if (response.status === 401) {
      window.location.href = '/login'
    }
    // const data = await response.json();
    return response.data;
  }
  catch (error) {
    console.log(error)
  }
};

const postSalida = async (newSalida: SalidaInterface) => {
  try {
    /*
    const response = await fetch(`${apiURL}/salidas`, {
      method: "POST",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newSalida)
    });
    */
    const response = await apiAuth.post('/salidas', newSalida)
    if (response.status === 401) {
      window.location.href = '/login'
    }
    // const data = await response.json();

    return response.data.salidas;
  } catch (error) {
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

  const { mutate: PostSalida } = useMutation({
    mutationFn: postSalida,
    onSuccess: async (newSalida: SalidaInterface) => {
      closeModal()
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
    }
  })

  return {
    salidas,
    PostSalida,
    ActualizarInformacionSalidas
  }
}