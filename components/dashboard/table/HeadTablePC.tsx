import { TableTitle } from "@/interfaces/TableTitle";
import React from "react";

export const HeadTablePC = ({
  className,
  titlesTable,
  nededActions = true,
}: {
  nededActions?: boolean;
  className?: string;
  titlesTable: TableTitle[];
}) => {
  return (
    <div
      className={`w-full flex gap-2 xl:grid font-medium ${
        className ?? "xl:grid-cols-8 "
      }`}
    >
      {titlesTable.map((title: TableTitle) => (
        <div
          className={`${title.className} w-full text-center`}
          key={`titleTable-${title.nombre}`}
        >
          {title.nombre}
        </div>
      ))}

      {nededActions && <div className="lg:col-span-2 text-center min-w-[150px]">Acciones</div>}
    </div>
  );
};
