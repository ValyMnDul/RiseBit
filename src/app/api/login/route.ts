import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req:Request){
    const data=await req.json();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            return NextResponse.json({}, { status: 405 });
        }

    if(data.email.length>100 || data.password.length>200){
        return NextResponse.json({},{ status: 406 });
    }

    if(data.password.length===0){
        return NextResponse.json({},{ status: 407 });
    }


    const account=await prisma.user.findUnique({
        where:{
            email:data.email
        } 
    });

    if(account===null){
        return NextResponse.json({},{ status: 400 });
    }
    else{
        if(account.password===data.password){
            return NextResponse.json({},{status:201});
        }
        else{
            return NextResponse.json({},{status:401})
        }
    }
}