'use client'
import { ButtonOpenModal } from "../../../../components/buttons/ButtonOpenModal";
import { HeadTablePC } from "../../../../components/dashboard/table/HeadTablePC";
import ListRoles from "../../../../components/dashboard/table/roles/ListRoles";
import AgregarRol from "../../../../components/modal/roles/AgregarRol";
import { TableTitle } from "../usuarios/page";
import { motion } from "framer-motion";

const ItemsRolesTable: TableTitle[] = [
  { nombre: "ID", className: "col-span-2" },
  { nombre: "Nombre", className: "col-span-2" },
  { nombre: "Fecha de Creación", className: "col-span-2" },
  { nombre: "Fecha de Actualización", className: "col-span-3" }  
]

export default function RolesPage() {
  return (
    <>
      <div className="w-full  flex items-center mb-6 justify-between">
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
      <div className="w-full bg-white-main p-5">
        <HeadTablePC
          titlesTable={ItemsRolesTable}
          className="mb-6 grid-cols-12 text-gray-400 border-b pb-5"
        />
        <ListRoles />
      </div>
    </>
  );
}
