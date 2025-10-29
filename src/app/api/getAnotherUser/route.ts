import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {

    const {username} = await req.json();

    const anotherUser = await prisma.user.findUnique({
        where:{
            username:username
        },
        select:{
            username:true,
            lastName:true,
            firstName:true,
            birthDate:true,
            bio:true,
        }
    })

    return NextResponse.json({anotherUser},{status:200})
}