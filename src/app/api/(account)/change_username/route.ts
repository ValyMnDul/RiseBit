import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
    const {newUsername, email} = await req.json();

    try{
            await prisma.user.update({
            where: {
                email: email,
            },
            data: {
                username: newUsername,
            }
        });
    }
    catch(e){
        return NextResponse.json({error:e}, {status: 500});
    }

    return NextResponse.json({newUsername: newUsername}, {status: 200});
}