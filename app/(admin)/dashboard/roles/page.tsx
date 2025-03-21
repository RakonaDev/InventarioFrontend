'use client'
import { Pagination, Stack } from "@mui/material";
import { ButtonOpenModal } from "../../../../components/buttons/ButtonOpenModal";
import { HeadTablePC } from "../../../../components/dashboard/table/HeadTablePC";
import ListRoles from "../../../../components/dashboard/table/roles/ListRoles";
import AgregarRol from "../../../../components/modal/roles/AgregarRol";
import { TableTitle } from "../usuarios/page";
import { motion } from "framer-motion";
import { useRol } from "../../../../hooks/useRol";
import { useRolesStore } from "../../../../store/RolesStore";

const ItemsRolesTable: TableTitle[] = [
  { nombre: "ID Rol", className: "min-w-[100px] xl:col-span-2" },
  { nombre: "Nombre", className: "min-w-[200px] xl:col-span-2" },
  { nombre: "Fecha de Creación", className: "min-w-[200px] xl:col-span-2" },
  { nombre: "Fecha de Actualización", className: "min-w-[200px] xl:col-span-3" }
]

export default function RolesPage() {
  const { nextPage, rolesData } = useRol()
  const { currentPage } = useRolesStore()
  return (
    <>
      <div className="w-full mt-10 flex items-center mb-6 justify-between">
        <div className="w-fit flex items-center gap-6">
          <motion.h2
            className="text-2xl font-medium"
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
          >
            Roles
          </motion.h2>
        </div>
        <ButtonOpenModal modal={<AgregarRol />} text="Agregar Rol" />
      </div>
      <div className="w-full bg-white-main p-5 overflow-x-auto">
        <HeadTablePC
          titlesTable={ItemsRolesTable}
          className="mb-6 flex gap-5 xl:grid-cols-12 text-gray-400 border-b pb-5"
        />
        <ListRoles />
      </div>
      <div className='w-full flex justify-center pt-5'>
        <Stack spacing={2}>
          <Pagination count={rolesData?.totalPages} page={currentPage} onChange={nextPage} />
        </Stack>
      </div>
    </>
  );
}
