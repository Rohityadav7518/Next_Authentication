import { NextRequest,NextResponse } from "next/server";
import { Connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { getTokenData } from "@/helper/getTokenData";

Connect()

export async function GET(request:NextRequest) {
    try {
        const userId = await getTokenData(request)
        const user = await User.findOne({_id:userId}).select("-password -isAdmin ")
        return NextResponse.json({
            message:"User Found",
            user
        })
    } catch (error:any) {
        throw new Error(error.message)
    }
}