import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req:Request) {

    const { email, inputCode } =await req.json();

    const code = (await prisma.passwordReset.findFirst({ 
        where: { 
            email
        },
        select:{
            code:true
        }
    }))?.code;

    if(code === inputCode){

        await prisma.passwordReset.updateMany({
            where:{
                email:email
            },
            data:{
                succes:true
            }
        });
        
        return NextResponse.json({resMessage:'Code verified!'},{status:200});
    }

    return NextResponse.json({resMessage:'Invalid code. Try again.'}, {status:400});
}