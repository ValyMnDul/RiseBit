import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export const POST = async (req:Request)=>{

    const {password,cPassword,email}=await req.json();

    if(password === '' || cPassword === '' || password.length < 6 || cPassword.length < 6){
        return NextResponse.json({message: 'Password must be at least 6 characters long.'}, {status: 400});
    }

    if(password.length > 200 || cPassword.length > 200){
        return NextResponse.json({message: 'Password is too long.'}, {status: 400});
    }

    if(password !== cPassword){
        return NextResponse.json({message: 'Passwords do not match.'}, {status: 400});
    }

    const hashedPassword = await bcrypt.hash(password,10);

    const res = await prisma.user.update({
        where:{
            email:email
        },
        data:{
            password:hashedPassword,
        }
    });

    if(!res){
        return NextResponse.json({message: 'Error updating password.'}, {status: 500});
    }

    await prisma.passwordReset.deleteMany({
        where:{
            email:email
        }
    })

    return NextResponse.json({message: 'Password updated successfully.'}, {status: 200});
}