import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
    const { usernames } = await request.json();

    const users=await prisma.user.findMany({
        where: {
            username: {
                in: usernames,
            },
        },
        select: {
            username: true,
            profilePic: true,
        },
    })

    return NextResponse.json(users);
}