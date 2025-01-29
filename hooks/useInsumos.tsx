"use client"
import { apiURL } from "../helper/global";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Insumo } from "@/interfaces/InsumosInterface";
import { useAdmin } from "../context/AdminContext";

const fetchInsumos = async () => {
  const response = await fetch(`${apiURL}/getInsumos`, {
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
};

const postInsumos = async (newInsumo: FormData) => {
  const response = await fetch(`${apiURL}/insumos`, {
    method: "POST",
    credentials: 'include',
    body: newInsumo
  });
  if (response.status === 401) {
    window.location.href = '/login'
  }
  const data = await response.json();
  return data.insumos;
};

export function useInsumos() {
  const { closeModal } = useAdmin();
  const query = useQueryClient()

  const { data: insumos } = useQuery<Insumo[]>({
    queryKey: ['insumos'],
    queryFn: fetchInsumos,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false
  })

  const { mutate: PostInsumo } = useMutation({
    mutationFn: postInsumos,
    onSuccess: async (newInsumo: Insumo) => {
      closeModal();
      await query.setQueryData(['proveedores'], (oldInsumo?: Insumo[]) => {
        if (oldInsumo == null) return [newInsumo];
        return [...oldInsumo, newInsumo];
      });
    },
    
  })

  return {
    insumos,
    PostInsumo
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