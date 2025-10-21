import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export const POST= async (req:Request)=>{
    const {email,newEmail} = await req.json();

    const user = await prisma.user.findUnique({
        where:{
            email:email
        }
    })

    if(!user){
        return NextResponse.json({message:"User not found"},{status:404})
    }

    if(newEmail.length < 5 || newEmail.length > 200){
        return NextResponse.json({message:"Email length invalid"},{status:400})
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if(!emailRegex.test(newEmail)){
        return NextResponse.json({message:"Invalid email format"},{status:400})
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
        return NextResponse.json({error:e},{status:500})
    }

    return NextResponse.json({newEmail:newEmail},{status:200})
}