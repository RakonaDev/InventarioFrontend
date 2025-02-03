import React from "react";
import { useProveedor } from "../../../../hooks/useProveedor";
import { EditAndDeleteButtons } from "../../../buttons/EditAndDeleteButtons";
import EditarProveedor from "../../../modal/proveedores/EditarProveedor";
import { ProveedorInterface } from "@/interfaces/ProveedorInterface";
import { useAdmin } from "../../../../context/AdminContext";
import { parseToLocalTime } from "../../../../logic/parseToLocalTime";
import EliminarProveedor from "../../../modal/proveedores/EliminarProveedor";

export default function ListProveedores() {
  const { proveedores } = useProveedor();
  const { setModalContent, openModal } = useAdmin();

  const handleEditarRol = (proveedor: ProveedorInterface) => {
    setModalContent(<EditarProveedor proveedor={proveedor} />);
    openModal();
  };
  const handleEliminarRol = (id: number) => {
    setModalContent(<EliminarProveedor id={id} />);
    openModal();
  };

  return (
    <div className="w-full space-y-6">
      {proveedores?.map((proveedor: ProveedorInterface) => (
        <div className="w-full flex gap-5 xl:grid xl:grid-cols-12 text-black-700" key={proveedor.id}>
          <div className="w-full min-w-[100px] xl:col-span-1 flex justify-center  items-center text-sm">
            <p>{proveedor.id}</p>
          </div>
          <div className="w-full min-w-[150px] xl:w-full flex items-center text-sm justify-center ">
            <p>{proveedor.name}</p>
          </div>
          <div className="w-full min-w-[150px] xl:col-span-1 flex items-center text-sm justify-center ">
            <p>{proveedor.phone}</p>
          </div>
          <div className="w-full min-w-[150px] xl:col-span-2 flex items-center text-sm justify-center ">
            <p>{proveedor.email}</p>
          </div>
          <div className="w-full min-w-[150px] xl:col-span-2 flex items-center text-sm justify-center ">
            <p>{proveedor.address}</p>
          </div>
          <div className="w-full min-w-[200px] xl:col-span-2 flex items-center text-sm justify-center ">
            <p>{parseToLocalTime(proveedor.created_at)}</p>
          </div>
          <div className="w-full min-w-[200px] xl:col-span-2 flex items-center text-sm justify-center ">
            <p>{parseToLocalTime(proveedor.updated_at)}</p>
          </div>
          <EditAndDeleteButtons
            onEdit={() => handleEditarRol(proveedor)}
            onDelete={() => handleEliminarRol(proveedor.id || 0)}
          />
        </div>
      ))}
    </div>
  );
}
