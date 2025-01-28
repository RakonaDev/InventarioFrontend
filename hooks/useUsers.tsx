'use client'
import { ListUserInterface } from "@/interfaces/ListUserInterface";
import { apiURL } from "../helper/global";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAdmin } from "../context/AdminContext";
import { toast } from "sonner";

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
    if (response.status === 401) {
      window.location.href = '/login'
    }
    const data = await response.json();
    console.log(data)
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
    if (response.status === 401) {
      window.location.href = '/login'
    }
    const data = await response.json()
    return data.user
  } 
  catch (error) {
    console.log(error)
  }
}

const patchUser = async (updatedUser: ListUserInterface) => {
  try {
    const response = await fetch(`${apiURL}/user`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: 'include',
      body: JSON.stringify(updatedUser)
    })
    if (response.status === 401) {
      window.location.href = '/login'
    }
    const data = await response.json()
    return data.user
  } catch (error) {
    console.log(error)
  }
}

const deleteUser = async (id: number) => {
  try {
    const response = await fetch(`${apiURL}/user`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: 'include',
      body: JSON.stringify({
        id
      })
    })
    if (response.status === 401) {
      window.location.href = '/login'
    }
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
    refetchOnMount: false
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

  const { mutate: EditarUser } = useMutation({
    mutationFn: patchUser,
    onSuccess: async (updatedUser: ListUserInterface) => {
      setModalContent(null)
      closeModal()
      await query.setQueryData(['users'], (oldUsers: ListUserInterface[]) => {
        return oldUsers.map((user: ListUserInterface) =>
          user.id === updatedUser.id ? updatedUser : user
        );
      })
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })

  const { mutate: DeleteUser } = useMutation({
    mutationFn: deleteUser,
    onSuccess: async (userDeleted: ListUserInterface) => {
      setModalContent(null)
      closeModal()
      await query.setQueryData(['users'], (oldUsers: ListUserInterface[]) => {
        return oldUsers.filter((user: ListUserInterface) => user.id !== userDeleted.id)
      })
    }
  })
  
  return {
    users,
    mutate,
    EditarUser,
    DeleteUser
  }
}