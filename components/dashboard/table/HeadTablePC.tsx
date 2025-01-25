import React from "react";
import { TableTitle } from "../../../app/(admin)/dashboard/usuarios/page";

export const HeadTablePC = ({
  className,
  titlesTable,
}: {
  className?: string;
  titlesTable: TableTitle[];
}) => {
  return (
    <div
      className={`w-full grid   font-medium ${
        className ?? "grid-cols-8 "
      }`}
    >
      {titlesTable.map((title: TableTitle) => (
        <div
          className={`${title.className} w-full`}
          key={`titleTable-${title.nombre}`}
        >
          {title.nombre}
        </div>
      ))}

      <div className="w-full text-center">Acciones</div>
    </div>
  );
};
