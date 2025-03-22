import { Header } from "../../components/estructura/Header";
import { AdminProvider } from "../../context/AdminContext";
import { ModalRender } from "./dashboard/@components/ModalRender";
import { SectionsRender } from "../../components/estructura/HeaderRender";
import { Me } from "@/interfaces/MyInfoInterface";
import { ReactNode } from "react";
import { redirect } from "next/navigation"
import { getServerSideProps } from "@/logic/getServerSideProps";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  try {
    const me: Me = await getServerSideProps(`me`)
    console.log(me)
    return (
      <AdminProvider>
        <Header me={me} />
        <section className="w-full relative flex justify-between h-[calc(100dvh-80px)]">
          <SectionsRender me={me} />
          <div className="w-full flex-1 p-8 overflow-y-auto bg-gray-100">
            {children}
          </div>
        </section>
        <ModalRender />

      </AdminProvider>
    );
  } catch (error) {
    
    console.error('Error fetching /me:', error);
    // Maneja el error aquí, por ejemplo, mostrando un mensaje de error al usuario
    redirect('/login')
    return <div>Error loading data.</div>;
  }
}
