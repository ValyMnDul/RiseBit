import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export const POST= async (req:Request)=>{
    const {email,newEmail} = await req.json();

    if(newEmail.length < 5){
        return NextResponse.json({message3:"Email too short",newEmail},{status:400})
    }

    if(newEmail.length > 100){
        return NextResponse.json({message3:"Email too long",newEmail},{status:400})
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if(!emailRegex.test(newEmail)){
        return NextResponse.json({message3:"Invalid email format",newEmail},{status:400})
    }

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
        return NextResponse.json({error:e,message3:"Email already in use",newEmail},{status:400})
    }

    return NextResponse.json({message3:"Email updated successfully",newEmail},{status:200})
}