import { CategoriaInterface } from "@/interfaces/CategoriaInterface";
import { useAdmin } from "../../../context/AdminContext";
import EditarCategoria from "./EditarCategoria";
import EliminarCategoria from "./EliminarCategoria";
import { VerCategoria } from "./VerCategoria";
import { EditAndDeleteButtons } from "../../buttons/EditAndDeleteButtons";
import { parseToLocalTime } from "../../../logic/parseToLocalTime";
import { Dispatch, SetStateAction } from "react";

export default function ListCategorias({ categorias, setCategorias }: { categorias: CategoriaInterface[], setCategorias: Dispatch<SetStateAction<CategoriaInterface[]>> }) {
  const { openModal, setModalContent } = useAdmin();
  const handeEditarCategoria = (categoria: CategoriaInterface) => {
    setModalContent(<EditarCategoria categoria={categoria} setCategorias={setCategorias} />);
    openModal();
  };
  const handleEliminarCategoria = (id: number) => {
    setModalContent(<EliminarCategoria id={id} />);
    openModal();
  };
  const handleVerCategoria = (categoria: CategoriaInterface) => {
    setModalContent(<VerCategoria categoria={categoria} />)
    openModal()
  }

  return (
    <div className="w-full space-y-6 bg-white-main">
      {categorias.map((categoria: CategoriaInterface) => (
        <div className="w-full flex gap-5 xl:grid xl:grid-cols-12 text-black-700" key={categoria.id}>
          <div className="w-full min-w-[100px] xl:col-span-2 flex justify-center  items-center text-sm">
            <p>{categoria.id}</p>
          </div>
          <div className="w-full min-w-[150px] xl:col-span-2 flex justify-center  items-center text-sm">
            <p>{categoria.nombre}</p>
          </div>
          <div className="w-full min-w-[200px] xl:col-span-2 flex justify-center  items-center text-sm">
            <p>{parseToLocalTime(new Date(categoria.created_at || 0))}</p>
          </div>
          <div className="w-full min-w-[200px] xl:col-span-3 flex justify-center  items-center text-sm">
            <p>{parseToLocalTime(new Date(categoria.updated_at || 0))}</p>
          </div>
          <EditAndDeleteButtons
            onView={() => handleVerCategoria(categoria)}
            onEdit={() => handeEditarCategoria(categoria)}
            onDelete={() => handleEliminarCategoria(categoria.id || 0)}
          />
        </div>
      ))}
    </div>
  );
}