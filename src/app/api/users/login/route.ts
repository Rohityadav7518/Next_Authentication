import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { Connect } from "@/dbConfig/dbConfig"
import bcryptjs from 'bcryptjs'
import jwt from "jsonwebtoken"


Connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { email, username, password } = reqBody;
        const user = await User.findOne({email})
        if (!user) {
            return NextResponse.json({
                message: "User NOt Found"
            }, { status: 400 })
        }

        const validatePass = await bcryptjs.compare(password, user.password)
        if (!validatePass) {
            return NextResponse.json({
                message: "Incorrect Password"
            }, {
                status: 400
            })
        }

        const tokenData = {
            id: user._id,
            email: user.email,
            username: user.username
        }

        const token = await jwt.sign(tokenData, process.env.JWT_SECRET!, { expiresIn: "1h" })
        const response = NextResponse.json({
            message: "Login Successfully",
            success: true
        })
        response.cookies.set("token", token, { httpOnly: true })

        return response;

    } catch (error: any) {
        throw new Error("Login Failed", error)
    }
}