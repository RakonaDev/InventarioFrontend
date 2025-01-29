export interface Insumo {
  id?: number;
  precio: number
  nombre: string;
  imagenes?: string;
  imagen?: File
  descripcion: string;
  id_categoria: number;
  id_tipo_insumo: number;
  id_proveedor: number;
  fecha_vencimiento: Date;
  vida_util_dias: number;
}
