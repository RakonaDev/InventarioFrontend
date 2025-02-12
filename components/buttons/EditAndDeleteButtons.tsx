import React from "react";
import { FaEye, FaPencil, FaTrashCan } from "react-icons/fa6";

export const EditAndDeleteButtons = ({
  onEdit,
  onDelete,
  onView
}: {
  onView?: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) => {
  return (
    <div className="xl:col-span-2 flex flex-wrap items-center text-sm gap-3 justify-center min-w-[150px]">
      <button title="ver" type="button" className="text-blue-500" onClick={onView}>
        <FaEye size={20}/>
      </button>
      <button title="edit" type="button" className="text-green-500" onClick={onEdit}>
        <FaPencil size={20}/>
      </button>
      <button title="delete" type="button" className="text-red-500" onClick={onDelete}>
        <FaTrashCan size={20}/>
      </button>
    </div>
  );
};
