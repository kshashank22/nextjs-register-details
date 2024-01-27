import User from "@/models/users";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const data=await User.find()
        return NextResponse.json({message:"Successfully Fetched.",data:data},{status:201});

    } catch (error) {
        return NextResponse.json({message:"Internal Error Occured While Getting the User."},{status:500})
    }
}