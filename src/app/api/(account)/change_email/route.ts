import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export const POST= async (req:Request)=>{
    const {email,newEmail} = await req.json();

    try{
        await prisma.user.update({
            where:{
                email:email
            },
            data:{
                email:newEmail
            }
        })
    }
    catch(e){
        return NextResponse.json({error:e},{status:500})
    }

    return NextResponse.json({newEmail:newEmail},{status:200})
}