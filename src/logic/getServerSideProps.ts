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
    
    if (!res.ok) {
      console.log("Algo pasó")
      throw new Error('Error');
      redirect('/login')
      return;
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