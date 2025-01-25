"use client"
import { ButtonOpenModal } from "../../../../components/buttons/ButtonOpenModal";
import { HeadTablePC } from "../../../../components/dashboard/table/HeadTablePC";
import { AgregarInsumo } from "../../../../components/modal/insumos/AgregarInsumo";
import { TableTitle } from "../usuarios/page";
import { ListInsumos } from "../../../../components/dashboard/table/insumos/ListInsumos";
import { useGetInsumos } from "../../../../hooks/useInsumos";

const ItemsInsumosTable: TableTitle[] = [
  { nombre: "Código", className: "" },
  { nombre: "Nombre", className: "col-span-2" },
  { nombre: "Imagen", className: "" },
  { nombre: "Categoría", className: "col-span-2" },
  { nombre: "Tipo de insumo", className: "col-span-2" },
  { nombre: "Fecha de vencimiento", className: "col-span-2" },
  { nombre: "Vida útil", className: "" },
];
/*
const insumos: Insumo[] = [
  {
    id: 1,
    codigo: "A001",
    nombre: "Azúcar Blanco",
    imagen: "https://example.com/imagenes/azucar-blanco.jpg",
    descripcion: "Azúcar blanco refinado para uso alimentario.",
    categoria: "materia_prima",
    tipo_insumo: "Producto alimenticio",
    fecha_creacion: "2025-01-01",
    fecha_vencimiento: "2026-01-01",
    vida_util_dias: 365,
  },
  {
    id: 2,
    codigo: "A002",
    nombre: "Harina de Trigo",
    imagen: "https://example.com/imagenes/harina-trigo.jpg",
    descripcion: "Harina de trigo refinada para panadería.",
    categoria: "materia_prima",
    tipo_insumo: "Producto alimenticio",
    fecha_creacion: "2025-01-10",
    fecha_vencimiento: "2026-01-10",
    vida_util_dias: 365,
  },
  {
    id: 3,
    codigo: "A003",
    nombre: "Aceite Vegetal",
    imagen: "https://example.com/imagenes/aceite-vegetal.jpg",
    descripcion: "Aceite vegetal para uso culinario.",
    categoria: "materia_prima",
    tipo_insumo: "Producto alimenticio",
    fecha_creacion: "2025-01-15",
    fecha_vencimiento: "2026-01-15",
    vida_util_dias: 365,
  },
  {
    id: 4,
    codigo: "A004",
    nombre: "Sal de Mesa",
    imagen: "https://example.com/imagenes/sal-mesa.jpg",
    descripcion: "Sal refinada para uso alimentario.",
    categoria: "materia_prima",
    tipo_insumo: "Producto alimenticio",
    fecha_creacion: "2025-02-01",
    fecha_vencimiento: "2026-02-01",
    vida_util_dias: 365,
  },
  {
    id: 5,
    codigo: "A005",
    nombre: "Leche en Polvo",
    imagen: "https://example.com/imagenes/leche-polvo.jpg",
    descripcion: "Leche en polvo para la elaboración de productos lácteos.",
    categoria: "materia_prima",
    tipo_insumo: "Producto alimenticio",
    fecha_creacion: "2025-01-05",
    fecha_vencimiento: "2026-01-05",
    vida_util_dias: 365,
  },
  {
    id: 6,
    codigo: "A006",
    nombre: "Café Molido",
    imagen: "https://example.com/imagenes/cafe-molido.jpg",
    descripcion: "Café molido 100% natural para bebidas.",
    categoria: "materia_prima",
    tipo_insumo: "Producto alimenticio",
    fecha_creacion: "2025-03-01",
    fecha_vencimiento: "2026-03-01",
    vida_util_dias: 365,
  },
  {
    id: 7,
    codigo: "A007",
    nombre: "Chocolate en Tabletas",
    imagen: "https://example.com/imagenes/chocolate-tabletas.jpg",
    descripcion: "Tabletas de chocolate para repostería.",
    categoria: "materia_prima",
    tipo_insumo: "Producto alimenticio",
    fecha_creacion: "2025-01-20",
    fecha_vencimiento: "2026-01-20",
    vida_util_dias: 365,
  },
  {
    id: 8,
    codigo: "A008",
    nombre: "Manteca de Cerdo",
    imagen: "https://example.com/imagenes/manteca-cerdo.jpg",
    descripcion: "Manteca de cerdo para uso culinario.",
    categoria: "materia_prima",
    tipo_insumo: "Producto alimenticio",
    fecha_creacion: "2025-02-10",
    fecha_vencimiento: "2026-02-10",
    vida_util_dias: 365,
  },
  {
    id: 9,
    codigo: "A009",
    nombre: "Salsas Variadas",
    imagen: "https://example.com/imagenes/salsas-variadas.jpg",
    descripcion: "Salsas de tomate, mayonesa y otras para acompañamientos.",
    categoria: "producto_elaborado",
    tipo_insumo: "Producto alimenticio",
    fecha_creacion: "2025-01-25",
    fecha_vencimiento: "2026-01-25",
    vida_util_dias: 365,
  },
  {
    id: 10,
    codigo: "A010",
    nombre: "Frutos Secos",
    imagen: "https://example.com/imagenes/frutos-secos.jpg",
    descripcion: "Frutos secos para consumo directo o para repostería.",
    categoria: "materia_prima",
    tipo_insumo: "Producto alimenticio",
    fecha_creacion: "2025-01-30",
    fecha_vencimiento: "2026-01-30",
    vida_util_dias: 365,
  },
];
*/
export default function page() {
  const { insumos } = useGetInsumos();
  return (
    <>
      <div className="w-full  flex items-center mb-6 justify-between">
        <div className="w-fit flex items-center gap-6">
          <h2 className="text-2xl font-medium">Insumos</h2>
        </div>
        <ButtonOpenModal modal={<AgregarInsumo />} text="Agregar insumo" />
      </div>
      <div className="w-full bg-white-main p-5">
        <HeadTablePC
          titlesTable={ItemsInsumosTable}
          className="mb-6 grid-cols-12 text-gray-400 border-b pb-5"
        />
        <ListInsumos insumos={insumos} />
      </div>
    </>
  );
}
