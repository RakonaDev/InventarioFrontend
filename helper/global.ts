'use client'
export const apiURL = "https://apis.logosperu.com/apicinco/public/api"
// export const apiURL = "https://www.apinventario.logosperu.com.pe/api"

import axios from "axios"

// export const apiURL = "http://localhost:8000/api" 
// export const apiURL = "https://127.0.0.1:8000/api"

// const token = localStorage.getItem("token");

export const apiAuth = axios.create({
  baseURL: apiURL,
  withCredentials: true,
})

apiAuth.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});