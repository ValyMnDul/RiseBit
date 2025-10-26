import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const POST = async (req:Request) => {

    const {subtitle,content,username} = await req.json()

    if(!subtitle || !content){
        return NextResponse.json({message:"Subtitle or content required"},{status:400});
    }

    if(!username){
        return NextResponse.json({message:"Unauthorized"},{status:401});
    }

    if(subtitle.length > 100){
        return NextResponse.json({message:"Subtitle too long"},{status:400});
    }

    if(content.length > 7000){
        return NextResponse.json({message:"Content too long"},{status:400});
    }

    await prisma.post.create({
        data:{
            subtitle:subtitle,
            content:content,
            username:username
        }
    });
    
    return NextResponse.json({message:"Post created successfully"},{status:201});
}