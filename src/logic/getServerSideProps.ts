import { config } from "@/config/config"
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getServerSideProps(url: string) {
  const cookieStore = await cookies(); 
  const token = cookieStore.get("jwt_token")?.value;
  console.log(token)
  try {
    const res = await fetch(`${config.apiUrl}/${url}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        Cookie: `jwt_token=${token}`,
      },
    });
    
    if (res.status === 401) {
      console.log("Algo pasó")
      redirect('/login')
    }
    if (res.status !== 200) {
      console.log("Algo pasó")
    }
    
    console.log("aqui renderizo")
    const data = await res.json();
    console.log("DATA: ", data);
    return data;
  } catch (error) {
    console.log("Error al obtener los roles");
    console.log(error);
    redirect('/login')
  }
}