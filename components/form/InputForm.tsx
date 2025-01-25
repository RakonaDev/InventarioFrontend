/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { FC, useState } from "react";
import { LuEyeClosed } from "react-icons/lu";
import { LuEye } from "react-icons/lu";
type InputType = React.InputHTMLAttributes<HTMLInputElement>["type"];

interface InputFormInterface {
  label: string;
  type: InputType;
  id: string;
  name: string;
  placeholder: string;
  className?: string
  onChange?: any;
  onBlur?: any;
  value?: any;
}

export const InputForm: FC<InputFormInterface> = ({
  label,
  type,
  id,
  name,
  placeholder,
  className,
  onChange,
  onBlur,
  value,
}) => {
  const [verContrasena, setVerContrasena] = useState<boolean>(false);

  return (
    <div >
      <label htmlFor={id} className="block text-sm text-black-900">
        {label}
      </label>
      <div className="w-full relative">
        <input
          type={type === "password" && verContrasena ? "text" : type}
          id={id}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          name={name}
          autoComplete="off"
          className={`mt-1 block w-full px-4 py-2 border-2 rounded-main shadow-sm focus:outline-none focus:border-secundario-300 ${className}`}
          placeholder={placeholder}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={() => {
              setVerContrasena(!verContrasena);
            }}
            className="absolute top-0 right-5 bottom-0 my-aut text-black-900"
          >
            {verContrasena ? <LuEye /> : <LuEyeClosed />}
          </button>
        )}
      </div>
    </div>
  );
};
