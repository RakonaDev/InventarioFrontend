import { useQuery } from "@tanstack/react-query";
import { apiURL } from "../fonts/helper/global";
import { Me } from "@/interfaces/MyInfoInterface";

const fetchMe = async () => {
  const response = await fetch(`${apiURL}/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    credentials: 'same-origin',
  });
  if (response.status === 401) {
    window.location.href = '/login'
  }
  const data = await response.json();
  return data;
};

export function useMe () {
  const { data: me } = useQuery<Me>({
    queryKey: ['me'],
    queryFn: fetchMe,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false
  })

  return {
    me
  }
}