'use client'
import { motion } from "framer-motion";
import { NextPage } from "next";
import { HeadTablePC } from "../../../../components/dashboard/table/HeadTablePC";
import { ButtonOpenModal } from "../../../../components/buttons/ButtonOpenModal";
import { AgregarUsuarios } from "../../../../components/modal/usuarios/AgregarUsuarios";
import { useUsers } from "../../../../hooks/useUsers";
import { Pagination, Stack } from "@mui/material";
import { useUserStore } from "../../../../store/UserStore";
export interface TableTitle {
  nombre: string;
  className?: string;
}

const ItemsUsuariosTable: TableTitle[] = [
  { nombre: "Nombre Completo", className: "lg:col-span-2" },
  { nombre: "Celular", className: "lg:col-span-2" },
  { nombre: "Email", className: "lg:col-span-2 " },
  { nombre: "Estado", className: "lg:col-span-2 " },
  { nombre: "Rol", className: "lg:col-span-2 " },
];

const Page: NextPage = ({ }) => {
  const { RenderListUsers, totalPages, nextPage } = useUsers();
  const { currentPage } = useUserStore()
  return (
    <>
      <div className="w-full mt-10 flex items-center mb-6 justify-between">
        <div className="w-fit flex items-center gap-6">
          <motion.h2
            className="text-2xl font-medium"
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
          >
            Usuarios
          </motion.h2>
        </div>
        <ButtonOpenModal modal={<AgregarUsuarios />} text="Agregar usuario" />
      </div>
      <div className="w-full bg-white-main p-5 overflow-x-auto">
        <HeadTablePC
          titlesTable={ItemsUsuariosTable}
          className="mb-6 flex gap-5 xl:grid-cols-12 text-gray-400 border-b pb-5"
        />
        <RenderListUsers />
      </div>
      <div className='w-full flex justify-center pt-5'>
        <Stack spacing={2}>
          <Pagination count={totalPages} page={currentPage} onChange={nextPage} />
        </Stack>
      </div>
    </>
  );
};

export default Page;
