import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const POST = async (req:Request) => {

    const {username} = await req.json();

    try {
        const user = await prisma.user.findUnique({
            where:{
                username:username
            },
            select:{
                username:true,
                email:true,
                profilePic:true,
            }
        })

        return NextResponse.json(user);
    }
    catch(err){
        return NextResponse.json({error:err}, {status:500});
    }
}