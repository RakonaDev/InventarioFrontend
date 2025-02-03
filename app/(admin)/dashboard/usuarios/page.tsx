'use client'
import { motion } from "framer-motion";
import { NextPage } from "next";
import { HeadTablePC } from "../../../../components/dashboard/table/HeadTablePC";
import { ButtonOpenModal } from "../../../../components/buttons/ButtonOpenModal";
import { AgregarUsuarios } from "../../../../components/modal/usuarios/AgregarUsuarios";
import { ListUsers } from "../../../../components/dashboard/table/usuarios/ListUsers";
import { useUsers } from "../../../../hooks/useUsers";
export interface TableTitle {
  nombre: string;
  className?: string;
}

const ItemsUsuariosTable: TableTitle[] = [
  { nombre: "Nombre Completo", className: "lg:col-span-2 min-w-[180px]" },
  { nombre: "Celular", className: "lg:col-span-2 min-w-[150px]" },
  { nombre: "Email", className: "lg:col-span-3 min-w-[150px]" },
  { nombre: "Estado", className: "lg:col-span-2 min-w-[150px]" },
  { nombre: "Rol", className: "lg:col-span-2 min-w-[150px]" },
];

const Page: NextPage = ({}) => {
  const { users } = useUsers();
  return (
    <>
      <div className="w-full  flex items-center mb-6 justify-between">
        <div className="w-fit flex items-center gap-6">
          <motion.h2 
            className="text-2xl font-medium"
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
          >
            Usuarios
          </motion.h2>
        </div>
        <ButtonOpenModal modal={<AgregarUsuarios />}  text="Agregar usuario"/>
      </div>
      <div className="w-full bg-white-main p-5 overflow-x-auto">
        <HeadTablePC
          titlesTable={ItemsUsuariosTable}
          className="mb-6 flex gap-5 xl:grid-cols-12 text-gray-400 border-b pb-5"
        />
        <ListUsers usuarios={users} />
      </div>
    </>
  );
};

export default Page;
