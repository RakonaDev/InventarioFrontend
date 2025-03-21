import { RolInterface } from "@/interfaces/RolInterface";
import { parseToLocalTime } from "../../../logic/parseToLocalTime";
import { EditAndDeleteButtons } from "../../buttons/EditAndDeleteButtons";
import { useAdmin } from "../../../context/AdminContext";
import EliminarRol from "./EliminarRol";
import { VerRol } from "./VerRol";
import EditarRoles from "./EditarRol";

export default function ListRoles({ roles, setRoles }: { roles: RolInterface[], setRoles: React.Dispatch<React.SetStateAction<RolInterface[]>> }) {
  const { setModalContent, openModal } = useAdmin();
  const handleEditarRol = (rol: RolInterface) => {
    setModalContent(<EditarRoles rol={rol} setRoles={setRoles} />)
    openModal()
  };
  const handleEliminarRol = (id: number) => {
    setModalContent(<EliminarRol id={id} />)
    openModal()
  };
  const handleVerRol = (rol: RolInterface) => {
    setModalContent(<VerRol rol={rol} />)
    openModal()
  }

  return (
    <div className="w-full space-y-6">
      {roles?.map((rol: RolInterface) => (
        <div className="w-full flex gap-5 xl:grid xl:grid-cols-12 text-black-700" key={rol.id}>
          <div className="w-full min-w-[100px] xl:col-span-2 flex items-center text-sm justify-center ">
            <p>{rol.id}</p>
          </div>
          <div className="w-full min-w-[200px] xl:col-span-2 flex items-center text-sm justify-center ">
            <p>{rol.name}</p>
          </div>
          <div className="w-full min-w-[200px] xl:col-span-2 flex items-center text-sm justify-center ">
            <p>{parseToLocalTime(rol.created_at)}</p>
          </div>
          <div className="w-full min-w-[200px] xl:col-span-3 flex items-center text-sm justify-center ">
            <p>{parseToLocalTime(rol.updated_at)}</p>
          </div>
          <EditAndDeleteButtons
            onView={() => handleVerRol(rol)}
            onEdit={() => handleEditarRol(rol)}
            onDelete={() => handleEliminarRol(rol.id || 0)}
          />
        </div>
      ))}
    </div>
  );
}