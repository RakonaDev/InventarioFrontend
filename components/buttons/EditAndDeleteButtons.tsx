import React from "react";
import { FaPencil, FaTrashCan } from "react-icons/fa6";

export const EditAndDeleteButtons = ({
  onEdit,
  onDelete,
}: {
  onEdit: () => void;
  onDelete: () => void;
}) => {
  return (
    <div className="xl:w-full flex items-center text-sm gap-3 justify-center min-w-[150px]">
      <button title="edit" type="button" className="text-green-500" onClick={onEdit}>
        <FaPencil />
      </button>
      <button title="delete" type="button" className="text-red-500" onClick={onDelete}>
        <FaTrashCan />
      </button>
    </div>
  );
};
