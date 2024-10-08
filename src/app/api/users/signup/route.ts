import { Connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'
import { sendEamil } from "@/helper/mailer";


 Connect()
export async function POST(request: NextRequest) {
    try {
       
         
        const reqBody = await request.json()
        const { email, username, password } = reqBody
        const user = await User.findOne({ email })
        if (user) {
            return NextResponse.json({
                message: "User Already Existed"
            }, { status: 400 })
        }

        console.log(user);
        
        const salt = await bcryptjs.genSalt(10)
        const hashPass = await bcryptjs.hash(password, salt)
        const newUser = new User({
            email, password: hashPass,
            username
        })

        const savedUser = await newUser.save()
        console.log(savedUser);

        await sendEamil({email, emailType:"VERIFY",userId:savedUser._id})

        return NextResponse.json({
            message: "User Created Suucessfully",
            success: true,
            savedUser
        })

        
    } catch (error: any) {
        return NextResponse.json({
            error: error.message
        }, {
            status: 400
        })
    }
}