import { NextRequest } from "next/server";
import jwt from 'jsonwebtoken'

export async function getTokenData(request: NextRequest) {
    try {
        const token = await request.cookies.get("token")?.value || ""

        const decodeToken: any = await jwt.verify(token, process.env.JWT_SECRET!)
        return decodeToken.id
    } catch (error: any) {
        throw new Error(error.message)
    }
}