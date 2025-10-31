import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const POST = async (req:Request) => {

    const {sessionUsername,postUsername} = await req.json();

    await prisma.user.update({
        where:{
            username:postUsername
        },
        data:{
            followersList:{
                push:sessionUsername
            }
        }
    });

    await prisma.user.update({
        where:{
            username:sessionUsername
        },
        data:{
           followingList:{
            push:postUsername
           } 
        }
    })

    return NextResponse.json({})
}