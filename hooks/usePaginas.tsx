import { PaginasInterface } from "@/interfaces/PaginasInterface";
import { apiURL } from "../helper/global";
import { useQuery } from "@tanstack/react-query";

const fetchPaginas = async () => {
  try{
    const response = await fetch(`${apiURL}/paginas`, {
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

export function usePaginas () {
  const { data: paginas, isError: ErrorPaginas, isLoading: CargandoPaginas } = useQuery<PaginasInterface[]>({
    queryKey: ['paginas'],
    queryFn: fetchPaginas,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false
  })

  return {
    paginas,
    ErrorPaginas,
    CargandoPaginas
  }
}