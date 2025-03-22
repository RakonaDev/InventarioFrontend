'use client'

import { RolesResponse, RolInterface } from "@/interfaces/RolInterface";
import { useState } from "react";
import { motion } from "framer-motion";
import { ButtonOpenModal } from "../../buttons/ButtonOpenModal";
import AgregarRol from "./AgregarRol";
import { HeadTablePC } from "../../dashboard/table/HeadTablePC";
import { Pagination, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import ListRoles from "./ListaRoles";
import { TableTitle } from "@/interfaces/TableTitle";

const ItemsRolesTable: TableTitle[] = [
  { nombre: "ID Rol", className: "min-w-[100px] xl:col-span-2" },
  { nombre: "Nombre", className: "min-w-[200px] xl:col-span-2" },
  { nombre: "Fecha de Creación", className: "min-w-[200px] xl:col-span-2" },
  { nombre: "Fecha de Actualización", className: "min-w-[200px] xl:col-span-3" }
]

export default function RolesPagina({ rolesData }: { rolesData: RolesResponse }) {
  const router = useRouter()
  const [roles, setRoles] = useState<RolInterface[]>(rolesData.roles)

  function nextPage(event: React.ChangeEvent<unknown>, value: number) {
    router.push(`/dashboard/roles/${value}`)
  }

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
        <div className='w-full min-h-[45dvh] bg-white-main'>
          <ListRoles roles={roles} setRoles={setRoles} />
        </div>
      </div>
      <div className='w-full flex justify-center pt-5'>
        <Stack spacing={2}>
          <Pagination count={rolesData?.totalPages} page={rolesData.currentPage} onChange={nextPage} />
        </Stack>
      </div>
    </>
  );
}