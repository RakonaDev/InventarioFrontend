/* eslint-disable @typescript-eslint/no-explicit-any */
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { apiAuth } from "../fonts/helper/global";
import { CompraInterface, CompraResponse, ComprasResponse } from "@/interfaces/CompraInterface";
import { useAdmin } from "../context/AdminContext";
import { toast } from "sonner";
import { useComprasStore } from "../store/ComprasStore";
import { parseToLocalTime } from "../logic/parseToLocalTime";
import Link from "next/link";
import { JSX } from "react";
import { useInsumosStore } from "../store/ProductosStore";

const fetchCompras = async (page: number) => {
  try {
    const response = await apiAuth.get(`/compras/10/${page}`)
    if (response.status === 401) {
      window.location.href = '/login'
    }

    return response.data;
  }
  catch (error) {
    console.log(error)
  }
};

const PostCompra = async (newCompra: FormData): Promise<CompraResponse> => {
  try {
    const response = await apiAuth.post('/compras', newCompra)
    if (response.status === 401) {
      window.location.href = '/login'
      throw new Error("Unauthorized");
    }
    if (response.status !== 200) {
      throw new Error('Error');
    }

    return response.data;
  } catch (error) {
    toast.error('Hubo un error añadiendo la compra')
    console.log(error)
    throw new Error('Error al crear la compra')
  }
}

export function useCompra() {
  const { closeModal } = useAdmin()
  const { currentPage: currentProductosPage } = useInsumosStore()
  const { currentPage, setComprasPaginate } = useComprasStore()
  const query = useQueryClient()
  const { data: comprasData, refetch: ActualizarInformacionCompras } = useQuery<ComprasResponse>({
    queryKey: ['compras', currentPage],
    queryFn: () => fetchCompras(currentPage),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    placeholderData: keepPreviousData
  })

  const { mutate: PostCompras, isPending: LoadingPost } = useMutation<CompraResponse, any, FormData>({
    mutationFn: PostCompra,
    onSuccess: async (newCompra) => {
      if (!newCompra) return
      await query.setQueryData<ComprasResponse>(['compras', currentPage], (oldCompras) => {
        if (oldCompras == null) return {
          compras: [newCompra.compras],
          currentPage: currentPage,
          totalPages: 1
        }
        const updatedCompras = { ...oldCompras, currentPage: currentPage }

        if (currentPage === updatedCompras.totalPages) {
          if (updatedCompras.compras.length >= 10) {
            updatedCompras.totalPages++
            if (currentPage + 1 === updatedCompras.totalPages) {
              setComprasPaginate(currentPage + 1)
            }
          }
          updatedCompras.compras.push(newCompra.compras)
          console.log(updatedCompras.compras)
        }
        return updatedCompras
      })
      query.invalidateQueries({
        queryKey: ['insumos', currentProductosPage]
      })
      toast.success('Compra Creada Correctamente!')
      closeModal()
    }
  })

  function RenderListCompras(): JSX.Element {
    return (
      <div className="w-full space-y-6">
        {comprasData?.compras.map((compra: CompraInterface) => (
          <div
            className="w-full flex gap-5 xl:grid xl:grid-cols-12 text-black-700"
            key={compra.id}
          >
            <div className="w-full flex min-w-[100px] xl:col-span-1 justify-center  items-center">
              <p className="line-clamp-1">{compra.id}</p>
            </div>
            <div className="w-full min-w-[180px] xl:col-span-2 flex justify-center  items-center text-sm">
              <p>{compra.producto?.nombre || ''}</p>
            </div>
            <div className="w-full flex items-center text-sm justify-center min-w-[100px] xl:col-span-1">
              <p>{compra.cantidad}</p>
            </div>
            <div className="w-full min-w-[150px] xl:col-span-2 flex items-center text-sm justify-center ">
              {
                compra.comprobante
                  ? <Link target='_blank' href={`${compra.comprobante}`} className='text-blue-500'>Ver Comprobante</Link>
                  : <p>-</p>
              }
            </div>
            <div className="w-full min-w-[100px] xl:col-span-1 flex items-center text-sm justify-center ">
              <p>{compra.vida_utiles_dias || '-'}</p>
            </div>
            <div className="w-full min-w-[200px] xl:col-span-2 flex items-center text-sm justify-center ">
              <p>{parseToLocalTime(compra.fecha_ingreso)}</p>
            </div>
            <div className="w-full min-w-[200px] xl:col-span-2 flex items-center text-sm justify-center ">
              <p>{parseToLocalTime(compra.fecha_vencimiento)}</p>
            </div>
            {/*<EditAndDeleteButtons
            onEdit={() => handleEditarInsumo(compra)}
            onDelete={() => handleEliminarInsumo(compra.id || 0)}
          />*/}
          </div>
        ))}
      </div>
    )
  }

  function RenderListComprasMov(): JSX.Element {
    return (
      <div className="w-full space-y-6">
        {comprasData?.compras?.map((compra: CompraInterface) => (
          <div
            className="w-full flex gap-5 xl:grid xl:grid-cols-12 text-black-700"
            key={compra.id}
          >
            <div className="w-full flex min-w-[150px] xl:col-span-2 justify-center  items-center">
              <p className="line-clamp-1">{compra.id}</p>
            </div>
            <div className="w-full min-w-[150px] lg:col-span-2 flex justify-center  items-center text-sm">
              <p>{compra.producto?.nombre || ''}</p>
            </div>
            <div className="w-full flex items-center text-sm justify-center min-w-[150px] lg:col-span-1">
              <p>{'S/. ' + compra.producto?.precio || ''}</p>
            </div>
            <div className="w-full min-w-[150px] lg:col-span-2 flex items-center text-sm justify-center ">
              <p>{compra.cantidad || '-'}</p>
            </div>
            <div className="w-full min-w-[150px] lg:col-span-1 flex items-center text-sm justify-center ">
              <p>{'S/. ' + compra.total || '-'}</p>
            </div>
            <div className="w-full min-w-[150px] lg:col-span-2 flex items-center text-sm justify-center ">
              {
                compra.comprobante
                  ? <Link target='_blank' href={`${compra.comprobante}`} className='text-blue-500'>Ver Comprobante</Link>
                  : <p>-</p>
              }
            </div>
            <div className="w-full min-w-[150px] lg:col-span-2 flex items-center text-sm justify-center ">
              <p>{parseToLocalTime(compra.created_at)}</p>
            </div>
            {/*<EditAndDeleteButtons
              onEdit={() => handleEditarInsumo(compra)}
              onDelete={() => handleEliminarInsumo(compra.id || 0)}
            />*/}
          </div>
        ))}
      </div>
    );
  }

  function nextPage(event: React.ChangeEvent<unknown>, value: number) {
    setComprasPaginate(value)
  }
  const totalPages = comprasData?.totalPages || 1;

  return {
    comprasData,
    PostCompras,
    LoadingPost,
    ActualizarInformacionCompras,
    RenderListCompras,
    nextPage,
    totalPages,
    RenderListComprasMov
  }
}
