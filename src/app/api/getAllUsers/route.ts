import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    const users = await prisma.user.findMany({
        orderBy:{
            createdAt: 'desc'
        },
        select: {
            username: true,
            profilePic: true
        },
    });

    return NextResponse.json(users);
}
