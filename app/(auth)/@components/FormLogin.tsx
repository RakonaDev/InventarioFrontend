"use client";
import axios from "axios";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { useFormik } from "formik";
import { SchemaLogin } from "@/schemas/AuthSchemas";
import { InputForm } from "../../../components/form/InputForm";
import { Errors } from "../../../components/form/Errors";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { apiURL } from "../../../helper/global";

export const FormLogin = ({router}: {router: AppRouterInstance}) => {
  const [loadLogin, setLoadLogin] = useState<boolean>(false);
  const ingresarLogin = async (values: any): Promise<void> => {
    setLoadLogin(true);
    const data = new FormData();
    data.append("email", values.email);
    data.append("password", values.password);

    try {
      const response = await axios.post(
        `${apiURL}/login`,
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true
        }
      );

      console.log(response);

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        toast.success(response.data.message);
        setLoadLogin(true);
        router.push('/dashboard/usuarios')
      }
    } catch (error: any) {
      console.log(error);
      setLoadLogin(false);
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setLoadLogin(false);
    }
  };

  const {
    handleSubmit,
    handleChange,
    errors,
    values,
    touched,
    handleBlur,
    isSubmitting,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: SchemaLogin,
    onSubmit: ingresarLogin,
  });

  useEffect(() => {
    if (errors && isSubmitting) {
      const firstErrorKey = Object.keys(errors)[0];
      const firstErrorElement = document.getElementsByName(firstErrorKey)[0];
      if (firstErrorElement) {
        firstErrorElement.focus();
      }
    }
  }, [touched, errors, isSubmitting]);
  return (
    <form onSubmit={handleSubmit}>
      <div className="w-full">
        <InputForm
          id="email"
          label="Email"
          name="email"
          placeholder="Escribe tu email"
          type="email"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.email}
          className={`${
            errors.email && touched.email
              ? "border-red-500 focus:border-red-500"
              : ""
          }`}
        />
        <Errors errors={errors.email} touched={touched.email} />
      </div>
      <div className="w-full">
        <InputForm
          id="password"
          label="Contraseña"
          name="password"
          placeholder="Escribe tu contraseña"
          type="password"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.password}
          className={`${
            errors.password && touched.password
              ? "border-red-500 focus:border-red-500"
              : ""
          }`}
        />
        <Errors errors={errors.password} touched={touched.password} />
      </div>

      <div className="flex items-center justify-between mt-8 mb-4">
        <button
          type={loadLogin ? "button" : "submit"}
          className="w-full bg-primario-main text-black-900 font-semibold py-2 px-4 rounded-md hover:bg-primario-500 focus:outline-none"
        >
          {loadLogin ? "Ingresando..." : "Iniciar sesión"}
        </button>
      </div>

      <div className="text-center">
        <p className="text-sm text-gray-600">
          Diseñado por{" "}
          <a
            href="htpps://logosperu.com.pe"
            target="_blank"
            className="text-secundario-main hover:text-secundario-600"
          >
            Logos Perú
          </a>
        </p>
      </div>
    </form>
  );
};
