import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export const POST = async (req:Request) => {

    const formData = await req.formData();

    const subtitle = formData.get('subtitle') as string;
    const content = formData.get('content') as string;
    const username = formData.get('username') as string;
    const photos = formData.getAll('photo') as Array<File>


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

    const photosURLs = [];

    for(const photo of photos){

        const buffer = Buffer.from(await photo.arrayBuffer());
        const base64String=buffer.toString("base64");
        const base64Image=`data:${photo.type};base64,${base64String}`;

        const cloudinaryRes = await cloudinary.uploader.upload(base64Image,{
            folder:"ReseBit_Posts_Images",
            resource_type:"image",
            transformation:[{width:800,crop:"limit"}],
        });

        photosURLs.push(cloudinaryRes.secure_url);
    }

    await prisma.post.create({
        data:{
            subtitle:subtitle,
            content:content,
            username:username,
            photos:photosURLs
        }
    });
    
    return NextResponse.json({message:"Post created successfully"},{status:201});
}