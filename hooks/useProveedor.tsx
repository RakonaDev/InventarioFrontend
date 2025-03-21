/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiAuth } from "../fonts/helper/global";
import { useAdmin } from "../context/AdminContext";
import { ProveedoresResponse, ProveedorInterface, ProveedorResponse } from "@/interfaces/ProveedorInterface";
import { toast } from "sonner";
import { useInsumos } from "./useInsumos";
import { AxiosError } from "axios";
import { useProveedorStore } from "../store/ProveedorStore";
import { EditAndDeleteButtons } from "../components/buttons/EditAndDeleteButtons";
import EliminarProveedor from "../components/modal/proveedores/EliminarProveedor";
import { VerProveedor } from "../components/modal/proveedores/VerProveedor";
import EditarProveedor from "../components/modal/proveedores/EditarProveedor";

const fetchProveedor = async (page: number): Promise<ProveedoresResponse> => {
  try {
    const response = await apiAuth.get(`/proveedores/10/${page}`)

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
    toast.error('Hubo un error al recibir los datos')
    console.log(error);
    throw new Error('Error al obtener los proveedores');
  }
};

const postProveedores = async (newProveedor: ProveedorInterface): Promise<ProveedorResponse> => {
  try {
    const response = await apiAuth.post('/proveedores', newProveedor)
    // const data = await response.json();
    if (response.status === 401) {
      window.location.href = '/login'
    }
    return response.data
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.status === 401) {
        window.location.href = '/login'
      }
    }
    toast.error('Hubo un error creando el proveedor')
    console.log(error);
    throw new Error('Error al crear el proveedor');
  }
};

const patchProveedor = async (updatedProveedor: ProveedorInterface): Promise<ProveedorResponse> => {
  try {
    // const response = await apiAuth.put(`/proveedores/${updatedProveedor.id}`, updatedProveedor)
    const response = await apiAuth.post(`/editProveedor/${updatedProveedor.id}`, updatedProveedor)
    if (response.status === 401) {
      window.location.href = '/login'
    }
    // const data = await response.json()

    return response.data
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.status === 401) {
        window.location.href = '/login'
      }
    }
    toast.error('Hubo un error actualizando el proveedor')
    console.log(error)
    throw new Error('Error al actualizar el proveedor');
  }
}

const deleteProveedor = async (id: number): Promise<ProveedorResponse> => {
  try {
    // const response = await apiAuth.delete(`/proveedores/${id}`)
    const response = await apiAuth.post(`/deleteProveedor/${id}`)
    if (response.status === 401) {
      window.location.href = '/login'
    }
    return response.data
  }
  catch (error) {
    if (error instanceof AxiosError) {
      if (error.status === 401) {
        window.location.href = '/login'
      }
    }
    toast.error('Hubo un error eliminando el proveedor')
    console.log(error)
    throw new Error('Error al eliminar el proveedor');
  }
}

export function useProveedor() {
  const { closeModal } = useAdmin();
  const { ActualizarInformacionInsumos } = useInsumos()
  const { currentPage, setProveedoresPaginate } = useProveedorStore()
  const query = useQueryClient()
  const { data: proveedoresData, isError: ErrorProveedor, isLoading: CargandoProveedor, refetch: ActualizarProveedores } = useQuery<ProveedoresResponse>({
    queryKey: ['proveedores', currentPage],
    queryFn: () => fetchProveedor(currentPage),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  })

  const { mutate: PostProveedor, isPending: LoadingPost } = useMutation<ProveedorResponse, any, ProveedorInterface>({
    mutationFn: postProveedores,
    onSuccess: async (newProveedor) => {
      if (!newProveedor) return
      query.setQueryData<ProveedoresResponse>(['proveedores', currentPage], (oldProveedor) => {
        if (oldProveedor == null) return {
          proveedores: [newProveedor.proveedores],
          currentPage: currentPage,
          totalPages: 1
        }

      });
      toast.success('Proveedor Creado Correctamente!')
      closeModal();
    },
  });

  const { mutate: EditarProveedores, isPending: LoadingEdit } = useMutation<ProveedorResponse, any, ProveedorInterface>({
    mutationFn: patchProveedor,
    onSuccess: async (updatedProveedor) => {
      if (!updatedProveedor) return
      query.setQueryData<ProveedoresResponse>(['proveedores', currentPage], (oldProveedor) => {
        if (!oldProveedor) return { proveedores: [updatedProveedor.proveedores], currentPage: 1, totalPages: 1 }
        const newInsumo = {
          proveedores: oldProveedor.proveedores.map((proveedor) =>
            proveedor.id === updatedProveedor.proveedores.id ? updatedProveedor.proveedores : proveedor
          ),
          currentPage: oldProveedor.currentPage, // Mantén la página actual
          totalPages: oldProveedor.totalPages, // Mantén el total de páginas
        };
        return newInsumo;
      })
      toast.success('Proveedor Actualizado Correctamente!')
      closeModal()
      ActualizarInformacionInsumos()
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })

  const { mutate: DeleteProveedor, isPending: LoadingDelete } = useMutation<ProveedorResponse, any, number>({
    mutationFn: deleteProveedor,
    onSuccess: async (proveedorDeleted) => {
      if (!proveedorDeleted) return
      ActualizarProveedores()
      toast.success('Proveedor Eliminado Correctamente!')
      closeModal()
    }
  })

  function nextPage(event: React.ChangeEvent<unknown>, value: number) {
    setProveedoresPaginate(value)
  }

  function RenderListProveedores() {
    const { setModalContent, openModal } = useAdmin();

    const handleEditarRol = (proveedor: ProveedorInterface) => {
      setModalContent(<EditarProveedor proveedor={proveedor} />);
      openModal();
    };
    const handleEliminarRol = (id: number) => {
      setModalContent(<EliminarProveedor id={id} />);
      openModal();
    };
    const handleVerRol = (proveedor: ProveedorInterface) => {
      setModalContent(<VerProveedor proveedor={proveedor} />)
      openModal()
    }

    return (
      <div className="w-full space-y-6">
        {proveedoresData?.proveedores?.map((proveedor: ProveedorInterface) => (
          <div className="w-full flex gap-5 xl:grid xl:grid-cols-12 text-black-700" key={proveedor.id}>
            <div className="w-full min-w-[100px] xl:col-span-2 flex justify-center  items-center text-sm cell">
              <p>{proveedor.id}</p>
            </div>
            <div className="w-full min-w-[150px] xl:col-span-2 flex items-center text-sm justify-center cell">
              <p>{proveedor.name}</p>
            </div>
            <div className="w-full min-w-[150px] xl:col-span-2 flex items-center text-sm justify-center cell">
              <p>{proveedor.phone}</p>
            </div>
            <div className="w-full min-w-[150px] xl:col-span-2 flex items-center text-sm justify-center cell">
              <p>{proveedor.email}</p>
            </div>
            <div className="w-full min-w-[150px] xl:col-span-2 flex items-center text-sm justify-center cell">
              <p>{proveedor.address}</p>
            </div>
            <EditAndDeleteButtons
              onView={() => handleVerRol(proveedor)}
              onEdit={() => handleEditarRol(proveedor)}
              onDelete={() => handleEliminarRol(proveedor.id || 0)}
            />
          </div>
        ))}
      </div>
    );
  }

  return {
    proveedoresData,
    ErrorProveedor,
    CargandoProveedor,
    PostProveedor,
    LoadingPost,
    EditarProveedores,
    LoadingEdit,
    DeleteProveedor,
    LoadingDelete,
    nextPage,
    RenderListProveedores
  }
} 