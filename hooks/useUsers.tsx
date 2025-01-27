'use client'
import { ListUserInterface } from "@/interfaces/ListUserInterface";
import { apiURL } from "../helper/global";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAdmin } from "../context/AdminContext";

// FETCH USERS
const fetchUsers = async () => {
  try{
    const response = await fetch(`${apiURL}/getUsers`, {
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

const postUser = async (newUser: ListUserInterface) => {
  try {
    const response = await fetch(`${apiURL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include',
      body: JSON.stringify(newUser)
    })
    const data = await response.json()
    return data.user
  } 
  catch (error) {
    console.log(error)
  }
}

// HOOK USERS
export const useUsers = () => {
  const query = useQueryClient()
  const { closeModal, setModalContent } = useAdmin()
  const { data: users } = useQuery<ListUserInterface[]>({
    queryKey: ['users'],
    queryFn: fetchUsers,
    refetchOnWindowFocus: false,
  })

  const { mutate } = useMutation({
    mutationFn: postUser,
    onSuccess: async (newUser: ListUserInterface) => {
      setModalContent(null)
      closeModal()
      await query.setQueryData(['users'], (oldUsers?: ListUserInterface[]) => {
        if (oldUsers == null) return [newUser]
        return [...oldUsers, newUser]
      })
    }
  })
  
  return {
    users,
    mutate
  }
}