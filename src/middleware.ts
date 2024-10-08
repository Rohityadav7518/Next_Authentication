import { NextRequest,NextResponse } from "next/server";

export default async function GET(request:NextRequest) {
    const path = request.nextUrl.pathname

const publicPath = path === "/login" || path === "/signup" || path === "/verifyemail"
 const token = await request.cookies.get("token")?.value || ""
if (publicPath && token) {
     return NextResponse.redirect(new URL("/profile",request.nextUrl))
}

if (!publicPath && !token) {
    return NextResponse.redirect(new URL('/login',request.nextUrl))
}
}

export const config = {
    matcher:[
"/",
"/profile",
"/signup",
"/login",
"/verifyemail"
    ]
}