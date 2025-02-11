import { EstadoInterface } from "./EstadoInterface";
import { RolInterface } from "./RolInterface";

export interface ListUserInterface {
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
  created_at?: Date
  updated_at?: Date
}
