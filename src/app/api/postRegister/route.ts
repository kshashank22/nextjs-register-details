import {connectMongoDB} from "@/lib/mongodb"
import User from "@/models/users";
import { NextResponse } from "next/server";


export async function POST (req:any){

    try{
        
        const{firstName,lastName,email,fathersName,mothersName,address,pincode,country}=await req.json();
        await connectMongoDB();
        const user=await User.findOne({email}).select("_id");
        if(user){
            return NextResponse.json({errors:"user allready exist"},{status:400})
        }
       const data= await User.create({ firstName,lastName,email,fathersName,mothersName,address,pincode,country})
        
        return NextResponse.json({message:"User Registered.",data:data},{status:201});
    } catch(error){
        return NextResponse.json({message:"An Error Occured While Registering the User."},{status:500})
    }
}

