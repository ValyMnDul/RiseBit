import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const POST = async (req:Request) => {

    const {sessionUsername,postUsername} = await req.json();

    const me = await prisma.user.findUnique({
        where:{
            username:sessionUsername
        },
        select:{
            followingList:true
        }
    })

    await prisma.user.update({
        where:{
            username:sessionUsername
        },
        data:{
            followingList:me?.followingList.filter((i)=> i != postUsername)
        }
    })


    const anyone = await prisma.user.findUnique({
        where:{
            username:postUsername
        },
        select:{
            followersList:true
        }
    })

    await prisma.user.update({
        where:{
            username:postUsername
        },
        data:{
            followersList:anyone?.followersList.filter((i)=> i != sessionUsername)
        }
    })

    return NextResponse.json({})

}