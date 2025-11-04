import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const POST = async (req:Request) => {

    const {email} = await req.json();
    
    const succesValue = (await prisma.passwordReset.findMany({
        where:{
            email:email
        },
        select:{
            succes:true
        }
    }))[0].succes;

    return NextResponse.json({
        succesValue:succesValue
    })
}
