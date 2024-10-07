import User from "@/models/userModel";
import nodemailer from 'nodemailer'
import bcryptjs from 'bcryptjs'
import { Html } from "next/document";

export const sendEamil = async ({ email, emailType, userId }: any) => {
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)
        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000
            })
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000
            })
        }


        var transport = nodemailer.createTransport({
            host: "",
            port: "",
            auth: {
                user: "",
                pass: ""
            }
        })

        const mailOptions = {
            from:"",
            to:email,
            subject:emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password",
            html:`<p>click<a href="${process.env.Domain}/verifyemail?token=${hashedToken}">here</a>to${emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password" }</p>`
        }

        const mailResponse = await transport.sendMail(mailOptions)
        return mailResponse;
    } catch (error: any) {
        throw new Error(error.message)
    }
}