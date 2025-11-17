import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const POST = async (req:Request) => {

    const { usernameFromSearchParams, updatedAtFromSearchParams } = await req.json();

    try{
        const postToEdit = (await prisma.post.findFirst({
            where:{
                username:usernameFromSearchParams,
                updatedAt:updatedAtFromSearchParams
            }
        }));

        return NextResponse.json({postToEdit},{status:200});
    }
    catch(e){
        console.error(e)
        return NextResponse.json({error:e},{status:501});
    }
}