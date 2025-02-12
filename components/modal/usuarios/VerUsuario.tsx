import { ListUserInterface } from "@/interfaces/ListUserInterface";
import { parseToLocalTime } from "../../../logic/parseToLocalTime";

/**
 * 
 * export interface ListUserInterface {
   id?: number;
   names: string;
   last_names: string;
   tel: string;
   email: string;
   id_estado: number;
   id_roles: number;
   dni: string;
   age: number;
   password?: string;
   estado?: EstadoInterface
   roles?: RolInterface
 } 
 */

export function VerUsuario({ usuario }: { usuario: ListUserInterface }) {
  return (
    <div className="w-full p-4 space-y-5">
      <h1 className="text-center font-bold text-xl lg:text-3xl">Información del Usuario</h1>
      <section className="w-full flex gap-5 max-md:flex-wrap">
        <div className="max-md:w-full md:w-1/2 min-w-[20rem]">
          <p className="font-bold text-lg">Nombre:</p>
          <p>{usuario.names}</p>
        </div>
        <div className="max-md:w-full md:w-1/2 min-w-[20rem]">
          <p className="font-bold text-lg">Apellidos:</p>
          <p>{usuario.last_names}</p>
        </div>
      </section>
      <section className="w-full flex gap-5 max-md:flex-wrap">
        <div className="max-md:w-full md:w-1/2 min-w-[20rem]">
          <p className="font-bold text-lg">DNI:</p>
          <p>{usuario.dni}</p>
        </div>
        <div className="max-md:w-full md:w-1/2 min-w-[20rem]">
          <p className="font-bold text-lg">Edad:</p>
          <p>{usuario.age}</p>
        </div>
      </section>
      <section className="w-full flex gap-5 max-md:flex-wrap">
        <div className="max-md:w-full md:w-1/2 min-w-[20rem]">
          <p className="font-bold text-lg">Celular:</p>
          <p>{usuario.tel}</p>
        </div>
        <div className="max-md:w-full md:w-1/2 min-w-[20rem]">
          <p className="font-bold text-lg">Rol:</p>
          <p>{usuario.roles?.name}</p>
        </div>
      </section>
      <section className="w-full flex gap-5 max-md:flex-wrap">
        <div className="max-md:w-full md:w-1/2 min-w-[20rem]">
          <p className="font-bold text-lg">Email:</p>
          <p>{usuario.email}</p>
        </div>
        <div className="max-md:w-full md:w-1/2 min-w-[20rem]">
          <p className="font-bold text-lg">Estado de la Cuenta:</p>
          <p>{usuario.estado?.nombre}</p>
        </div>
      </section>
      <section className="w-full flex gap-5 max-md:flex-wrap">
        <div className="max-md:w-full md:w-1/2 min-w-[20rem]">
          <p className="font-bold text-lg">Fecha de Creacion:</p>
          <p>{parseToLocalTime(usuario.created_at)}</p>
        </div>
        <div className="max-md:w-full md:w-1/2 min-w-[20rem]">
          <p className="font-bold text-lg">Fecha de Actualizacion:</p>
          <p>{parseToLocalTime(usuario.updated_at)}</p>
        </div>
      </section>
    </div>
  )
}