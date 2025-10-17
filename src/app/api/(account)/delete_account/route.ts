import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export const DELETE=async (req:Request)=>{

    const {email}=await req.json();

    if(await prisma.user.findUnique({where:{email:email}})===null){
        return NextResponse.json({message:"Email is required"},{status:400})
    }

    await prisma.user.delete({
        where:{
            email:email
        }
    })

    return NextResponse.json({message:"Account deleted successfully"},{status:200})
}