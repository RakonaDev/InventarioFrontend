/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import cookie from 'cookie';
import { jwtDecode } from "jwt-decode";

export function middleware(req: NextRequest) {
  const token = req.cookies.getAll(); 
  console.log(token)
  if (!token) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }
  /*
  try {
    const tokenDecodificado = jwtDecode<any>(token) as {
      role: string;
      id: string;
    };

    const { role } = tokenDecodificado;

    if (req.nextUrl.pathname === "/dashboard" && role !== "admin" && role !== "user") {
      const url = req.nextUrl.clone();
      url.pathname = "/403";
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Error al verificar el token:", error);

    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }
    */
}

export const config = {
  matcher: ["/dashboard/:path*", "/user/:path*", "/"],
};
