import { config } from "@/config/config"
import { cookies } from "next/headers";

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
    console.log("hola")
    /*
    if (!res.ok) {
      console.log("Algo pasó")
      return;
    }
    */
    console.log("aqui, renderizo")
    
    console.log("aqui renderizo")
    const data = await res.json();
    console.log("DATA: ", data);
    return data;
  } catch (error) {
    console.log(error);
  }
}