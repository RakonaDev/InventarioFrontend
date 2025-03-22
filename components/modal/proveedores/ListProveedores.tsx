'use client'

import { ProveedorInterface } from "@/interfaces/ProveedorInterface"
import { EditAndDeleteButtons } from "../../buttons/EditAndDeleteButtons";
import EditarProveedor from "./EditarProveedor";
import EliminarProveedor from "./EliminarProveedor";
import { VerProveedor } from "./VerProveedor";
import { useAdmin } from "../../../context/AdminContext";

export default function ListProveedores({ proveedores, setProveedores }: { proveedores: ProveedorInterface[], setProveedores: React.Dispatch<React.SetStateAction<ProveedorInterface[]>> }) {
  const { setModalContent, openModal } = useAdmin();

  const handleEditarRol = (proveedor: ProveedorInterface) => {
    setModalContent(<EditarProveedor proveedor={proveedor} setProveedores={setProveedores} />);
    openModal();
  };
  const handleEliminarRol = (id: number) => {
    setModalContent(<EliminarProveedor id={id} />);
    openModal();
  };
  const handleVerRol = (proveedor: ProveedorInterface) => {
    setModalContent(<VerProveedor proveedor={proveedor} />)
    openModal()
  }

  return (
    <div className="w-full space-y-6">
      {proveedores?.map((proveedor: ProveedorInterface) => (
        <div className="w-full flex gap-5 xl:grid xl:grid-cols-12 text-black-700" key={proveedor.id}>
          <div className="w-full min-w-[100px] xl:col-span-2 flex justify-center  items-center text-sm cell">
            <p>{proveedor.id}</p>
          </div>
          <div className="w-full min-w-[150px] xl:col-span-2 flex items-center text-sm justify-center cell">
            <p>{proveedor.name}</p>
          </div>
          <div className="w-full min-w-[150px] xl:col-span-2 flex items-center text-sm justify-center cell">
            <p>{proveedor.phone}</p>
          </div>
          <div className="w-full min-w-[150px] xl:col-span-2 flex items-center text-sm justify-center cell">
            <p>{proveedor.email}</p>
          </div>
          <div className="w-full min-w-[150px] xl:col-span-2 flex items-center text-sm justify-center cell">
            <p>{proveedor.address}</p>
          </div>
          <EditAndDeleteButtons
            onView={() => handleVerRol(proveedor)}
            onEdit={() => handleEditarRol(proveedor)}
            onDelete={() => handleEliminarRol(proveedor.id || 0)}
          />
        </div>
      ))}
    </div>
  );
}