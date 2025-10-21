import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const POST = async (req:Request) => {
    const {email,newPassword,confirmNewPassword,currentPassword} = await req.json();

    const user = await prisma.user.findUnique({
        where:{
            email: email
        }
    });

    if(!user){
        return NextResponse.json({message:"User not found"}, {status:404});
    }

    if(user.password !== currentPassword){
        return NextResponse.json({message:"Incorrect password"}, {status:400});
    }

    if(newPassword !== confirmNewPassword){
        return NextResponse.json({message:"Passwords do not match"}, {status:400});
    }

    if(newPassword.length < 6){
        return NextResponse.json({message:"Password too short"}, {status:400});
    }

    if(newPassword.length > 200){
        return NextResponse.json({message:"Password too long"}, {status:400});
    }

    await prisma.user.update({
        where:{
            email: email
        },
        data:{
            password: newPassword
        }
    })

    return NextResponse.json({message:"Password changed successfully"}, {status:200});
}

    