import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const POST = async (req:Request) =>{

    const {email,newBio} = await req.json();

    if(newBio.length > 750){
        return NextResponse.json({newBio:newBio,message2:"The bio has to be 750 characters or less."},{status:400});
    }

    await prisma.user.update({
        where:{
            email:email
        },
        data:{
            bio:newBio
        }
    })

    return NextResponse.json({newBio:newBio,message2:"Bio updated successfully."},{status:200});
}