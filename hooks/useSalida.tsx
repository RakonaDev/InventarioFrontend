import { SalidaInterface, SalidasResponse } from "@/interfaces/SalidaInterface";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiAuth } from "../fonts/helper/global";
import { useAdmin } from "../context/AdminContext";
import { toast } from "sonner";
import { useSalidasStore } from "../store/SalidaStore";
import { parseToLocalTime } from "../logic/parseToLocalTime";
import { AxiosError } from "axios";
import { useUserStore } from "../store/UserStore";
import { JSX } from "react";

// FETCHS SALIDAS
const fetchSalidas = async (page: number) => {
  try {
    const response = await apiAuth.get(`/salidas/10/${page}`)
    if (response.status === 401) {
      window.location.href = '/login'
    }
    return response.data;
  }
  catch (error) {
    if (error instanceof AxiosError) {
      if (error.status === 401) {
        window.location.href = '/login'
      }
    }
    console.log(error)
  }
};

const postSalida = async (newSalida: SalidaInterface) => {
  try {

    const response = await apiAuth.post('/salidas', newSalida)
    if (response.status === 401) {
      window.location.href = '/login'
    }

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.status === 401) {
        window.location.href = '/login'
      }
    }
    toast.error('Error creando la salida')
    console.log(error)
  }
}

// CUSTOM HOOK SALIDAS
export function useSalida() {
  const { closeModal } = useAdmin()
  const { currentPage, setSalidasPaginate } = useSalidasStore()
  const { currentPage: currentUserPage } = useUserStore()
  const query = useQueryClient()
  const { data: salidasData, refetch: ActualizarInformacionSalidas } = useQuery<SalidasResponse>({
    queryKey: ['salidas', currentPage],
    queryFn: () => fetchSalidas(currentPage),
  })

  const { mutate: PostSalida, isPending: LoadingPost } = useMutation({
    mutationFn: postSalida,
    onSuccess: async (newSalida: SalidaInterface) => {
      if (!newSalida) return
      await query.setQueryData(['salidas', currentPage], (oldSalidas?: SalidaInterface[]) => {
        if (oldSalidas == null) return [newSalida]
        return [...oldSalidas, newSalida]
      })
      await query.setQueryData(['insumos', currentUserPage], (oldInsumos?: SalidaInterface[]) => {
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

  function RenderListSalidas() {
    return (
      <div className="w-full space-y-6">
        {salidasData?.salidas?.map((salida: SalidaInterface) => (
          <div
            className="w-full flex gap-5 xl:grid xl:grid-cols-12 text-black-700"
            key={salida.id}
          >
            <div className="w-full flex min-w-[100px] xl:col-span-2 justify-center  items-center">
              <p className="line-clamp-1">{salida.id}</p>
            </div>
            <div className="w-full min-w-[150px] xl:col-span-2 flex justify-center  items-center text-sm">
              <p>{salida.producto?.nombre || ''}</p>
            </div>
            <div className="w-full flex items-center text-sm justify-center min-w-[100px] xl:col-span-2">
              <p>{salida.cantidad}</p>
            </div>
            <div className="w-full min-w-[200px] xl:col-span-3 flex items-center text-sm justify-center ">
              <p>{parseToLocalTime(salida.created_at)}</p>
            </div>
          </div>
        ))}
      </div>
    )
  }

  function nextPage(event: React.ChangeEvent<unknown>, value: number) {
    setSalidasPaginate(value)
  }

  function RenderListSalidasMov(): JSX.Element {
    return (
      <div className="w-full space-y-6">
        {salidasData?.salidas?.map((salida: SalidaInterface) => (
          <div
            className="w-full flex gap-5 xl:grid xl:grid-cols-12 text-black-700"
            key={salida.id}
          >
            <div className="w-full flex min-w-[100px] xl:col-span-2 justify-center items-center">
              <p className="line-clamp-1">{salida.id}</p>
            </div>
            <div className="w-full min-w-[150px] xl:col-span-2 flex justify-center  items-center text-sm">
              <p>{salida.producto?.nombre || ''}</p>
            </div>
            <div className="w-full flex items-center text-sm justify-center min-w-[130px] xl:col-span-1">
              <p>{'S/. ' + salida.producto?.precio || ''}</p>
            </div>
            <div className="w-full min-w-[130px] xl:col-span-2 flex items-center text-sm justify-center ">
              <p>{salida.cantidad || '-'}</p>
            </div>
            <div className="w-full min-w-[150px] xl:col-span-1 flex items-center text-sm justify-center ">
              <p>{'-'}</p>
            </div>
            <div className="w-full min-w-[150px] xl:col-span-2 flex items-center text-sm justify-center ">
              <p>{'-'}</p>
            </div>
            <div className="w-full min-w-[200px] xl:col-span-2 flex items-center text-sm justify-center ">
              <p>{parseToLocalTime(salida.created_at)}</p>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return {
    salidasData,
    PostSalida,
    LoadingPost,
    ActualizarInformacionSalidas,
    RenderListSalidas,
    nextPage,
    RenderListSalidasMov
  }
}