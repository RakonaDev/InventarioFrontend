 
import { NextRequest, NextResponse } from "next/server";
/*
import cookie from 'cookie';
import { jwtDecode } from "jwt-decode";
*/
export function middleware(req: NextRequest){
  
}
/* 
export function middleware(req: NextRequest) {
  const token = req.cookies.get('jwt_token'); 
  console.log('El token es ',token)
  if (!token) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/user/:path*", "/"],
};
*/
