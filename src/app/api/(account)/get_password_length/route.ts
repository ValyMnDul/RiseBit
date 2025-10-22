import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
    const {email} = await request.json();

    const user = await prisma.user.findFirst({
        where: {
            email: email
        }
    });

    return NextResponse.json({ passwordLength: user?.password.length});
}