"use client"
import { useEffect, useState } from "react";
import { apiURL } from "../helper/global";

const fetchInsumos = async () => {
  const response = await fetch(`${apiURL}/getInsumos`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${localStorage.getItem("token") || ''}`,
    },

  });
  const data = await response.json();
  return data;
};

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