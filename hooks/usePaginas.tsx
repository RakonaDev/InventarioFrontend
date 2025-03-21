import { PaginasInterface } from "@/interfaces/PaginasInterface";
import { apiAuth } from "../fonts/helper/global";
import { useQuery } from "@tanstack/react-query";

const fetchPaginas = async () => {
  try{
    
    const response = await apiAuth.get('/paginas')
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