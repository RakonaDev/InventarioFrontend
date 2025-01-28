"use client";
import React from "react";
import { motion } from "framer-motion";
import { TableTitle } from "../usuarios/page";
import { ButtonOpenModal } from "../../../../components/buttons/ButtonOpenModal";
import { HeadTablePC } from "../../../../components/dashboard/table/HeadTablePC";
import AgregarProveedor from "../../../../components/modal/proveedores/AgregarProveedor";
import ListProveedores from "../../../../components/dashboard/table/proveedores/ListProveedores";

const ItemsProveedorTable: TableTitle[] = [
  { nombre: "ID", className: "col-span-1" },
  { nombre: "Nombre", className: "" },
  { nombre: "Contacto", className: "col-span-1" },
  { nombre: "Correo", className: "col-span-2" },
  { nombre: "Ubicación", className: "col-span-2" },
  { nombre: "Fecha de Registro", className: "col-span-2" },
  { nombre: "Fecha de Actualización", className: "col-span-2" },
];

export default function ProveedoresPage() {
  return (
    <>
      <div className="w-full  flex items-center mb-6 justify-between">
        <div className="w-fit flex items-center gap-6">
          <motion.h2 
            className="text-2xl font-medium" 
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
          >
            Proveedores
          </motion.h2>
        </div>
        <ButtonOpenModal
          modal={<AgregarProveedor />}
          text="Agregar Proveedor"
        />
      </div>
      <div className="w-full bg-white-main p-5">
        <HeadTablePC
          titlesTable={ItemsProveedorTable}
          className="mb-6 grid-cols-12 text-gray-400 border-b pb-5"
        />
        <ListProveedores />
      </div>
    </>
  );
}
