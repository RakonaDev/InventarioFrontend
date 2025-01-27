import { useQuery } from "@tanstack/react-query";
import { apiURL } from "../helper/global";
import { RolInterface } from "@/interfaces/RolInterface";

const fetchRoles = async () => {
  try{
    const response = await fetch(`${apiURL}/getRoles`, {
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

export function useRol () {
  const { data: roles } = useQuery<RolInterface[]>({
    queryKey: ['roles'],
    queryFn: fetchRoles,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false
  })
  
  return {
    roles
  }
}