import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET= async () =>{
    try {
        const posts = await prisma.post.findMany({
            orderBy:{
                createdAt:"desc"
            }
        });
        return NextResponse.json( posts, {status:200});
    }
    catch (error) {
        if (error){}
        return NextResponse.json({message:"Internal Server Error"}, {status:500});
    }
}