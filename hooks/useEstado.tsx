import { useQuery } from "@tanstack/react-query";
import { apiURL } from "../helper/global";
import { EstadoInterface } from "@/interfaces/EstadoInterface";

const fetchEstados = async () => {
  try{
    const response = await fetch(`${apiURL}/getEstados`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include'
    });
    const data = await response.json();
    return data;
  }
  catch (error) {
    console.log(error)
  }
};

export function useEstado () {
  const { data: estados } = useQuery<EstadoInterface[]>({
    queryKey: ['estados'],
    queryFn: fetchEstados,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false
  })

  return {
    estados
  }
}