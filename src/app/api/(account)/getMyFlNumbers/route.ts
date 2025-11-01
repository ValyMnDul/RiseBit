import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const POST = async (req:Request) => {

    const {sessionUsername} = await req.json();

    const me = await prisma.user.findUnique({
        where:{
            username:sessionUsername,
        }, 
        select:{
            followersList:true,
            followingList:true
        }
    });

    const followersNumber = me?.followersList.length
    const followingNumber = me?.followingList.length

    return NextResponse.json({
        followersNumber,
        followingNumber
    })
}