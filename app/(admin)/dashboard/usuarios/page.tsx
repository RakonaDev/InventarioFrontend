'use client'
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
  { nombre: "Nombre Completo", className: "col-span-2" },
  { nombre: "Celular", className: "col-span-2" },
  { nombre: "Email", className: "col-span-3" },
  { nombre: "Estado", className: "col-span-2" },
  { nombre: "Rol", className: "col-span-2" },
];

/*
const usuarios: ListUserInterface[] = [
  {
    id: 1,
    nombres: "Carlos",
    apellidos: "Pérez",
    celular: "+51987654321",
    email: "carlos.perez@example.com",
    estado: "activo",
    rol: "administrador",
    dni: "12345678",
    edad: 35,
  },
  {
    id: 2,
    nombres: "María",
    apellidos: "López",
    celular: "+51976543210",
    email: "maria.lopez@example.com",
    estado: "activo",
    rol: "usuario",
    dni: "23456789",
    edad: 28,
  },
  {
    id: 3,
    nombres: "Javier",
    apellidos: "Torres",
    celular: "+51965432109",
    email: "javier.torres@example.com",
    estado: "inactivo",
    rol: "moderador",
    dni: "34567890",
    edad: 40,
  },
  {
    id: 4,
    nombres: "Luisa",
    apellidos: "García",
    celular: "+51954321098",
    email: "luisa.garcia@example.com",
    estado: "activo",
    rol: "usuario",
    dni: "45678901",
    edad: 25,
  },
  {
    id: 5,
    nombres: "Fernando",
    apellidos: "Castillo",
    celular: "+51943210987",
    email: "fernando.castillo@example.com",
    estado: "inactivo",
    rol: "administrador",
    dni: "56789012",
    edad: 45,
  },
  {
    id: 6,
    nombres: "Ana",
    apellidos: "Ramírez",
    celular: "+51932109876",
    email: "ana.ramirez@example.com",
    estado: "activo",
    rol: "moderador",
    dni: "67890123",
    edad: 32,
  },
  {
    id: 7,
    nombres: "Diego",
    apellidos: "Flores",
    celular: "+51921098765",
    email: "diego.flores@example.com",
    estado: "activo",
    rol: "usuario",
    dni: "78901234",
    edad: 27,
  },
  {
    id: 8,
    nombres: "Sofía",
    apellidos: "Martínez",
    celular: "+51910987654",
    email: "sofia.martinez@example.com",
    estado: "inactivo",
    rol: "moderador",
    dni: "89012345",
    edad: 30,
  },
  {
    id: 9,
    nombres: "Ricardo",
    apellidos: "Chávez",
    celular: "+51909876543",
    email: "ricardo.chavez@example.com",
    estado: "activo",
    rol: "administrador",
    dni: "90123456",
    edad: 38,
  },
  {
    id: 10,
    nombres: "Laura",
    apellidos: "Vega",
    celular: "+51908765432",
    email: "laura.vega@example.com",
    estado: "activo",
    rol: "usuario",
    dni: "01234567",
    edad: 26,
  },
];
*/
const Page: NextPage = ({}) => {
  const { users } = useUsers();
  return (
    <>
      <div className="w-full  flex items-center mb-6 justify-between">
        <div className="w-fit flex items-center gap-6">
          <h2 className="text-2xl font-medium">Usuarios</h2>
        </div>
        <ButtonOpenModal modal={<AgregarUsuarios />}  text="Agregar usuario"/>
      </div>
      <div className="w-full bg-white-main p-5">
        <HeadTablePC
          titlesTable={ItemsUsuariosTable}
          className="mb-6 grid-cols-12 text-gray-400 border-b pb-5"
        />
        <ListUsers usuarios={users} />
      </div>
    </>
  );
};

export default Page;
