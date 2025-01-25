'use client'
import { useEffect, useState } from "react";
import { apiURL } from "../helper/global";

const fetchUsers = async () => {
  const response = await fetch(`${apiURL}/getUsers`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${localStorage.getItem("token") || ''}`,
    },

  });
  const data = await response.json();
  return data;
};

export const useUsers = () => {
  const [users, setUsers] = useState<any[]>([]);
  useEffect(() => {
    fetchUsers().then((data) => setUsers(data));
  }, []);
  return { users, setUsers };
}