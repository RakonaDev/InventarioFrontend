import { useQuery } from "@tanstack/react-query"
import { apiURL } from "../helper/global";
import { CompraInterface } from "@/interfaces/CompraInterface";

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

export function useCompra() {
  const { data: compras, refetch: ActualizarInformacionCompras } = useQuery<CompraInterface[]>({
    queryKey: ['compras'],
    queryFn: fetchCompras,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false
  })

  return {
    compras,
    ActualizarInformacionCompras
  }
}