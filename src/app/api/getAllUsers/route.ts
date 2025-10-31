import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req:Request) {

    const {sessionUsername} = await req.json()

    const users = await prisma.user.findMany({
        orderBy:{
            createdAt: 'desc'
        },
        select: {
            username: true,
            profilePic: true
        },
    });

    const me = await prisma.user.findUnique({
        where:{
            username:sessionUsername
        },
        select:{
            followingList:true
        }
    })

    const followingList = me?.followingList;

    const data = users.map((user)=>{
        return {
            ...user,
            following:followingList?.includes(user.username)
        }
    })

    return NextResponse.json({data})
}
