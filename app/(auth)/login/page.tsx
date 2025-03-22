/* eslint-disable @next/next/no-img-element */
'use client'
import { NextPage } from "next";
import { FormLogin } from "../@components/FormLogin";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

const Page: NextPage = ({ }) => {
  const router: AppRouterInstance = useRouter()
  console.log(Date.now(), "FormLogin - Renderizado:", typeof window === 'undefined' ? "Servidor" : "Cliente");
  console.log(Date.now(), "FormLogin - Router:", router);
  return (
    <div className="flex justify-center items-center min-h-screen bg-fondo-main relative z-10">
      <img
        src="/assets/svg/login/wave1.svg"
        alt=""
        className="absolute bottom-0 left-0 -z-10 select-none"
      />
      <div className="w-full max-w-md bg-white-main p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Iniciar sesión</h2>

        <FormLogin
          router={router}
        />
      </div>
    </div>
  );
};

export default Page;
