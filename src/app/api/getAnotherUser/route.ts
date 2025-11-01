import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {

    const {username, sessionUsername} = await req.json();

    const anotherUser = await prisma.user.findUnique({
        where:{
            username: username
        },
        select:{
            username: true,
            lastName: true,
            firstName: true,
            birthDate: true,
            bio: true,
            profilePic: true,
            createdAt: true,
        }
    });

    const me = await prisma.user.findUnique({
        where:{
            username: sessionUsername
        },
        select:{
            followingList: true
        }
    })

    const followingList = me?.followingList;

    const data = {
        ...anotherUser,
        following: followingList?.includes(username)
    }

    return NextResponse.json({data}, {status: 200})
}